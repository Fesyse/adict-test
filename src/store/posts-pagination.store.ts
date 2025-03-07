import { parseNumberFromSearchParams } from "@/lib/utils";
import { create } from "zustand";

type PostsPaginationStore = {
	page: number;
	limit: number;

	// Setters
	setPage: (page: number) => void;
	setLimit: (limit: number) => void;
};

const searchParams = new URLSearchParams(location.search);

export const usePostsPaginationStore = create<PostsPaginationStore>((set) => ({
	page: parseNumberFromSearchParams(searchParams.get("page"), 0),
	limit: parseNumberFromSearchParams(searchParams.get("limit"), 10),

	setPage: (page: number) => set({ page }),
	setLimit: (limit: number) => set({ limit }),
}));
