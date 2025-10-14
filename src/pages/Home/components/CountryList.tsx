import type { Country } from "@/data.type";
import { CountryItem } from "./CountryItem";

interface CountryListProps {
  countries: Country[];
  countryNameSearch: string;
}

export const CountryList = ({ countries, countryNameSearch }: CountryListProps) => {
  return (
    <ul className="grid w-full gap-x-6 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {countries.map((country) => (
        <CountryItem country={country} key={country.cca3} countryNameSearch={countryNameSearch} />
      ))}
    </ul>
  );
};
