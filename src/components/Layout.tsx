/** @jsx jsx */
import { jsx, Styled } from "theme-ui";
import Head from "next/head";
import Header from "~/src/components/Header";
import { rem } from "../theme";
const Layout = ({ children }) => {
  return (
    <div
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>

      <div
        className="modal-overlay"
        sx={{
          display: "none",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1,
          width: ["100%"],
          height: ["100%"],
          overflow: "auto",
          background: "#eee",
          backgroundColor: "rgba(0,0,0,0.4)",
        }}
      ></div>
      <Header />

      <main
        sx={{
          width: "100%",
          flex: "1 1 auto",
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
        }}
      >
        {children}
      </main>
      <footer
        sx={{
          width: "100%",
          bg: "darkGrey",
          color: "white",
          variant: "spacing.verticalSmall",
        }}
      >
        <div
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
          }}
        ></div>
      </footer>
    </div>
  );
};

export default Layout;
