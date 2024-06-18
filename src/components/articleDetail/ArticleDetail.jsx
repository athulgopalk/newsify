import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchArticles } from "../../api/newsapi/NewsApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faUser,
  faLink,
  faExternalLinkAlt,
} from "@fortawesome/free-solid-svg-icons";

const ArticleDetail = () => {
  const { url } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetchArticles();
        const article = response.articles.find(
          (a) => a.url === decodeURIComponent(url)
        );
        setArticle(article);
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };

    fetchArticle();
  }, [url]);

  if (!article) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg font-medium text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8 animate-fade-in">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{article.title}</h1>
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          className="w-full h-96 object-cover rounded-lg shadow-md mb-4"
        />
      )}
      <div className="text-gray-700 text-lg leading-relaxed mb-6">
        {article.description}
      </div>
      <div className="flex items-center text-sm text-gray-500 mb-4">
        {article.author && (
          <div className="flex items-center mr-4">
            <FontAwesomeIcon icon={faUser} className="mr-1" />
            <span>{article.author}</span>
          </div>
        )}
        {article.publishedAt && (
          <div className="flex items-center mr-4">
            <FontAwesomeIcon icon={faCalendarAlt} className="mr-1" />
            <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
          </div>
        )}
        {article.source && (
          <div className="flex items-center">
            <FontAwesomeIcon icon={faLink} className="mr-1" />
            <span>{article.source.name}</span>
          </div>
        )}
      </div>
      <div className="text-gray-700 text-lg leading-relaxed mb-6">
        {article.content}
      </div>
      {article.url && (
        <div className="flex items-center">
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline flex items-center"
          >
            <span className="mr-1">Read full article</span>
            <FontAwesomeIcon icon={faExternalLinkAlt} className="h-4 w-4" />
          </a>
        </div>
      )}
    </div>
  );
};

export default ArticleDetail;
