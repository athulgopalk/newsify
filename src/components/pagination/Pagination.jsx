import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getVisiblePages = (currentPage, totalPages) => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, "...", totalPages];
    } else if (currentPage >= totalPages - 3) {
      return [
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    } else {
      return [
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages,
      ];
    }
  };

  const pages = getVisiblePages(currentPage, totalPages);

  return (
    <div className="flex justify-center mt-6 space-x-2">
      {pages.map((page, index) => (
        <button
          key={index}
          onClick={() => onPageChange(page)}
          className={`mx-1 px-4 py-2 border rounded-lg transition duration-300 ease-in-out
            ${
              currentPage === page
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white text-blue-500 border-gray-300 hover:bg-blue-100 hover:text-blue-700"
            }
            ${page === "..." ? "cursor-default" : ""}
          `}
          disabled={page === "..."}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
