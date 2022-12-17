import React from 'react'
import Layout from "../../hocs/Layout";

import "./payment.css"
import { BsCreditCard, BsCashCoin, BsBank2 } from "react-icons/bs";
import { CgArrowsExchange } from "react-icons/cg";
import VISA from "../../../images/visa.png";
import MASTER from "../../../images/master.png";
import EFECTY from "../../../images/efecty.png";
import SURED from "../../../images/sured.png";
import BALOTO from "../../../images/baloto.png";
import DAVIVIENDA from "../../../images/davivienda.png";
import BANCOBOGOTA from "../../../images/bancobogota.png";
import BANCOLOMBIA from "../../../images/bancolombia.png";
import PSE from "../../../images/PSE.png";



export default function PaymentMet() {
  return (
    <Layout>
      <div className='flex justify-center mt-10'>
        <h1 className='text-dark font-bold text-3xl'>CANALES DE PAGO&nbsp;</h1>
      </div>
      <center>
        <p className=' text-black  font-semibold text-xl'>
          RUC. 0943745711
          <br />
          NIT. 0137423432
        </p>
      </center>

    <center>
      <div className='max-w-3xl mx-10 md:mx-0 flex flex-col my-10 justify-center'>
        <h1 className='font-bold text-lg mb-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, nisi?</h1>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate sed sit tempora nihil accusamus aliquam quidem fuga? Fugit nihil voluptatem, animi nulla id ullam voluptate ipsum eos dolores error, autem quo officia, magni possimus quaerat quidem culpa consequuntur rem esse qui aspernatur? Doloribus sed aut consequuntur odio provident dolor quibusdam.</p>
      </div>
    </center>

      <center>
        <div className='max-w-3xl mx-10 md:mx-0 flex my-20 justify-center '>
          <div className='flex flex-col col-span-1'>
            <div className='grid grid-cols-3 mb-5'>
              <div className='col-span-1 p-4 bg-gray-100 rounded-2xl text-dark mb-auto'>
                <BsCreditCard className='w-12 h-12'/>
                <h1 className='text-lg font-semibold'>Tarjetas de Credito</h1>
              </div>
              <div className='flex col-span-2 items-center border-light ml-5 rounded-2xl w-auto h-auto p-3 justify-start'>
                <img src={VISA} alt="" className='max-h-10 mx-3 my-1'/>
                <img src={MASTER} alt="" className='max-h-14 mx-3 my-1'/>
              </div>
            </div>

            <div className='grid grid-cols-3 mb-5'>
              <div className='col-span-1 p-4 bg-gray-100 rounded-2xl text-dark mb-auto'>
                <BsCashCoin className='w-12 h-12'/>
                <h1 className='text-lg font-semibold'>Efectivo</h1>
              </div>
              <div className='flex flex-wrap col-span-2 items-center border-light ml-5 rounded-2xl w-auto h-auto p-3 justify-start'>
                <img src={EFECTY} alt="" className='max-h-10 mx-3 my-1'/>
                <img src={SURED} alt="" className='max-h-10 mx-3 my-1'/>
                <img src={BALOTO} alt="" className='max-h-16 mx-3 my-1'/>

              </div>
            </div>

            <div className='grid grid-cols-3 mb-5'>
              <div className='col-span-1 p-4 bg-gray-100 rounded-2xl text-dark mb-auto'>
                <BsBank2 className='w-12 h-12'/>
                <h1 className='text-lg font-semibold'>Pago en bancos</h1>
              </div>
              <div className='flex flex-wrap col-span-2 items-center border-light ml-5 rounded-2xl w-auto h-auto p-3 justify-start'>
                <img src={DAVIVIENDA} alt="" className='max-h-10 mx-3 my-1'/>
                <img src={BANCOBOGOTA} alt="" className='max-h-10 mx-3 my-1'/>
                <img src={BANCOLOMBIA} alt="" className='max-h-10 mx-3 my-1'/>

              </div>
            </div>

            <div className='grid grid-cols-3'>
              <div className='col-span-1 p-4 bg-gray-100 rounded-2xl text-dark mb-auto'>
                <CgArrowsExchange className='w-12 h-12'/>
                <h1 className='text-lg font-semibold'>Transferencia bancaria</h1>
              </div>
              <div className='flex flex-wrap col-span-2 items-center border-light ml-5 rounded-2xl w-auto h-auto p-3 justify-start'>
                <img src={PSE} alt="" className='max-h-20 mx-3 my-1 '/>
              </div>
            </div>

          </div>
        </div>
      </center>
  
    </Layout>
  )
}
