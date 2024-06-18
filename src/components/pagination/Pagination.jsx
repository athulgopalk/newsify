import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="flex justify-center mt-6 space-x-2">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`mx-1 px-4 py-2 border rounded-lg transition duration-300 ease-in-out
            ${
              currentPage === page
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white text-blue-500 border-gray-300 hover:bg-blue-100 hover:text-blue-700"
            }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
