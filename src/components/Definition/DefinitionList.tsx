import { DefinitionItem } from "./DefinitionItem";

interface DefinitionListProps {
  data: { name: string; description: string }[];
}

export const DefinitionList = ({ data }: DefinitionListProps) => {
  return (
    <dl className="grid gap-1 leading-5 dark:border-t-blue-700">
      {data.map((v) => (
        <DefinitionItem {...v} key={v.name + v.description} />
      ))}
    </dl>
  );
};
