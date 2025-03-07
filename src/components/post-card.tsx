import { Post } from "@/types/post";
import { Link } from "react-router";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

type PostCardProps = {
	post: Post;
};

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
	return (
		<li>
			<Link to={`/posts/${post.id}`}>
				<Card>
					<CardHeader>
						<CardTitle>{post.title}</CardTitle>
						<CardDescription>{post.body}</CardDescription>

						<p className="text-foreground/80">Posted by @{post.userId}</p>
					</CardHeader>
				</Card>
			</Link>
		</li>
	);
};
