interface PaginationProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  limit: number;
  totalPages: number;
  courses: Map<number, Course>;
}
const Pagination = ({ page, setPage, limit, totalPages, courses }: PaginationProps) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];

    // Always show first and last
    const showLeftEllipsis = page > 4;
    const showRightEllipsis = page < totalPages - 3;

    if (showLeftEllipsis) {
      pageNumbers.push(1);
      if (page !== 4) pageNumbers.push("left-ellipsis");
    }

    const startPage = Math.max(1, page - 1);
    const endPage = Math.min(totalPages, page + 1);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (showRightEllipsis) {
      if (page !== totalPages - 3) pageNumbers.push("right-ellipsis");
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      {/* Prev */}
      <button
        onClick={() => setPage((p) => Math.max(p - 1, 1))}
        disabled={page === 1}
        className="px-4 py-2 rounded-full border border-gray-300 bg-white text-gray-700 
               hover:bg-gray-100 hover:shadow disabled:opacity-50 disabled:cursor-not-allowed 
               transition"
      >
        ←
      </button>

      {/* Page Numbers */}
      {renderPageNumbers().map((pg, idx) =>
        typeof pg === "string" ? (
          <span key={idx} className="w-10 h-10 flex items-center justify-center text-gray-500">
            ...
          </span>
        ) : (
          <button
            key={pg}
            onClick={() => setPage(pg)}
            className={`w-10 h-10 rounded-full text-sm font-medium 
          ${pg === page
                ? "bg-green-500 text-white shadow-md"
                : "bg-white text-gray-700 hover:bg-gray-100 hover:shadow"
              } transition`}
          >
            {pg}
          </button>
        )
      )}

      {/* Next */}
      <button
        onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
        disabled={page === totalPages || courses?.size < limit}
        className="px-4 py-2 rounded-full border border-gray-300 bg-white text-gray-700 
               hover:bg-gray-100 hover:shadow disabled:opacity-50 disabled:cursor-not-allowed 
               transition"
      >
        →
      </button>
    </div>
  )
}

export default Pagination;