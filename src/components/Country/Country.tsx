import { useState } from "react";
import { countries } from "../../data";
import { Combobox } from "../Combobox/Combobox";
import { Pagination } from "../Pagination/Pagination";
import { CountryList } from "./CountryList";
import { CountrySearch } from "./CountrySearch";

export const Country = () => {
  const REGIONS = ["Africa", "America", "Asia", "Europe", "Oceania"];
  const PAGE_SIZES = [10, 25, 50];

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [region, setRegion] = useState<null | string>(null);
  const [countryNameSearch, setCountryNameSearch] = useState<string>("");

  const filteredCountries = countries.filter((v) => {
    const hasRegion = (region != null && v.region.startsWith(region)) || true;
    const hasCountryNameLike = v.name.common.toLowerCase().indexOf(countryNameSearch.toLowerCase()) != -1;
    return hasRegion && hasCountryNameLike;
  });

  const paginatedCountries = filteredCountries.slice((page - 1) * pageSize, pageSize * page);

  const handlePageChange = (value: number) => {
    setPage(value);
  };

  const handleRegionFilterChange = (value: string) => {
    setRegion(value);
    setPage(1);
  };

  const handlePageSizeChange = (value: number) => {
    scrollTo({ top: 0, behavior: "smooth" });
    setPageSize(value);
    setPage(1);
  };

  const handleCountrySearchSubmit = (value: string) => {
    setCountryNameSearch(value);
    setPage(1);
  };

  return (
    <section className="flex flex-col items-center gap-12 pt-12 pb-50 md:gap-16">
      <h2 className="sr-only">Countries</h2>

      <div className="flex w-full flex-col justify-between gap-6 sm:flex-row">
        <div className="w-full sm:w-100">
          <CountrySearch onSubmit={handleCountrySearchSubmit} />
        </div>
        <div className="w-full sm:w-64">
          <Combobox
            defaultValue="All"
            label="Filter regions"
            placeholder="Filter by region..."
            prefix="Region: "
            data={REGIONS}
            size="large"
            onValueChange={handleRegionFilterChange}
          />
        </div>
      </div>

      <p className="text-base text-gray-950 md:text-lg dark:text-blue-400">
        Showing {paginatedCountries.length} of {filteredCountries.length} countries
      </p>

      <CountryList countries={paginatedCountries} countryNameSearch={countryNameSearch} />
      <Pagination
        totalItems={filteredCountries.length}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        pageSizes={PAGE_SIZES}
      />
    </section>
  );
};
