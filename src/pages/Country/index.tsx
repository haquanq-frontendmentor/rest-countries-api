import { Combobox } from "@/components/Combobox";
import { Pagination } from "@/components/Pagination";
import { Container } from "@/layouts/Container";
import { PAGE_SIZE_OPTIONS, REGION_OPTIONS, useCountryStore } from "@/stores/countryStore";
import { CountryList } from "./components/CountryList";
import { CountrySearch } from "./components/CountrySearch";

export const Country = () => {
  const { pagination, filter, getCountries } = useCountryStore();

  const { countries, filteredCount } = getCountries();

  const handlePageChange = (value: number) => {
    pagination.setPageNumber(value);
  };

  const handleRegionFilterChange = (value: string) => {
    filter.setRegion(value);
  };

  const handlePageSizeChange = (value: number) => {
    scrollTo({ top: 0, behavior: "smooth" });
    pagination.setPageSize(value);
  };

  return (
    <Container>
      <section className="flex flex-col items-center gap-12 pt-12 pb-50 md:gap-16">
        <h2 className="sr-only">Countries</h2>

        <div className="flex w-full flex-col justify-between gap-6 sm:flex-row">
          <div className="w-full sm:w-100">
            <CountrySearch />
          </div>
          <div className="w-full sm:w-64">
            <Combobox
              value={filter.region}
              label="Filter regions"
              placeholder="Filter by region..."
              data={REGION_OPTIONS}
              size="large"
              onValueChange={handleRegionFilterChange}
            />
          </div>
        </div>

        <p className="text-base text-gray-950 md:text-lg dark:text-blue-400">
          Showing {countries.length} of {filteredCount} countries
        </p>

        <CountryList />
        <Pagination
          totalItems={getCountries().filteredCount}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          pageSizes={PAGE_SIZE_OPTIONS}
        />
      </section>
    </Container>
  );
};
