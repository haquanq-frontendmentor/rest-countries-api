import { DefinitionList } from "./DefinitionList";

interface DefinitionProps {
  data: { name: string; description: string }[];
  label: React.JSX.Element;
}

export const Definition = ({ data, label }: DefinitionProps) => {
  return (
    <section className="text-gray-950 dark:text-white">
      {label}
      <DefinitionList data={data} />
    </section>
  );
};
