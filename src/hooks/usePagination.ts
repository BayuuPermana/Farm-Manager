import { useState } from 'react';

interface PaginationOptions {
  initialPage?: number;
  pageSize?: number;
}

export const usePagination = ({ initialPage = 1, pageSize = 10 }: PaginationOptions = {}) => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const paginate = <T>(items: T[]): T[] => {
    const startIndex = (currentPage - 1) * pageSize;
    return items.slice(startIndex, startIndex + pageSize);
  };

  const totalPages = (totalItems: number) => Math.ceil(totalItems / pageSize);

  const nextPage = (totalItems: number) => {
    const maxPage = totalPages(totalItems);
    if (currentPage < maxPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (page: number, totalItems: number) => {
    const maxPage = totalPages(totalItems);
    if (page >= 1 && page <= maxPage) {
      setCurrentPage(page);
    }
  };

  return {
    currentPage,
    pageSize,
    paginate,
    totalPages,
    nextPage,
    previousPage,
    goToPage,
  };
};