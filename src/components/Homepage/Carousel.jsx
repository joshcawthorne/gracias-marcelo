import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import getRandomMessages from "src/services/getRandomMessages";
import styled, { css } from "styled-components";
import SwiperCore, { Autoplay, Navigation, FreeMode } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import mq from "src/utils/mq";
import {
  useWindowSize,
  useWindowWidth,
  useWindowHeight,
} from "@react-hook/window-size";

const ContentContainer = styled(motion.div)`
  user-select: none;
  cursor: grab;
  .swiper {
    width: 100vw;

    padding: 20px 0;
  }
`;

const StyledSwiper = styled(Swiper)`
  height: 100%;
  width: 100%;
  padding-top: 30px;
  z-index: 5;

  .swiper-wrapper {
    overflow-y: visible;
    -webkit-transition-timing-function: linear !important;
    -o-transition-timing-function: linear !important;
    transition-timing-function: linear !important;
  }
`;

const CarouselObject = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  flex-direction: column;
  width: 100%;
  height: 300px;
  background: #120a1f;
  border: 2px solid rgba(255, 255, 255, 0.31);
  box-sizing: border-box;
  border-radius: 5px;
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
  display: flex;
  align-items: center;
  letter-spacing: 0.01em;
  color: #ffffff;
  padding: 50px 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  line-clamp: 9;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  text-align: left;
  user-select: none;
  p {
    margin-bottom: 10px;
  }
  ${mq.mobile(css`
    height: 200px;
    font-size: 16px;
    line-height: 22px;
    padding: 25px 15px;
    line-clamp: 5;
    p {
      margin-bottom: 5px;
    }
  `)};
`;

const AnimLayer = styled(motion.div)``;

const SliderAnim = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      delayChildren: 0.5,
      staggerChildren: 0.05,
    },
  },
};

const ItemAnim = {
  hidden: { opacity: 0, y: 80 },
  show: {
    opacity: [0, 0.5, 1],
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      type: "spring",
      velocity: 100,
      stiffness: 700,
      damping: 100,
    },
  },
};

function Carousel() {
  SwiperCore.use([Autoplay, Navigation, FreeMode]);
  const swiperRef = useRef(null);
  const [carouselData, setCarouselData] = useState([]);
  const [loading, setLoading] = useState(true);
  const width = useWindowWidth();

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    setLoading(true);
    const { data, error, errorMessage } = await getRandomMessages();
    if (data) {
      setCarouselData(data);
      setLoading(false);
    }
  }

  if (loading) {
    return null;
  }

  function NewlineText(props) {
    const text = props.text;
    return text.split("\n").map((str, i) => <p key={i}>{str}</p>);
  }

  function truncate(str, n, useWordBoundary) {
    if (str?.length <= n) {
      return str;
    }
    const subString = str.substr(0, n - 1);
    return (
      (useWordBoundary
        ? subString.substr(0, subString.lastIndexOf(" "))
        : subString) + "..."
    );
  }

  return (
    <ContentContainer>
      <motion.div
        style={{ touchEvents: "none" }}
        variants={SliderAnim}
        initial="hidden"
        animate="show"
      >
        <StyledSwiper
          ref={swiperRef}
          slidesPerView={"auto"}
          spaceBetween={15}
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          allowTouchMove={true}
          speed={40000}
          loop={true}
          freeMode={true}
          resistanceRatio={1}
          resistance
          freeModeMomentum={true}
        >
          {carouselData.map((item, i) => (
            <SwiperSlide
              key={i}
              style={{
                height: width > 767 ? "300px" : "160px",
                maxWidth: "600px",
                overflowY: "visible",
              }}
            >
              <AnimLayer key={i} variants={ItemAnim}>
                <CarouselObject key={i}>
                  <NewlineText text={truncate(item.message_content, 240)} />
                </CarouselObject>
              </AnimLayer>
            </SwiperSlide>
          ))}
        </StyledSwiper>
      </motion.div>
    </ContentContainer>
  );
}

export default Carousel;
