import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes } from "react-router";

import { ErrorScreen } from "@repo/ui/error-screen";

import { routes } from "./app/routes";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: { staleTime: 5 * 60 * 1000, networkMode: "always" },
		mutations: { networkMode: "always" },
	},
});

function App() {
	return (
		<ErrorScreen>
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
					<Routes>{routes}</Routes>
				</BrowserRouter>

				<Toaster />
				<ReactQueryDevtools />
			</QueryClientProvider>
		</ErrorScreen>
	);
}

export default App;
