import React, { useEffect, useState } from 'react';
import { useStateContext } from '../Context';
import Clear from '../assets/images/Clear.jpg';
import Fog from '../assets/images/fog.png';
import Cloudy from '../assets/images/Cloudy.jpg';
import Rainy from '../assets/images/Rainy.jpg';
import Snow from '../assets/images/snow.jpg';
import Stormy from '../assets/images/Stormy.jpg';


const BackgroundLayout = () => {
  const { weather } = useStateContext();
  const [image, setImage] = useState(Clear);

  useEffect(() => {
    if (weather.conditions) {
      let imageString = weather.conditions;
      if (imageString.toLowerCase().includes('clear')) {
        setImage(Clear);
      } else if (imageString.toLowerCase().includes('cloud')) {
        setImage(Cloudy);
      } else if (imageString.toLowerCase().includes('rain') || imageString.toLowerCase().includes('shower')) {
        setImage(Rainy);
      } else if (imageString.toLowerCase().includes('snow')) {
        setImage(Snow);
      } else if (imageString.toLowerCase().includes('fog')) {
        setImage(Fog);
      } else if (imageString.toLowerCase().includes('thunder') || imageString.toLowerCase().includes('storm')) {
        setImage(Stormy);
      }
    }
  }, [weather]);

  return (
    <div className='background-layout'>
      <img src={image} alt="weather_image" className='background-image' />
    </div>
  );
}

export default BackgroundLayout;
