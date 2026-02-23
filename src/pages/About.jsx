import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="About">
      <div className="about-container">
        <h1>🌤️ About Weather Dash</h1>
        
        <section className="about-section">
          <h2>What is Weather Dash?</h2>
          <p>Weather Dash is a modern weather forecasting app that displays 5-day forecasts for US locations, saves your favorite forecasts, and provides related weather videos.</p>
        </section>



        <section className="about-section">
          <h2>Features</h2>
          <ul>
            <li>📍 Search by GPS coordinates or use your current location</li>
            <li>📅 5-day detailed forecast with temperature, wind, and precipitation</li>
            <li>💾 Save forecasts locally with personal notes</li>
            <li>🎥 Auto-loaded YouTube videos for your location</li>
            <li>🗺️ Interactive Google Maps showing exact location</li>
            <li>📥 Export forecasts to JSON, CSV, or PDF</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>How to Use</h2>
          <ol>
            <li><strong>Search:</strong> Enter latitude/longitude or click "📍 Use My Location"</li>
            <li><strong>View Forecast:</strong> See the 5-day weather breakdown</li>
            <li><strong>Save:</strong> Add notes and click "💾 Save Forecast"</li>
            <li><strong>Manage:</strong> Edit or delete saved forecasts</li>
            <li><strong>Export:</strong> Download your data as JSON, CSV, or PDF</li>
          </ol>
        </section>

        <section className="about-section">
          <h2>Data Sources</h2>
          <ul>
            <li><strong>Weather Data:</strong> weather.gov (US only)</li>
            <li><strong>Videos:</strong> YouTube Data API</li>
            <li><strong>Maps:</strong> Google Maps API</li>
            <li><strong>Storage:</strong> Browser localStorage (no account needed)</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>Important Notes</h2>
          <ul>
            <li>⚠️ Weather data is only available for US locations</li>
            <li>⚠️ Forecasts are stored locally in your browser (not synced across devices)</li>
            <li>⚠️ Requires geolocation permission to use "Use My Location" button</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>PM Accelerator</h2>
          <p>The Product Manager Accelerator Program is designed to support PM professionals through every stage of 
            their careers. From students looking for entry-level jobs to Directors 
            looking to take on a leadership role, our program has helped over hundreds of students fulfill their career aspirations.</p>
        </section>

          <section className="about-section">
          <h2>Author</h2>
          <p>Written by Alexander Tertus</p>
        </section>
      </div>
    </div>
  );
};

export default About;
