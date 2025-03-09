import { cn } from "@/lib/utils";
import { LoaderIcon } from "lucide-react";

type LoaderProps = {
	className?: string;
};

export const Loader: React.FC<LoaderProps> = ({ className }) => {
	return <LoaderIcon className={cn("animate-spin", className)} />;
};
