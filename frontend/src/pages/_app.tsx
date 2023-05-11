import { Fragment } from "react";
import Head from "next/head";
import { NextPage } from "next";
import Router from "next/router";
import { AppProps } from "next/app";
import NProgress from "nprogress";
import { ThemeProvider } from "styled-components";
import { AuthProvider } from "@context/AuthContext";
import theme from "../theme";
import GlobalStyles from "theme/globalStyles";
import { HydrationProvider, Client } from "react-hydration-provider";
import { store } from "store";
import { Provider as StoreProvider } from "react-redux";

//Binding events.
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

NProgress.configure({ showSpinner: false });

// ============================================================
interface MyAppProps extends AppProps {
  Component: NextPage & { layout?: () => JSX.Element };
}
// ============================================================

const App = ({ Component, pageProps }: MyAppProps) => {
  let Layout = Component.layout || Fragment;

  return (
    <HydrationProvider>
      <Client>
        <StoreProvider store={store}>
          {" "}
          <Fragment>
            <Head>
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
              />
              <meta
                httpEquiv="Content-Type"
                content="text/html; charset=utf-8"
              />
              <meta
                property="og:url"
                content="https://bonik-react.vercel.app"
              />
              {/* thumbnail And title for social media */}
              <meta property="og:type" content="website" />
              <meta
                property="og:title"
                content="React Next JS Ecommerce Template"
              />
              <meta
                property="og:description"
                content="Minimal, clean and Fast Next js ecommerce template. Build Super store, Grocery delivery app, Multivendor store and niche market"
              />
            </Head>
            <AuthProvider>
              <ThemeProvider theme={theme()}>
                <GlobalStyles />
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </ThemeProvider>
            </AuthProvider>
          </Fragment>
        </StoreProvider>
      </Client>
    </HydrationProvider>
  );
};

export default App;
