import ChevronDownIcon from "@/assets/images/chevron-down.svg?react";
import { cn } from "@/utils/cn";
import { Select } from "radix-ui";
import { useState } from "react";

interface ComboboxProps {
  data: string[];
  defaultValue: string;
  onValueChange: (value: string) => void;
  prefix?: string;
  label: string;
  placeholder?: string;
}

export const Combobox = (props: ComboboxProps) => {
  const [value, setValue] = useState(props.defaultValue);
  const [open, setOpen] = useState(false);

  const handleValueChange = (value: string) => {
    props.onValueChange(value);
    setValue(value);
  };

  const handleOpenChange = (value: boolean) => {
    setOpen(value);
  };

  return (
    <Select.Root onValueChange={handleValueChange} onOpenChange={handleOpenChange} value={value}>
      <Select.Trigger className="font-semi-bold flex h-12 w-full items-center justify-between rounded-sm px-4 text-start text-lg text-gray-950 ring ring-gray-200 transition-[box-shadow] hover:ring-gray-950 dark:text-white dark:ring-blue-700 hover:dark:ring-white">
        <Select.Value>
          {value === props.defaultValue ? props.placeholder || props.label : props.prefix + value}
        </Select.Value>
        <Select.Icon>
          <ChevronDownIcon className={cn("transition-transform", open && "rotate-180")} />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="z-50 overflow-hidden rounded-sm bg-white shadow-2xl" position="popper">
          <Select.ScrollUpButton />
          <Select.Viewport className="overflow-auto">
            {props.data.map((value) => (
              <SelectItem value={value} key={value}>
                {value}
              </SelectItem>
            ))}
          </Select.Viewport>
          <Select.ScrollDownButton />
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

const SelectItem = ({ children, className, ...props }: Select.SelectItemProps) => {
  return (
    <Select.Item
      className={cn(
        "font-semi-bold flex h-12 min-w-40 cursor-pointer items-center justify-between gap-1 px-4 text-gray-950 capitalize transition-colors outline-none hover:bg-gray-100 focus-visible:bg-gray-100 dark:bg-blue-900 dark:text-white hover:dark:bg-blue-800 focus-visible:dark:bg-blue-800",
        className,
      )}
      {...props}
    >
      <Select.ItemText className="">{children}</Select.ItemText>
      <Select.ItemIndicator className="h-1 w-3 rounded-full bg-gray-950 dark:bg-white"></Select.ItemIndicator>
    </Select.Item>
  );
};
