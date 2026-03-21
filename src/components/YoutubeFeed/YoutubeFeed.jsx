import React, { useState, useEffect } from "react";
import "./YoutubeFeed.css";

const API_KEY = "AIzaSyCxKZpCzcLR5j8jvPXRG_K35ULmOhpm0zI";
const CHANNEL_ID = "UCu3TGeWhuGT3X5z3qEmULgA";

const YoutubeFeed = () => {
  const [videos, setVideos] = useState([]);
  const [nextPageToken, setNextPageToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchVideos = async (pageToken = "") => {
    setLoading(true);
    try {
      const url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=3&type=video${
        pageToken ? `&pageToken=${pageToken}` : ""
      }`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message);
      }

      // Filter to make sure it's a video
      const fetchedVideos = data.items.filter(
        (item) => item.id.kind === "youtube#video"
      );
      
      setVideos((prev) => {
        const newList = pageToken ? [...prev, ...fetchedVideos] : fetchedVideos;
        // Deduplicate based on videoId to prevent React StrictMode double-fetch issues
        return Array.from(
          new Map(newList.map((video) => [video.id.videoId, video])).values()
        );
      });
      setNextPageToken(data.nextPageToken || "");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <div className="youtube-feed-container">
      <h2 className="youtube-feed-title">Latest Videos</h2>
      {error && <p className="youtube-feed-error">Error loading videos: {error}</p>}
      
      <div className="youtube-grid">
        {videos.map((video, index) => (
          <div key={`${video.id.videoId}-${index}`} className="youtube-video-card">
            <div className="youtube-video-wrapper">
              <iframe
                src={`https://www.youtube.com/embed/${video.id.videoId}`}
                title={video.snippet.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="youtube-video-info">
              <h3 className="youtube-video-title">
                {/* Decode HTML entities if any */}
                <span dangerouslySetInnerHTML={{ __html: video.snippet.title }}></span>
              </h3>
            </div>
          </div>
        ))}
      </div>

      {nextPageToken && (
        <div className="youtube-feed-actions">
          <button
            className="youtube-load-more-btn"
            onClick={() => fetchVideos(nextPageToken)}
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default YoutubeFeed;
