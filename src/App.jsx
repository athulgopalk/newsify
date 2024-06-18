import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { fetchArticles } from "./api/newsapi/NewsApi";
import ArticleList from "./components/article/ArticleList";
import ArticleDetail from "./components/articleDetail/ArticleDetail";
import Pagination from "./components/pagination/Pagination";
import CategoryFilter from "./components/categoryFilter/CategoryFilter";
import SearchBar from "./components/searchbar/SearchBar";
import logo from "./logo.png";

const App = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("general");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    const loadArticles = async () => {
      setLoading(true);
      try {
        const response = await fetchArticles(
          category,
          currentPage,
          searchKeyword
        );
        setArticles(response.articles);
        setTotalPages(Math.ceil(response.totalResults / 150));
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    loadArticles();
  }, [category, currentPage, searchKeyword]);

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = async (keyword) => {
    setSearchKeyword(keyword);
    setCurrentPage(1);
  };

  return (
    <Router>
      <div className="bg-gray-100 text-gray-800 min-h-screen flex flex-col">
        <header className="bg-white shadow-md">
          <div className="container mx-auto p-4 flex items-center justify-between">
            <img src={logo} alt="Newsify Logo" className="h-15 w-20 mr-4" />
            <div>
              <h1 className="text-3xl font-bold">Newsify</h1>
              <span className=" md:block md:text-right text-xl">
                Informed Minds, Empowered Voices
              </span>
            </div>
          </div>
        </header>

        <main className="flex-grow">
          <div className="container mx-auto p-4">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <SearchBar onSearch={handleSearch} />{" "}
                    <CategoryFilter
                      selectedCategory={category}
                      onCategoryChange={handleCategoryChange}
                      className="mb-4"
                    />
                    {loading && <p className="text-center mt-4">Loading...</p>}
                    {error && (
                      <p className="text-center mt-4 text-red-500">
                        Error loading articles: {error.message}
                      </p>
                    )}
                    {!loading && !error && (
                      <>
                        <ArticleList articles={articles} />
                        <Pagination
                          currentPage={currentPage}
                          totalPages={totalPages}
                          onPageChange={handlePageChange}
                          className="mt-4"
                        />
                      </>
                    )}
                  </>
                }
              />
              <Route path="/article/:url" element={<ArticleDetail />} />
            </Routes>
          </div>
        </main>
        <footer className="bg-white shadow-md mt-8">
          <div className="container mx-auto p-4 text-center text-gray-700">
            <p>&copy; 2024 Newsify. All rights reserved.</p>
            <p>
              Follow us on
              <a href="https://twitter.com" className="text-blue-500 ml-1">
                Twitter
              </a>
              ,
              <a href="https://facebook.com" className="text-blue-500 ml-1">
                Facebook
              </a>
              , and
              <a href="https://instagram.com" className="text-blue-500 ml-1">
                Instagram
              </a>
              .
              <img
                src={logo}
                alt="Newsify Logo"
                className="h-12 w-18 mb-1 md:h-20 md:w-32"
              />
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
