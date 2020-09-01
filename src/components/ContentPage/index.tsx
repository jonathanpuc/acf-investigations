/** @jsx jsx */
import { jsx, Styled } from "theme-ui";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { database } from "~/src/services/firebase/client";
import { Reaction as ReactionInt } from "~/src/types";
import { formatComments } from "~/src/helpers/comments";
import { rem } from "~/src/theme";
import slugify from "slugify";
import DefaultErrorPage from "next/error";
import Head from "next/head";
import { htmlStyles } from "~/src/theme";
import { getJourneyColor } from "~/src/helpers/utils";
import { NextSeo } from "next-seo";
import { capitalize } from "~/src/helpers/utils";
import { UserContext } from "~/src/modules/UserProvider";

interface ComponentProps {
  queryId: string;
  reactions: Object;
  comments: Object;
  content: any;
}

const REACTABLE_TYPES = [
  "indications",
  "benefits",
  "risks",
  "medical literature",
  "resources",
];

const ContentPage = (props: ComponentProps) => {
  const user: any = useContext(UserContext);

  const router = useRouter();

  const [contentBlockReactions, setContentBlockReactions] = useState(
    props.reactions && props.reactions[props.queryId]
      ? props.reactions[props.queryId]
      : null
  );
  const [pageComments, setPageComments] = useState(
    props.comments && props.comments[props.queryId]
      ? props.comments[props.queryId]
      : null
  );

  useEffect(() => {
    const routes = router.pathname.split("/").filter(Boolean);
    setPageRoutes([...routes]);

    routes.pop();

    if (process.browser) {
      const parentTopicPage = routes[routes.length - 1];
      database
        .ref("reactions/covid-19/" + parentTopicPage + "/" + props.queryId)
        .on("value", (snapshot) => {
          setContentBlockReactions(snapshot.val());
        });

      database
        .ref("comments/covid-19/" + parentTopicPage + "/" + props.queryId)
        .on("value", (snapshot) => {
          if (snapshot.val()) {
            setPageComments(formatComments(snapshot.val()));
          }
        });

      return () => {
        database
          .ref("comments/covid-19/" + parentTopicPage + "/" + props.queryId)
          .off("value", (snapshot) => {
            if (snapshot.val()) {
              setPageComments(formatComments(snapshot.val()));
            }
          });

        database
          .ref("reactions/covid-19/" + parentTopicPage + "/" + props.queryId)
          .off("value", (snapshot) => {
            setContentBlockReactions(snapshot.val());
          });
      };
    }
  }, []);
  const [pageRoutes, setPageRoutes] = useState<string[]>([]);

  const __getCurrentPageTopic = (): string =>
    Array.isArray(router.query.id) ? router.query.id.join("") : router.query.id;
  const __getCurrentPageParentTopic = (): string =>
    pageRoutes[pageRoutes.length - 2];

  const __onContentReaction = (
    contentParent: string,
    reaction: ReactionInt
  ) => {
    const data = {
      ...reaction,
      user_id: user.uid,
    };

    database
      .ref(
        "reactions/covid-19/" +
          __getCurrentPageParentTopic() +
          "/" +
          __getCurrentPageTopic() +
          "/" +
          contentParent +
          "/" +
          data.block_id +
          "/" +
          `${user.uid}${reaction.type}`
      )
      .set(data);
  };
  const __onPageComment = (comment: string) => {
    const timestamp = Date.now();
    try {
      database
        .ref(
          "comments/covid-19/" +
            __getCurrentPageParentTopic() +
            "/" +
            __getCurrentPageTopic() +
            "/" +
            `${user.uid}${timestamp}`
        )
        .set({
          user_uuid: user.uid,
          text: comment,
          timestamp,
          author: user.displayName,
        });
    } catch (e) {
      throw new Error(e);
    }
  };

  const mapReactionsToContentBlock = (type, block) => {
    if (!REACTABLE_TYPES.includes(type)) {
      return undefined;
    } else {
      if (
        contentBlockReactions &&
        contentBlockReactions[type] &&
        contentBlockReactions[type][block.id]
      ) {
        const blocks = contentBlockReactions[type][block.id];
        if (blocks) {
          return Object.keys(blocks).map((key) => ({
            ...blocks[key],
          }));
        }
      }
      return [];
    }
  };

  const __getSections = () => {
    if (__getCurrentPageParentTopic()) {
      return Object.keys(props["content"]["content blocks"]).map((topic) => ({
        type: topic,
        heading: topic,
        blocks: props["content"]["content blocks"][topic]
          ? props["content"]["content blocks"][topic]
              .map((block) => {
                const blockData = {
                  ...block,
                  reactions: mapReactionsToContentBlock(topic, block),
                };

                if (topic === "alternatives") {
                  blockData[
                    "url"
                  ] = `/covid-19/${__getCurrentPageParentTopic()}/${slugify(
                    block.title.toLowerCase()
                  )}`;
                }

                return blockData;
              })
              .sort((a, b) => {
                return a.reactions && b.reactions
                  ? b.reactions.length - a.reactions.length
                  : -1;
              })
          : null,
      }));
    }
  };

  return (
    <div
      className="container"
      sx={{
        bg: "lightYellow",
        borderTop: "2px solid black",
        position: "relative",
        variant: "spacing.verticalLarge",
      }}
    ></div>
  );
};

export default ContentPage;
