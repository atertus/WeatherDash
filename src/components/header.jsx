import React from 'react'
import './Header.css';

const logoPng = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=';

const Header = () => {
  return (
    <div className="Header">
      <img src={logoPng} alt="logo" className="Header-logo" />
      <h3 className="Header-title" style={{color: 'yellow', fontSize: 18, background: 'rgba(0,0,0,0.25)', padding: '4px 8px', borderRadius: 4}}>WeatherDash</h3>
    </div>
  );
}

export default Header;