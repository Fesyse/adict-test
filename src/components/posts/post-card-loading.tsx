import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const PostCardLoading = () => {
	return (
		<li>
			<Card>
				<CardHeader>
					<Skeleton className="w-1/3 h-6 rounded-md" />
					<Skeleton className="w-full h-5" />
					<Skeleton className="w-1/2 h-5" />

					<p className="text-foreground/80 flex">
						Posted by <Skeleton className="w-6 h-6 rounded-md" />
					</p>
				</CardHeader>
			</Card>
		</li>
	);
};
