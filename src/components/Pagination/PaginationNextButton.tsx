import ChevronRightIcon from "@/assets/images/chevron-right.svg?react";
import { useContext } from "react";
import { PaginationContext, type PaginationContextData } from ".";
import { Button } from "../common/Button";

export const PaginationNextButton = () => {
  const { setPage, page, lastPage } = useContext(PaginationContext) as PaginationContextData;
  const handleClick = () => {
    setPage(Math.min(lastPage, page + 1));
  };
  return (
    <Button
      className="flex items-center justify-center gap-1 px-2 ring-0 hover:bg-gray-100 dark:hover:bg-blue-800"
      onClick={handleClick}
      aria-label="Next page"
    >
      <span className="hidden pl-2 md:block">Next</span>
      <ChevronRightIcon />
    </Button>
  );
};
