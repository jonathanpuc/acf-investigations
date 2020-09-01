/** @jsx jsx */
import { jsx } from "theme-ui";

const Title = ({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant: string;
}) => (
  <h1
    sx={{
      variant,
    }}
  >
    {children}
  </h1>
);

const Body = ({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant: string;
}) => (
  <p
    sx={{
      variant,
    }}
  >
    {children}
  </p>
);

export const ContentFormatter = ({
  type,
  content,
}: {
  type: string;
  content: any;
}): any => {
  const fields = {
    "expert opinion": [
      { name: "title", size: "typography.sizes.bodyLarge" },
      { name: "description", size: "typography.sizes.bodyMedium" },
      { name: "authors", size: "typography.sizes.bodyMedium" },
      { name: "citation", size: "typography.sizes.bodyMedium" },
    ],
    titleDescription: [
      { name: "title", size: "typography.sizes.bodyLarge" },
      { name: "description", size: "typography.sizes.bodyMedium" },
    ],
    resource: [
      { name: "title", size: "typography.sizes.bodyLarge" },
      { name: "description", size: "typography.sizes.bodyMedium" },
      { name: "source", size: "typography.sizes.bodySmall" },
    ],
  };

  switch (type) {
    case "expert opinion":
      return (
        <>
          {fields[type].map(({ name, size }) => {
            const node = content[name];
            if (name === "title") {
              return node && <Title variant={size}>{node}</Title>;
            } else {
              return node && <Body variant={size}>{node}</Body>;
            }
          })}
        </>
      );

    case "titleDescription":
      return (
        <>
          {fields[type].map(({ name, size }) => {
            const node = content[name];
            if (name === "title") {
              return node && <Title variant={size}>{node}</Title>;
            } else {
              return node && <Body variant={size}>{node}</Body>;
            }
          })}
        </>
      );

    case "resource":
      return (
        <>
          {fields[type].map(({ name, size }) => {
            const node = content[name];
            if (name === "title") {
              return node && <Title variant={size}>{node}</Title>;
            } else {
              return node && <Body variant={size}>{node}</Body>;
            }
          })}
        </>
      );

    default:
      return null;
  }
};
