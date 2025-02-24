import Layout from "@/components/layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { inter, red_hat_display } from "@/styles/fonts";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div
      className={`${inter.variable} ${red_hat_display.variable} container prose max-w-none w-full`}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}
