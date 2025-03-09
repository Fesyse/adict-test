import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeletePost } from "@/hooks/use-delete-post";
import { type PostPageParams } from "@/pages/posts/[id]";
import { EllipsisVertical } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";

type PostActionsProps = {
	setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PostActions: React.FC<PostActionsProps> = ({ setIsEditing }) => {
	const navigate = useNavigate();

	const [alertOpen, setAlertOpen] = useState(false);
	const { id } = useParams<PostPageParams>();
	const { mutate: deletePost } = useDeletePost(Number(id));

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger>
					<Button size="icon" variant="outline">
						<EllipsisVertical />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent side="bottom">
					<DropdownMenuLabel>Post actions</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<DropdownMenuItem onClick={() => setIsEditing((prev) => !prev)}>
							Edit
							<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => setAlertOpen(true)}>
							Delete
							<DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
						</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
			{/* Delete post dialog */}
			<AlertDialog onOpenChange={setAlertOpen} open={alertOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>
							Are you sure you want to delete this post?
						</AlertDialogTitle>
						<AlertDialogDescription>
							This action cannot be undone. This will permanently delete post
							and remove your it's data from our servers.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<Button variant="secondary" onClick={() => setAlertOpen(false)}>
							Cancel
						</Button>
						<Button
							variant="destructive"
							onClick={() => {
								setAlertOpen(false);
								deletePost(undefined, {
									onError: (error) => {
										console.log("Error deleting post", error);
									},
									onSuccess: () => {
										navigate(`/`);
									},
								});
							}}
						>
							Delete
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
};
