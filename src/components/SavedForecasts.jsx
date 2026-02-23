import React, { useState, useEffect } from 'react';
import {
  getForecasts,
  deleteForecast,
  exportForecastsJSON,
  exportForecastsCSV,
  exportForecastsPDF,
} from '../utils/storage';
import './SavedForecasts.css';

const SavedForecasts = ({ refreshTrigger, onEdit }) => {
  const [forecasts, setForecasts] = useState([]);

  useEffect(() => {
    setForecasts(getForecasts());
  }, [refreshTrigger]);

  const handleDelete = (id) => {
    if (confirm('Delete this forecast?')) {
      deleteForecast(id);
      setForecasts(getForecasts());
    }
  };

  const handleExport = (format) => {
    if (forecasts.length === 0) {
      alert('No forecasts to export');
      return;
    }

    let content, filename, type, blob;

    if (format === 'json') {
      content = exportForecastsJSON(forecasts);
      filename = 'forecasts.json';
      type = 'application/json';
      blob = new Blob([content], { type });
    } else if (format === 'csv') {
      content = exportForecastsCSV(forecasts);
      filename = 'forecasts.csv';
      type = 'text/csv';
      blob = new Blob([content], { type });
    } else if (format === 'pdf') {
      blob = exportForecastsPDF(forecasts);
      filename = 'forecasts.pdf';
    }

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="SavedForecasts">
      <h2>Saved Forecasts</h2>

      {forecasts.length === 0 ? (
        <p>No forecasts saved yet. Search for a location above to get started.</p>
      ) : (
        <>
          <div className="export-buttons">
            <button onClick={() => handleExport('json')}>📥 JSON</button>
            <button onClick={() => handleExport('csv')}>📥 CSV</button>
            <button onClick={() => handleExport('pdf')}>📥 PDF</button>
          </div>

          <div className="forecasts-grid">
            {forecasts.map((forecast) => (
              <div key={forecast.id} className="forecast-card">
                <div className="forecast-header">
                  <h3>{forecast.location}</h3>
                  <span className="forecast-coords">
                    {forecast.lat.toFixed(2)}, {forecast.lon.toFixed(2)}
                  </span>
                </div>

                <div className="forecast-body">
                  <p className="forecast-count">
                    📊 {forecast.forecast.length} periods
                  </p>
                  {forecast.notes && <p className="forecast-notes">{forecast.notes}</p>}
                  <p className="forecast-date">
                    Saved: {new Date(forecast.savedAt).toLocaleString()}
                  </p>
                </div>

                <div className="forecast-actions">
                  <button className="edit-btn" onClick={() => onEdit(forecast)}>
                    ✏️ Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(forecast.id)}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SavedForecasts;
