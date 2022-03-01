import styled from "styled-components";
import Script from "next/script";
import Header from "src/components/Header";
import Footer from "src/components/Footer";

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
      <Footer />
    </PageContainer>
  );
}

export default PageLayout;
