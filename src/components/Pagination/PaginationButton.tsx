import { cn } from "@/utils/cn";
import { useContext } from "react";
import { PaginationContext, type PaginationContextData } from ".";
import { Button } from "../common/Button";

interface PaginationButtonProps extends React.ComponentProps<"button"> {
  page: number;
}

export const PaginationButton = ({ page, children, type, ...restProps }: PaginationButtonProps) => {
  const { setPage, page: currentPage } = useContext(PaginationContext) as PaginationContextData;

  const selected = page === currentPage;

  return (
    <Button
      className={cn(
        "ring-0 hover:bg-gray-100 dark:hover:bg-blue-800",
        selected && "bg-white shadow-sm ring dark:bg-blue-900",
      )}
      type="button"
      onClick={() => setPage(page)}
      disabled={selected}
      {...restProps}
    >
      {page}
    </Button>
  );
};
