import { Button, type ButtonProps } from "@/components/ui/button";

export const GoBackButton: React.FC<Omit<ButtonProps, "asChild">> = ({
	variant = "secondary",
	onClick,
	...props
}) => {
	return (
		<Button
			variant={variant}
			onClick={(e) => {
				window.history.back();
				onClick?.(e);
			}}
			{...props}
		>
			Go back
		</Button>
	);
};
