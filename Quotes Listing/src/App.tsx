import { useState, useEffect } from "react";

import "./App.css";
import { quotesService } from "./services/quotesService";
import type { Quote as QuoteType } from "./types/type";
import QuoteDisplay from "./components/Quote";

function App() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [displayConfig, setDisplayConfig] = useState({
    page: 1,
    totalPages: 0,
    nextPage: true,
    previousPage: false,
    limit: 5,
    query: "",
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

    async function getQuote() {
      try {
        setLoading(true);

        const data = await quotesService.getQuotes({
          signal: controller.signal,
          page: displayConfig.page,
          query: displayConfig.query,
          limit: displayConfig.limit,
        });

        const dataBody = data.data;
        setDisplayConfig((previous) => ({
          ...previous,
          page: dataBody.page,
          limit: dataBody.limit,
          nextPage: dataBody.nextPage,
          previousPage: dataBody.previousPage,
          totalPages: dataBody.totalPages,
        }));

        setQuotes(data.data.data);

        console.log(data.data.data);
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          console.log("Request was Aborted");
        }
      } finally {
        setLoading(false);
      }
    }

    getQuote();

    return () => {
      controller.abort();
    };
  }, [displayConfig.query, displayConfig.limit, displayConfig.page]);

  const handleQueryAndLimit = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e?.target.name, e?.target.value);
    setDebounceValue((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
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
      <header className="navbar">
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
          placeholder="Search quotes..."
          onChange={handleQueryAndLimit}
        />

        <input
          type="number"
          name="limit"
          placeholder="Limit"
          onChange={handleQueryAndLimit}
        />

        <button
          name="next"
          onClick={handleButtonCLick}
          disabled={!displayConfig.nextPage}
        >
          Next ➡
        </button>
      </header>

      {/* MAIN CONTENT */}
      <main className="main">
        {loading && <div className="center">Loading...</div>}

        {!loading && quotes.length === 0 && (
          <div className="center">No Quotes Found</div>
        )}

        {!loading && quotes.length > 0 && (
          <div className="quote-list">
            {quotes.map((quote: QuoteType, index: number) => (
              <QuoteDisplay quote={quote} key={quote?.id ?? index} />
            ))}
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <p>You have reached the end of the page</p>
      </footer>
    </div>
  );
}

export default App;
