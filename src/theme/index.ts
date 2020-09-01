export const pxToRem = (pxSize, rootSize = 16) => {
  return (pxSize / rootSize).toFixed(2);
};

export const rem = (pxSize) => {
  return `${pxToRem(pxSize)}rem`;
};

export const spacePx = [0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44];
export const space = spacePx.map((i) => rem(i));
export const fontSizePx = [16, 18, 24, 26, 48, 56, 76];
export const fontSizes = fontSizePx.map((i) => rem(i));

const theme = {
  // Fonts
  fonts: {
    body: "'Syphon', sans-serif",
    heading: "'Recia'",
  },
  // Colors
  colors: {
    lightGrey: "#E7EDF4",
    midGrey: "#C4D3E3",
    darkGrey: "#172B28",
    lightBlue: "#F0F9FF",
    blue: "#A8DFFE",
    orange: "#E99744",
    darkOrange: "#A45C13",
    lightYellow: "#FAF5E9",
    yellow: "#FED980",
    lightPink: "#FFF0F0",
    pink: "#FC9191",
    hotPink: "#FB6060",
    white: "#fff",
    black: "#000000",
  },
  colorSets: {
    purplePink: {
      backgroundColor: "purple",
      color: "pink",
    },
    turquoiseDarkPurple: {
      backgroundColor: "turquoise",
      color: "pink",
    },
    darkPurpleWhite: {
      backgroundColor: "darkPurple",
      color: "white",
    },
  },
  typography: {
    link: {
      fontFamily: "heading",
      textTransform: "uppercase",
      fontSize: [rem(16), null, null, rem(22)],
      color: "darkPurple",
      fontWeight: 900,
    },
    linkInline: {
      textDecoration: "underline",
      color: "inherit",
      fontWeight: 600,
      "&:hover": {
        color: "#6A5095",
      },
    },
    sizes: {
      bodyLarge: {
        fontSize: [rem(20), rem(28)],
        marginBottom: rem(16),
        lineHeight: 1.3,
      },
      bodyMedium: {
        fontSize: [rem(16)],
        lineHeight: 1.4,
        marginBottom: rem(16),
      },
      bodySmall: {
        fontSize: [rem(12), rem(13)],
        lineHeight: 1.5,
        marginBottom: rem(8),
      },
    },
  },
  buttons: {
    primary: {
      variant: "cards.boxShadow",
      minHeight: rem(58),
      cursor: "pointer",
      textAlign: "left",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: rem(20),
      fontFamily: "heading",
      bg: "yellow",
    },
    ghost: {
      variant: "cards.boxShadow",
      minHeight: rem(58),
      cursor: "pointer",
      textAlign: "left",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: rem(20),
      fontFamily: "heading",
      bg: "transparent",
    },
    white: {
      variant: "cards.boxShadow",
      minHeight: rem(58),
      cursor: "pointer",
      textAlign: "left",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: rem(20),
      fontFamily: "heading",
      bg: "white",
    },
  },
  links: {
    touch: {
      display: "inline-flex",
      alignItems: "center",
      ".link": {
        textDecoration: "underline",
      },
      p: 3,
      borderRadius: "3px",
      ml: rem(-12),
      cursor: "pointer",
      "&:hover, &:focus": {
        bg: "rgba(0,0,0,0.10)",
        ".link": {
          textDecoration: "none",
        },
      },
    },
    inline: {
      color: "darkOrange",
      textDecoration: "underline",
      cursor: "pointer",
      "&:hover": {
        textDecoration: "none",
      },
    },
  },
  cards: {
    boxShadow: {
      border: "1px solid #172B28",
      // boxShadow: "3px 3px 0px #172B28",
    },
    border: {
      border: "1px solid #C4D3E3",
    },
  },
  spacing: {
    verticalSmall: {
      pt: rem(36),
      pb: rem(80),
    },
    verticalLarge: {
      pt: rem(50),
      pb: rem(90),
    },
  },

  // Sizing and spacing
  sizes: {
    containerLg: 1500,
    containerSm: 750,
  },
  breakpoints: [
    "600px", //0
    "860px", //1
    "1200px", //2
    "1400px", //3
  ],
  space,

  fontSizes,
  fontWeights: {
    body: 500,
    heading: 900,
  },
  // Text variants
  text: {
    caps: {
      textTransform: "uppercase",
      letterSpacing: "0.2em",
    },
  },
  images: {
    productImageListItem: {
      width: 112,
      height: 112,
    },
  },
  //Misc

  styles: {
    root: {
      backgroundColor: "lightYellow",
    },
    h1: {
      fontFamily: "heading",
      fontWeight: "heading",
      fontSize: [rem(30), null, rem(40), null],
      mt: 0,
    },
    h2: {
      fontFamily: "heading",
      fontWeight: "heading",
      fontSize: [rem(24), null, rem(28), null],
      marginBottom: rem(24),
      mt: 0,
    },
    h3: {
      fontFamily: "heading",
      fontWeight: "heading",
      fontSize: [rem(17), null, rem(20)],
      marginBottom: rem(24),
      mt: 0,
    },
    h4: {
      fontFamily: "heading",
      fontWeight: "heading",
      fontSize: [rem(14), null, rem(16), null],
      mt: 0,
    },
    h5: {
      fontFamily: "heading",
      fontWeight: "heading",
      fontSize: [rem(11), null, null, rem(16)],
      mt: 0,
    },
    h6: {
      fontFamily: "heading",
      fontWeight: "heading",
      fontSize: [rem(16), null, null, rem(20)],
      mt: 0,
    },
  },
};

export default theme;

export const htmlStyles = {
  ...theme.styles,
  root: {},
  h3: {
    marginBottom: rem(16),
    marginTop: rem(32),
    lineHeight: 1.1,
    fontFamily: "heading",
  },
  "h1, h2, h4, h5, h6": {
    marginBottom: rem(20),
    marginTop: rem(32),
    lineHeight: 1.1,
    fontFamily: "heading",
  },
  ul: {
    margin: 0,
    padding: 0,
    li: {
      lineHeight: 1.5,
      "&::before": {
        content: "•  ",
        color: theme.colors.orange,
      },
      marginBottom: rem(16),
    },
  },
  p: {
    fontSize: [rem(16)],
    lineHeight: 1.5,
    marginBottom: rem(16),
  },
};
