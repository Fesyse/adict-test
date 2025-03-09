import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
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
import { type CreatePostSchema, createPostSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";

type CreatePostFormProps = {
	handleSubmit: (data: CreatePostSchema) => void;
	setOpen: (open: boolean) => void;
	isPending: boolean;
};

export const CreatePostForm: React.FC<CreatePostFormProps> = ({
	handleSubmit,
	setOpen,
	isPending,
}) => {
	const form = useForm<CreatePostSchema>({
		resolver: zodResolver(createPostSchema),
		defaultValues: {
			title: "",
			body: "",
		},
	});

	return (
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
					<Button>
						{isPending ? (
							<span className="flex gap-2">
								<Loader /> Creating...
							</span>
						) : (
							"Create"
						)}
					</Button>
				</DialogFooter>
			</form>
		</Form>
	);
};
