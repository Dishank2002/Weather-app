import React, { useEffect, useState } from 'react';
import { useDate } from '../Utils/useDate';
import sun from '../assets/icons/sun.png';
import cloud from '../assets/icons/cloud.png';
import fog from '../assets/icons/fog.png';
import rain from '../assets/icons/rain.png';
import snow from '../assets/icons/snow.png';
import storm from '../assets/icons/storm.png';
import wind from '../assets/icons/windy.png';
import '../index.css';

const WeatherCard = ({
  temperature,
  windspeed,
  humidity,
  place,
  heatIndex,
  iconString,
  conditions,
}) => {
  const [icon, setIcon] = useState(sun);

  useEffect(() => {
    if (iconString) {
      if (iconString.toLowerCase().includes('cloud')) {
        setIcon(cloud);
      } else if (iconString.toLowerCase().includes('rain')) {
        setIcon(rain);
      } else if (iconString.toLowerCase().includes('clear')) {
        setIcon(sun);
      } else if (iconString.toLowerCase().includes('thunder')) {
        setIcon(storm);
      } else if (iconString.toLowerCase().includes('fog')) {
        setIcon(fog);
      } else if (iconString.toLowerCase().includes('snow')) {
        setIcon(snow);
      } else if (iconString.toLowerCase().includes('wind')) {
        setIcon(wind);
      }
    }
  }, [iconString]);

  return (
    <div className='custom-card'>
      <div className='flex w-full justify-center items-center gap-4 mb-4'>
        <img src={icon} alt="weather_icon" className='w-[4rem] h-[4rem]' />
        <p className='font-bold text-5xl flex justify-center items-center'>{temperature} &deg;C</p>
      </div>
      <div className='font-bold text-center text-xl mb-2'>{place}</div>
      <div className='w-full flex justify-between items-center mb-4'>
        <p className='flex-1 text-center'>{new Date().toDateString()}</p>
      </div>
      <div className='w-full flex justify-between items-center mb-4'>
        <p className='flex-1 text-center font-bold p-2'>Wind Speed <span className='font-normal'>{windspeed} km/h</span></p>
        <div className='divider-vertical'></div>
        <p className='flex-1 text-center font-bold p-2'>Humidity <span className='font-normal'>{humidity} gm/m³</span></p>
      </div>
      <div className='w-full flex justify-between items-center p-3 mb-4'>
        <p className='font-semibold text-lg'>Heat Index</p>
        <p className='text-lg'>{heatIndex ? heatIndex : 'N/A'}</p>
      </div>
      <hr className='border-t border-gray-300 w-full my-2' />
      <div className='w-full flex justify-between items-center p-3'>
        <p className='font-semibold text-lg'>Conditions</p>
        <p className='text-lg'>{conditions}</p>
      </div>
    </div>
  );
};

export default WeatherCard;
