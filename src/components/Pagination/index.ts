import { createContext } from "react";

type PaginationContextData = {
    page: number;
    setPage: (page: number) => void;
    firstPage: number;
    lastPage: number;
    pageSizes: number[];
    setPageSize: (pageSize: number) => void;
    totalItems: number;
};

const PaginationContext = createContext<PaginationContextData | null>(null);

export { PaginationContext, type PaginationContextData };

export { Pagination } from "./Pagination";
