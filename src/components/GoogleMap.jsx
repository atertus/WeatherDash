import React, { useEffect, useRef } from 'react';
import './GoogleMap.css';

const GoogleMap = ({ lat, lon, location }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current || !lat || !lon) return;

    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      document.head.appendChild(script);
    } else {
      initMap();
    }

    function initMap() {
      const coordinates = { lat: parseFloat(lat), lng: parseFloat(lon) };

      mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
        zoom: 12,
        center: coordinates,
        mapTypeControl: true,
        fullscreenControl: true,
      });

      new window.google.maps.Marker({
        position: coordinates,
        map: mapInstanceRef.current,
        title: location,
      });
    }
  }, [lat, lon, location]);

  return (
    <div className="GoogleMap">
      <h3>📍 Location Map</h3>
      <div ref={mapRef} className="map-container" />
    </div>
  );
};

export default GoogleMap;
