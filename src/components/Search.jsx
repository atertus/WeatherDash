import React, { useState } from 'react';
import './Search.css';

const Search = ({ onSearch }) => {
  const [lat, setLat] = useState('40.7128');
  const [lon, setLon] = useState('-74.0060');
  const [location, setLocation] = useState('New York');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [geoLoading, setGeoLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!lat || !lon || !location) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    const latNum = parseFloat(lat);
    const lonNum = parseFloat(lon);

    if (isNaN(latNum) || isNaN(lonNum)) {
      setError('Latitude and Longitude must be numbers');
      setLoading(false);
      return;
    }

    if (latNum < -90 || latNum > 90) {
      setError('Latitude must be between -90 and 90');
      setLoading(false);
      return;
    }

    if (lonNum < -180 || lonNum > 180) {
      setError('Longitude must be between -180 and 180');
      setLoading(false);
      return;
    }

    onSearch({ lat: latNum, lon: lonNum, location });
    setLoading(false);
  };

  const handleUseMyLocation = () => {
    setGeoLoading(true);
    setError('');

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setGeoLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLat(latitude.toFixed(4));
        setLon(longitude.toFixed(4));
        setLocation(`${latitude.toFixed(2)}, ${longitude.toFixed(2)}`);
        setGeoLoading(false);

        setTimeout(() => {
          onSearch({ lat: latitude, lon: longitude, location: `Location (${latitude.toFixed(2)}, ${longitude.toFixed(2)})` });
        }, 100);
      },
      (error) => {
        let errorMsg = 'Unable to get your location';
        if (error.code === error.PERMISSION_DENIED) {
          errorMsg = 'Location permission denied. Please enable it in browser settings.';
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          errorMsg = 'Location information is unavailable.';
        } else if (error.code === error.TIMEOUT) {
          errorMsg = 'The request to get user location timed out.';
        }
        setError(errorMsg);
        setGeoLoading(false);
      }
    );
  };

  return (
    <div className="Search">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Location name"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="search-input"
        />
        <input
          type="text"
          placeholder="Latitude (-90 to 90)"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          className="search-input"
        />
        <input
          type="text"
          placeholder="Longitude (-180 to 180)"
          value={lon}
          onChange={(e) => setLon(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-btn" disabled={loading}>
          {loading ? 'Loading...' : 'Get Forecast'}
        </button>
        <button
          type="button"
          className="geo-btn"
          onClick={handleUseMyLocation}
          disabled={geoLoading}
        >
          {geoLoading ? '📍 Detecting...' : '📍 Use My Location'}
        </button>
      </form>
      {error && <div className="search-error">{error}</div>}
    </div>
  );
};

export default Search;
