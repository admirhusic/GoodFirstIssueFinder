import React from "react";
import { ReactComponent as NextIconSVG } from "../svg/next_icon.svg";
import { ReactComponent as PreviousIconSVG } from "../svg/previous_icon.svg";
import { strings } from "../strings";

export interface PaginationI {
  currentPage: number;
  onChangeCurrentPage: (page: number) => void;
  totalPages: number;
}

export default function Pagination(props: PaginationI) {
  const { currentPage, onChangeCurrentPage, totalPages } = props;
  const maxVisiblePages = 10;
  const maxPages = Math.min(totalPages, 100); // Ensure the maximum pages to display is 100

  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(maxPages, startPage + maxVisiblePages - 1);

  const getVisiblePages = () => {
    if (!maxPages) return [];

    if (endPage - startPage < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <ul className="flex items-center -space-x-px h-8 text-sm mx-auto my-3">
      <li>
        <a
          onClick={() =>
            currentPage > 1 && onChangeCurrentPage(currentPage - 1)
          }
          href="#"
          className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <span className="sr-only">{strings.paginationPrev}</span>
          <PreviousIconSVG />
        </a>
      </li>
      {currentPage !== 1 ? (
        <li>
          <a
            onClick={() => onChangeCurrentPage(1)}
            href="#"
            className={`flex items-center justify-center px-3 h-8 leading-tight ${
              totalPages === 1
                ? "text-blue-500 bg-gray-100 border border-gray-300"
                : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
            } dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
          >
            {1}...
          </a>
        </li>
      ) : null}
      {visiblePages.map((page) => (
        <li key={page}>
          <a
            onClick={() => onChangeCurrentPage(page)}
            href="#"
            className={`flex items-center justify-center px-3 h-8 leading-tight ${
              page === currentPage
                ? "text-blue-500 bg-gray-100 border border-gray-300"
                : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
            } dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
          >
            {page}
          </a>
        </li>
      ))}
      {currentPage < 96 ? (
        <li>
          <a
            onClick={() => onChangeCurrentPage(maxPages)}
            href="#"
            className={`flex items-center justify-center px-3 h-8 leading-tight ${
              maxPages === currentPage
                ? "text-blue-500 bg-gray-100 border border-gray-300"
                : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
            } dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
          >
            ...{maxPages}
          </a>
        </li>
      ) : null}
      <li>
        <a
          onClick={() =>
            currentPage < maxPages && onChangeCurrentPage(currentPage + 1)
          }
          href="#"
          className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <span className="sr-only">{strings.paginationNext}</span>
          <NextIconSVG />
        </a>
      </li>
    </ul>
  );
}
