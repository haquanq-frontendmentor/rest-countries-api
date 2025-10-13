import { cn } from "@/utils/cn";

interface ButtonProps extends React.ComponentProps<"button"> {}

export const Button = ({ children, className, ...restProps }: ButtonProps) => {
  return (
    <button
      className={cn(
        "font-semi-bold h-10 rounded-sm bg-transparent px-4 text-gray-950 ring ring-gray-200 transition-[color,box-shadow] hover:ring-gray-950 dark:text-white dark:ring-blue-700 hover:dark:ring-white",
        className,
      )}
      {...restProps}
    >
      {children}
    </button>
  );
};
