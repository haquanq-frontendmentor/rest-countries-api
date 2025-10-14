import ArrowUpRightIcon from "@/assets/images/arrow-up-right.svg?react";
import { cn } from "@/utils/cn";
import { createElement } from "react";
import type { Country } from "../../data.type";

interface CountryItemProps {
  country: Country;
  countryNameSearch: string;
}
export const CountryItem = ({ country, countryNameSearch }: CountryItemProps) => {
  const Flag = (props: React.ComponentProps<"img">) =>
    createElement("img", { src: country.flags.svg, alt: country.flags.alt, ...props });

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
      <div className="items-centerr relative flex h-40 justify-center overflow-hidden rounded-[inherit] p-4">
        <Flag className="relative z-10 transition-[scale] duration-500 group-hover:scale-110" />
        <Flag className="absolute inset-0 blur-[80px] brightness-75" />
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
        <div className="grid gap-1 border-t border-gray-300 pt-5 leading-5 dark:border-t-blue-700">
          <p>
            <span className="font-semi-bold">Population:&nbsp;</span>
            <span className="dark:text-gray-100">{country.population.toLocaleString(undefined)}</span>
          </p>
          <p>
            <span className="font-semi-bold">Region:&nbsp;</span>
            <span className="dark:text-gray-100">{country.region}</span>
          </p>
          <p>
            <span className="font-semi-bold">Capital:&nbsp;</span>
            <span className="dark:text-gray-100">{country.capital}</span>
          </p>
        </div>
      </div>
      <a className="absolute inset-0 z-50 cursor-pointer rounded-[inherit]" href="">
        <span className="sr-only">Read more</span>
      </a>
    </li>
  );
};
