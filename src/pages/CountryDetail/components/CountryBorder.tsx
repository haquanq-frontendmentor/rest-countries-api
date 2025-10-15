import { FlagHolder } from "@/components/FlagHolder";
import { ROUTER_CONFIG } from "@/constants/routerConfig";
import type { Country } from "@/data.type";
import { Link } from "react-router";

interface CountryBorderProps {
  countries: Country[];
}

export const CountryBorder = ({ countries }: CountryBorderProps) => {
  return (
    <section>
      <h2 className="font-extra-bold mb-8 text-center text-2xl leading-8 text-gray-950 dark:text-white">
        Border Countries
      </h2>
      <ul className="flex flex-wrap justify-center gap-4 md:gap-6">
        {countries.map((neighbor) => (
          <li className="w-50" key={`neighbor-${neighbor.name.common}`}>
            <Link
              className="block rounded-md shadow-sm ring-0 ring-gray-950 transition-shadow hover:ring-2 dark:ring-white"
              to={`${ROUTER_CONFIG.BASE_PATH}/${neighbor.name.common.toLowerCase().replaceAll(" ", "-")}`}
            >
              <FlagHolder className="aspect-video px-2 py-4" src={neighbor.flags.svg} alt={neighbor.name.common} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
