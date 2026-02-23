import React, { useState, useEffect } from 'react';
import { searchYouTubeVideos } from '../utils/youtube';
import './YouTubeVideos.css';

const YouTubeVideos = ({ location }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!location) return;
    fetchVideos();
  }, [location]);

  const fetchVideos = async () => {
    setLoading(true);
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
    if (!apiKey) {
      console.warn('YouTube API key not configured');
      setLoading(false);
      return;
    }

    const results = await searchYouTubeVideos(`${location} weather`, apiKey);
    console.log('YouTube results:', results);
    setVideos(results);
    setLoading(false);
  };

  return (
    <div className="YouTubeVideos">
      <h3>🎥 Related Videos</h3>

      {loading && <p>Loading videos...</p>}

      {videos.length === 0 && !loading && (
        <p style={{ fontSize: 12, color: 'rgba(255, 255, 255, 0.6)' }}>
          No videos found for "{location}"
        </p>
      )}

      <div className="videos-grid">
        {videos.map((video) => (
          <a
            key={video.id}
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="video-card"
          >
            <img src={video.thumbnail} alt={video.title} className="video-thumbnail" />
            <div className="video-info">
              <p className="video-title">{video.title}</p>
              <p className="video-channel">{video.channel}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default YouTubeVideos;
