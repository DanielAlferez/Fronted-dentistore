import React from 'react'
import PropTypes from "prop-types";
import { Navigation, Thumbs } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import products from "../data/products";
import "./images.scss"


function ImageSlider({image}) {
    const [activate, setActivate] = React.useState()

  return (
    <>
        <Swiper
            loop={true}
            spaceBetween={20}
            navigation={true}
            modules={[Navigation, Thumbs]}
            grabCursor={true}
            thumbs={{swiper: activate}}
            // touchRatio={1.5}
            // pagination={{clickable: true}}
            // slidesPerView={1}
            // centeredSlides={true}
            className="product-images-slider"

        >
            {products.map((element, index) => (
                <SwiperSlide key={index} className="pt-1">
                    <img src={element.image} alt="" />
                </SwiperSlide>
            ))}

        </Swiper>
        <Swiper
            // onSwiper={setActivate}
            loop={true}
            spaceBetween={10}
            slidesPerView={4}
            modules={[Navigation, Thumbs]}
            className='product-images-slider-thumbs'

        >
            {products.map((element, index) => (
                <SwiperSlide key={index} className="pt-1">
                    <div className='product-images-slider-thumbs-wrapper'>
                        <img src={element.image} alt="product images" />
                    </div>
                </SwiperSlide>
            ))}

        </Swiper>
    </>
  )
}

export default ImageSlider