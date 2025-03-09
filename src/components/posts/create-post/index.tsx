import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useCreatePost } from "@/hooks/use-create-post";
import { CreatePostSchema } from "@/lib/schemas";
import { Plus } from "lucide-react";
import { useState } from "react";
import { CreatePostForm } from "./create-post-form";

export const CreatePost = () => {
	const { mutate: createPost, isPending } = useCreatePost();
	const [open, setOpen] = useState(false);

	const handleSubmit = (data: CreatePostSchema) => {
		createPost(data, {
			onSuccess: () => {
				setOpen(false);
			},
		});
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

				<CreatePostForm
					handleSubmit={handleSubmit}
					setOpen={setOpen}
					isPending={isPending}
				/>
			</DialogContent>
		</Dialog>
	);
};
