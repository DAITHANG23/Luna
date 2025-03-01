import Layout from "@/components/layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { inter, red_hat_display } from "@/styles/fonts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReduxProvider } from "@/lib/redux/provider";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <ReduxProvider>
      <QueryClientProvider client={queryClient}>
        <div
          className={`${inter.variable} ${red_hat_display.variable} container prose max-w-none w-full`}
        >
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </div>
      </QueryClientProvider>
    </ReduxProvider>
  );
}
