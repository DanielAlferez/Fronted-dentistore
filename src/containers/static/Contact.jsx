import React from 'react'
import Layout from "../../hocs/Layout";
import IMG from "../../../images/contact.jpeg";
import { BsFillTelephoneFill} from "react-icons/bs";
import { IoLogoWhatsapp } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { HiLocationMarker } from "react-icons/hi";

export default function Contact() {
  return (
    <Layout>
      <center>
        <div className='max-w-3xl my-14 mx-10 md:mx-0'>
          <div>
            <h1 className='text-4xl mb-5 font-extrabold text-gray-800'>¿Tienes alguna pregunta?</h1>
            <p className='text-xl text-gray-500 mb-5'>Gracias por tu interes en nuestro servicio. Por favor completa el formulario o comunicate por cualquier medio, te responderemos lo mas pronto posible.</p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 mt-10 gap-20'>
            <div className='col-span-1'>
              <img src={IMG} className="max-h-72" alt="" />
              <div className='flex'>
                <h1 className='text-2xl font-medium my-3'>Información de Contacto</h1>
              </div>
              <hr />
              <br />
              <div className='flex flex-col gap-y-3 justify-start content-start items-start'>
                <div className='flex justify-center items-center'>
                  <div className='p-2 border flex flex-wrap rounded-full w-10'>
                    <IoLogoWhatsapp className='text-dark h-6 w-6'/>
                  </div>
                  <div className='ml-3'>
                    <p>+57 315 620 3127</p>
                  </div>
                </div>
                <div className='flex justify-center items-center'>
                  <div className='p-2 border flex flex-wrap rounded-full w-10'>
                    <BsFillTelephoneFill className='text-dark h-6 w-6'/>
                  </div>
                  <div className='ml-3'>
                    <p>663 22 41</p>
                  </div>
                </div>
                <div className='flex justify-center items-center'>
                  <div className='p-2 border flex flex-wrap rounded-full w-10'>
                    <MdEmail className='text-dark h-6 w-6'/>
                  </div>
                  <div className='ml-3'>
                    <p>dentistorevillavicencio@hotmail.com</p>
                  </div>
                </div>
                <div className='flex justify-center items-center'>
                <div className='p-2 border flex flex-wrap rounded-full w-10'>
                    <HiLocationMarker className='text-dark h-6 w-6'/>
                  </div>
                  <div className='ml-3'>
                    <p>Cl. 15 No. 36-39 La Esperanza 7 Etp.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className='flex flex-col content-center justify-center items-center'>
              <p className='text-xl font-light text-gray-500 mb-5'>¡Escribenos un mensaje!</p>
              <div className='border shadow-md rounded-2xl flex w-full'>
                <form className="gap-y-3 flex flex-col p-5 w-full">
                  <div className="relative mt-1 ">
                    <input
                      name="username"
                      type="text"
                      required
                      id="floatingInput1"
                      placeholder=" "
                      className=" block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    />
                    <label
                      htmlFor="username"
                      for="floatingInput1"
                      className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                    >
                      Nombre
                    </label>
                  </div>

                  <div className="relative mt-1 ">
                    <input
                      name="phone"
                      type="text"
                      required
                      id="floatingInput2"
                      placeholder=" "
                      className=" block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    />
                    <label
                      htmlFor="phone"
                      for="floatingInput2"
                      className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                    >
                      Número Celular
                    </label>
                  </div>

                  <div className="relative mt-1 ">
                    <input
                      name="phone"
                      type="text"
                      required
                      id="floatingInput3"
                      placeholder=" "
                      className=" block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    />
                    <label
                      htmlFor="phone"
                      for="floatingInput3"
                      className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                    >
                      Correo Electrónico
                    </label>
                  </div>

                  <div className="relative mt-1 ">
                    <textarea
                      name="phone"
                      type="text"
                      required
                      id="floatingInput4"
                      placeholder=" "
                      className="h-32 block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    />
                    <label
                      htmlFor="phone"
                      for="floatingInput4"
                      className=" absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-6 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                    >
                      Mensaje
                    </label>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full rounded-lg justify-center py-3 px-4 my-3 border border-transparent shadow-sm text-sm font-medium text-white bg-light hover:bg-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
                    >
                      ENVIAR MENSAJE
                    </button>
                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>
      </center>

    </Layout>
  )
}
