import './App.css';
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Menu from './components/menu';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Search from './components/Search';

const App = () => {
  const [data, setData] = useState([]);
  const [location, setLocation] = useState('New York');
  const [lat, setLat] = useState(40.7128);
  const [lon, setLon] = useState(-74.0060);

  const fetchWeather = async (lat, lon, locationName) => {
    try {
      const pointsUrl = `https://api.weather.gov/points/${lat},${lon}`;
      
      const pointsResponse = await fetch(pointsUrl);
      
      if (pointsResponse.status === 404) {
        alert('Location not found in weather.gov coverage area. Try coordinates within the continental US.\n\nExample: 26.5289, -80.0686 for Boynton Beach, FL');
        return;
      }

      const pointsData = await pointsResponse.json();

      if (!pointsData.properties) {
        alert('Invalid coordinates. Please try again.');
        return;
      }

      const forecastUrl = pointsData.properties.forecast;
      
      const forecastResponse = await fetch(forecastUrl);
      const forecastData = await forecastResponse.json();

      const periods = forecastData.properties.periods || [];
      
      setData(periods.slice(0, 10));
      setLocation(locationName);
      setLat(lat);
      setLon(lon);
    } catch (error) {
      alert('Error fetching weather. Check console for details.');
    }
  };

  useEffect(() => {
    fetchWeather(40.7128, -74.0060, 'New York');
  }, []);


  return ( 
    <div className="App">
      <div className="App-sidebar">
        <Header />
        <Menu />
      </div>

      <Routes>
        <Route path="/" element={
          <div id="dashboard">
            <Search onSearch={(coords) => fetchWeather(coords.lat, coords.lon, coords.location)} />
            <Dashboard data={data} location={location} lat={lat} lon={lon} />
          </div>
        } />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
