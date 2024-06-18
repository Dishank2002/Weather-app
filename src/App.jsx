import { useState, useEffect } from 'react';
import './App.css';
import search from './assets/icons/search.svg';
import { useStateContext } from './Context';
import useCitySuggestions from './Utils/useCitySuggestions';
import { BackgroundLayout, WeatherCard, MiniCard } from './Components';

function App() {
    const [input, setInput] = useState('');
    const { weather, thisLocation, values, place, setPlace, fetchWeather } = useStateContext();
    const { suggestions, fetchSuggestions } = useCitySuggestions();

    const submitCity = (city) => {
        setPlace(city);
        setInput('');
        setSuggestions([]);
    };

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    fetchWeather(latitude, longitude);
                },
                (error) => {
                    console.error(error);
                    alert('Unable to retrieve your location');
                }
            );
        } else {
            alert('Geolocation is not supported by your browser');
        }
    }, []);

    return (
        <div className='w-full h-screen text-white px-8 relative'>
            <BackgroundLayout />
            <nav className='w-full p-3 flex justify-between items-center'>
                <h1 className='font-bold tracking-wide text-3xl'>Weather App</h1>
                <div className='relative'>
                    <div className='bg-white w-[15rem] overflow-hidden shadow-2xl rounded flex items-center p-2 gap-2'>
                        <img src={search} alt="search" className='w-[1.5rem] h-[1.5rem]' />
                        <input
                            onKeyUp={(e) => {
                                if (e.key === 'Enter') {
                                    submitCity(input);
                                }
                            }}
                            type="text"
                            placeholder='Search city'
                            className='focus:outline-none w-full text-[#212121] text-lg'
                            value={input}
                            onChange={e => {
                                setInput(e.target.value);
                                fetchSuggestions(e.target.value);
                            }}
                        />
                    </div>
                    {input && suggestions.length > 0 && (
                        <ul className='absolute bg-white w-[15rem] shadow-2xl rounded mt-1 p-2 suggestions-dropdown'>
                            {suggestions.map((suggestion, index) => (
                                <li
                                    key={index}
                                    onClick={() => submitCity(suggestion.formatted)}
                                >
                                    {suggestion.formatted}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </nav>
            <main className='w-full flex flex-col items-center gap-4 py-4'>
                <div className='flex justify-center mb-4'>
                    <WeatherCard
                        place={thisLocation}
                        windspeed={weather.wspd}
                        humidity={weather.humidity}
                        temperature={weather.temp}
                        heatIndex={weather.heatindex}
                        iconString={weather.conditions}
                        conditions={weather.conditions}
                    />
                </div>
                <div className='flex gap-2 flex-wrap justify-center'>
                    {values?.slice(1, 7).map(curr => (
                        <MiniCard
                            key={curr.datetime}
                            time={curr.datetime}
                            temp={curr.temp}
                            iconString={curr.conditions}
                            windspeed={curr.wspd}
                            humidity={curr.humidity}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
}

export default App;
