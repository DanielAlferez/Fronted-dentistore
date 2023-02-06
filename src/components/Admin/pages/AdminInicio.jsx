import React from "react";
import {RiNumbersLine, RiWalletLine} from "react-icons/ri"
import {FaRegMoneyBillAlt} from "react-icons/fa"
import {BiUser} from "react-icons/bi"
import {BsThreeDotsVertical} from "react-icons/bs"
import { CChart } from "@coreui/react-chartjs"


export default function AdminInicio(props){
    return(
        // lassName="bg-gray-100 w-full h-screen rounded-xl"
        <div>
            <h2 className='text-3xl font-semibold text-gray-700 text-center mb-10'>¡Bienvenido {props.name}!</h2>
            <div className='grid grid-cols-4 gap-10 justify-center mx-14 '>
                <div className='rounded-xl bg-gray-50 shadow-md p-5'>
                    <BsThreeDotsVertical className="'w-5 h-5 absolute ml-28"/>
                    <div className='flex mb-3'>
                        <RiNumbersLine className='w-10 h-10 text-blue-900'/>
                    </div>
                    <p className='ml-3 mb-2 font-semibold text-3xl flex'>
                        1
                    </p>
                    <p className='ml-1 text-base font-normal'>Productos Vendidos</p>
                </div>
                <div className='rounded-xl bg-gray-50 shadow-md p-5'>
                    <BsThreeDotsVertical className="'w-5 h-5 absolute ml-28"/>
                    <div className='flex mb-3'>
                        <RiWalletLine className='w-10 h-10 text-blue-900'/>
                    </div>
                    <p className='ml-3 mb-2 font-semibold text-3xl flex'>
                        $24700
                    </p>
                    <p className='ml-1 text-base font-normal'>Ingresos Totales</p>
                </div>
                <div className='rounded-xl bg-gray-50 shadow-md p-5'>
                    <BsThreeDotsVertical className="'w-5 h-5 absolute ml-28"/>
                    <div className='flex mb-3'>
                        <FaRegMoneyBillAlt className='w-10 h-10 text-blue-900'/>
                    </div>
                    <p className='ml-3 mb-2 font-semibold text-3xl flex'>
                        $24700
                    </p>
                    <p className='ml-1 text-base font-normal'>Ingresos mensuales</p>
                </div>
                <div className='rounded-xl bg-gray-50 shadow-md p-5'>
                    <BsThreeDotsVertical className="'w-5 h-5 absolute ml-28"/>
                    <div className='flex mb-3'>
                        <BiUser className='w-10 h-10 text-blue-900'/>
                    </div>
                    <p className='ml-3 mb-2 font-semibold text-3xl flex'>
                        100
                    </p>
                    <p className='ml-1 text-base font-normal'>Total Clientes</p>
                </div>
            </div>
            <div className='rounded-xl bg-gray-50 shadow-md p-5 mx-14 mt-10'>
                <CChart
                    type="line" 
                    data={{
                        labels: ["01/02/2023", "02/02/2023", "03/02/2023", "04/02/2023", "05/02/2023"],
                        datasets: [
                        {
                            label: "Ventas Diarias DentiStore",
                            backgroundColor: "rgba(220, 220, 220, 0.2)",
                            borderColor: "rgba(220, 220, 220, 1)",
                            pointBackgroundColor: "rgba(220, 220, 220, 1)",
                            pointBorderColor: "#fff",
                            data: [0, 0, 0, 0, 24700]
                        }
                        ],
                    }}
                />
            </div>
        </div>
    )
}