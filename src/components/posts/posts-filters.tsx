import { Input } from "@/components/ui/input";
import { MultipleSelect } from "@/components/ui/multiple-select";
import { Skeleton } from "@/components/ui/skeleton";
import { usePostsUserIDs } from "@/hooks/use-posts";
import { cn } from "@/lib/utils";
import { usePostsFiltersStore } from "@/store/posts-filters.store";
import { useQueryClient } from "@tanstack/react-query";
import debounce from "lodash.debounce";
import { useCallback } from "react";

type PostsFiltersProps = {
	className?: string;
};

export const PostsFilters: React.FC<PostsFiltersProps> = ({ className }) => {
	const queryClient = useQueryClient();
	const { title, setTitle, setUserIDs } = usePostsFiltersStore();
	const { data: defaultUserIDs, isLoading } = usePostsUserIDs();

	// Debounce the title input
	const updateTitle = useCallback(
		debounce((e: React.ChangeEvent<HTMLInputElement>) => {
			setTitle(e.target.value);
		}, 500),
		[setTitle]
	);
	const updateUserIDs = (newUserIDs: string[]) => {
		setUserIDs(newUserIDs.map(Number));

		// Invalidate the query with the new userIDs
		queryClient.invalidateQueries({
			queryKey: ["posts", { title, userIDs: newUserIDs }],
		});
	};

	return (
		<div className={cn("flex justify-between", className)}>
			<Input
				className="w-2/5"
				placeholder="Filter by title..."
				onChange={updateTitle}
			/>

			{defaultUserIDs && !isLoading ? (
				<MultipleSelect
					items={defaultUserIDs.map(String)}
					itemName="user ID"
					onChange={updateUserIDs}
				/>
			) : (
				<Skeleton className="w-1/5" />
			)}
		</div>
	);
};
