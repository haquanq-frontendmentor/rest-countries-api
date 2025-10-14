import { cn } from "@/utils/cn";
import { createElement } from "react";

interface FlagHolderProps {
  src: string;
  alt?: string;
  className?: string;
}

export const FlagHolder = ({ src, alt, className }: FlagHolderProps) => {
  const Flag = (props: React.ComponentProps<"img">) => createElement("img", { src, alt, ...props });

  return (
    <span className={cn("relative flex items-center justify-center overflow-hidden rounded-[inherit] p-4", className)}>
      <Flag className="relative z-10 h-full object-contain" />
      <Flag className="absolute inset-0 h-full w-full object-cover blur-[100px] brightness-75" />
    </span>
  );
};
