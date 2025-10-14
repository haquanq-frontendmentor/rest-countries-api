import ChevronDownIcon from "@/assets/images/chevron-down.svg?react";
import { cn } from "@/utils/cn";
import { Select } from "radix-ui";
import { useEffect, useRef, useState } from "react";
import { Button } from "../common/Button";

interface ComboboxProps {
  data: string[];
  defaultValue: string;
  onValueChange: (value: string) => void;
  prefix?: string;
  label: string;
  placeholder?: string;
  size?: "small" | "normal" | "large";
}

export const Combobox = ({ size = "normal", ...props }: ComboboxProps) => {
  const [value, setValue] = useState(props.defaultValue);
  const [open, setOpen] = useState(false);

  const handleValueChange = (value: string) => {
    props.onValueChange(value);
    setValue(value);
  };

  const handleOpenChange = (value: boolean) => {
    setOpen(value);
  };

  const [width, setWidth] = useState(0);

  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (triggerRef.current) {
      setWidth(triggerRef.current.clientWidth);
    }
  }, []);

  return (
    <Select.Root onValueChange={handleValueChange} onOpenChange={handleOpenChange} value={value}>
      <Select.Trigger className="w-full rounded-sm" ref={triggerRef}>
        <Button asWrapper="div" size={size} className="justify-between gap-4">
          <Select.Value>
            {value === props.defaultValue ? props.placeholder || props.label : (props.prefix || "") + value}
          </Select.Value>
          <Select.Icon>
            <ChevronDownIcon className={cn("transition-transform", open && "rotate-180")} />
          </Select.Icon>
        </Button>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          className="z-50 my-2 overflow-hidden rounded-md bg-white p-1 shadow-xl dark:bg-blue-900"
          position="popper"
          style={{ width: width + "px" }}
        >
          <Select.Viewport className="overflow-auto">
            {props.data.map((value) => (
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
