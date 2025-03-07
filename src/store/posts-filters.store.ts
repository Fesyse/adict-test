import { create } from "zustand";

type PostsFiltersStore = {
	// Filters
	title?: string;
	userIDs?: number[];
	setTitle: (title: string) => void;
	setUserIDs: (userIDs: number[]) => void;
};

export const usePostsFiltersStore = create<PostsFiltersStore>((set) => ({
	setTitle: (title: string) => set({ title }),
	setUserIDs: (userIDs: number[]) => set({ userIDs }),
}));
