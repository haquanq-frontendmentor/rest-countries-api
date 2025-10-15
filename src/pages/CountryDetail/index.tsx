import { FlagHolder } from "@/components/FlagHolder";
import { countries } from "@/data";
import type { Country } from "@/data.type";
import { Container } from "@/layouts/Container";
import { getCountryCodeBySlug } from "@/stores/countryStore";
import { useEffect } from "react";
import { useParams } from "react-router";
import { CountryBorder } from "./components/CountryBorder";
import { CountryEmblem } from "./components/CountryEmblem";
import { CountryInfo } from "./components/CountryInfo";

export const CountryDetail = () => {
  const { countryNameSlug } = useParams();

  const country = countries.find(
    (v) => v.cca3 == getCountryCodeBySlug(countryNameSlug as string)?.replaceAll("-", " "),
  ) as Country;

  const borderCountries = countries.filter((v) => country.borders?.includes(v.cca3));

  useEffect(() => {
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
    });
  }, [country]);

  return (
    <Container>
      <div className="flex flex-col gap-25 py-25">
        <section className="grid items-start gap-12 lg:grid-cols-2">
          <FlagHolder
            className="rounded-md shadow-sm lg:aspect-square"
            src={country.flags.svg}
            alt={country.flags.alt}
          />
          <CountryInfo country={country} />
        </section>

        {borderCountries.length !== 0 && <CountryBorder countries={borderCountries} />}
        {country.coatOfArms.svg && <CountryEmblem src={country.coatOfArms.svg} />}
      </div>
    </Container>
  );
};
