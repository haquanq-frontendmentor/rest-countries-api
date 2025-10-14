import { useCountryStore } from "@/stores/countryStore";
import { CountryItem } from "./CountryItem";

export const CountryList = () => {
  const getCountries = useCountryStore((state) => state.getCountries);

  return (
    <ul className="grid w-full gap-x-6 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {getCountries().countries.map((country) => (
        <CountryItem country={country} key={country.cca3} />
      ))}
    </ul>
  );
};
