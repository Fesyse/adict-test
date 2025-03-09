import { Button } from "@/components/ui/button";
import { CardHeader } from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEditPost } from "@/hooks/use-edit-post";
import { editPostSchema, EditPostSchema } from "@/lib/schemas";
import { Comment } from "@/types/comment";
import { type Post } from "@/types/post";
import { User } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

type EditPostProps = {
	post: Post & { comments: Comment[]; author: User };
	setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

export const EditPost: React.FC<EditPostProps> = ({ post, setIsEditing }) => {
	const { mutate: editPost } = useEditPost();
	const form = useForm<EditPostSchema>({
		resolver: zodResolver(editPostSchema),
		defaultValues: {
			title: post.title,
			body: post.body,
		},
	});

	const handleSubmit = (data: EditPostSchema) => {
		editPost(data, {
			onSuccess: () => {
				setIsEditing(false);
			},
		});
	};

	return (
		<CardHeader>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
					<FormField
						name="title"
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Title</FormLabel>
								<FormControl>
									<Input placeholder="Title for the post..." {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						name="body"
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Body</FormLabel>
								<FormControl>
									<Textarea
										placeholder="Body of the post..."
										className="max-h-64 min-h-36"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className="flex justify-between items-center gap-2">
						<div className="text-foreground/80">
							Posted by{" "}
							<span className="font-semibold">@{post.author.username}</span>
						</div>
						<div className="flex gap-2">
							<Button
								variant="secondary"
								type="button"
								onClick={() => setIsEditing(false)}
							>
								Cancel
							</Button>
							<Button>Save</Button>
						</div>
					</div>
				</form>
			</Form>
		</CardHeader>
	);
};
