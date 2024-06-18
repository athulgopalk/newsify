import React from "react";

const categories = [
  "Business",
  "Technology",
  "Entertainment",
  "Health",
  "Science",
  "Sports",
  "General",
];

const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <label
        className="block text-lg font-medium text-gray-700 mb-2"
        htmlFor="category-select"
      >
        Select a Category
      </label>
      <div className="relative">
        <select
          id="category-select"
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="appearance-none p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ease-in-out duration-150 w-full text-lg font-custom"
          style={{ fontFamily: "Arial, sans-serif" }}
        >
          {categories.map((category) => (
            <option
              key={category.toLowerCase()}
              value={category.toLowerCase()}
              className="flex items-center"
              style={{ fontFamily: "Arial, sans-serif" }}
            >
              {category}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"></div>
      </div>
    </div>
  );
};

export default CategoryFilter;
