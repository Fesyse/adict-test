"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
	Command,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type MultipleSelectProps = {
	items: string[];
	onChange?: (items: string[]) => void;
	itemName?: string;
};

export function MultipleSelect({
	items,
	itemName = "item",
	onChange,
}: MultipleSelectProps) {
	const inputRef = React.useRef<HTMLInputElement>(null);
	const [openCombobox, setOpenCombobox] = React.useState(false);
	const [inputValue, setInputValue] = React.useState<string>("");
	const [selectedValues, setSelectedValues] = React.useState<string[]>([]);

	const toggleItem = (item: string) => {
		setSelectedValues((currentItems) => {
			const newSelectedValues = !currentItems.includes(item)
				? [...currentItems, item]
				: currentItems.filter((l) => l !== item);

			onChange?.(newSelectedValues);

			return newSelectedValues;
		});

		inputRef?.current?.focus();
	};

	const onComboboxOpenChange = (value: boolean) => {
		inputRef.current?.blur(); // HACK: otherwise, would scroll automatically to the bottom of page
		setOpenCombobox(value);
	};

	return (
		<div className="max-w-[200px]">
			<Popover open={openCombobox} onOpenChange={onComboboxOpenChange}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={openCombobox}
						className="w-[200px] justify-between text-foreground"
					>
						<span className="truncate">
							{selectedValues.length === 0 && `Select ${itemName}s`}
							{selectedValues.length === 1 && selectedValues[0]}
							{selectedValues.length === 2 &&
								selectedValues.map((item) => item).join(", ")}
							{selectedValues.length > 2 &&
								`${selectedValues.length} ${itemName}s selected`}
						</span>
						<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-[200px] p-0">
					<Command loop>
						<CommandInput
							ref={inputRef}
							placeholder={`Search ${itemName}...`}
							value={inputValue}
							onValueChange={setInputValue}
						/>
						<CommandList>
							<CommandGroup className="max-h-[145px] overflow-auto">
								{items.map((item) => {
									const isActive = selectedValues.includes(item);
									return (
										<CommandItem
											key={item}
											value={item}
											onSelect={() => toggleItem(item)}
										>
											<Check
												className={cn(
													"mr-2 h-4 w-4",
													isActive ? "opacity-100" : "opacity-0"
												)}
											/>
											<div className="flex-1">{item}</div>
											<div className="h-4 w-4 rounded-full bg-muted" />
										</CommandItem>
									);
								})}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		</div>
	);
}
