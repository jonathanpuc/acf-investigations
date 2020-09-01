/** @jsx jsx */
import App from "next/app";
import Router from "next/router";
import withGA from "next-ga";
import { createGlobalStyle } from "styled-components";
import { jsx, ThemeProvider, Styled } from "theme-ui";
import theme from "~/src/theme";
import { AppPropsType } from "next/dist/next-server/lib/utils";
import { PageTransition } from "next-page-transitions";
import "normalize.css";
import Layout from "~/src/components/Layout";
import "../src/assets/fonts/fonts.css";
import "../src/assets/vendor/ball.css";
import { DefaultSeo } from "next-seo";
import SEO from "../next-seo.config";
import UserProvider from "~/src/modules/UserProvider";

export const GlobalStyle = createGlobalStyle`


* {
margin: 0;
padding: 0;
}
html {
    -webkit-print-color-adjust: exact;
    font-weight: 500;
    -webkit-font-smoothing: subpixel-antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 16px;
    font-family: "Syphon";
    color: ${theme.colors.darkGrey};
  }

  body {
    font-family: "Syphon";
    background-color: #f9f9f9!important;
  }

  button, input[type="submit"], input[type="reset"] {
	background: none;
	color: inherit;
	border: none;
	padding: 0;
	font: inherit;
	cursor: pointer;
	outline: inherit;
}

ul {
  list-style: none;
}

ul:not(.styleless-list) {
  margin: 0;
  padding: 0;
  margin-left: 20px;
  li {
    list-style-type: disc;
 
}
}



  a {
    text-decoration: none;
    color: inherit;
  }


  body.modal-opened {
   overflow: hidden;

   .modal-overlay {
     display: block;
   }


  }


`;
interface Props extends AppPropsType {
  Component: any;
  pageProps: any;
}
class MyApp extends App<Props, any> {
  render() {
    const { Component, pageProps, router } = this.props;
    const routes = router.pathname.split("/").filter(Boolean);
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Styled.root>
          <UserProvider>
            <Layout>
              <DefaultSeo {...SEO} />
              {routes.length > 1 ? (
                <PageTransition timeout={300} classNames="page-transition">
                  <Component {...pageProps} key={this.props.router.route} />
                </PageTransition>
              ) : (
                <Component {...pageProps} />
              )}
            </Layout>
          </UserProvider>
        </Styled.root>
        <style jsx global>{`
          .page-transition-enter {
            height: 100%;
            opacity: 1;
            transform: translate3d(0, 50px, 0);
          }
          .page-transition-enter-active {
            opacity: 1;
            transform: translate3d(0, 0px, 0);
            transition: all 250ms;
          }
          .page-transition-exit {
            opacity: 1;
            transform: translate3d(0, 0px, 0);
          }
          .page-transition-exit-active {
            opacity: 0;
            transform: translate3d(0, 250px, 0);
            transition: transform 1000ms;
          }
          .page-transition-enter-done {
            height: 100%;
          }
        `}</style>
      </ThemeProvider>
    );
  }
}

export default withGA("UA-163789488-1", Router)(MyApp);
