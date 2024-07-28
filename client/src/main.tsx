import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const theme = extendTheme({
    config: {
        initialColorMode: "dark",
    },
});

const queryClient = new QueryClient({
    defaultOptions: {
        mutations: {
            retry: 0,
        },
        queries: {
            retry: 0,
        },
    },
});

// biome-ignore lint/style/noNonNullAssertion: this element will always be defined.
ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <ChakraProvider theme={theme}>
                <App />
            </ChakraProvider>
        </QueryClientProvider>
    </React.StrictMode>,
);
