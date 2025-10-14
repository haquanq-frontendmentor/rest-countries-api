interface DefinitionItemProps {
  name: string;
  description: string;
}

export const DefinitionItem = ({ name, description }: DefinitionItemProps) => {
  return (
    <div className="">
      <dt className="font-semi-bold inline">{name}:&nbsp;</dt>
      <dd className="inline dark:text-gray-100">{description}</dd>
    </div>
  );
};
