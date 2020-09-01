import { database } from "~/src/services/firebase/client";

export const fetchFirebaseProps = async (pageName: string, route: string) => {
  const reactionsSnapshot = await database
    .ref(`reactions/covid-19/${pageName}/${route}`)
    .once("value");
  const reactions = reactionsSnapshot.val();
  const commentsSnapshot = await database
    .ref(`comments/covid-19/${pageName}/${route}`)
    .once("value");
  const comments = commentsSnapshot.val();

  return {
    reactions,
    comments,
  };
};

export const fetchStaticPaths = (
  paths: Array<string>
): Array<{
  params: {
    id: string;
  };
}> =>
  paths.map((path) => ({
    params: {
      id: path,
    },
  }));
