import MapIcon from "@/assets/images/map.svg?react";
import { Button } from "@/components/common/Button";
import { Definition } from "@/components/Definition";
import type { Country } from "@/data.type";

interface CountryInfoProps {
  country: Country;
}

export const CountryInfo = ({ country }: CountryInfoProps) => {
  const nativeName =
    country.name.nativeName && country.name.nativeName[country.name.common.toLowerCase().slice(0, 3)]?.common;

  const captials = country.capital && country.capital instanceof Array ? country.capital?.join(",") : country.capital;
  const population = country.population.toLocaleString();

  const languages = country.languages && Object.values(country.languages).join(", ");
  const currencies =
    country.currencies &&
    Object.values(country.currencies)
      .map((v) => `${v.name} ( ${v.symbol} )`)
      .join(", ");

  const continents = country.continents.join(", ");

  return (
    <div className="flex flex-col gap-10 self-center lg:pb-8 lg:pl-12">
      <div className="flex flex-col gap-2">
        <h2 className="font-extra-bold text-2xl leading-10 text-gray-950 md:text-3xl md:leading-10 dark:text-white">
          {country.name.official}
        </h2>
        <p className="font-semi-bold tracking-wide text-gray-400 dark:text-blue-300">{country.altSpellings[2]}</p>
      </div>
      <div className="flex flex-col gap-6">
        <Definition
          label={<h3 className="sr-only">About</h3>}
          className="gap-2 text-base"
          data={[
            { name: "Native Name", description: nativeName || "Unknown" },
            { name: "Capital", description: captials || "Unknown" },
            { name: "Population", description: population },
            { name: "Languages", description: languages || "Unknown" },
            { name: "Currencies", description: currencies || "Unknown" },
          ]}
        />
        <Definition
          label={<h3 className="sr-only">Geography</h3>}
          className="gap-2 text-base"
          data={[
            { name: "Area", description: country.area.toLocaleString() + "km²" },
            { name: "Continent", description: continents || "Unknown" },
            { name: "Region", description: country.region },
            { name: "Sub Region", description: country.subregion || "Unknown" },
          ]}
        />
      </div>
      <a className="block w-fit" target="_blank" href={country.maps.googleMaps}>
        <Button asWrapper="span" className="gap-4 pr-5" size="large" type="button">
          <span className="shrink-0">View on Google Maps</span>
          <MapIcon strokeWidth="1.5" />
        </Button>
      </a>
    </div>
  );
};
