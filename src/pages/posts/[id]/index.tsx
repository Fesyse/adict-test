import { GoBackButton } from "@/components/go-back-button";
import { PostPageLoading } from "@/components/posts/post/post-page-loading";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { usePost } from "@/hooks/use-post";
import { useParams } from "react-router";

type PostPageParams = {
	id: string;
};

const PostNotFound = () => {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center gap-1">
			<p className="text-muted-foreground text-lg">Post not found</p>
			<GoBackButton />
		</div>
	);
};

export const PostPage = () => {
	const { id } = useParams<PostPageParams>();
	const { data: post, isLoading, isError } = usePost(Number(id));

	if (isError) return <PostNotFound />;

	return (
		<div className="min-h-screen flex justify-center flex-col max-w-lg mx-auto gap-2 py-20">
			<GoBackButton className="w-fit" variant="outline" />
			{!isLoading && post ? (
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
			) : (
				<PostPageLoading />
			)}
		</div>
	);
};
