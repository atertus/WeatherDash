import jsPDF from 'jspdf';

export const saveForecast = (location, lat, lon, forecast, notes = '') => {
  const forecasts = JSON.parse(localStorage.getItem('weatherForecasts') || '[]');
  const newForecast = {
    id: Date.now(),
    location,
    lat,
    lon,
    forecast,
    notes,
    savedAt: new Date().toISOString(),
  };
  forecasts.push(newForecast);
  localStorage.setItem('weatherForecasts', JSON.stringify(forecasts));
  return newForecast;
};

export const getForecasts = () => {
  return JSON.parse(localStorage.getItem('weatherForecasts') || '[]');
};

export const updateForecast = (id, updates) => {
  const forecasts = JSON.parse(localStorage.getItem('weatherForecasts') || '[]');
  const index = forecasts.findIndex((f) => f.id === id);
  if (index !== -1) {
    forecasts[index] = { ...forecasts[index], ...updates };
    localStorage.setItem('weatherForecasts', JSON.stringify(forecasts));
    return forecasts[index];
  }
  return null;
};

export const deleteForecast = (id) => {
  const forecasts = JSON.parse(localStorage.getItem('weatherForecasts') || '[]');
  const filtered = forecasts.filter((f) => f.id !== id);
  localStorage.setItem('weatherForecasts', JSON.stringify(filtered));
};

export const exportForecastsJSON = (forecasts) => {
  return JSON.stringify(forecasts, null, 2);
};

export const exportForecastsCSV = (forecasts) => {
  if (forecasts.length === 0) return '';
  
  const headers = ['Location', 'Latitude', 'Longitude', 'Saved Date', 'Notes', 'Period', 'Temperature', 'Wind Speed', 'Precipitation Chance', 'Short Forecast'];
  const rows = [];
  
  forecasts.forEach((f) => {
    const baseRow = [
      f.location,
      f.lat,
      f.lon,
      new Date(f.savedAt).toLocaleString(),
      f.notes || '',
    ];
    
    if (f.forecast && f.forecast.length > 0) {
      f.forecast.forEach((period, idx) => {
        const forecastRow = [
          ...baseRow,
          period.name || `Period ${idx + 1}`,
          period.temperature ? `${period.temperature}°${period.temperatureUnit}` : 'N/A',
          period.windSpeed || 'N/A',
          period.precipitationChance?.value ? `${period.precipitationChance.value}%` : 'N/A',
          period.shortForecast || '',
        ];
        rows.push(forecastRow);
      });
    } else {
      rows.push([...baseRow, 'N/A', 'N/A', 'N/A', 'N/A', 'No forecast data']);
    }
  });
  
  const csv = [headers, ...rows].map((row) =>
    row.map((cell) => `"${cell}"`).join(',')
  ).join('\n');
  return csv;
};

export const exportForecastsPDF = (forecasts) => {
  const doc = new jsPDF();
  let yPosition = 10;

  doc.setFontSize(16);
  doc.text('Weather Forecasts', 10, yPosition);
  yPosition += 15;

  forecasts.forEach((forecast, idx) => {
    doc.setFontSize(12);
    doc.text(`${idx + 1}. ${forecast.location}`, 10, yPosition);
    yPosition += 7;

    doc.setFontSize(10);
    doc.text(`Coordinates: ${forecast.lat.toFixed(2)}, ${forecast.lon.toFixed(2)}`, 15, yPosition);
    yPosition += 5;

    doc.text(`Saved: ${new Date(forecast.savedAt).toLocaleString()}`, 15, yPosition);
    yPosition += 5;

    if (forecast.notes) {
      doc.text(`Notes: ${forecast.notes}`, 15, yPosition);
      yPosition += 5;
    }

    yPosition += 5;
    doc.setFontSize(11);
    doc.text('Daily Forecast:', 15, yPosition);
    yPosition += 6;

    if (forecast.forecast && forecast.forecast.length > 0) {
      doc.setFontSize(9);
      forecast.forecast.forEach((period, pIdx) => {
        const temp = period.temperature ? `${period.temperature}°${period.temperatureUnit}` : 'N/A';
        const wind = period.windSpeed || 'N/A';
        const rain = period.precipitationChance?.value ? `${period.precipitationChance.value}%` : 'N/A';
        const forecast_text = period.shortForecast || 'No forecast';

        const lines = [
          `${pIdx + 1}. ${period.name || `Period ${pIdx + 1}`}`,
          `   Temp: ${temp} | Wind: ${wind} | Rain: ${rain}`,
          `   ${forecast_text}`,
        ];

        lines.forEach((line) => {
          if (yPosition > 270) {
            doc.addPage();
            yPosition = 10;
          }
          doc.text(line, 15, yPosition);
          yPosition += 5;
        });
      });
    } else {
      doc.text('No forecast data available', 15, yPosition);
      yPosition += 5;
    }

    yPosition += 5;
    if (yPosition > 260) {
      doc.addPage();
      yPosition = 10;
    }
  });

  return doc.output('blob');
};
