import styled from "styled-components";
import Script from "next/script";
import Header from "src/components/Header";
import Footer from "src/components/Footer";
import Head from "next/head";

const PageContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: #130c1f;
`;

const ContentContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function PageLayout({ children, setRemoveZIndex, removeZIndex }) {
  return (
    <PageContainer>
      <Head>
        <title>Gracias, Marcelo</title>
      </Head>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/static/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/static/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/static/favicon-16x16.png"
      />
      <link rel="manifest" href="/static/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/static/safari-pinned-tab.svg"
        color="#505665"
      />
      <meta name="msapplication-TileColor" content="#505665" />
      <meta name="theme-color" content="#505665"></meta>
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
      <meta property="og:url" content="https://gracias-marcelo.lufctrust.com" />
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
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-HGVBEPRWDB"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
           window.dataLayer = window.dataLayer || [];
           function gtag(){dataLayer.push(arguments);}
           gtag('js', new Date());
         
           gtag('config', 'G-HGVBEPRWDB');
        `}
      </Script>
      <Header removeZIndex={removeZIndex} />
      <ContentContainer setRemoveZIndex={setRemoveZIndex}>
        {children}
      </ContentContainer>
      <Footer removeZIndex={removeZIndex} />
    </PageContainer>
  );
}

export default PageLayout;
