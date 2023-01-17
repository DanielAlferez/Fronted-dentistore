import React from 'react'
import Layout from "../../hocs/Layout";
import { Fragment, useState } from 'react'
import {MdKeyboardArrowRight, MdClose} from "react-icons/md";
import useProductsContext from '../../hooks/useProducts';
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { addProduct,reduceProduct,deleteProduct } from './CartFunctions';
import PaymentMet from "../../containers/static/PaymentMet";
import { Radio } from "@material-tailwind/react";

//CartStatus, es necesario?
export default function Payment() {

    const {products} = useProductsContext();
    const [localStorageState, setLocalStorageState] = useState(localStorage.getItem('car'));
    const [open, setOpen] = useState(false)
    const [productos,setProductos] = React.useState([])
    const [cantidad,setCantidad] = React.useState(0)
    const [total,setTotal] = React.useState();
    const [loading,setLoading] = React.useState(false);

    setInterval(()=>{
        setLocalStorageState(localStorage.getItem('car'));
    }, 500);

    const handleDeleteProduct = (id) => {
        deleteProduct(id)
    }

    const handleAddCant = (id,count) => {
        const data = {
            id,
            count:count+1
        }
        addProduct(data)
    }

    const handleDelete = (id,count) => {
        const data = {
            id,
            count
        }
        reduceProduct(data)
        //localStorage.setItem('car',JSON.stringify(resultado))
        //console.log(resultado);
        //setLoading(true)
        //setProducts(resultado)
    }

    React.useEffect(()=>{
        let datos_existentes = localStorage.getItem('car');
        datos_existentes = datos_existentes === null ? [] : JSON.parse(datos_existentes);
        
        datos_existentes.forEach(function(i){
            products.forEach(function(j){
                if(i.id === j.id){
                    i.title = j.title
                    i.image = j.image
                    i.price = j.price
                }
            })
        })

        setTotal(datos_existentes.reduce((sum, value) => ( sum + value.price * value.count ), 0))
        setProductos(datos_existentes);
        setLoading(false)

    },[localStorageState]);

    React.useEffect(()=>{
        setCantidad(productos.length);
    }, [productos]);

  return (
    <Layout>
        <center>
            <div className='grid grid-cols-5 max-w-3xl my-10'>
                <div>
                    <p className='rounded-full bg-dark w-9 h-9 flex justify-center items-center text-white font-bold text-lg'>1</p>
                    <p className='text-dark'>Carrito de compras</p>
                </div>
                <div className='flex justify-center items-center'>
                    <MdKeyboardArrowRight className='w-8 h-8 text-gray-400'/>
                </div>
                <div>
                    <p className='rounded-full bg-dark w-9 h-9 flex justify-center items-center text-white font-bold text-lg'>2</p>
                    <p className='text-dark'>Envío y pago</p>
                </div>
                <div className='flex justify-center items-center'>
                    <MdKeyboardArrowRight className='w-8 h-8 text-gray-400'/>
                </div>
                <div>
                    <p className='rounded-full bg-gray-400 w-9 h-9 flex justify-center items-center text-white font-bold text-lg'>3</p>
                    <p className='text-gray-400'>Confirmar compra</p>
                </div>
            </div>
            <div className='md:max-w-6xl justify-items-start center max-w-lg grid min-[1100px]:grid-cols-3 grid-cols-1 my-16 min-[1100px]:gap-x-16 gap-x-0 gap-y-10'>
                <div className='col-span-2 w-full justify-items-start min-[1100px]:mx-0 md:mx-3 mx-5 px-3 grid grid-cols-2 gap-5'>
                    <h1 className='col-span-2 font-semibold text-2xl'>Detalles de facturación</h1>
                    <form className='col-span-2 grid grid-cols-1 min-[1100px]:grid-cols-2 gap-5' action="">
                        <input className='h-10 'type="text" />
                        <input className='h-10' type="text" />
                        <input className='h-10 min-[1100px]:col-span-2' type="text" />
                        <input className='h-10'type="text" />
                        <input className='h-10' type="text" />
                        <input className='h-10'type="text" />
                        <input className='h-10' type="text" />
                    </form>
                </div>  
                <div className='grid  grid-cols-2 min-[1100px]:mx-0 md:mx-3 mx-5 px-3'>
                    <h1 className='justify-items-start flex col-span-2 font-semibold text-2xl mb-7'>Tu pedido</h1>
                    {productos.map((product, index) => (
                        <div key={index} className="grid grid-cols-3 col-span-2">
                            <div className='font-semibold grid grid-cols-4 col-span-2'>
                                <div className="h-8 w-8 flex-shrink-0 overflow-hidden">
                                    <img
                                        src={product.image}
                                    />
                                </div>     
                                <div className="text-left grid justify-items-start font-normal text-gray-600 text-xs col-span-3">
                                    {product.title} x{product.count}
                                </div>
                            </div>

                            <div className='justify-end flex text-xs'>
                                <p>${product.price*product.count}</p>
                            </div>
                            <hr className='col-span-3 my-2'/>
                        </div>
                    ))}
                    <div className="grid grid-cols-2 col-span-3 mt-7 border p-5 rounded-md ">
                        <div className='flex justify-start'>
                            <p>Subtotal</p>
                        </div>
                        <div className='justify-end flex'>
                            <p>{total}</p>
                        </div>
                        <hr className='col-span-2 my-3'/>
                        <div className='flex justify-start'>
                            <Radio defaultChecked ripple={false} className='-my-2' id='envio' name='type' label='Servientrega'/>
                        </div>
                        <div className='justify-end flex'>
                            <p>$16.000</p>
                        </div>
                        <div className='flex justify-start col-span-2 text-left'>
                            <Radio className='mb-5' ripple={false} id='recoger' name='type' label='Recogida local (Calle No. 36-39 Br. La Esperanza 7 Etp.)'/>
                        </div>
                        <hr className='col-span-2 my-3'/>
                        <div className='flex justify-start'>
                            <p>Total</p>
                        </div>
                        <div className='justify-end flex'>
                            <p>{total}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 col-span-3 mt-10 border p-5 rounded-md ">
                        <div className='flex justify-start'>
                            <p>Paga en Línea</p>
                        </div>
                        <div className='justify-end flex'>
                            
                        </div>
                        <hr className='col-span-2 my-3'/>
                    </div>
                </div>     
            </div>
        </center>
        <PaymentMet/>
    </Layout>
  )
}
