import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
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
import { createPostSchema, type CreatePostSchema } from "@/lib/schemas";
import { usePostsFiltersStore } from "@/store/posts-filters.store";
import { Post } from "@/types/post";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const CreatePost = () => {
	const [open, setOpen] = useState(false);
	const { title, userIDs } = usePostsFiltersStore();

	const queryClient = useQueryClient();
	const form = useForm<CreatePostSchema>({
		resolver: zodResolver(createPostSchema),
		defaultValues: {
			title: "",
			body: "",
		},
	});

	const handleSubmit = (post: CreatePostSchema) => {
		queryClient.setQueryData(
			["posts", { title, userIDs }],
			(oldPosts: Post[]) => {
				// Adding the new post to start of the array LOCALY
				return [{ ...post, id: oldPosts.length + 1, userId: 1 }, ...oldPosts];
			}
		);

		toast.success("Post successfully created!");
		setOpen(false);
	};

	return (
		<Dialog onOpenChange={setOpen} open={open}>
			<DialogTrigger asChild>
				<Button size="icon" className="cursor-pointer">
					<Plus />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create post</DialogTitle>
					<DialogDescription>Create a new post</DialogDescription>
				</DialogHeader>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className="space-y-6"
					>
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
											className="max-h-40 min-h-20"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<DialogFooter>
							<Button
								variant="secondary"
								onClick={() => setOpen(false)}
								type="button"
							>
								Cancel
							</Button>
							<Button>Create</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};
