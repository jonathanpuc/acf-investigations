//github.com/zeit/next.js/blob/canary/examples/with-ant-design-less/next.config.js

const path = require("path");
const withCSS = require("@zeit/next-css");
const withFonts = require("next-fonts");
require("dotenv").config();

module.exports = withFonts(
  withCSS({
    webpack: config => {
      config.resolve.alias["~"] = path.resolve(__dirname);
      config.module.rules.push({
        test: /\.yaml$/,
        use: "js-yaml-loader"
      });

      return config;
    },

    env: {
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
      FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
      FIREBASE_DATABASE_URL: process.env.FIREBASE_DATABASE_URL,
      FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
      FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
      FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
      FIREBASE_APP_ID: process.env.FIREBASE_APP_ID
    }
  })
);
