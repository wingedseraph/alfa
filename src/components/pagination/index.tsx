import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  currentPage: number;
  onPageChange: (page: number) => void;
  totalPages: number;
};

export default function Pagination({ currentPage, onPageChange, totalPages }: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="mt-8 flex justify-center">
      <nav className="relative z-0 inline-flex -space-x-px rounded-3xl shadow-sm" aria-label="Pagination">
        <button
          className="relative inline-flex items-center rounded-l-3xl border border-border bg-card px-2 py-2 text-sm font-medium text-muted-foreground hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
          disabled={currentPage === 1}
          onClick={() => {
            onPageChange(Math.max(1, currentPage - 1));
          }}
          type="button"
        >
          <span className="sr-only">Previous</span>
          <ChevronLeft className="h-5 w-5" />
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={`relative inline-flex items-center border px-4 py-2 text-sm font-medium ${
              page === currentPage ? "z-10 bg-foreground text-card" : "border-border bg-card text-muted-foreground hover:bg-muted"
            }`}
            onClick={() => {
              onPageChange(page);
            }}
            type="button"
          >
            {page}
          </button>
        ))}
        <button
          className="relative inline-flex items-center rounded-r-3xl border border-border bg-card px-2 py-2 text-sm font-medium text-muted-foreground hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
          disabled={currentPage === totalPages}
          onClick={() => {
            onPageChange(Math.min(totalPages, currentPage + 1));
          }}
          type="button"
        >
          <span className="sr-only">Next</span>
          <ChevronRight className="h-5 w-5" />
        </button>
      </nav>
    </div>
  );
}
