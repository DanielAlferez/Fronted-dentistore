import React from "react";

export default function Slider(){
    const images = ["../../public/banner.png","../../public/molde.jpg","../../public/insumos.jpg"]
    
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [selectedImage, setSelectedImage] = React.useState(images[0]);
    // const [loaded, setLoaded] = React.useState<boolean>(false);
  
    const setNewImage = (index, imagesArray, next = true) => {
      setTimeout(() => {
        const condition = next ? selectedIndex < images.length - 1 : selectedIndex > 0;
        const nextIndex = next
          ? condition
            ? selectedIndex + 1
            : 0
          : condition
          ? selectedIndex - 1
          : images.length - 1;
  
        setSelectedImage(images[nextIndex]);
        setSelectedIndex(nextIndex);
      }, 500);
    };
    
    const previousIndex = () => {
        setNewImage(selectedIndex, images, false);
      };
    
      const nextIndex = () => {
        setNewImage(selectedIndex, images);
      };
    
    return(
        <div className="max-w-2xl mx-auto">

	<div id="default-carousel" className="relative" data-carousel="static">
        
        <div className="overflow-hidden relative h-56 rounded-lg sm:h-64 xl:h-80 2xl:h-96">
        
                <div className="duration-700 ease-in-out" data-carousel-item>
                    <span className="absolute top-1/2 left-1/2 text-2xl font-semibold text-white -translate-x-1/2 -translate-y-1/2 sm:text-3xl dark:text-gray-800">First Slide</span>
                    <img src={selectedImage} className="block absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2"/>
                </div>

        
            
        </div>
        
        <div className="flex absolute bottom-5 left-1/2 z-30 space-x-3 -translate-x-1/2">
            <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 1" data-carousel-slide-to="0"></button>
            <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
            <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
        </div>
        
        <button type="button" className="flex absolute top-0 left-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none" data-carousel-prev onClick={()=>previousIndex()}>
            <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                <p>{"<"}</p>
                <span className="hidden">Previous</span>
            </span>
        </button>
        <button type="button" className="flex absolute top-0 right-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none" data-carousel-next  onClick={()=>nextIndex()}>
            <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                <p>{">"}</p>
                <span className="hidden">Next</span>
            </span>
        </button>
    </div>
    <script src="https://unpkg.com/flowbite@1.4.0/dist/flowbite.js"></script>
</div>
    )
}
