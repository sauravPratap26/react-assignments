import { useState, useEffect } from "react";

import "./App.css";
import CatCard from "./components/CatCard";
import type { Cat } from "./types/cat.type";

function App() {
  const [cat, setCat] = useState<Cat | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchCat = async (controller?: AbortController) => {
    try {
      setLoading(true);

      const URL = import.meta.env.VITE_CAT_URL;

      const response = await fetch(URL, {
        signal: controller?.signal,
      });

      const data = await response.json();

      setCat(data[0] || data.data);
    } catch (error: any) {
      if (error.name !== "AbortError") {
        console.log(error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();

    fetchCat(controller);

    return () => {
      controller.abort();
    };
  }, []);

  const getNewCat = () => {
    fetchCat();
  };

  return (
    <>
      <button
        style={{ height: "50px", lineHeight: 3 }}
        disabled={loading}
        onClick={getNewCat}
      >
        GET NEW CAT
      </button>

      {loading && (
        <div className="loader">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      )}
      {cat && <CatCard cat={cat} />}
    </>
  );
}

export default App;
