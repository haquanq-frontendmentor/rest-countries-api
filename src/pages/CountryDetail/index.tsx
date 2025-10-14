import MapIcon from "@/assets/images/map.svg?react";
import MoveLeftIcon from "@/assets/images/move-left.svg?react";
import { Button } from "@/components/common/Button";
import { Definition } from "@/components/Definition";
import { FlagHolder } from "@/components/FlagHolder";
import { countries } from "@/data";
import type { Country } from "@/data.type";
import { Container } from "@/layouts/Container";
import { getCountryCodeBySlug } from "@/stores/countryStore";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";

export const CountryDetail = () => {
  const { countryNameSlug } = useParams();
  const navigate = useNavigate();

  const country = countries.find(
    (v) => v.cca3 == getCountryCodeBySlug(countryNameSlug as string)?.replaceAll("-", " "),
  ) as Country;

  const nativeName =
    country.name.nativeName && country.name.nativeName[country.name.common.toLowerCase().slice(0, 3)]?.common;

  const captials = country.capital && country.capital instanceof Array ? country.capital?.join(",") : country.capital;
  const population = country.population.toLocaleString();

  const borderCountries = countries.filter((v) => country.borders?.includes(v.cca3));
  const languages = country.languages && Object.values(country.languages).join(", ");
  const currencies =
    country.currencies &&
    Object.values(country.currencies)
      .map((v) => `${v.name} ( ${v.symbol} )`)
      .join(", ");

  const continents = country.continents.join(", ");

  useEffect(() => {
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
    });
  }, [country]);

  return (
    <Container>
      <div className="flex flex-col gap-25 pt-10 pb-25">
        <section className="grid items-start gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between lg:col-span-2">
            <Button type="button" className="gap-4 pl-5" size="large" onClick={() => navigate(-1)}>
              <MoveLeftIcon />
              <span className="shrink-0">Go Back</span>
            </Button>
          </div>
          <FlagHolder
            className="rounded-md shadow-sm lg:aspect-square"
            src={country.flags.svg}
            alt={country.flags.alt}
          />
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
              <Button asWrapper="span" className="gap-4 pr-5" size="large">
                <span className="shrink-0">View on Google Maps</span>
                <MapIcon strokeWidth="1.5" />
              </Button>
            </a>
          </div>
        </section>

        {borderCountries.length !== 0 && (
          <section>
            <h2 className="font-extra-bold mb-8 text-center text-2xl leading-8 text-gray-950 dark:text-white">
              Border Countries
            </h2>
            <ul className="flex flex-wrap justify-center gap-4 md:gap-6">
              {borderCountries.map((neighbor) => (
                <li className="w-50" key={`neighbor-${neighbor.name.common}`}>
                  <Link
                    className="block rounded-md shadow-sm ring-0 ring-gray-950 transition-shadow hover:ring-2 dark:ring-white"
                    to={`/${neighbor.name.common.toLowerCase().replaceAll(" ", "-")}`}
                  >
                    <FlagHolder
                      className="aspect-video px-2 py-4"
                      src={neighbor.flags.svg}
                      alt={neighbor.name.common}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <figure className="flex flex-col items-center">
          <figcaption className="font-extra-bold mb-8 text-center text-2xl leading-8 text-gray-950 dark:text-white">
            Coat of Arms
          </figcaption>
          <FlagHolder
            className="aspect-video w-[min(100vw-3rem,40rem)] rounded-md shadow-sm"
            src={country.coatOfArms.svg}
          />
        </figure>
      </div>
    </Container>
  );
};
