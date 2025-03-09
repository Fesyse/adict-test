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

type DeletePostDialogProps = {
	isOpen: boolean;
	onClose: () => void;
	onDelete: () => void;
};

function DeletePostDialog({
	isOpen,
	onClose,
	onDelete,
}: DeletePostDialogProps) {
	return (
		<AlertDialog onOpenChange={onClose} open={isOpen}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						Are you sure you want to delete this post?
					</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete post and
						remove your it's data from our servers.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<Button variant="secondary" onClick={onClose}>
						Cancel
					</Button>
					<Button variant="destructive" onClick={onDelete}>
						Delete
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

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

			<DeletePostDialog
				isOpen={alertOpen}
				onClose={() => setAlertOpen(false)}
				onDelete={() => {
					deletePost(undefined, {
						onError: (error) => {
							console.log("Error deleting post", error);
						},
						onSuccess: () => {
							navigate(`/`);
						},
					});
				}}
			/>
		</>
	);
};
