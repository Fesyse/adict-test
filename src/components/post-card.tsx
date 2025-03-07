import { Post } from "@/types/post";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

type PostCardProps = {
	post: Post;
};

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
	return (
		<li>
			<Link to={`/posts/${post.id}`}>
				<Card className="group">
					<CardHeader>
						<CardTitle>{post.title}</CardTitle>
						<CardDescription>{post.body}</CardDescription>

						<div className="flex justify-between gap-2">
							<p className="text-foreground/80">Posted by @{post.userId}</p>

							<ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
						</div>
					</CardHeader>
				</Card>
			</Link>
		</li>
	);
};
