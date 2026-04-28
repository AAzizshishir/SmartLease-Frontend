"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  total: number;
  limit: number;
}

const Pagination = ({
  totalPages,
  currentPage,
  total,
  limit,
}: PaginationProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      params.set(key, value);
    });
    router.push(`${pathname}?${params.toString()}`);
  };
  const goToPage = (page: number) => {
    updateParams({ page: String(page) });
  };

  const changeLimit = (newLimit: string) => {
    updateParams({ limit: newLimit, page: "1" });
  };

  const getPageNumbers = () => {
    const pages: (number | "...")[] = [];

    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);

    if (currentPage > 3) pages.push("...");

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) pages.push(i);

    if (currentPage < totalPages - 2) pages.push("...");

    pages.push(totalPages);

    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-12 py-4">
      {/* Total info + Limit selector */}
      <div className="flex items-center gap-3">
        <p className="text-sm text-muted-foreground">
          Showing{" "}
          <span className="font-medium text-foreground">
            {Math.min((currentPage - 1) * limit + 1, total)}–
            {Math.min(currentPage * limit, total)}
          </span>{" "}
          of <span className="font-medium text-foreground">{total}</span> units
        </p>

        <Select value={String(limit)} onValueChange={changeLimit}>
          <SelectTrigger className="w-20 h-8 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="6">6</SelectItem>
            <SelectItem value="12">12</SelectItem>
            <SelectItem value="24">24</SelectItem>
          </SelectContent>
        </Select>
        <span className="text-sm text-muted-foreground">per page</span>
      </div>

      {/* Page buttons */}
      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {getPageNumbers().map((page, i) =>
          page === "..." ? (
            <span key={`dots-${i}`} className="px-2 text-muted-foreground">
              ...
            </span>
          ) : (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="icon"
              className="h-8 w-8 text-sm"
              onClick={() => goToPage(page as number)}
            >
              {page}
            </Button>
          ),
        )}

        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
