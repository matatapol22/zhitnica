import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper/modules';

export default function TestSlider() {
  return (
    <Swiper
      modules={[Navigation, Autoplay]}
      navigation={true}
      autoplay={{ delay: 3000 }}
      loop={true}
      slidesPerView={1}
    >
      <SwiperSlide><div style={{background:'lightblue',height:'200px'}}>Слайд 1</div></SwiperSlide>
      <SwiperSlide><div style={{background:'lightgreen',height:'200px'}}>Слайд 2</div></SwiperSlide>
      <SwiperSlide><div style={{background:'lightpink',height:'200px'}}>Слайд 3</div></SwiperSlide>
    </Swiper>
  );
}