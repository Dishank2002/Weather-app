import { useState } from 'react';
import axios from 'axios';

const useCitySuggestions = () => {
    const [suggestions, setSuggestions] = useState([]);

    const fetchSuggestions = async (query) => {
        if (!query) {
            setSuggestions([]);
            return;
        }

        const apiKey = import.meta.env.VITE_OPENCAGE_API_KEY;
        const url = `https://api.opencagedata.com/geocode/v1/json?q=${query}&key=${apiKey}&limit=5`;

        try {
            const response = await axios.get(url);
            const results = response.data.results.map(result => ({
                city: result.components.city || result.components.town || result.components.village || result.components.state,
                country: result.components.country,
                formatted: result.formatted
            }));
            setSuggestions(results);
        } catch (error) {
            console.error('Error fetching city suggestions:', error);
        }
    };

    return { suggestions, fetchSuggestions };
};

export default useCitySuggestions;
