import { parseNumberFromSearchParams } from "@/lib/utils";
import { useSearchParams } from "react-router";

export const usePaginationSearchParams = () => {
	const [searchParams] = useSearchParams();

	const page = parseNumberFromSearchParams(searchParams.get("page"), 1);
	const limit = parseNumberFromSearchParams(searchParams.get("limit"), 10);

	return { page, limit };
};
