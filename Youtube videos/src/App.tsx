import { useEffect, useState } from "react";

import "./App.css";
import youtubeService from "./services/youtubeService";
import type { DISPLAY_CONFIG, VideoResponse } from "./types/type";
import VideoCard from "./components/Youtube";

function App() {
  const [videos, setVideos] = useState<VideoResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [displayConfig, setDisplayConfig] = useState<DISPLAY_CONFIG>({
    page: 1,
    totalPages: 0,
    nextPage: true,
    previousPage: false,
    limit: 5,
    query: "",
    sortBy: "latest",
  });
  const [debouneValue, setDebounceValue] = useState({ input: "", limit: 5 });

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayConfig((previous) => ({
        ...previous,
        query: debouneValue.input,
        limit: debouneValue.limit,
        page: 1,
      }));
    }, 500);

    return () => clearTimeout(timer);
  }, [debouneValue.limit, debouneValue.input]);

  useEffect(() => {
    const controller = new AbortController();

    async function getYoutubeVideo() {
      try {
        setLoading(true);
        const { data } = await youtubeService.getVideos({
          signal: controller.signal,
          limit: displayConfig.limit,
          page: displayConfig.page,
          query: displayConfig.query,
          sortBy: displayConfig.sortBy,
        });

        setDisplayConfig((previous) => ({
          ...previous,
          nextPage: data.nextPage,
          previousPage: data.previousPage,
          totalPages: data.totalPages,
        }));

        setVideos(data.data);
        console.log(data);
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          console.log("Request was Aborted");
        }
      } finally {
        setLoading(false);
      }
    }
    getYoutubeVideo();

    return () => controller.abort();
  }, [
    displayConfig.query,
    displayConfig.page,
    displayConfig.limit,
    displayConfig.sortBy,
  ]);

  const handleQueryAndLimit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDebounceValue((previous) => ({
      ...previous,
      [e.target.name]:
        e.target.name === "limit" ? Number(e.target.value) : e.target.value,
    }));
  };

  const handleButtonCLick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (event.currentTarget.name == "previous") {
      setDisplayConfig((prev) => ({ ...prev, page: prev.page - 1 }));
    } else if (event.currentTarget.name === "next") {
      setDisplayConfig((prev) => ({ ...prev, page: prev.page + 1 }));
    }
  };

  return (
    <div className="app">
      {/* NAVBAR */}
      <header className="app-navbar">
        <button
          name="previous"
          onClick={handleButtonCLick}
          disabled={!displayConfig.previousPage}
        >
          ⬅ Previous
        </button>

        <input
          type="text"
          name="input"
          placeholder="Search videos..."
          onChange={handleQueryAndLimit}
          value={debouneValue.input}
        />

        <input
          type="number"
          name="limit"
          placeholder="Limit"
          onChange={handleQueryAndLimit}
          value={debouneValue.limit}
        />

        <button
          name="next"
          onClick={handleButtonCLick}
          disabled={!displayConfig.nextPage}
        >
          Next ➡
        </button>
      </header>

      {/* MAIN */}
      <main className="app-main">
        {loading && <div className="center">Loading...</div>}

        {!loading && videos.length === 0 && (
          <div className="center">No Videos Found</div>
        )}

        {!loading && videos.length > 0 && (
          <div className="video-grid">
            {videos.map((video: VideoResponse) => {
              return <VideoCard video={video.items} key={video.items.id} />;
            })}
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="app-footer">
        <p>You have reached the end of the page</p>
      </footer>
    </div>
  );
}

export default App;
