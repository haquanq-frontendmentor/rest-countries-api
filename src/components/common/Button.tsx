import { cn } from "@/utils/cn";
import { createElement } from "react";

interface ButtonProps extends React.ComponentProps<"button"> {
  size?: "small" | "normal" | "large";
  asWrapper?: "div" | "span";
}

export const Button = ({ children, className, size = "normal", asWrapper, ...restProps }: ButtonProps) => {
  const baseClass = cn(
    "font-semi-bold rounded-md disabled:pointer-events-none flex items-center bg-transparent text-gray-950 ring ring-gray-200 transition-[color,box-shadow,background-color] hover:ring-gray-950 dark:text-white dark:ring-blue-700 hover:dark:ring-white",
    {
      "h-8 px-3 text-sm": size === "small",
      "h-10 px-4 text-base": size === "normal",
      "h-12 px-6 text-lg": size === "large",
    },
    className,
  );

  if (asWrapper) {
    return createElement(asWrapper, { className: baseClass, children, ...restProps });
  }

  return (
    <button className={baseClass} {...restProps}>
      {children}
    </button>
  );
};
