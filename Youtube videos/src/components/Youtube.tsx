import "../VideoCard.css";
import type { VideoItem } from "../types/type";

const VideoCard = ({ video }: { video: VideoItem }) => {
  const { snippet, statistics } = video;

  const thumbnail =
    snippet.thumbnails.maxres?.url ||
    snippet.thumbnails.standard?.url ||
    snippet.thumbnails.high.url;

  return (
    <div className="video-card">
      {/* THUMBNAIL */}
      <div className="video-thumbnail">
        <img src={thumbnail} alt={snippet.title} />
      </div>

      {/* CONTENT */}
      <div className="video-content">
        <h3 className="video-title">{snippet.title}</h3>

        <p className="video-channel">{snippet.channelTitle}</p>

        <div className="video-meta">
          <span>{Number(statistics.viewCount).toLocaleString()} views</span>
          <span>•</span>
          <span>{new Date(snippet.publishedAt).toDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
