import { useState, useEffect } from "react";

import "./App.css";
import type { Meal } from "./types/meal";
import MealCard from "./components/MealCard";

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState({
    currentPage: 1,
    totalPages: 1,
    nextPage: true,
    previousPage: false,
  });
  const [query, setQuery] = useState<string>("rice");
  const [items, setItems] = useState([]);
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500); // wait 500ms for the debouncing effect

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const controller = new AbortController();

    const loadMeals = async () => {
      try {
        setLoading(true);
        const URL = `${import.meta.env.VITE_MEAL_URL}&page=${page.currentPage}&query=${query}`;

        const response = await fetch(URL, {
          method: "GET",
          headers: { accept: "application/json" },
          signal: controller.signal,
        });

        const data = await response.json();
        console.log("**", data.data.data);
        setPage((prev) => ({
          ...prev,
          currentPage: data.data.page,
          totalPages: data.data.totalPages,
          nextPage: data.data.nextPage,
          previousPage: data.data.previousPage,
        }));
        const itemResult = data.data.data.map((item: any) => {
          const key_value: [string, string][] = Object.entries(item);
          item.ingredientsList = {};
          key_value.forEach(([key, value]) => {
            if (
              key.startsWith("strIngredient") &&
              value &&
              value.trim() !== ""
            ) {
              const index = key.split("strIngredient");
              const itemMeasure = `strMeasure${index[1]}`;
              const quantity = item[itemMeasure];
              item.ingredientsList[value] = quantity;
              delete item[key];
              delete item[itemMeasure];
            }
          });
          return item;
        });
        console.log(itemResult);
        setItems(itemResult);
      } catch (error: unknown) {
        if ((error as Error).name !== "AbortError") {
          console.log(error);
        }
      } finally {
        setLoading(false);
      }
    };
    loadMeals();

    return () => {
      controller.abort();
    };
  }, [page.currentPage, debouncedQuery]);

  //loading here
  {
    loading && <p>Loading...</p>;
  }

  //normal return heree
  return (
    <>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search meals..."
          value={query}
          onChange={(e) => {
            setPage((prev) => ({ ...prev, currentPage: 1 })); // reseting page here when user will type query
            setQuery(e.target.value);
          }}
        />
      </div>

      <div className="pagination">
        <button
          disabled={!page.previousPage}
          onClick={() =>
            setPage((prev) => ({
              ...prev,
              currentPage: prev.currentPage - 1,
            }))
          }
        >
          Previous
        </button>

        <span>
          Page {page.currentPage} / {page.totalPages}
        </span>

        <button
          disabled={!page.nextPage}
          onClick={() =>
            setPage((prev) => ({
              ...prev,
              currentPage: prev.currentPage + 1,
            }))
          }
        >
          Next
        </button>
      </div>

      <div className="meal-container">
        {items.map((item: Meal, index: number) => (
          <MealCard meal={item} key={index} />
        ))}
      </div>
    </>
  );
}

export default App;
