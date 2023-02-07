import React, { useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { BiHeart } from "react-icons/bi";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { Dialog, Transition } from "@headlessui/react"
import { Fragment } from "react";
import {CgClose} from 'react-icons/cg'
import ImageSlider from "./ImageSlider";
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import Swal from 'sweetalert2'
import { addProduct } from "./Shop/CartFunctions";
import { CgEye, CgMoreO } from "react-icons/cg";
import { AiOutlineBgColors } from "react-icons/ai";
import {  IoMdPricetags } from "react-icons/io";
import { Link, Route, Router } from "react-router-dom";
import Products from "./Shop/Products";
import IMG7 from '../../images/imagen-no-disponible.jpg'


const Card = ({ id, title, image, price, color, description }) => {
  
  
  //const [colorS,setColor] = React.useState()
  //var colorS = color[0]
  
  const [selectColor, setSelectColor] = useState(color[0]);

  let shortDescription = description;
  if (description.length > 100) {
    shortDescription = description.substring(0, 100) + "...";
  }else{
    shortDescription = description.substring(0, 100);
  }

  const handleSetColor = (color) => {
    setSelectColor(prevState => {
        return color;
      });
  };

  const handleAddProduct = () => {

    const newProduct = {
        id,
        count:1,
        color:selectColor
    }
    addProduct(newProduct)


    const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'success',
      title: 'Producto añadido al carrito'
    })

  };

  // React.useEffect(()=>{
    
  //   console.log(title + colorS)
  // },[]);

  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }
  

  return (
    <>
      {/* onClick={}  */}
      <div onClick={openModal}  className="group relative border border-gray-300 bg-white hover:border-light hover:shadow-2xl hover:shadow-gray-400 shadow-none cursor-pointer w-full rounded-lg flex flex-col items-center justify-center">
        <div className="relative">
          <div className="h-40 sm:h-44 lg:h-48 2xl:h-52 w-full rounded-xl overflow-hidden flex">
            {(()=>{
              if(image.length > 0 ){
                return(
                  <img src={'data:image/png;base64,'+image[0].image_text} className="group-hover:animate-scale-up-center" alt="" />
                )
              }
              else{
                return(
                  <div>
                    <img src={IMG7} className="group-hover:animate-scale-up-center object-cover " alt="" />
                  </div>
                )
              }
            })()}
          </div>
        </div>
        <div className="opacity-90 invisible group-hover:visible ">
          <button  className="py-2 -mt-14 mb-3 flex text-center text-white w-36 bg-dark items-center justify-center font-medium hover:text-white rounded-3xl hover:shadow-xl">
              <CgEye className=" text-center ml-2 "/>
              <p className="text-center font-normal mx-2">Ver mas...</p>
          </button>
        </div>
        <div className="mx-1 px-4 h-full justify-center content-center">
          <h1 className="text-center font-medium leading-5 text-black">{title}</h1>
        </div>
        <div className="mx-1 mt-3 mb-6">
          <p className="font-normal text-dark text-center">${price}</p>
        </div>
      </div>

      {/* Modal */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 " onClose={closeModal}>
        <Transition.Child
            as={Fragment}
            enter="ease-out duration-100"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-0"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-0"
              >
                <Dialog.Panel className="relative w-full max-w-[24rem]  md:max-w-3xl lg:max-w-4xl transform overflow-hidden rounded-2xl bg-white p-4 md:p-0 text-left align-middle shadow-xl transition-all">


                  {/* close button */}
                  <div className="absolute top-2.5 right-2.5">
                    <button
                      onClick={closeModal}
                    >
                      <CgClose className="w-6 h-6 hover:text-gray-700"/>
                    </button>
                  </div>

                  {/* content */}
                  <div className="grid md:grid-cols-7 grid-cols-1 content-center md:px-3 md:pb-3 items-center ">
                    {/* Image */}
                    <div className="col-span-3 px-10 md:px-0">
                      <ImageSlider images={image}/>
                    </div>
                    {/* product */}
                    <div className="col-span-4 mt-5 md:mt-0 pb-2 px-4 md:p-10">
                      {/* title */}
                      <Dialog.Title
                        as="h1"
                        className="md:text-ellipsis text-xl text-center mb-5 font-medium leading-6 text-gray-900"
                      >
                        {title}
                      </Dialog.Title>

                      {/* Characteristics */}
                      <div>
                        {/* Precio */}
                        <div className="bg-gray-100 p-3 my-3 rounded-2xl flex flex-1 content-center items-center">
                          <div className="text-gray-300 font-light mr-2">
                            <IoMdPricetags className="w-6 h-6"/>
                          </div>
                          <p className="text-gray-600 font-normal -mt-1">Precio:</p>
                          <p className="-mt-0.5 text-xl ml-3 text-black font-semibold">${price}</p>

                        </div>

                        {/* Caracteristicas */}
                        <div className="my-5 ">
                          <p>{shortDescription}</p>
                          <div className="flex items-center my-2"> 
                            <CgMoreO className="text-dark h-5 w-5 text-center mr-1 "/>
                            <Link className="text-dark hover:text-light" to={`/productos/${id}`}>
                              Ver todos los detalles
                            </Link>
                          </div>
                        </div>

                                                
                        {/* Color */}
                        {color.length === 0 ? <div></div> : 
                          <div className="my-5">
                            <p className="font-semibold text-lg">Elije un color</p>
                            <div className="flex flex-wrap mt-2">
                              {color.map((color, index) => (
                              <div key={index} className={`${selectColor === color.color_name ? 'border-dark text-black bg-light' : 'border-gray-700 text-gray-700' } rounded-xl cursor-pointer border px-2 py-1.5 mr-1`}>
                                <button onClick={()=>{handleSetColor(color.color_name)}}>{color.color_name}</button>
                              </div>
                              ))}
                            </div>
                            <div className="mt-2 flex">
                              <AiOutlineBgColors className="w-6 h-6 mr-1 text-dark"/>
                              <a href="#" className="text-dark hover:text-light">Ver catalogo de colores</a>
                            </div>
                          </div>
                        }
                        {/* Cantidad
                        <div className="my-3">
                        <p className="font-semibold text-lg">Cantidad</p>
                        </div> */}
                      </div>
                      
                      {/* Add button */}
                      <div className="mt-4 flex justify-center">
                        <button
                          className="rounded-3xl py-2 mb-3 flex text-center text-white w-64 hover:bg-light bg-dark items-center justify-center font-medium hover:text-white l hover:shadow-xl"
                          onClick={handleAddProduct}
                        >
                          <MdOutlineAddShoppingCart className="text-lg text-center mr-2 "/>
                          <p>Agregar al Carrito</p>
                        </button>
                      </div>

                      {/* Close Modal */}
                      <div className="mt-2 flex justify-center">
                        <button
                          onClick={closeModal}
                        >
                          <p className="text-gray-500 hover:text-gray-700 font-semibold">Seguir comprando <span aria-hidden="true"> &rarr;</span> </p>
                          
                        </button>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Card;
