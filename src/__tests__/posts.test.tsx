import { CreatePost } from "@/components/posts/create-post";
import { PostCard } from "@/components/posts/post-card";
import { PostsFilters } from "@/components/posts/posts-filters";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mockSetTitle = vi.fn();
const mockSetUserIDs = vi.fn();
const mockCreatePost = vi.fn();

// Mock the store
vi.mock("@/store/posts-filters.store", () => ({
	usePostsFiltersStore: () => ({
		title: "",
		setTitle: mockSetTitle,
		setUserIDs: mockSetUserIDs,
	}),
}));

// Mock the hooks
vi.mock("@/hooks/use-create-post", () => ({
	useCreatePost: () => ({
		mutate: mockCreatePost,
		isPending: false,
	}),
}));

vi.mock("@/hooks/use-posts", () => ({
	usePostsUserIDs: () => ({
		data: ["1", "2", "3"],
		isLoading: false,
	}),
}));

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
		},
	},
});

const TestWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>{children}</BrowserRouter>
		</QueryClientProvider>
	);
};

describe("Posts Components", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	// Test PostCard rendering
	describe("PostCard", () => {
		const mockPost = {
			id: 1,
			userId: 1,
			title: "Test Post",
			body: "Test post body",
		};

		it("renders post card with correct content", () => {
			render(
				<TestWrapper>
					<PostCard post={mockPost} />
				</TestWrapper>
			);

			expect(screen.getByText("Test Post")).toBeInTheDocument();
			expect(screen.getByText("Test post body")).toBeInTheDocument();
			expect(screen.getByText("Posted by @1")).toBeInTheDocument();
		});

		it("navigates to post details when clicked", () => {
			render(
				<TestWrapper>
					<PostCard post={mockPost} />
				</TestWrapper>
			);

			const link = screen.getByRole("link");
			expect(link).toHaveAttribute("href", "/posts/1");
		});
	});

	// Test CreatePost component
	describe("CreatePost", () => {
		it("opens dialog and handles form submission", async () => {
			const user = userEvent.setup();
			render(
				<TestWrapper>
					<CreatePost />
				</TestWrapper>
			);

			// Open dialog
			await user.click(screen.getByRole("button"));
			expect(screen.getByText("Create post")).toBeInTheDocument();

			// Fill form
			await user.type(
				screen.getByPlaceholderText("Title for the post..."),
				"New Test Post"
			);
			await user.type(
				screen.getByPlaceholderText("Body of the post..."),
				"New test post body"
			);

			// Submit form
			await user.click(screen.getByRole("button", { name: "Create" }));

			expect(mockCreatePost).toHaveBeenCalledWith(
				{
					title: "New Test Post",
					body: "New test post body",
				},
				expect.any(Object)
			);
		});
	});

	// Test PostsFilters component
	describe("PostsFilters", () => {
		it("renders filters with search input and user selection", () => {
			render(
				<TestWrapper>
					<PostsFilters />
				</TestWrapper>
			);

			// Check if search input exists
			expect(
				screen.getByPlaceholderText("Filter by title...")
			).toBeInTheDocument();

			// Check if user selection exists
			expect(screen.getByRole("combobox")).toBeInTheDocument();
			expect(screen.getByText("Select user IDs")).toBeInTheDocument();
		});
	});
});
