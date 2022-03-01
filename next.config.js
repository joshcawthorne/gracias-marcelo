const path = require("path");
const withImages = require("next-images");

const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_CAPTCHA: process.env.NEXT_PUBLIC_CAPTCHA,
  },
  webpack: (config) => {
    module: {
      rules: [
        {
          test: /\.css$/,
          include: path.join(__dirname, "src"),
          use: [
            "style-loader",
            {
              loader: "typings-for-css-modules-loader",
              options: {
                modules: true,
                namedExport: true,
              },
            },
          ],
        },
      ];
    }
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "babel-loader",
        },
        {
          loader: "react-svg-loader",
          options: {
            jsx: true,
            svgo: {
              plugins: [
                {
                  cleanupIDs: {
                    prefix: {
                      toString() {
                        this.counter = this.counter || 0;
                        return `id-${this.counter++}`;
                      },
                    },
                  },
                },
                {
                  removeTitle: true,
                },
              ],
            },
          },
        },
      ],
    });

    return config;
  },
};
module.exports = nextConfig;
