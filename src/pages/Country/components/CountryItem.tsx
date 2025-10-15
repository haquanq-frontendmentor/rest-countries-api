import ArrowUpRightIcon from "@/assets/images/arrow-up-right.svg?react";
import { Definition } from "@/components/Definition/Definition";
import { FlagHolder } from "@/components/FlagHolder";
import { ROUTER_CONFIG } from "@/constants/routerConfig";
import type { Country } from "@/data.type";
import { getCountrySlugByCode, useCountryStore } from "@/stores/countryStore";
import { cn } from "@/utils/cn";
import { Link } from "react-router";

interface CountryItemProps {
  country: Country;
}

export const CountryItem = ({ country }: CountryItemProps) => {
  const countryNameSearch = useCountryStore((state) => state.search.countryName);
  const matches = new Set();

  [...country.name.common.matchAll(new RegExp(countryNameSearch, "gi"))]
    .map((v) => v.index)
    .forEach((v) => {
      for (let i = v; i < v + countryNameSearch.length; i++) {
        matches.add(i);
      }
    });

  return (
    <li
      className="group relative flex flex-col rounded-md bg-white shadow-sm transition-[scale,box-shadow] duration-300 hover:scale-[1.01] hover:shadow-lg dark:bg-blue-900"
      key={country.name.official}
    >
      <div className="items-centerr relative flex h-40 justify-center overflow-hidden rounded-[inherit]">
        <FlagHolder
          className="w-full transition-[scale] duration-500 group-hover:scale-110"
          src={country.flags.svg}
          alt={country.flags.alt}
        />
        <div className="absolute inset-0 z-20 flex scale-150 items-center justify-center rounded-sm opacity-0 transition-opacity duration-[200ms] group-hover:opacity-100">
          <ArrowUpRightIcon className="relative z-50 rounded-sm text-gray-100 ring-2 ring-gray-100" strokeWidth={2} />
          <div className="absolute inset-0 bg-gray-950 opacity-65"></div>
        </div>
      </div>
      <div className="flex grow flex-col justify-between p-6 text-sm leading-5 text-gray-950 dark:text-white">
        <h3 className="font-extra-bold mb-[0.875rem] text-lg leading-[1.625rem] tracking-[-0.01em]">
          {country.name.common.split("").map((char, index) => (
            <span
              className={cn(matches.has(index) && "bg-blue-300 px-[1px] dark:bg-blue-600")}
              key={`${country.name.common}-${index}`}
            >
              {char}
            </span>
          ))}
        </h3>
        <div className="border-t border-gray-200 pt-5 dark:border-blue-700">
          <Definition
            label={<h4 className="sr-only">Info</h4>}
            className="gap-1 text-sm leading-5"
            data={[
              { name: "Population", description: country.population.toLocaleString() },
              { name: "Region", description: country.region },
              { name: "Capital", description: country.capital?.[0] || "" },
            ]}
          />
        </div>
      </div>
      <Link
        className="absolute inset-0 z-50 cursor-pointer rounded-[inherit]"
        to={`${ROUTER_CONFIG.BASE_PATH}/${getCountrySlugByCode(country.cca3)}`}
      >
        <span className="sr-only">More about {country.name.common}</span>
      </Link>
    </li>
  );
};
