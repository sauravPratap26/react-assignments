import { useState, useEffect } from "react";

import "./App.css";
import UserCard from "./components/UserCard";
import type { User } from "./types/user";

function App() {
  const [loading, setIsLoading] = useState<boolean>(false);
  const [usersData, setUsersData] = useState([]);
  const [page, setPage] = useState({ currentPage: 1, totalPages: 1 });

  useEffect(() => {
    const controller = new AbortController();

    const loadUser = async () => {
      try {
        setIsLoading(true);

        const URL = `${import.meta.env.VITE_USER_URL}&page=${page.currentPage}`;

        const response = await fetch(URL, {
          method: "GET",
          headers: { accept: "application/json" },
          signal: controller.signal,
        });

        const data = await response.json();

        setUsersData(data.data.data);

        setPage((prev) => ({
          ...prev,
          totalPages: data.data.totalPages,
        }));
      } catch (error: any) {
        if (error.name !== "AbortError") {
          console.error(error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();

    return () => {
      controller.abort();
    };
  }, [page.currentPage]);

  const handlePage = (wantedPageNum: number) => {
    if (wantedPageNum <= 0) {
      window.alert("This is no more previous page !");
      return;
    } else if (wantedPageNum > page.totalPages) {
      window.alert("There is no last page");
      return;
    }
    setPage((previous) => ({
      ...previous,
      currentPage: wantedPageNum,
    }));
  };

  const next = () => {
    handlePage(page.currentPage + 1);
  };
  const previous = () => {
    handlePage(page.currentPage - 1);
  };
  if (loading) {
    return <>Loading...</>;
  }
  return (
    <>
      <div className="header">
        <button
          onClick={previous}
          disabled={page.currentPage === 1}
          className="nav-btn"
        >
          «
        </button>
        <h1 id="title">USER LIST</h1>
        <button
          disabled={page.currentPage === page.totalPages}
          onClick={next}
          className="nav-btn"
        >
          »
        </button>
      </div>

      <div className="container">
        {usersData.map((user: User, index: number) => (
          <UserCard key={index} user={user} />
        ))}
      </div>

      <div className="pagination">
        <button
          onClick={previous}
          disabled={page.currentPage === 1}
          className="page-btn"
        >
          Previous
        </button>

        <h3 className="page-info">
          Page {page.currentPage} of {page.totalPages}
        </h3>

        <button
          disabled={page.currentPage === page.totalPages}
          onClick={next}
          className="page-btn"
        >
          Next
        </button>
      </div>
    </>
  );
}

export default App;
