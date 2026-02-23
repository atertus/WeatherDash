import React, { useState } from 'react';
import SavedForecasts from '../components/SavedForecasts';
import YouTubeVideos from '../components/YouTubeVideos';
import GoogleMap from '../components/GoogleMap';
import { saveForecast, updateForecast } from '../utils/storage';
import './Dashboard.css';

const Dashboard = ({ data = [], location = 'New York', lat = 40.7128, lon = -74.0060 }) => {
  const [refreshSaved, setRefreshSaved] = useState(0);
  const [editingForecast, setEditingForecast] = useState(null);
  const [notes, setNotes] = useState('');

  const handleSaveForecast = () => {
    if (!location || data.length === 0) {
      alert('No forecast data to save');
      return;
    }
    saveForecast(location, 40.7128, -74.0060, data, notes);
    setNotes('');
    setRefreshSaved((prev) => prev + 1);
    alert(`Saved forecast for ${location}`);
  };

  const handleEditForecast = (forecast) => {
    setEditingForecast(forecast);
    setNotes(forecast.notes);
  };

  const handleUpdateForecast = () => {
    if (editingForecast) {
      updateForecast(editingForecast.id, { notes });
      setEditingForecast(null);
      setNotes('');
      setRefreshSaved((prev) => prev + 1);
      alert('Forecast updated');
    }
  };

  if (!data || data.length === 0) return (
    <div className="Dashboard">
      <div style={{ paddingLeft: 300, color: 'white' }}>Loading forecast...</div>
    </div>
  );

  return (
    <div className="Dashboard">
      <div style={{color:'white', paddingLeft:300, paddingTop:12, fontSize: 20, fontWeight: 'bold'}}>
        {location} - 5-Day Forecast
      </div>

      <div className="save-forecast-section">
        <input
          type="text"
          placeholder="Add notes (optional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="forecast-notes-input"
        />
        {editingForecast ? (
          <>
            <button className="save-btn" onClick={handleUpdateForecast}>
              💾 Update Forecast
            </button>
            <button className="cancel-btn" onClick={() => { setEditingForecast(null); setNotes(''); }}>
              ✕ Cancel
            </button>
          </>
        ) : (
          <button className="save-btn" onClick={handleSaveForecast}>
            💾 Save Forecast
          </button>
        )}
      </div>

      <div className="App-page">
        <div className="App-row">
          {data.map((period, idx) => (
            <div key={idx} className="Dashboard-day">
              <div className="day-date">{period.name}</div>
              <div className="day-temp">{period.temperature}°{period.temperatureUnit}</div>
              <div className="day-desc">{period.shortForecast}</div>
            </div>
          ))}
        </div>
      </div>

      <GoogleMap lat={lat} lon={lon} location={location} />

      <SavedForecasts refreshTrigger={refreshSaved} onEdit={handleEditForecast} />

      <YouTubeVideos location={location} />
    </div>
  );
};

export default Dashboard;
