import { cn } from "@/utils/cn";
import { DefinitionItem } from "./DefinitionItem";

interface DefinitionListProps {
  data: { name: string; description: string }[];
  className?: string;
}

export const DefinitionList = ({ data, className }: DefinitionListProps) => {
  return (
    <dl
      className={cn("grid gap-1 text-base leading-5 text-gray-950 dark:border-t-blue-700 dark:text-white", className)}
    >
      {data.map((v) => (
        <DefinitionItem {...v} key={v.name + v.description} />
      ))}
    </dl>
  );
};
