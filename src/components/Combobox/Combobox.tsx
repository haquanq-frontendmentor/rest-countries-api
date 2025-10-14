import ChevronDownIcon from "@/assets/images/chevron-down.svg?react";
import { cn } from "@/utils/cn";
import { Select } from "radix-ui";
import { useEffect, useRef, useState } from "react";
import { Button } from "../common/Button";

interface ComboboxProps {
  data: string[];
  value: string;
  onValueChange: (value: string) => void;
  label: string;
  placeholder?: string;
  size?: "small" | "normal" | "large";
}

export const Combobox = ({ size = "normal", onValueChange, value, placeholder, label, data }: ComboboxProps) => {
  const [open, setOpen] = useState(false);

  const handleValueChange = (value: string) => {
    onValueChange(value);
  };

  const handleOpenChange = (value: boolean) => {
    setOpen(value);
  };

  const contentWidth = useRef<number>(0);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target.isEqualNode(triggerRef.current)) {
          contentWidth.current = entry.target.clientWidth;
        }
      }
    });

    if (triggerRef.current === null) return;
    resizeObserver.observe(triggerRef.current);
    contentWidth.current = triggerRef.current.clientWidth;
  }, []);

  return (
    <Select.Root value={value} onValueChange={handleValueChange} open={open} onOpenChange={handleOpenChange}>
      <Select.Trigger className="w-full rounded-sm" ref={triggerRef} aria-label={label}>
        <Button asWrapper="span" size={size} className="justify-between gap-4">
          <Select.Value placeholder={placeholder || label} />
          <Select.Icon>
            <ChevronDownIcon className={cn("transition-transform", open && "rotate-180")} />
          </Select.Icon>
        </Button>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          className="z-50 my-2 overflow-hidden rounded-md bg-white p-1 shadow-xl dark:bg-blue-900"
          position="popper"
          style={{ width: contentWidth.current + "px" }}
        >
          <Select.Viewport className="overflow-auto">
            {data.map((value) => (
              <SelectItem size={size} value={value} key={value}>
                {value}
              </SelectItem>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

interface ComboboxItemProps extends Select.SelectItemProps {
  size: "small" | "normal" | "large";
}

const SelectItem = ({ children, size, ...props }: ComboboxItemProps) => {
  return (
    <Select.Item
      className="cursor-pointer rounded-md bg-white outline-none hover:bg-gray-100 focus-visible:bg-gray-100 dark:bg-blue-900 dark:hover:bg-blue-800 dark:focus-visible:bg-blue-800"
      {...props}
    >
      <Button asWrapper="div" size={size} className="justify-between ring-0">
        <Select.ItemText className="">{children}</Select.ItemText>
        <Select.ItemIndicator className="h-1 w-3 rounded-full bg-gray-950 dark:bg-white"></Select.ItemIndicator>
      </Button>
    </Select.Item>
  );
};
