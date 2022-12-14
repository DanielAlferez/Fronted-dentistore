import React from 'react'
import Layout from "../../hocs/Layout";
import PAY1 from "../../../images/transfer.svg";
import PAY2 from "../../../images/reader.svg";
import PAY3 from "../../../images/brand-pse.png";
import "./payment.css"
import { BsFillPatchCheckFill } from "react-icons/bs";

export default function PaymentMet() {
  return (
    <Layout>
      <div className='flex justify-center mt-10'>
      <h1 className='text-blue-900 font-bold text-3xl'>CANALES DE PAGO&nbsp;</h1>
      </div>
      <center>
        <p className=' text-black  font-semibold text-xl'>
          RUC. 0943745711
          <br />
          NIT. 0137423432
        </p>
      </center>

      <center>
        <div className='max-w-4xl grid grid-cols-3 my-20 justify-center'>
          <div className='flex flex-col justify-center items-center'>
            <div>
              <img className='boxpay w-60' src={PAY1} alt="" />
            </div>
            <div>
              <h1 className='p-3 mt-5 rounded-2xl text-blue-900 font-bold text-xl'>DEPÓSITO O TRANSFERENCIA</h1>
            </div>
            <div>
              <div className='flex justify-center items-center mt-3'>
                <BsFillPatchCheckFill className='text-blue-700'/> 
                <p className='text-gray-800 font-normal text-xl'>&nbsp;   Bancolombia</p>
              </div>
              <br />
              <hr />
              <div className='flex justify-center items-center mt-3'>
                <BsFillPatchCheckFill className='text-blue-700'/> 
                <p className='text-gray-800 font-normal text-xl'>&nbsp;   Davivienda</p>
              </div>
            </div>
          </div>
          <div className='flex  flex-col justify-center items-center'>
            <div className='boxpay bg-gray-200 '>
              <img className='w-40' src={PAY2} alt="" />
            </div>
            <div>
              <h1 className='p-3 mt-5 rounded-2xl text-blue-900 font-bold text-xl'>TARJETA DE CRÉDITO O DEBITO</h1>
            </div>
          </div>
          <div className='flex flex-col justify-center items-center'>
            <div className='boxpay bg-gray-200'>
              <img className='h-24 m-5' src={PAY3} alt="" />
            </div>
            <div>
              <h1 className='p-3 mt-5 rounded-2xl text-blue-900 font-bold text-xl'>PAGO POR PSE</h1>
            </div>
          </div>
        </div>
      </center>
    </Layout>
  )
}
