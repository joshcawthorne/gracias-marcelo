import styled from "styled-components";

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

function PageLayout({ children }) {
  return (
    <PageContainer>
      <Header />
      <ContentContainer>{children}</ContentContainer>
      <Footer />
    </PageContainer>
  );
}

export default PageLayout;
