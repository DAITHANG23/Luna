import Layout from "@/components/layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { inter, red_hat_display } from "@/styles/fonts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReduxProvider } from "@/libs/redux/provider";
import { I18nextProvider } from "react-i18next";
import i18n from "@/libs/i18n/i18n";
import "leaflet/dist/leaflet.css";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <ReduxProvider>
      <I18nextProvider i18n={i18n}>
        <QueryClientProvider client={queryClient}>
          <div
            className={`${inter.variable} ${red_hat_display.variable} container prose max-w-none w-full`}
          >
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </div>
        </QueryClientProvider>
      </I18nextProvider>
    </ReduxProvider>
  );
}
