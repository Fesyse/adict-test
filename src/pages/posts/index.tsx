import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
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
		<div className="min-h-screen flex justify-center flex-col max-w-lg mx-auto py-20">
			{isLoading || post ? (
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
			) : (
				<Card>
					<CardHeader>
						<CardTitle className="text-xl">{post.title}</CardTitle>
						<CardDescription>{post.body}</CardDescription>
						<div className="flex justify-between gap-2">
							<div className="text-foreground/80">
								Posted by{" "}
								<span className="font-semibold">@{post.author.username}</span>
							</div>
						</div>
					</CardHeader>
					<CardContent>
						<Accordion type="single" collapsible>
							<AccordionItem value="comments">
								<AccordionTrigger>Show comments</AccordionTrigger>
								<AccordionContent asChild>
									<ul className="flex flex-col gap-3">
										{post.comments.map((comment) => (
											<li key={comment.id}>
												<p className="text-sm font-semibold">
													{"Author: " + post.userId} • {comment.name}
												</p>
												<p className="text-sm text-foreground/85">
													{comment.body}
												</p>
											</li>
										))}
									</ul>
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</CardContent>
				</Card>
			)}
		</div>
	);
};
