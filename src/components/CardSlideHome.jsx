import React, { Component } from "react";
import { render } from "react-dom";
import "./slide.css";
import IMG1 from '../../images/banner.png'
import IMG2 from '../../images/molde.jpg'
import IMG3 from '../../images/insumos.jpg'
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from "react-icons/md";

export default function CardSlideHome() {
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const checkNext = () => {
    const labels = document.querySelectorAll('#slider label');
    const nextIndex = selectedIndex === (labels.length - 1) ? 0 : selectedIndex + 1; 
    setSelectedIndex(nextIndex);
  }

  const check = index => setSelectedIndex(index);

    return (
    <>
        <div className="relative mb-20 w-full px-20 h-72">
            <div className="relative justify-center content-center absolue inset-x-0 top-0 ">
                <div className=" mb-6 text-center items-center inset-0">
                    
                    <section
                    id="slider"
                    className="w-full h-full inline-flex items-center justify-center mb-5 "
                    >
                        <div className="absolute z-50 mt-80 mr-96">
                            <div >
                                <button
                                    className="text-2xl text-black bg-gray-300 hover:bg-gray-500 rounded-full w-8 h-8 opacity-80 flex justify-center items-center"
                                    onClick={checkNext}>
                                        <MdOutlineArrowBackIos/>
                                </button>
                            </div>
                        </div>
                        <input
                            type="radio"
                            id="s1"
                            className="invisible"
                            checked={selectedIndex === 0}
                            onClick={() => check(0)}
                        />
                        <input 
                            type="radio" 
                            className="invisible"
                            id="s2" 
                            checked={selectedIndex === 1}
                            onClick={() => check(1)}
                        />
                        <input
                            type="radio"
                            id="s3"
                            className="invisible"
                            checked={selectedIndex === 2}
                            onClick={() => check(2)}
                        />
                        <label htmlFor="s1" id="slide1" className="w-full max-w-sm">
                            <div className="cursor-pointer bg-white border border-gray-200 rounded-lg shadow-md">
                                <img className="w-full rounded-t-lg" src={IMG2} alt="" />
                                <div className="p-5">
                                    <h5 className="text-2xl font-bold tracking-tight dark:text-black">Calidad</h5>
                                    <p className="text-md ont-normal text-gray-700 dark:tex-dark-400">Conoce más sobre la calidad de los productos que tenemos en nuestra tienda Denti Store</p>
                                </div>
                            </div>
                        </label>
                        <label htmlFor="s2" id="slide2" className="w-full max-w-sm">
                            <div className="cursor-pointer bg-white border border-gray-200 rounded-lg shadow-md">
                                <img className="w-full rounded-t-lg" src={IMG1} alt="" />
                                <div className="p-5">
                                    <h5 className="text-2xl  font-bold tracking-tight dark:text-black">Denti Store</h5>
                                    <p className="text-md font-normal text-gray-700 dark:tex-dark-400">Conoce más sobre nuestra empresa y los productos que ofrecemos</p>
                                </div>
                            </div>
                        </label>
                        <label htmlFor="s3" id="slide3" className="w-full max-w-sm ">
                            <div className="cursor-pointer bg-white border border-gray-200 rounded-lg shadow-md">
                                <img className="rounded-t-lg" src={IMG3} alt="" />
                                <div className="p-5">
                                    <h5 className="text-2xl font-bold tracking-tight dark:text-black">Tecnología</h5>
                                    <p className="text-md font-normal text-gray-700 dark:tex-dark-400">Conoce sobre la tecnología que usamos en nuestros productos</p>
                                </div>
                            </div>
                        </label>
                        <div className=" absolute z-50 mt-80 ml-96" >
                            <button 
                                className="text-2xl text-black bg-gray-300 hover:bg-gray-500 rounded-full w-8 h-8 opacity-80 flex justify-center items-center"
                                onClick={checkNext}>
                                    <MdOutlineArrowForwardIos/>
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        </div>
       
    </>
    );
}