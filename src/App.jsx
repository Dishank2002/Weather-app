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
        <div className='w-full h-screen text-white px-8'>
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
            <BackgroundLayout></BackgroundLayout>
            <main className='w-full flex flex-wrap gap-8 py-4 px-[10%] items-center justify-center'>
                <WeatherCard
                    place={thisLocation}
                    windspeed={weather.wspd}
                    humidity={weather.humidity}
                    temperature={weather.temp}
                    heatIndex={weather.heatindex}
                    iconString={weather.conditions}
                    conditions={weather.conditions}
                />
                <div className='flex justify-center gap-8 flex-wrap w-[60%]'>
                    {values?.slice(1, 7).map(curr => {
                        return (
                            <MiniCard
                                key={curr.datetime}
                                time={curr.datetime}
                                temp={curr.temp}
                                iconString={curr.conditions}
                            />
                        );
                    })}
                </div>
            </main>
        </div>
    );
}

export default App;
