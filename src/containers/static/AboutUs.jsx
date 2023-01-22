import React from 'react'
import Layout from "../../hocs/Layout";
import IMG from "../../../images/nosotros.jpg";

export default function AboutUs() {
  return (
    <Layout>
      <div className='py-10 grid grid-cols-1 md:grid-cols-2 gap-y-10 justify-center items-center content-center'>
        <div className='flex flex-col justify-start content-start items-start mx-10 xl:ml-40 2xl:ml-80'> 
          <p className='text-gray-500'>Nosotros</p>
          <p className='text-3xl font-semibold text-gray-800'>Empresa lider en venta de insumos dentales</p>
          <p className='text-gray-700 mt-3'>Denti Store es una empresa líder en la venta de insumos dentales y mecánica dental en la ciudad de Villavicencio. Ofrecemos una amplia variedad de productos de la mejor calidad para satisfacer las necesidades de nuestros clientes. Nuestra empresa se caracteriza por su experiencia y profesionalismo, lo que nos permite ofrecer un servicio excepcional y garantizar la satisfacción de nuestros clientes. En Denti Store encontrará una amplia selección de productos de alta calidad a precios competitivos. Si está buscando una empresa confiable y de confianza para satisfacer sus necesidades de insumos dentales, Denti Store es la opción perfecta.</p>
        </div>
        <div className='flex flex-col justify-center content-center items-center mx-10 xl:mr-40 2xl:mr-80'>
          <img className='rounded-full' src={IMG} alt="" />
          <center>
            <p className='text-gray-700  px-20 text-xl font-bold'>John Doe</p>
            <p className='text-gray-400  px-20 text-md font-medium'>Gerente</p>
          </center>
        </div>
      </div>
      <svg className='sm:-mt-28 md:-mt-36 lg:-mt-44 xl:-mt-56 2xl:-mt-72' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#F3F4F5" fill-opacity="1" d="M0,256L60,250.7C120,245,240,235,360,245.3C480,256,600,288,720,288C840,288,960,256,1080,245.3C1200,235,1320,245,1380,250.7L1440,256L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"/>
      </svg>
      <center className='bg-gray-100 py-10 pb-20'>
        <div className='grid grid-cols-1 mx-10 md:mx-20 xl:mx-28 md:grid-cols-2 gap-28 max-w-7xl'>
          <div>
            <h1 className='font-semibold text-2xl text-gray-700 mb-5'>Nuestra Misión</h1>
            <p>En Denti Store, nuestra misión es brindar a nuestros clientes una amplia variedad de insumos dentales y mecánica dental de alta calidad, ofreciendo un servicio excepcional y garantizando la satisfacción de nuestros clientes. Trabajamos incansablemente para proporcionar productos innovadores, y estamos comprometidos en mantenernos a la vanguardia en nuestra industria.</p>
          </div>
          <div>
          <h1 className='font-semibold text-2xl text-gray-700 mb-5'>Nuestra Visión</h1>
            <p>Nuestra visión es ser reconocidos como la empresa líder en venta de insumos dentales y mecánica dental en la ciudad de Villavicencio, y ser el proveedor de confianza para odontólogos y mecánicos dentales en la región. Trabajaremos constantemente para mejorar nuestros productos y servicios, y establecer relaciones a largo plazo con nuestros clientes.</p>
          </div>
        </div>
      </center>
    </Layout>
  )
}
