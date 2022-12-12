import React from 'react'
import Layout from "./../../hocs/Layout";
import { FaTeethOpen } from "react-icons/fa";

export default function Products() {
  return (
    <Layout>
      <div className="w-full h-full py-36 flex flex-col justify-center items-center content-center">
                <p className="text-dark font-bold text-5xl mb-2">Productos</p>
                <FaTeethOpen className="w-16 h-16 text-dark mb-3"/>
                <h1 className="text-3xl font-bold mt-5">Pagina en desarrollo</h1>
                <p className="text-md my-3 text-gray-700 ">Oops, lo sentimos, esta seccion de la pagina está en desarrollo</p>
                <a className="text-dark hover:text-light my-3" href="/">Regresar al inicio <span aria-hidden="true"> &rarr;</span> </a>
            </div>
    </Layout>
  );
}
