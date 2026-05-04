import React, { useEffect, useState } from "react";
import "./App.css";
import { jokeSerice } from "./services/jokeService";
import { type JOKE } from "./types/type";
import Joke from "./components/Joke";

function App() {
  const [jokes, setJokes] = useState<JOKE[]>([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [queryParams, setQueryParams] = useState({
    limit: 12,
    query: "",
    page: 1,
    previousPage: false,
    nextPage: true,
    totalPages: 1,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setQueryParams((prev) => ({ ...prev, query: inputValue, page: 1 }));
    }, 500);

    return () => clearTimeout(timer);
  }, [inputValue]);

  useEffect(() => {
    const controller = new AbortController();
    const getJoke = async () => {
      try {
        setLoading(true);
        const data = await jokeSerice.getJoke({
          signal: controller.signal,
          limit: queryParams.limit,
          query: queryParams.query,
          page: queryParams.page,
        });
        setJokes(data.data.data);
        setQueryParams((previous) => ({
          ...previous,
          previousPage: data.data.previousPage,
          nextPage: data.data.nextPage,
          page: data.data.page,
          totalPages: data.data.totalPages,
        }));
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          console.log("Request was Aborted");
        }
      } finally {
        setLoading(false);
      }
    };
    getJoke();

    return () => {
      controller.abort();
    };
  }, [queryParams.query, queryParams.page]);

  const handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handlePage = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.name === "previous" && queryParams.previousPage) {
      setQueryParams((prev) => ({ ...prev, page: prev.page - 1 }));
    } else if (e.currentTarget.name === "next" && queryParams.nextPage) {
      setQueryParams((prev) => ({ ...prev, page: prev.page + 1 }));
    }
  };

  return (
    <div className="app-shell">
      <div className="navbar">
        <button name="previous" onClick={handlePage}>
          previous page
        </button>
        <input
          value={inputValue}
          onChange={handleQuery}
          placeholder="Search jokes..."
        ></input>
        <p>
          {queryParams.page} of {queryParams.totalPages}
        </p>
        <button name="next" onClick={handlePage}>
          Next page
        </button>
      </div>

      <main
        className={`content ${!loading && jokes.length === 0 ? "content--empty" : ""}`}
      >
        {loading && <div className="loader">Loading...</div>}

        {!loading && jokes.length === 0 && (
          <div className="no-jokes">There are no jokes to laugh at 😭</div>
        )}

        {jokes.length > 0 && (
          <div className="box-container">
            {jokes.map((joke: JOKE) => {
              return <Joke key={joke.id} joke={joke} />;
            })}
          </div>
        )}
      </main>

      <footer className="footer">
        <p>You have reached the end of the page</p>
      </footer>
    </div>
  );
}

export default App;
