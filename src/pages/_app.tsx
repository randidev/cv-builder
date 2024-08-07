import { persistor, store } from "@/redux/store";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { Analytics } from "@vercel/analytics/react";

import "@/styles/globals.scss";
import { PersistGate } from "redux-persist/integration/react";
import Layout from "@/components/Layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Layout>
          <Component {...pageProps} />
          <Analytics />
        </Layout>
      </PersistGate>
    </Provider>
  );
}
