import React from "react";
import classNames from "classnames";
import { AiFillHeart } from "react-icons/ai";
import { BsChatSquareFill } from "react-icons/bs";
import { BiShoppingBag } from "react-icons/bi";


const Card = ({ title, image, description }) => {
  return (
    <div className="relative bg-white border border-gray-200 hover:border-light hover:bg-gray-100 hover:shadow-xl shadow-none cursor-pointer w-full rounded-lg flex flex-col items-center justify-center">
      <div className="z-10 mt-3.5 mr-3.5 top-0 right-0 bg-white absolute h-7 w-7 flex items-center justify-center text-xl hover:bg-red-600 hover:text-white text-red-600 rounded-3xl transform-gpu translate-y-0 hover:-translate-y-0.5 transition-all duration-500 ease-in-out">
        <AiFillHeart />
      </div>
      <div className="relative mt-2 mx-2">
        <div className="x-1 h-36 sm:h-40 lg:h-44 2xl:h-48 w-full rounded-xl overflow-hidden flex">
          <img src={image} className="transition-all duration-500 ease-in-out object-cover w-full h-full" alt="" />
        </div>
      </div>
      <div className=" text-center mt-3 text-white h-10 w-36 bg-light hover:bg-dark flex items-center justify-center font-medium hover:text-white rounded-3xl hover:shadow-xl transform-gpu translate-y-0 hover:-translate-y-1 transition-all duration-300 ease-in-out">
          <BiShoppingBag className=" text-center ml-2"/>
          <p className="text-center font-normal mx-2">Agregar</p>
      </div>
      <div className="mx-1 px-4 h-24 justify-center content-center">
        <h1 className="my-5 text-center font-normal leading-5 text-black">{title}</h1>
      </div>
      <div className="mx-1 pb-10">
        <p className="font-medium text-dark text-center">{description}</p>
      </div>
    </div>
  );
};

export default Card;
