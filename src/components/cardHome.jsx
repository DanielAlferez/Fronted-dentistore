import React from "react";
import IMG1 from '../../images/banner.png'
import IMG2 from '../../images/molde.jpg'
import IMG3 from '../../images/insumos.jpg'

export default function CardHome() {
    return (
        <div className="flex flex-wrap lg:flex-nowrap gap-7 justify-center">
            <div className="cursor-pointer hover:opacity-90 w-80 bg-white border border-gray-200 rounded-lg shadow-md">
                <img className="h-48 w-full rounded-t-lg" src={IMG2} alt="" />
                <div className="p-5 h-36">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight dark:text-black">Calidad</h5>
                    <p className="mb-3 font-normal text-gray-700 dark:tex-dark-400 ">Conoce más sobre la calidad de los productos que tenemos en nuestra tienda Denti Store</p>
                </div>
                <div className="mb-5">
                    <a className="p-5 text-sm text-dark hover:text-light font-medium">Leer Más</a>
                </div>
            </div>

            <div className="cursor-pointer hover:opacity-90 w-80 bg-white border border-gray-200 rounded-lg shadow-md">
                <img className="h-48 w-full rounded-t-lg" src={IMG1} alt="" />
                <div className="p-5 h-36">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight dark:text-black">Denti Store</h5>
                    <p className="mb-3 font-normal text-gray-700 dark:tex-dark-400">Conoce más sobre nuestra empresa y los insumos odontológicos que ofrecemos</p>       
                </div>
                <div className="mb-5">
                    <a className="p-5 text-sm text-dark hover:text-light font-medium ">Leer Más</a>
                </div>
            </div>

            <div className="cursor-pointer hover:opacity-90 w-80 bg-white border border-gray-200 rounded-lg shadow-md">
                <img className="h-48 w-full rounded-t-lg" src={IMG3} alt="" />
                <div className="p-5 h-36">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight dark:text-black">Tecnología</h5>
                    <p className="mb-3 font-normal text-gray-700 dark:tex-dark-400">Conoce más sobre la tecnología que usamos en nuestros productos</p>
                </div>
                <div className="mb-5">
                    <a className="p-5 text-sm text-dark hover:text-light font-medium ">Leer Más</a>
                </div>
            </div>
        </div>
    );
}