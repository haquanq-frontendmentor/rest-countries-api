import { useContext } from "react";
import { PaginationContext, type PaginationContextData } from ".";
import ChevronLeftIcon from "../../assets/images/chevron-left.svg?react";
import { Button } from "../common/Button";

export const PaginationPrevButton = () => {
  const { setPage, page, firstPage } = useContext(PaginationContext) as PaginationContextData;

  const handleClick = () => {
    setPage(Math.max(firstPage, page - 1));
  };

  return (
    <Button
      className="flex items-center justify-center gap-1 pr-2 pl-2 ring-0 hover:bg-gray-100 dark:hover:bg-blue-800"
      onClick={handleClick}
      aria-label="Previous page"
    >
      <ChevronLeftIcon />
      <span className="hidden pr-2 md:block">Previous</span>
    </Button>
  );
};
