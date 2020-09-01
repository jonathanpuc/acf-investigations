/** @jsx jsx */
import { jsx } from "theme-ui";

import { NextSeo } from "next-seo";
import { database } from "~/src/services/firebase/client";
const Assignments = () => {
  return (
    <div>
      <NextSeo title="Assignments | ACF" />
      <main>
        <section
          sx={{
            bg: "lightYellow",
            position: "relative",
          }}
        ></section>
      </main>
    </div>
  );
};
export default Assignments;

// export async function getServerSideProps(context) {
//     const reactionsSnapshot = await database
//     .ref(`reactions/covid-19/${pageName}/${route}`)
//     .once("value");
//     return {
//       props: {}, // will be passed to the page component as props
//     }
//   }
