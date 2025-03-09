import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { usePost } from "@/hooks/use-post";
import { useParams } from "react-router";

type PostPageParams = {
	id: string;
};

const PostNotFound = () => {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center gap-1">
			<p className="text-muted-foreground text-lg">Post not found</p>
			<Button variant="secondary" onClick={() => window.history.back()}>
				Go back
			</Button>
		</div>
	);
};

export const PostPage = () => {
	const { id } = useParams<PostPageParams>();
	const { data: post, isLoading, isError } = usePost(Number(id));

	if (isError) return <PostNotFound />;

	return (
		<div className="min-h-screen flex justify-center flex-col max-w-lg mx-auto">
			{isLoading || !post ? (
				<Card>
					<CardHeader>
						<CardTitle className="space-y-1.5">
							<Skeleton className="w-2/5 h-6 mb-2.5" />
							<Skeleton className="w-full h-5" />
							<Skeleton className="w-full h-5" />
							<Skeleton className="w-1/3 h-5" />
						</CardTitle>
					</CardHeader>
				</Card>
			) : (
				<Card>
					<CardHeader>
						<CardTitle>{post.title}</CardTitle>
						<CardDescription>{post.body}</CardDescription>
					</CardHeader>
					<CardContent>
						<h2 className="text-xl font-bold">Comments</h2>
						<ul className="flex flex-col gap-2">
							{post.comments.map((comment) => (
								<li key={comment.id}>
									<p className="text-sm font-semibold">{comment.name}</p>
									<p className="text-sm text-foreground/85">{comment.body}</p>
								</li>
							))}
						</ul>
					</CardContent>
				</Card>
			)}
		</div>
	);
};
