import React from "react";
import IMG1 from '../../images/banner.png'
import IMG2 from '../../images/molde.jpg'
import IMG3 from '../../images/insumos.jpg'

export default function CardHome() {
    return (
        <div className="flex flex-wrap lg:flex-nowrap gap-7 justify-center">
            <div className="w-80 bg-white border border-gray-200 rounded-lg shadow-md">
                    <img className="h-48 w-full rounded-t-lg" src={IMG2} alt="" />
                <div className="p-5">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight dark:text-black">Calidad</h5>
                    <p className="mb-3 font-normal text-gray-700 dark:tex-dark-400">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur quod, ullam ea doloribus unde deleniti, tenetur delectus eveniet aliquid exercitationem facere, ad nisi sit amet velit nostrum sequi sapiente? Consectetur.</p>
                </div>
            </div>

            <div className="w-80 bg-white border border-gray-200 rounded-lg shadow-md">
                    <img className="h-48 w-full rounded-t-lg" src={IMG1} alt="" />
                <div className="p-5">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight dark:text-black">Dentistore</h5>
                    <p className="mb-3 font-normal text-gray-700 dark:tex-dark-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet magnam ex ducimus similique exercitationem. Tempora consequatur quibusdam aperiam, temporibus beatae totam corrupti accusantium laborum saepe amet eius ad laudantium illum.</p>
                </div>
            </div>

            <div className="w-80 bg-white border border-gray-200 rounded-lg shadow-md">
                    <img className="h-48 w-full rounded-t-lg" src={IMG3} alt="" />
                <div className="p-5">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight dark:text-black">Tecnología</h5>
                    <p className="mb-3 font-normal text-gray-700 dark:tex-dark-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, exercitationem deleniti nulla aliquam, sint fugit, beatae dignissimos similique maxime necessitatibus optio fugiat perspiciatis blanditiis quisquam culpa minima ex dolores maiores?</p>
                </div>
            </div>
        </div>


    );
}