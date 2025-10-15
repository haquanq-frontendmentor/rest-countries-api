import { useEffect, useState } from "react";
import { PaginationContext } from ".";
import { PaginationButton } from "./PaginationButton";
import { PaginationGap } from "./PaginationGap";
import { PaginationLimit } from "./PaginationLimit";
import { PaginationNextButton } from "./PaginationNextButton";
import { PaginationPrevButton } from "./PaginationPrevButton";

interface PaginationProps {
  onPageChange: (value: number) => void;
  onPageSizeChange: (value: number) => void;
  pageSizes: number[];
  totalItems: number;
}

export const Pagination = ({ onPageChange, totalItems, pageSizes, onPageSizeChange }: PaginationProps) => {
  const FIRST_PAGE = 1;

  const matchLargeViewport = () => window.matchMedia("(min-width:30em)").matches;

  const [pageSize, setPageSize] = useState(pageSizes[0]);
  const [page, setPage] = useState(FIRST_PAGE);
  const [isLargeViewport, setIsLargeViewport] = useState(matchLargeViewport());

  const LAST_PAGE = Math.ceil(totalItems / pageSize);

  useEffect(() => {
    onPageChange(page);
  }, [page]);

  useEffect(() => {
    onPageSizeChange(pageSize);
    setPage(1);
  }, [pageSize]);

  window.addEventListener("resize", () => {
    if (matchLargeViewport()) {
      setIsLargeViewport(true);
    } else {
      setIsLargeViewport(false);
    }
  });

  return (
    <PaginationContext.Provider
      value={{
        page,
        setPage,
        firstPage: FIRST_PAGE,
        lastPage: LAST_PAGE,
        pageSize,
        pageSizes,
        totalItems,
        setPageSize,
      }}
    >
      <div className="flex flex-col items-center gap-8">
        <div className="flex items-center justify-between gap-[0.375rem]">
          <PaginationPrevButton />
          <div className="flex items-center gap-[0.375rem]">
            {Array.from({ length: LAST_PAGE }, (_, i) => i + 1).map((pageNumber) => {
              let nearFirst = page - FIRST_PAGE < 3 + Number(isLargeViewport);
              let nearLast = LAST_PAGE - page < 3 + Number(isLargeViewport);
              let offsetFirst = nearFirst ? FIRST_PAGE + 2 : page;
              let offsetLast = nearLast ? LAST_PAGE - 2 : page;

              if (isLargeViewport) {
                offsetFirst += 1;
                offsetLast -= 1;
              }

              const ignores = [FIRST_PAGE, LAST_PAGE, page];

              if (isLargeViewport && nearFirst) ignores.push(LAST_PAGE - 1);
              if (isLargeViewport && nearLast) ignores.push(FIRST_PAGE + 1);

              if (!ignores.includes(pageNumber)) {
                if (!nearFirst) {
                  if (pageNumber === offsetLast - 1) return <PaginationGap key="pagination-trim-left" />;
                  if (pageNumber < offsetLast) return;
                }
                if (!nearLast) {
                  if (pageNumber === offsetFirst + 1) return <PaginationGap key="pagination-trim-right" />;
                  if (pageNumber > offsetFirst) return;
                }
              }

              return <PaginationButton page={pageNumber} key={`page-${pageNumber}`} />;
            })}
          </div>
          <PaginationNextButton />
        </div>

        <div className="flex items-center gap-4">
          <p className="font-semi-bold shrink-0 text-gray-950 dark:text-white">Page size: </p>
          <div className="w-25">
            <PaginationLimit />
          </div>
        </div>
      </div>
    </PaginationContext.Provider>
  );
};
