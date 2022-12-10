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

const Card = ({ id,title, image, price }) => {
  
  const handleAddProduct = () => {
    const newProduct = {
        id,
        count:1
    }
    addProduct(newProduct)
    //esta parte me copie de aqui https://es.stackoverflow.com/questions/393157/almacenar-varios-array-en-localstorage-javascript
    // let datos_existentes = localStorage.getItem('car');
    // datos_existentes = datos_existentes === null ? [] : JSON.parse(datos_existentes);

    // datos_existentes.push(newProduct);
    // localStorage.setItem('car',JSON.stringify(datos_existentes))

    const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 3000,
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
        <div className="z-10 mt-2 mr-2 top-0 right-0 absolute h-8 w-8  flex items-center justify-center text-xl hover:text-red-600 text-gray-900 rounded-3xl transform-gpu shadow  translate-y-0 hover:-translate-y-0.5 transition-all duration-200 ease-in-out">
          <BiHeart />
        </div>
        <div className="relative">
          <div className="h-40 sm:h-44 lg:h-48 2xl:h-52 w-full rounded-xl overflow-hidden flex">
            <img src={image} className="transition-all duration-500 ease-in-out object-cover w-full h-full" alt="" />
          </div>
        </div>
        <div className="opacity-90 invisible group-hover:visible ">
          <button  className="py-2 -mt-14 mb-3 flex text-center text-white w-36 bg-dark items-center justify-center font-medium hover:text-white rounded-3xl hover:shadow-xl">
              <MdOutlineAddShoppingCart className=" text-center ml-2 "/>
              <p className="text-center font-normal mx-2">Agregar</p>
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
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
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
                enter="ease-out duration-100"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-100"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative w-full max-w-[24rem]  md:max-w-3xl lg:max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">


                  {/* close button */}
                  <div className="absolute top-2.5 right-2.5">
                    <button
                      onClick={closeModal}
                    >
                      <CgClose className="w-6 h-6 hover:text-gray-700"/>
                    </button>
                  </div>

                  {/* content */}
                  <div className="grid md:grid-cols-7 grid-cols-1 content-center md:p-5">
                    {/* Image */}
                    <div className="col-span-3 pt-10 px-10 md:px-0 ">
                      <ImageSlider image={image}/>
                    </div>
                    {/* product */}
                    <div className="col-span-4 mt-10 md:mt-0 px-4 md:p-10">
                      {/* title */}
                      <Dialog.Title
                        as="h1"
                        className="text-xl text-center mb-10 font-medium leading-6 text-gray-900"
                      >
                        {title}
                      </Dialog.Title>

                      {/* Characteristics */}
                      <div>
                        {/* Caracteristicas */}
                        <div className="my-2">
                          Caracteristicas
                        </div>
                        {/* Precio */}
                        <div className="bg-gray-100 p-3 my-3 rounded-2xl flex flex-1 content-center">
                          <p className="text-gray-500 font-light">Precio  </p>
                          <p className="-mt-0.5 text-xl ml-7 text-dark font-semibold">$ {price}</p>

                        </div>
                        {/* Color */}
                        <div className="my-2">
                          Colores
                        </div>
                        {/* Cantidad */}
                        <div className="my-2">
                          Cantidad
                        </div>
                      </div>

                      {/* Add button */}
                      <div className="mt-4 flex justify-center">
                        <button
                          className="py-2 mb-3 flex text-center text-white w-64 bg-dark items-center justify-center font-medium hover:text-white rounded-3xl hover:shadow-xl"
                          onClick={handleAddProduct}
                        >
                          <MdOutlineAddShoppingCart className="text-xl text-center ml-2 "/>
                          <p className="text-lg text-center font-normal mx-2">Agregar al Carrito</p>
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
