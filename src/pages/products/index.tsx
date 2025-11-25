import { useCallback, useEffect, useMemo, useRef } from "react";
import { useSearchParams } from "react-router-dom";

import ProductCard from "@/components/card";
import CategorySelect from "@/components/category-select";
import Container from "@/components/container";
import EmptyState from "@/components/empty-state";
import FilterToggle from "@/components/filter-toggle";
import Input from "@/components/input";
import Pagination from "@/components/pagination";
import Spinner from "@/components/spinner";
import { ITEMS_PER_PAGE } from "@/config/const";
import { useProductStore } from "@/store";

export default function Product() {
  const { categoryFilter, filter, isLoading, products, searchQuery, setCategoryFilter, setFilter, setSearchQuery } = useProductStore();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = useMemo(() => {
    const pageParam = searchParams.get("page");

    if (pageParam === null || pageParam === "") {
      return 1;
    }

    const parsed = Number.parseInt(pageParam, 10);

    return Number.isNaN(parsed) ? 1 : Math.max(1, parsed);
  }, [searchParams]);

  const setCurrentPage = useCallback(
    (page: number) => {
      const newSearchParams = new URLSearchParams(searchParams);

      if (page === 1) {
        newSearchParams.delete("page");
      } else {
        newSearchParams.set("page", page.toString());
      }

      setSearchParams(newSearchParams, { replace: true });
    },
    [searchParams, setSearchParams],
  );

  // Derived State: Filtering and Searching
  const filteredProducts = useMemo(
    () =>
      products.filter((product) => {
        const matchesSearch =
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filter === "all" || Boolean(product.isLiked);
        const matchesCategory = categoryFilter === "" || product.category === categoryFilter;

        return matchesSearch && matchesFilter && matchesCategory;
      }),
    [products, searchQuery, filter, categoryFilter],
  );

  // Derived State: Pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedPage = useMemo(() => {
    const maxPage = totalPages > 0 ? totalPages : 1;

    return currentPage > maxPage ? maxPage : currentPage;
  }, [currentPage, totalPages]);
  const currentProducts = filteredProducts.slice((paginatedPage - 1) * ITEMS_PER_PAGE, paginatedPage * ITEMS_PER_PAGE);

  // Reset page to 1 when filters change
  const prevFiltersRef = useRef({ categoryFilter, filter, searchQuery });

  useEffect(() => {
    const prevFilters = prevFiltersRef.current;

    if (prevFilters.categoryFilter !== categoryFilter || prevFilters.filter !== filter || prevFilters.searchQuery !== searchQuery) {
      prevFiltersRef.current = { categoryFilter, filter, searchQuery };

      if (currentPage !== 1) {
        setCurrentPage(1);
      }
    }
  }, [categoryFilter, currentPage, filter, searchQuery, setCurrentPage]);

  // Extract unique categories for filter
  const categories = useMemo(() => {
    const cats = new Set(products.map((product) => product.category));

    return Array.from(cats);
  }, [products]);

  return (
    <Container>
      {/* Controls Header */}
      <div className="mb-8 space-y-4 bg-transparent p-0 md:flex md:items-center md:justify-between md:space-y-0">
        <Input value={searchQuery} onChange={setSearchQuery} />

        <div className="flex items-center space-x-4 overflow-x-auto pb-2 md:pb-0">
          <CategorySelect value={categoryFilter} onChange={setCategoryFilter} categories={categories} />
          <FilterToggle onFilterChange={setFilter} filter={filter} />
        </div>
      </div>

      {/* Loading State */}
      {isLoading && products.length === 0 ? <Spinner /> : null}

      {/* Empty State */}
      {!isLoading && currentProducts.length === 0 && <EmptyState />}

      {/* Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <Pagination onPageChange={setCurrentPage} currentPage={paginatedPage} totalPages={totalPages} />
    </Container>
  );
}
