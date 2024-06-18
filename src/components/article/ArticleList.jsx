import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ArticleList = ({ articles }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
      {articles.map((article, index) => (
        <div
          key={index}
          className="border p-4 rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-300"
        >
          {article.urlToImage && (
            <img
              src={article.urlToImage}
              alt={article.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
          )}
          <div className="space-y-2">
            <h2 className="font-bold text-xl mb-2 text-gray-900">
              {article.title}
            </h2>
            <p className="text-gray-700">{article.description}</p>
            {article.author && (
              <p className="text-gray-600 text-sm">By: {article.author}</p>
            )}
            {article.publishedAt && (
              <p className="text-gray-600 text-sm">
                Published on:{" "}
                {new Date(article.publishedAt).toLocaleDateString()}
              </p>
            )}
            <Link
              to={`/article/${encodeURIComponent(article.url)}`}
              className="block mt-4 text-blue-500 hover:underline"
            >
              Read more
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

ArticleList.propTypes = {
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      urlToImage: PropTypes.string,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      author: PropTypes.string,
      publishedAt: PropTypes.string,
    })
  ).isRequired,
};

export default ArticleList;
