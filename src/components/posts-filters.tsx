import { Input } from "@/components/ui/input";
import { MultipleSelect } from "@/components/ui/multiple-select";
import { Skeleton } from "@/components/ui/skeleton";
import { usePostsUserIDs } from "@/hooks/use-posts";
import { cn } from "@/lib/utils";
import { usePostsFiltersStore } from "@/store/posts-filters.store";
import { useQueryClient } from "@tanstack/react-query";

type PostsFiltersProps = {
	className?: string;
};

export const PostsFilters: React.FC<PostsFiltersProps> = ({ className }) => {
	const queryClient = useQueryClient();
	const { title, userIDs, setTitle, setUserIDs } = usePostsFiltersStore();
	const { data: defaultUserIDs, isLoading } = usePostsUserIDs();

	return (
		<div className={cn("flex justify-between", className)}>
			<Input
				className="w-2/5"
				placeholder="Filter by title..."
				onChange={(e) => setTitle(e.target.value)}
			/>

			{defaultUserIDs && !isLoading ? (
				<MultipleSelect
					items={defaultUserIDs.map(String)}
					itemName="user ID"
					onChange={(newUserIDs) => {
						setUserIDs(newUserIDs.map(Number));

						// Invalidate the query with the new userIDs
						queryClient.invalidateQueries({
							queryKey: ["posts", { title, userIDs: newUserIDs }],
						});
					}}
				/>
			) : (
				<Skeleton className="w-1/5" />
			)}
		</div>
	);
};
