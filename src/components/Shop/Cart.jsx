import React from 'react';
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { HiOutlineShoppingCart } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import {AiOutlineMinusCircle} from "react-icons/ai"
import findOcc from './contador';
import { MdOutlineRemoveShoppingCart } from "react-icons/md";

//import products from "../../data/products";


export default function Cart() {

    const [localStorageState, setLocalStorageState] = useState(localStorage.getItem('car'));
    const [open, setOpen] = useState(false)
    const [products,setProducts] = React.useState([])
    const [cantidad,setCantidad] = React.useState(0)
    const [total,setTotal] = React.useState();
    const [loading,setLoading] = React.useState(false);

    setInterval(()=>{
        setLocalStorageState(localStorage.getItem('car'));
    }, 500);

    const handleDeleteProduct = (id) => {
        let datos_existentes = localStorage.getItem('car');
        datos_existentes = datos_existentes === null ? [] : JSON.parse(datos_existentes);

        let temp = datos_existentes.filter((dato)=>dato.id !== id);
        localStorage.setItem('car',JSON.stringify(temp))
        setLoading(true)
        setProducts(temp)
    }

    const handleAddCant = (id,title,image,price) => {
        const newProduct = {
            id,
            title,
            image,
            price
        }
        let datos_existentes = localStorage.getItem('car');
        datos_existentes = datos_existentes === null ? [] : JSON.parse(datos_existentes);

        datos_existentes.push(newProduct);
        localStorage.setItem('car',JSON.stringify(datos_existentes))
        setLoading(true)
        setProducts(datos_existentes)
    }

    const handleDelete = (e) => {
        const num = e.target.value
        const data = JSON.parse(localStorage.getItem('car'))
        const resultado = data.filter(function(item){
            return item !== data[num]
        });
        localStorage.setItem('car',JSON.stringify(resultado))
        setLoading(true)
        setProducts(resultado)
    }

    React.useEffect(()=>{
        let datos_existentes = localStorage.getItem('car');
        datos_existentes = datos_existentes === null ? [] : JSON.parse(datos_existentes);
        const cantidad = findOcc(datos_existentes,"id")
        //console.log(cantidad)
        datos_existentes.forEach(function(i){
            cantidad.forEach(function(x){
                if(i.id === x.id){
                    i.cantidad = x.occurrence
                }
            })
        });

        let hash = {};
        datos_existentes = datos_existentes.filter(function(current) {
            const exists = !hash[current.id];
            hash[current.id] = true;
            return exists;
        });

        //console.log(datos_existentes)

        setTotal(datos_existentes.reduce((sum, value) => ( sum + value.price * value.cantidad ), 0))
        setProducts(datos_existentes);
        setLoading(false)

    },[localStorageState]);

    React.useEffect(()=>{
        setCantidad(products.length);
    }, [products]);
    


return (
    <>
        <div className='relative cursor-pointer'>
            <button href="#" 
            onClick={() => setOpen(true)}
            className="group text-gray-700 hover:text-light">
                <HiOutlineShoppingCart className='w-8 h-8' />
                <p className='absolute bg-light opacity-90 text-white rounded-full w-5 h-5 text-center -top-1 right-0 flex items-center justify-center text-xs'>
                    {cantidad}
                </p>
            </button>
        </div>
        {open ? (
            <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setOpen}>
                <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-700"
                enterFrom="opacity-0"
                enterTo="opacity-80"
                leave="ease-in-out duration-700"
                leaveFrom="opacity-80"
                leaveTo="opacity-0"
                >
                <div className="fixed inset-0 bg-gray-500 bg-opacity-70 transition-opacity" />
                </Transition.Child>
    
                <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full ">
                    <Transition.Child
                        as={Fragment}
                        enter="transform transition ease-in-out duration-500 sm:duration-700"
                        enterFrom="translate-x-full"
                        enterTo="translate-x-0"
                        leave="transform transition ease-in-out duration-500 sm:duration-700"
                        leaveFrom="translate-x-0"
                        leaveTo="translate-x-full"
                    >
                        <Dialog.Panel className="pointer-events-auto w-screen sm:w-[30rem]">
                        <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                            <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                                <div>
                                    <div className="flex items-start justify-between">
                                        <Dialog.Title className="text-lg font-medium text-gray-900">Tu lista de compras</Dialog.Title>
                                        <div className="ml-3 flex h-7 items-center">
                                            <button
                                                type="button"
                                                className="-m-2 p-2 hover:text-light"
                                                onClick={() => setOpen(false)}
                                            >
                                                <span className="sr-only">Close panel</span>
                                                <IoMdClose className='h-6  w-6' aria-hidden="true"/>
                                            </button>
                                        </div>
                                </div>    
                            {(()=>{
                                        if(!loading){
                                            return(
                                                <div className="mt-8">
                                                    <div className="flow-root">
                                                        <ul role="list" className="-my-6 divide-y divide-gray-200">
                                                            {products.length > 0 && products.map((product, index) => (
                                                            <li key={index} className="flex py-6">
                                                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                                <img
                                                                    src={product.image}
                                                                    className="h-full w-full object-cover object-center"
                                                                />
                                                                </div>    
                                                                <div className="ml-3 flex flex-1 flex-col">
                                                                    <div>
                                                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                                                            <a className='font-normal w-56' href={product.href}>{product.title}</a>                                            
                                                                            <div className='grid grid-cols-1'>
                                                                                <p className="ml-2">${product.price}</p>
                                                                                <p className="text-gray-500 text-right text-sm">c/u</p>
                                                                            </div>
                                                                            </div>
                                                                        </div>
                                        
                                                                        <div className="flex flex-1 items-end justify-between ">
                                                                            <div className='flex  items-center justify-between w-20'>
                                                                                <button 
                                                                                    className='bg-red-500 hover:bg-red-700 text-white rounded-full w-6 h-6'
                                                                                    value={index} 
                                                                                    onClick={handleDelete} 
                                                                                    type="button">
                                                                                    -
                                                                                </button>
                                                                                    <p className='flex items-center justify-center bg-gray-200 text-sm rounded-lg h-6 w-6 text-center px-0.5'>{product.cantidad}</p>
                                                                                <button
                                                                                    onClick={()=>handleAddCant(product.id,product.title,product.image,product.price)}
                                                                                    className='bg-light hover:bg-dark text-white rounded-full w-6 h-6'>
                                                                                    +
                                                                                </button>
                                                                        </div>
    
                                            <div className="flex text-sm">
                                            <button
                                                value={product.id}
                                                onClick={()=>handleDeleteProduct(product.id)}
                                                type="button"
                                                className="font-medium text-dark hover:text-light"
                                            >
                                                Eliminar
                                            </button>
                                            </div>
                                        </div>
                                        </div>
                                    </li>
                                    ))}
                                    {(()=>{
                                        if(products.length == 0){
                                            return(                                            
                                                <div className='mt-5 flex flex-col items-center justify-center content-center text-gray-300'>
                                                    <MdOutlineRemoveShoppingCart className='w-72 h-72 opacity-50'/>
                                                    <p className='mt-5 text-2xl'> 
                                                        No hay productos en el carrito
                                                    </p>
                                                </div>
                                                )
                                        }
                                    })()}
                                    </ul>
                                    </div>
                                    </div>
                                    )
                                }
                            })()}
                            </div>
                            
                            </div>
    
                            <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                            <div className="flex justify-between text-base font-medium text-gray-900">
                                <p>Subtotal</p>
                                <p>${total}</p>
                            </div>
                            <p className="mt-0.5 text-sm text-gray-500">Pedido mínimo: $20.000</p>
                            <div className="mt-6">
                                <a
                                href="#"
                                className="flex items-center justify-center rounded-md border border-transparent bg-light px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-dark"
                                >
                                Ir a Pagar
                                </a>
                            </div>
                            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                <p>
                                O {" "}
                                <button
                                    type="button"
                                    className="font-medium text-dark hover:text-light"
                                    onClick={() => setOpen(false)}
                                >
                                    Volver y Seguir Comprando
                                    <span aria-hidden="true"> &rarr;</span>
                                </button>
                                </p>
                            </div>
                            </div>
                        </div>
                        </Dialog.Panel>
                    </Transition.Child>
                    </div>
                </div>
                </div>
            </Dialog>
            </Transition.Root>
        ) : null}
    </>
  );
}
