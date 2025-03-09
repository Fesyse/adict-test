import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Comment } from "@/types/comment";
import { type Post } from "@/types/post";
import { User } from "@/types/user";

type EditPostProps = {
	post: Post & { comments: Comment[]; author: User };
	setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

export const EditPost: React.FC<EditPostProps> = ({ post, setIsEditing }) => {
	return (
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
	);
};
