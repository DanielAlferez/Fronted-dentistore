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

  const [width, setWidth] = React.useState(window.innerWidth);

  const handleResize = () => {
    setWidth(window.innerWidth)
  }

  React.useEffect(() => {
    window.addEventListener("resize", handleResize)
  }, [])

  return (
    <>
      <div>
        <ImageGallery showThumbnails={width < 768 ? false : true } showNav={true} items={images} showPlayButton={false} lazyLoad={true} showFullscreenButton={false}/>
      </div>
    </>
  )
}

export default ImageSlider