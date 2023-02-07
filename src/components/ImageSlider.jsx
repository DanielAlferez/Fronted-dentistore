import React from 'react'
// import SimpleImageSlider from "react-simple-image-slider";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import IMG1 from "../../images/imagen-no-disponible.jpg"

function ImageSlider({ images }) {

  const imageArray = images.map(image => {
    return {
      original: `data:image/png;base64,${image.image_text}`,
      thumbnail: `data:image/png;base64,${image.image_text}`,
    };
  });
  
  if(imageArray.length === 0){
    imageArray.push({
      original: IMG1,
      thumbnail: IMG1,
    })
  }

  const [width, setWidth] = React.useState(window.innerWidth);

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  React.useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <ImageGallery
        showThumbnails={width < 768 ? false : true}
        showNav={true}
        items={imageArray}
        showPlayButton={false}
        lazyLoad={true}
        showFullscreenButton={false}
      />
    </div>
  );
}



export default ImageSlider