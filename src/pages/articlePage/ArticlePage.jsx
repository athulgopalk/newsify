import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchArticles } from "../api/newsapi/NewsApi";
import ArticleList from "../components/article/ArticleList";
import Pagination from "../components/pagination/Pagination";
import CategoryFilter from "../components/categoryFilter/CategoryFilter";

const ArticlePage = () => {
  const { category } = useParams(); // Assuming you have a route parameter for category
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const loadArticles = async () => {
      setLoading(true);
      try {
        const response = await fetchArticles(category, currentPage);
        setArticles(response.articles);
        setTotalPages(Math.ceil(response.totalResults / 60)); // Assuming 20 articles per page
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    loadArticles();
  }, [category, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCategoryChange = (newCategory) => {
    setCurrentPage(1); // Reset to first page when category changes
    // Handle category change logic here if needed
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center">News Portal</h1>
      
      {/* Category filter component */}
      <CategoryFilter
        selectedCategory={category}
        onCategoryChange={handleCategoryChange}
      />

      {/* Loading indicator */}
      {loading && <p className="text-center mt-4">Loading...</p>}
      
      {/* Error message */}
      {error && <p className="text-center mt-4 text-red-500">Error loading articles: {error.message}</p>}

      {/* Article list */}
      {!loading && !error && (
        <>
          <ArticleList articles={articles} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default ArticlePage;
