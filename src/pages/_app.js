import { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";

import PageLayout from "src/layouts/PageLayout";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  * {
    margin: 0;
    font-family: 'Public Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  html, body {
    height: 100%;
    background-color: #130c1f;
  }

  body {
    -webkit-font-smoothing: antialiased;
  }

  img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
  }

  input, button, textarea, select {
    font: inherit;
  }

  p, h1, h2, h3, h4, h5, h6 {
    overflow-wrap: break-word;
    margin: 0;
    padding: 0;
  }

  #root, #__next {
    isolation: isolate;
  }

  body {
    font-family: "Roobert", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    padding: 0;
    margin: 0;
  }
`;

const GraciasMarcelo = ({ Component: Component, pageProps }) => {
  const [removeZIndex, setRemoveZIndex] = useState(false);
  if (process.browser) {
    document.body.classList.add("loaded");
  }
  return (
    <PageLayout removeZIndex={removeZIndex} setRemoveZIndex={setRemoveZIndex}>
      <GlobalStyle />
      <Component {...pageProps} setRemoveZIndex={setRemoveZIndex}></Component>
    </PageLayout>
  );
};

export default GraciasMarcelo;
