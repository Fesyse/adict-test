import { parseNumberFromSearchParams } from "@/lib/utils";
import { create } from "zustand";

type PostsFiltersStore = {
	// Pagination
	page: number;
	limit: number;
	setPage: (page: number) => void;
	setLimit: (limit: number) => void;

	// Filters
	title?: string;
	userIDs?: number[];
	setTitle: (title: string) => void;
	addUserId: (userID: number) => void;
};

const searchParams = new URLSearchParams(location.search);

export const usePostsFiltersStore = create<PostsFiltersStore>((set) => ({
	// Pagination
	page: parseNumberFromSearchParams(searchParams.get("page"), 0),
	limit: parseNumberFromSearchParams(searchParams.get("limit"), 10),
	setPage: (page: number) => set({ page }),
	setLimit: (limit: number) => set({ limit }),

	// Filters
	setTitle: (title: string) => set({ title }),
	addUserId: (userID: number) =>
		set((state) => ({
			userIDs: state.userIDs ? [...state.userIDs, userID] : [userID],
		})),
}));
