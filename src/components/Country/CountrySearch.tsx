import SearchIcon from "@/assets/images/search.svg?react";
import { Button } from "../common/Button";

interface CountrySearchProps {
  onSubmit: (value: string) => void;
}

export const CountrySearch = (props: CountrySearchProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const countryKeys = formData.get("country") as string;
    props.onSubmit(countryKeys);
  };

  return (
    <form className="relative flex w-full items-center" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="country">
        Search by country
      </label>
      <input
        className="font-semi-bold h-12 grow rounded-md pr-14 pl-4 text-gray-950 ring ring-gray-200 transition-colors placeholder:text-gray-400 hover:ring-gray-950 dark:text-white dark:ring-blue-700 dark:placeholder:text-white dark:hover:ring-white"
        id="country"
        name="country"
        type="text"
        placeholder="Search for a country..."
      />
      <Button className="absolute right-0 px-4 ring-0" type="submit" size="large">
        <SearchIcon />
      </Button>
    </form>
  );
};
