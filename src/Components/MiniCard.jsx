import React, { useEffect, useState } from 'react';
import sun from '../assets/icons/sun.png';
import cloud from '../assets/icons/cloud.png';
import fog from '../assets/icons/fog.png';
import rain from '../assets/icons/rain.png';
import snow from '../assets/icons/snow.png';
import storm from '../assets/icons/storm.png';
import wind from '../assets/icons/windy.png';

const MiniCard = ({ time, temp, iconString, windspeed, humidity }) => {
  const [icon, setIcon] = useState();

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
    <div className='custom-mini-card'>
      <p className='text-center text-xs'>{new Date(time).toLocaleDateString('en', { weekday: 'long' })}</p>
      <div className='w-full flex justify-center items-center flex-1'>
        <img src={icon} alt="forecast not available" className='w-[3rem] h-[3rem]' />
      </div>
      <p className='text-center text-sm font-bold'>{temp}&deg;C</p>
      <div className='divider'></div>
      <div className='flex justify-between text-xs'>
        <p>Wind: {windspeed} km/h</p>
        <div className='divider-vertical'></div>
        <p>Humidity: {humidity}%</p>
      </div>
    </div>
  );
}

export default MiniCard;
