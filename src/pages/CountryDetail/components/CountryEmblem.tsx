import { FlagHolder } from "@/components/FlagHolder";

interface CountryEmblemProps {
  src: string;
  alt?: string;
}

export const CountryEmblem = ({ src, alt }: CountryEmblemProps) => {
  return (
    <figure className="flex flex-col items-center">
      <figcaption className="font-extra-bold mb-8 text-center text-2xl leading-8 text-gray-950 dark:text-white">
        Coat of Arms
      </figcaption>
      <FlagHolder className="aspect-video w-[min(100vw-3rem,40rem)] rounded-md shadow-sm" src={src} alt={alt} />
    </figure>
  );
};
