'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import getAllSearchParams from '@/utils/allSearchParams';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

export default function Pagination({
  totalPages,
  currentPage,
}: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const allSearchParams = getAllSearchParams(searchParams);

  const handlePageChange = (pageNumber: number) => {
    window.scrollTo(0, 0);

    let newUrl = '';

    if (allSearchParams.includes('page=')) {
      newUrl =
        pathname +
        '?' +
        allSearchParams.replace(/page=\d+/, 'page=' + pageNumber);
    } else if (allSearchParams === '') {
      newUrl = pathname + '?page=' + pageNumber;
    } else {
      newUrl = pathname + '?' + allSearchParams + '&page=' + pageNumber;
    }

    router.push(newUrl);
  };

  return (
    <div className="pagination -mx-1 mt-14 flex items-center justify-center lg:mt-20">
      <button
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
        aria-label="Previous page"
        className={`pagination__item ring-color-primary ${
          currentPage === 1
            ? 'cursor-default opacity-50'
            : 'hover:ring-color-tertiary'
        }`}
      >
        <span className="material-symbols-outlined">chevron_left</span>
      </button>

      {Array.from({ length: totalPages }).map((_, index) => (
        <button
          key={index}
          onClick={() => handlePageChange(index + 1)}
          {...(index + 1 === currentPage && { 'aria-current': 'page' })}
          className={`pagination__item ${
            index + 1 === currentPage
              ? 'bg-color-tertiary text-white ring-color-tertiary'
              : 'ring-color-primary hover:ring-color-tertiary'
          }`}
        >
          {index + 1}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
        aria-label="Next page"
        className={`pagination__item ring-color-primary ${
          currentPage === totalPages
            ? 'cursor-default opacity-50'
            : 'hover:ring-color-tertiary'
        }`}
      >
        <span className="material-symbols-outlined">chevron_right</span>
      </button>
    </div>
  );
}
