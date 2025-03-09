import { Pagination } from "@/components/pagination";
import { usePaginationSearchParams } from "@/hooks/use-pagination-search-params";
import { type Post } from "@/types/post";
import { useEffect } from "react";
import { useSearchParams } from "react-router";

export type PostsPaginationProps = {
	posts: Post[] | null;
};

export const PostsPagination: React.FC<PostsPaginationProps> = ({ posts }) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const { limit, page } = usePaginationSearchParams();

	useEffect(() => {
		setSearchParams(window.location.search);
	}, [searchParams.toString()]);

	return posts ? (
		<Pagination
			className="mt-4"
			pagination={{
				page: page,
				limit,
				pages: Math.floor(posts.length / limit),
			}}
			searchParams={Object.fromEntries(searchParams.entries())}
		/>
	) : null;
};
