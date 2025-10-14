import { cn } from "@/utils/cn";

interface FlagHolderProps {
  src: string;
  alt?: string;
  className?: string;
}

export const FlagHolder = ({ src, alt, className }: FlagHolderProps) => {
  return (
    <span className={cn("relative flex items-center justify-center overflow-hidden rounded-[inherit] p-4", className)}>
      <img className="relative z-10 h-full object-contain" src={src} alt={alt} />
      <img className="absolute inset-0 h-full w-full object-cover blur-[100px] brightness-75" src={src} alt="" />
    </span>
  );
};
