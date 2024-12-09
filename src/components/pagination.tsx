"use client";
import { ITEMS_PER_PAGE } from "@/lib/settings";
import { useRouter } from "next/navigation";

const Pagination = ({ page, count }: { page: number; count: number }) => {
  const router = useRouter();

  const changePage = (newPage: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", String(newPage));

    router.push(`${window.location.pathname}?${params}`);
  };

  return (
    <div className="p-4 flex items-center justify-between text-gray-500">
      <button
        disabled={page === 1}
        className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => changePage(page - 1)}
      >
        Prev
      </button>
      <div className="flex items-center gap-2 text-sm">
        {Array.from(
          { length: Math.ceil(count / ITEMS_PER_PAGE) },
          (_, i) => i + 1
        ).map((index) => (
          <button
            key={index}
            className={`px-2 rounded-sm ${page === index ? "bg-primary" : ""}`}
            onClick={() => changePage(index)}
          >
            {index}
          </button>
        ))}
      </div>
      <button
        disabled={page === Math.ceil(count / ITEMS_PER_PAGE)}
        onClick={() => changePage(page + 1)}
        className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
