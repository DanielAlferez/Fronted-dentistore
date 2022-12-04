import React from 'react'
import "./presen.css"
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import IMG1 from '../../../images/dis1.png'
import IMG2 from '../../../images/dis2.png'
import IMG3 from '../../../images/dis3.png'
import IMG4 from '../../../images/dis4.png'
import INI1 from '../../../images/inicio1.png'
import INI2 from '../../../images/inicio2.png'
import INI3 from '../../../images/inicio3.png'
import INI4 from '../../../images/inicio4.png'
import INI5 from '../../../images/inicio5.png'

const images = [
    {
        thumbnail: IMG1,
    },
    {
        thumbnail: IMG2,
    },
    {
        thumbnail: IMG3,
    },
    {
        thumbnail: IMG4,
    },
    {
        thumbnail: IMG1,
    },
    {
        thumbnail: IMG2,
    },
    {
        thumbnail: IMG3,
    },
    {
        thumbnail: IMG4,
    },
  ]

function Presentation() {
  return (
    <>
        <div className='grid grid-cols-1 lg:grid-cols-2'>
            <div>
                <h1 className='text-4xl sm:text-5xl font-bold mb-10'>Denti Store</h1>
                <p className="text-gray-600 text-lg sm:text-xl ">Insumos, Materiales y Equipos para Odonlogía y Mecanica Dental</p>
                <div className='flex gap-2 lg:gap-5'>
                    <button className='text-sm sm:text-md bg-gray-200 hover:bg-black hover:text-white text-black rounded-3xl my-10 px-5 py-3'> Productos Recientes</button>
                    <button className='text-sm sm:text-md bg-gray-200 hover:bg-black hover:text-white text-black rounded-3xl my-10 px-5 py-3'>Todos los Productos</button>
                </div>
                <p className="text-gray-400 text-md sm:text-lg mt-0 lg:mt-20">Nuestros Distribuidores</p>
                <div>
                    <ImageGallery items={images} autoPlay={true} showPlayButton={false} showBullets={false} showFullscreenButton={false} showNav={false} />
                </div>
            </div>
            <div className='relative flex justify-center mt-10 lg:mt-0 lg:justify-end'>
                <div class='gotas'>
                    <div className='absolute -top-20 right-0 w-48' >
                        <img class="images" src={INI1} alt="" />
                    </div>
                    <div className='absolute -top-20 left-0 w-48' >
                        <img class="images" src={INI2} alt="" />
                    </div>
                    <div className='absolute bottom-20 right-0 w-40' >
                        <img class="images" src={INI3} alt="" />
                    </div>
                    <div className='absolute rotate-45 top-16 left-64 w-6' >
                        <img class="images" src={INI4} alt="" />
                        </div>
                    <div className='absolute bottom-20 left-0 w-36' >
                        <img class="images" src={INI5} alt="" />
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Presentation