import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const PostPageLoading = () => {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="mb-2.5">
					<Skeleton className="w-2/5 h-6" />
				</CardTitle>
				<CardDescription className="space-y-1.5">
					<Skeleton className="w-full h-5" />
					<Skeleton className="w-full h-5" />
					<Skeleton className="w-1/3 h-5" />
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Skeleton className="h-20 w-full" />
			</CardContent>
		</Card>
	);
};
