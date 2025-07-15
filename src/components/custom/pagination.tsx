interface PaginationProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  limit: number;
  courses: Map<number, Course>;
}
function Pagination({ page, setPage, limit, courses }: PaginationProps) {
  return (
    <div className="flex justify-center gap-4 mt-6">
      <button
        onClick={() => setPage((p) => Math.max(p - 1, 1))}
        disabled={page === 1}
        className="px-4 py-2 border rounded disabled:opacity-50"
      >
        Prev
      </button>
      <span className="my-auto">Page {page}</span>
      <button
        onClick={() => setPage((p) => p + 1)}
        disabled={courses?.size < limit}
        className="px-4 py-2 border rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  )
}

export default Pagination;