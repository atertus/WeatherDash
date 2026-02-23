# 🌤️ Weather Dash

A modern weather forecasting app that displays 5-day forecasts, saves your favorite locations, and provides related weather videos.

## Features

✨ **Core Features:**
- 📍 GPS coordinate-based weather lookup (US only via weather.gov)
- 📅 5-day forecast with detailed daily information
- 💾 Save/edit/delete forecasts with local storage (no account needed)
- 📊 View multiple saved forecasts in a grid
- 🎥 Auto-loaded YouTube videos related to your location
- 🗺️ Interactive Google Maps showing exact location
- 📥 Export forecasts to JSON, CSV, or PDF

## How to Use

1. **Search for Weather:** Enter latitude/longitude or click "📍 Use My Location" for geolocation
2. **View Forecast:** See the 5-day forecast with temperatures, wind, precipitation chance, and conditions
3. **Save Forecast:** Add notes and click "💾 Save Forecast" to store it
4. **Manage Saved:** Edit notes or delete forecasts from your saved list
5. **Export Data:** Download forecasts as JSON, CSV, or PDF
6. **Explore Videos:** Watch related weather videos automatically loaded for your location
7. **View on Map:** See your location pinned on an interactive Google Map


## Limitations

- ⚠️ Weather data only available for US locations (weather.gov restriction)
- ⚠️ Coordinates-only search (no address/city name search)
- ⚠️ Data stored locally in browser (not synced across devices)
- ⚠️ Google Maps and YouTube have API usage limits/costs


## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 15+

## Requirements
  - react==19.2.0
 - react-dom==19.2.0
 - react-router-dom==7.13.0
 - jspdf==4.2.0
-  vite==7.3.1
-  @vitejs/plugin-react==5.1.1
-  eslint==9.39.1
-  @eslint/js==9.39.1
-  eslint-plugin-react-hooks==7.0.1
-  eslint-plugin-react-refresh==0.4.24
-  globals==16.5.0
-  @types/react==19.2.7
-  @types/react-dom==19.2.3
