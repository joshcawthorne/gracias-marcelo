/* eslint-disable @next/next/no-script-in-document */
import Document, { Head, Html, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();

    const page = renderPage(
      (App) => (props) => sheet.collectStyles(<App {...props} />)
    );

    const styleTags = sheet.getStyleElement();

    return { ...page, styleTags };
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          {
            <style
              dangerouslySetInnerHTML={{
                __html: `
                  html {background: #333}
                  body #__next div {visibility: hidden}
                  body.loaded #__next div {visibility: visible}
              `,
              }}
            ></style>
          }
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />

          <link
            href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@100;200;300;400;500;600;800;900&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
            rel="stylesheet"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="title" content="Gracias, Marcelo" />
          <meta
            name="description"
            content="A collection of thank you messages for Marcelo Bielsa, from Leeds United fans around the World."
          />
          <meta
            name="keywords"
            content="LUFC, Leeds United, Marcelo Bielsa, Bielsa, Leeds, Premier League"
          />
          <meta name="robots" content="index, follow" />
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="language" content="English" />
          <meta name="author" content="Josh Cawthorne" />
          <meta property="og:title" content="Gracias, Marcelo" />
          <meta property="og:site_name" content="Gracias, Marcelo" />
          <meta
            property="og:url"
            content="https://gracias-marcelo.lufctrust.com"
          />
          <meta
            property="og:description"
            content="A collection of thank you messages for Marcelo Bielsa, from Leeds United fans around the World."
          />
          <meta property="og:type" content="website" />
          <meta
            property="og:image"
            content="https://gracias-marcelo.lufctrust.com/og-image.jpg?v=2"
          />

          <meta name="title" content="Gracias, Marcelo." />
          <meta
            name="description"
            content="A collection of thank you messages for Marcelo Bielsa, from Leeds United fans around the World."
          />

          <meta property="og:type" content="website" />
          <meta
            property="og:url"
            content="https://gracias-marcelo.lufctrust.com/"
          />
          <meta property="og:title" content="Gracias, Marcelo." />
          <meta
            property="og:description"
            content="A collection of thank you messages for Marcelo Bielsa, from Leeds United fans around the World."
          />
          <meta
            property="og:image"
            content="https://gracias-marcelo.lufctrust.com/og-image.jpg?v=2"
          />

          <meta property="twitter:card" content="summary_large_image" />
          <meta
            property="twitter:url"
            content="https://gracias-marcelo.lufctrust.com/"
          />
          <meta property="twitter:title" content="Gracias, Marcelo." />
          <meta
            property="twitter:description"
            content="A collection of thank you messages for Marcelo Bielsa, from Leeds United fans around the World."
          />
          <meta
            property="twitter:image"
            content="https://gracias-marcelo.lufctrust.com/og-image.jpg?v=2"
          />

          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
