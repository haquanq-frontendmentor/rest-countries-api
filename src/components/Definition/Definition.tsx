import { DefinitionList } from "./DefinitionList";

interface DefinitionProps {
  data: { name: string; description: string }[];
  label: React.JSX.Element;
  className?: string;
}

export const Definition = ({ data, label, className }: DefinitionProps) => {
  return (
    <section>
      {label}
      <DefinitionList data={data} className={className} />
    </section>
  );
};
