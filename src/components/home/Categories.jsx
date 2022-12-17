import React from 'react'
import IMG1 from '../../../images/inicio1.png'
import IMG2 from '../../../images/inicio2.png'
import IMG3 from '../../../images/inicio6.png'
import IMG4 from '../../../images/inicio5.png'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import "slick-carousel"
import "./stylesCarousel.css"


function Categories() {

  const URL = "http://127.0.0.1:8000/api/categories"
  const [data,setData] = React.useState([]);

  React.useEffect(() =>{
    async function loadCategories() {
      const res = await fetch(URL);
      const data = await res.json();
      setData(data);
    }
    loadCategories()
    if(!data.length){
      const data = [
        {"category_id":0,"category_name":"No hay categorias disponibles"}
      ]
      setData(data)
    }
  },[])

  return (  
    <div >
        <Slider
        slidesToShow={5}
        slidesToScroll={2}
        autoplay={true}
        className="mx-5 hidden lg:block rounded-3xl  py-3"
        >
            <div className='group cursor-pointer text-center p-2 rounded-xl'>
                <center>
                <div className='flex items-center rounded-full h-44 w-44 bg-gray-900 group-hover:bg-black'>
                    <img className='w-full content-center group-hover:animate-up-box' src={IMG1} alt="" />
                </div>
                </center>
                <h1 className='text-gray-700 group-hover:text-black font-bold text-lg my-3'>Dientes Acrílicos</h1>
            </div>
            <div className='group cursor-pointer text-center p-2 rounded-xl'>
                <center>
                <div className='flex items-center rounded-full h-44 w-44 bg-gray-900 group-hover:bg-black'>
                    <img className='w-full content-center group-hover:animate-up-box' src={IMG2} alt="" />
                </div>
                </center>
                <h1 className='text-gray-700 group-hover:text-black font-bold text-lg my-3'>Dientes Acrílicos</h1>
            </div>
            <div className='group cursor-pointer text-center p-2 rounded-xl'>
                <center>
                <div className='flex items-center rounded-full h-44 w-44 bg-gray-900 group-hover:bg-black'>
                    <img className='w-full content-center group-hover:animate-up-box' src={IMG3} alt="" />
                </div>
                </center>
                <h1 className='text-gray-700 group-hover:text-black font-bold text-lg my-3'>Dientes Acrílicos</h1>
            </div>
            <div className='group cursor-pointer text-center p-2 rounded-xl'>
                <center>
                <div className='flex items-center rounded-full h-44 w-44 bg-gray-900 group-hover:bg-black'>
                    <img className='w-full content-center group-hover:animate-up-box' src={IMG4} alt="" />
                </div>
                </center>
                <h1 className='text-gray-700 group-hover:text-black font-bold text-lg my-3'>Dientes Acrílicos</h1>
            </div>
            <div className='group cursor-pointer text-center p-2 rounded-xl'>
                <center>
                <div className='flex items-center rounded-full h-44 w-44 bg-gray-900 group-hover:bg-black'>
                    <img className='w-full content-center group-hover:animate-up-box' src={IMG1} alt="" />
                </div>
                </center>
                <h1 className='text-gray-700 group-hover:text-black font-bold text-lg my-3'>Dientes Acrílicos</h1>
            </div>
            <div className='group cursor-pointer text-center p-2 rounded-xl'>
                <center>
                <div className='flex items-center rounded-full h-44 w-44 bg-gray-900 group-hover:bg-black'>
                    <img className='w-full content-center group-hover:animate-up-box' src={IMG2} alt="" />
                </div>
                </center>
                <h1 className='text-gray-700 group-hover:text-black font-bold text-lg my-3'>Dientes Acrílicos</h1>
            </div>
            <div className='group cursor-pointer text-center p-2 rounded-xl'>
                <center>
                <div className='flex items-center rounded-full h-44 w-44 bg-gray-900 group-hover:bg-black'>
                    <img className='w-full content-center group-hover:animate-up-box' src={IMG3} alt="" />
                </div>
                </center>
                <h1 className='text-gray-700 group-hover:text-black font-bold text-lg my-3'>Dientes Acrílicos</h1>
            </div>
            <div className='group cursor-pointer text-center p-2 rounded-xl'>
                <center>
                <div className='flex items-center rounded-full h-44 w-44 bg-gray-900 group-hover:bg-black'>
                    <img className='w-full content-center group-hover:animate-up-box' src={IMG4} alt="" />
                </div>
                </center>
                <h1 className='text-gray-700 group-hover:text-black font-bold text-lg my-3'>Dientes Acrílicos</h1>
            </div>
        </Slider>

        <Slider
        slidesToShow={3}
        slidesToScroll={1}
        autoplay={true}
        className="mx-5 hidden md:block lg:hidden"
        >
            <div className='group cursor-pointer text-center p-2 rounded-xl'>
                <center>
                <div className='flex items-center rounded-full h-44 w-44 bg-gray-900 group-hover:bg-black'>
                    <img className='w-full content-center group-hover:animate-up-box' src={IMG1} alt="" />
                </div>
                </center>
                <h1 className='text-gray-700 group-hover:text-black font-bold text-lg my-3'>Dientes Acrílicos</h1>
            </div>
            <div className='group cursor-pointer text-center p-2 rounded-xl'>
                <center>
                <div className='flex items-center rounded-full h-44 w-44 bg-gray-900 group-hover:bg-black'>
                    <img className='w-full content-center group-hover:animate-up-box' src={IMG2} alt="" />
                </div>
                </center>
                <h1 className='text-gray-700 group-hover:text-black font-bold text-lg my-3'>Dientes Acrílicos</h1>
            </div>
            <div className='group cursor-pointer text-center p-2 rounded-xl'>
                <center>
                <div className='flex items-center rounded-full h-44 w-44 bg-gray-900 group-hover:bg-black'>
                    <img className='w-full content-center group-hover:animate-up-box' src={IMG3} alt="" />
                </div>
                </center>
                <h1 className='text-gray-700 group-hover:text-black font-bold text-lg my-3'>Dientes Acrílicos</h1>
            </div>
            <div className='group cursor-pointer text-center p-2 rounded-xl'>
                <center>
                <div className='flex items-center rounded-full h-44 w-44 bg-gray-900 group-hover:bg-black'>
                    <img className='w-full content-center group-hover:animate-up-box' src={IMG4} alt="" />
                </div>
                </center>
                <h1 className='text-gray-700 group-hover:text-black font-bold text-lg my-3'>Dientes Acrílicos</h1>
            </div>
            <div className='group cursor-pointer text-center p-2 rounded-xl'>
                <center>
                <div className='flex items-center rounded-full h-44 w-44 bg-gray-900 group-hover:bg-black'>
                    <img className='w-full content-center group-hover:animate-up-box' src={IMG1} alt="" />
                </div>
                </center>
                <h1 className='text-gray-700 group-hover:text-black font-bold text-lg my-3'>Dientes Acrílicos</h1>
            </div>
            <div className='group cursor-pointer text-center p-2 rounded-xl'>
                <center>
                <div className='flex items-center rounded-full h-44 w-44 bg-gray-900 group-hover:bg-black'>
                    <img className='w-full content-center group-hover:animate-up-box' src={IMG2} alt="" />
                </div>
                </center>
                <h1 className='text-gray-700 group-hover:text-black font-bold text-lg my-3'>Dientes Acrílicos</h1>
            </div>
            <div className='group cursor-pointer text-center p-2 rounded-xl'>
                <center>
                <div className='flex items-center rounded-full h-44 w-44 bg-gray-900 group-hover:bg-black'>
                    <img className='w-full content-center group-hover:animate-up-box' src={IMG3} alt="" />
                </div>
                </center>
                <h1 className='text-gray-700 group-hover:text-black font-bold text-lg my-3'>Dientes Acrílicos</h1>
            </div>
            <div className='group cursor-pointer text-center p-2 rounded-xl'>
                <center>
                <div className='flex items-center rounded-full h-44 w-44 bg-gray-900 group-hover:bg-black'>
                    <img className='w-full content-center group-hover:animate-up-box' src={IMG4} alt="" />
                </div>
                </center>
                <h1 className='text-gray-700 group-hover:text-black font-bold text-lg my-3'>Dientes Acrílicos</h1>
            </div>
        </Slider>

        <Slider
        slidesToShow={1}
        slidesToScroll={1}
        autoplay={true}
        variableWidth={true}
        className="mx-5 block md:hidden"
        >
            <div className='group cursor-pointer text-center p-2 rounded-xl'>
                <center>
                <div className='flex items-center rounded-full h-44 w-44 bg-gray-900 group-hover:bg-black'>
                    <img className='w-full content-center group-hover:animate-up-box' src={IMG1} alt="" />
                </div>
                </center>
                <h1 className='text-gray-700 group-hover:text-black font-bold text-lg my-3'>Dientes Acrílicos</h1>
            </div>
            <div className='group cursor-pointer text-center p-2 rounded-xl'>
                <center>
                <div className='flex items-center rounded-full h-44 w-44 bg-gray-900 group-hover:bg-black'>
                    <img className='w-full content-center group-hover:animate-up-box' src={IMG2} alt="" />
                </div>
                </center>
                <h1 className='text-gray-700 group-hover:text-black font-bold text-lg my-3'>Dientes Acrílicos</h1>
            </div>
            <div className='group cursor-pointer text-center p-2 rounded-xl'>
                <center>
                <div className='flex items-center rounded-full h-44 w-44 bg-gray-900 group-hover:bg-black'>
                    <img className='w-full content-center group-hover:animate-up-box' src={IMG3} alt="" />
                </div>
                </center>
                <h1 className='text-gray-700 group-hover:text-black font-bold text-lg my-3'>Dientes Acrílicos</h1>
            </div>
            <div className='group cursor-pointer text-center p-2 rounded-xl'>
                <center>
                <div className='flex items-center rounded-full h-44 w-44 bg-gray-900 group-hover:bg-black'>
                    <img className='w-full content-center group-hover:animate-up-box' src={IMG4} alt="" />
                </div>
                </center>
                <h1 className='text-gray-700 group-hover:text-black font-bold text-lg my-3'>Dientes Acrílicos</h1>
            </div>
            <div className='group cursor-pointer text-center p-2 rounded-xl'>
                <center>
                <div className='flex items-center rounded-full h-44 w-44 bg-gray-900 group-hover:bg-black'>
                    <img className='w-full content-center group-hover:animate-up-box' src={IMG1} alt="" />
                </div>
                </center>
                <h1 className='text-gray-700 group-hover:text-black font-bold text-lg my-3'>Dientes Acrílicos</h1>
            </div>
            <div className='group cursor-pointer text-center p-2 rounded-xl'>
                <center>
                <div className='flex items-center rounded-full h-44 w-44 bg-gray-900 group-hover:bg-black'>
                    <img className='w-full content-center group-hover:animate-up-box' src={IMG2} alt="" />
                </div>
                </center>
                <h1 className='text-gray-700 group-hover:text-black font-bold text-lg my-3'>Dientes Acrílicos</h1>
            </div>
            <div className='group cursor-pointer text-center p-2 rounded-xl'>
                <center>
                <div className='flex items-center rounded-full h-44 w-44 bg-gray-900 group-hover:bg-black'>
                    <img className='w-full content-center group-hover:animate-up-box' src={IMG3} alt="" />
                </div>
                </center>
                <h1 className='text-gray-700 group-hover:text-black font-bold text-lg my-3'>Dientes Acrílicos</h1>
            </div>
            <div className='group cursor-pointer text-center p-2 rounded-xl'>
                <center>
                <div className='flex items-center rounded-full h-44 w-44 bg-gray-900 group-hover:bg-black'>
                    <img className='w-full content-center group-hover:animate-up-box' src={IMG4} alt="" />
                </div>
                </center>
                <h1 className='text-gray-700 group-hover:text-black font-bold text-lg my-3'>Dientes Acrílicos</h1>
            </div>
        </Slider>
        
        {/* {data.map((item) => (
            <div key={item.category_id}>
                <Slider
                slidesToShow={1}
                slidesToScroll={1}
                autoplay={true}
                className="mx-5 hidden lg:block"
                > 
                    <div className='bg-light hover:bg-dark cursor-pointer text-center p-2'>
                        <h1 className='text-white font-extrabold text-3xl'>{item.category_name}</h1> */}
                        {/* <center><img className='h-40 content-center' src={IMG1} alt="" /></center> */}
                    {/* </div>
                </Slider>

                <Slider
                slidesToShow={1}
                slidesToScroll={1}
                autoplay={true}
                className="mx-5 hidden md:block lg:hidden"
                >
                    <div className=' bg-light hover:bg-dark cursor-pointer text-center p-2'>
                        <h1 className='text-white font-extrabold text-3xl'>{item.category_name}</h1> */}
                        {/* <center><img className='h-40 content-center' src={IMG1} alt="" /></center> */}
                    {/* </div>

                </Slider>

                <Slider
                slidesToShow={1}
                slidesToScroll={1}
                autoplay={true}
                className="mx-5 block md:hidden"
                >
                    <div className=' bg-light hover:bg-dark cursor-pointer text-center p-2'>
                        <h1 className='text-white font-extrabold text-3xl'>{item.category_name}</h1>
                        {/* <center><img className='h-40 content-center' src={IMG1} alt="" /></center> */}
                    {/* </div>

                </Slider> */}
            {/* </div>
        ))}   */}
    </div>
  )
}

export default Categories