import React from "react";
import { AiFillHeart } from "react-icons/ai";
import { BiShoppingBag, BiHeart } from "react-icons/bi";


const Card = ({ title, image, price }) => {
  return (
    <div className="group relative border border-gray-300 bg-white hover:border-light hover:shadow-2xl shadow-none cursor-pointer w-full rounded-lg flex flex-col items-center justify-center">
      <div className="z-10 mt-2 mr-2 top-0 right-0 absolute h-8 w-8  flex items-center justify-center text-xl hover:text-red-600 text-gray-900 rounded-3xl transform-gpu shadow  translate-y-0 hover:-translate-y-0.5 transition-all duration-200 ease-in-out">
        <BiHeart />
      </div>
      <div className="relative">
        <div className="h-40 sm:h-44 lg:h-48 2xl:h-52 w-full rounded-xl overflow-hidden flex">
          <img src={image} className="transition-all duration-500 ease-in-out object-cover w-full h-full" alt="" />
        </div>
      </div>
      <div className="opacity-90 invisible group-hover:visible">
        <div className="py-2 -mt-14 mb-3 flex text-center text-white w-36 bg-light hover:bg-dark items-center justify-center font-medium hover:text-white rounded-3xl hover:shadow-xl">
            <BiShoppingBag className=" text-center ml-2"/>
            <p className="text-center font-normal mx-2">Agregar</p>
        </div>
      </div>
      <div className="mx-1 px-4 h-full justify-center content-center">
        <h1 className="text-center font-medium leading-5 text-black">{title}</h1>
      </div>
      <div className="mx-1 mt-3 mb-6">
        <p className="font-normal text-dark text-center">{price}</p>
      </div>
    </div>
  );
};

export default Card;
