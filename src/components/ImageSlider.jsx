import React from 'react'
// import SimpleImageSlider from "react-simple-image-slider";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";



function ImageSlider({image}) {

  const images = [
    {
      original: image,
      thumbnail: image,
    },
    {
      original: image,
      thumbnail: image,
    },
    {
      original: image,
      thumbnail: image,
    },
  ]

  return (
    <>
      <div className='relative w-full -mt-16 h-full '>
        <ImageGallery items={images} showPlayButton={false} showBullets={true} />
      </div>
    </>
  )
}

export default ImageSlider