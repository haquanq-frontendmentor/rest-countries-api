import { useContext } from "react";
import { PaginationContext, type PaginationContextData } from ".";
import { Combobox } from "../Combobox/Combobox";

export const PaginationLimit = () => {
  const { pageSizes, setPageSize } = useContext(PaginationContext) as PaginationContextData;
  return (
    <Combobox
      label="Page size"
      placeholder={`${pageSizes[0]}`}
      data={pageSizes.map((v) => String(v))}
      defaultValue={pageSizes[0].toString()}
      onValueChange={(v) => setPageSize(parseInt(v))}
    />
  );
};
