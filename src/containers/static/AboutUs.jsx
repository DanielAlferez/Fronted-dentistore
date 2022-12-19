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
          <p className='text-gray-700 mt-3'>Denti Store es una empresa... Lorem ipsum dolor sit amet consectetur adipisicing elit. Id non rem quibusdam doloribus corporis necessitatibus iste praesentium suscipit, nostrum quis iusto aliquam eos. Ratione quaerat pariatur omnis nulla quo quis nam eos asperiores tempore hic dolore accusantium officia fugit expedita quibusdam corrupti aspernatur facere nisi, neque cupiditate harum nobis eum.</p>
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
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos nobis magni omnis, sint vitae recusandae neque exercitationem, voluptate iste porro, consequuntur quidem. Aliquid perferendis sequi perspiciatis corporis quidem laborum? Blanditiis repudiandae exercitationem iusto officiis expedita cum totam, quisquam laboriosam voluptates obcaecati explicabo quibusdam veniam deserunt omnis. Eos odit adipisci est quis earum asperiores voluptates vel quas ipsum consequuntur inventore, molestiae, dolorum tempore incidunt. Dolorem vitae omnis nulla inventore quibusdam et, beatae, doloremque, corporis tempora consequatur saepe a asperiores. Porro ex cum omnis facere ipsum nisi, repudiandae accusamus minima optio eligendi ad, vero voluptatem doloremque reiciendis dicta voluptates amet perferendis magni.</p>
          </div>
          <div>
          <h1 className='font-semibold text-2xl text-gray-700 mb-5'>Nuestra Visión</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos nobis magni omnis, sint vitae recusandae neque exercitationem, voluptate iste porro, consequuntur quidem. Aliquid perferendis sequi perspiciatis corporis quidem laborum? Blanditiis repudiandae exercitationem iusto officiis expedita cum totam, quisquam laboriosam voluptates obcaecati explicabo quibusdam veniam deserunt omnis. Eos odit adipisci est quis earum asperiores voluptates vel quas ipsum consequuntur inventore, molestiae, dolorum tempore incidunt. Dolorem vitae omnis nulla inventore quibusdam et, beatae, doloremque, corporis tempora consequatur saepe a asperiores. Porro ex cum omnis facere ipsum nisi, repudiandae accusamus minima optio eligendi ad, vero voluptatem doloremque reiciendis dicta voluptates amet perferendis magni.</p>
          </div>
        </div>
      </center>
    </Layout>
  )
}
