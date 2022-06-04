import { useMemo, useState, useEffect } from "react";
import "./styles.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Controller } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export const CardImages = (props) => {
  const { data, imageSelected, setIndexActive } = props;
  const { index, item } = imageSelected;
  const [swiper, setSwiper] = useState();
  const [currentIndex, setCurrentIndex] = useState(0);

  const clickNext = () => {
    const maxslide = data.length - 1;
    const actualValue = swiper.activeIndex;
    if (actualValue === maxslide) {
      swiper.slideTo(0);
      setCurrentIndex(0);
    } else {
      swiper.slideNext();
      setCurrentIndex(index);
    }
  };

  const clickPrevious = () => {
    const maxslide = data.length - 1;
    const actualValue = swiper.activeIndex;
    if (actualValue === 0) {
      swiper.slideTo(maxslide);
      setCurrentIndex(maxslide);
    } else {
      swiper.slidePrev();
      setCurrentIndex(index);
    }
  };

  useEffect(
    () => {
      if (item && item?.url) {
        let value = 0;
        if (index > currentIndex) value = index - currentIndex;
        else value = currentIndex - index;
        if (index > currentIndex && value === 1) {
          swiper.slideNext();
        } else if (index < currentIndex && value === 1) {
          swiper.slidePrev();
        } else {
          swiper.slideTo(index);
        }
        console.log("index from images: ", index);
        setCurrentIndex(index);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [imageSelected, index]
  );

  return useMemo(
    () => {
      return (
        data &&
        data.length > 0 && (
          <div
            className={`carousel-container ${
              item && item.url ? "card--visible__display" : "card--visible"
            }`}
          >
            {(window.innerWidth > 991) &&
            (
              <div className="swiper-button" onClick={clickPrevious}>
                <img
                  width="32"
                  src={require("../../../../assets/icon/left-arrow.png")}
                  alt="arrow-left"
                />
              </div>
            )}

            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y, Controller]}
              className="external-buttons"
              spaceBetween={1}
              slidesPerView={1}
              updateOnWindowResize
              observer
              observeParents
              effect="cube"
              initialSlide={0}
              onSwiper={setSwiper}
              onSlideChange={(e) => setIndexActive(e.activeIndex)}
            >
              {data.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="card__img flex-center">
                    <img
                      alt={image.title}
                      className="card__img--size flex-center"
                      src={image.url}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {(window.innerWidth > 991) &&
            (
              <div className="swiper-button" onClick={clickNext}>
                <img
                  width="32"
                  src={require("../../../../assets/icon/right-arrow.png")}
                  alt="arrow-right"
                />
              </div>
            )}
          </div>
        )
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, index, swiper]
  );
};
