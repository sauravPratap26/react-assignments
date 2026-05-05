import { useEffect, useState } from "react";

import "./App.css";
import { productService } from "./service/productService";
import type { PRODUCT } from "./types/type";
import Product from "./components/Product";

function App() {
  const [products, setProducts] = useState<PRODUCT[]>([]);
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

    async function getProducts() {
      try {
        setLoading(true);

        const { data } = await productService.getProducts({
          signal: controller.signal,
          page: displayConfig.page,
          limit: displayConfig.limit,
          query: displayConfig.query,
        });

        setDisplayConfig((prev) => ({
          ...prev,
          limit: data.limit,
          page: data.page,
          totalPages: data.totalPages,
          nextPage: data.nextPage,
          previousPage: data.previousPage,
        }));
        setProducts(data.data);

        return () => controller.abort();
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          console.log("Request was Aborted");
        }
      } finally {
        setLoading(false);
      }
    }
    getProducts();
  }, [displayConfig.query, displayConfig.limit, displayConfig.page]);

  const handleQueryAndLimit = (e: React.ChangeEvent<HTMLInputElement>) => {
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
          value={debouneValue.input}
          placeholder="Search products..."
          onChange={handleQueryAndLimit}
        />

        <input
          type="number"
          name="limit"
          value={debouneValue.limit}
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

      {/* MAIN */}
      <main className="app-main">
        {loading && <div className="app-center">Loading...</div>}

        {!loading && products.length === 0 && (
          <div className="app-center">No Products Found</div>
        )}

        {!loading && products.length > 0 && (
          <div className="product-grid">
            {products.map((product: PRODUCT, index: number) => (
              <Product product={product} key={product?.id ?? index} />
            ))}
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
