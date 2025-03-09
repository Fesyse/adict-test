import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router";

const queryClient = new QueryClient();

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				{children}
				<Toaster />
			</BrowserRouter>
		</QueryClientProvider>
	);
};
