import React from 'react'
import Layout from "../../hocs/Layout";
import { Fragment, useState } from 'react'
import {MdKeyboardArrowRight, MdClose} from "react-icons/md";
import useProductsContext from '../../hooks/useProducts';
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { addProduct,reduceProduct,deleteProduct } from './CartFunctions';

//CartStatus, es necesario?
export default function CartPage() {

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
            <div className='grid grid-cols-5 max-w-3xl my-10 mx-7'>
                <div>
                    <p className='rounded-full bg-dark w-9 h-9 flex justify-center items-center text-white font-bold text-lg'>1</p>
                    <p className='text-dark'>Carrito de compras</p>
                </div>
                <div className='flex justify-center items-center'>
                    <MdKeyboardArrowRight className='w-8 h-8 text-gray-400'/>
                </div>
                <div>
                    <p className='rounded-full bg-gray-400 w-9 h-9 flex justify-center items-center text-white font-bold text-lg'>2</p>
                    <p className='text-gray-400'>Envío y pago</p>
                </div>
                <div className='flex justify-center items-center'>
                    <MdKeyboardArrowRight className='w-8 h-8 text-gray-400'/>
                </div>
                <div>
                    <p className='rounded-full bg-gray-400 w-9 h-9 flex justify-center items-center text-white font-bold text-lg'>3</p>
                    <p className='text-gray-400'>Confirmar compra</p>
                </div>
            </div>
            <div className='bg-blue-50 max-w-7xl rounded-md p-6 text-lg text-gray-600 font-semibold my-5'>
                <p>Su pedido será entregado en el transcurso de # horas. Gracias por confiar en Denti Store</p>
            </div>

            <div className='md:max-w-7xl max-w-lg grid min-[1100px]:grid-cols-3 grid-cols-1 mb-10 min-[1100px]:gap-x-5 gap-x-0 min-[1100px]:gap-y-0 gap-y-10'>
                {(()=>{
                    if(productos.length == 0){
                        return( 
                            <div className='col-span-3 mt-5 flex flex-col items-center justify-center content-center text-gray-300'>
                                <MdOutlineRemoveShoppingCart className='w-48 h-48 opacity-50'/>
                                <p className='mt-5 text-2xl'> 
                                    No hay productos en el carrito
                                </p>
                                <a
                                href="/"
                                className="w-48 mt-8 items-center justify-center rounded-lg border border-transparent bg-light px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-dark"
                                >
                                Volver al inicio
                                </a>
                            </div>
                        );
                    }else{
                        return(
                            <>
                                <div className='col-span-2 border px-2 py-5 rounded-md min-[1100px]:mx-0 md:mx-2 mx-3'>
                                    <p className='text-dark font-semibold text-2xl mb-5'>CARRITO DE COMPRAS</p>
                                    <p className='bg-gray-50 p-2 rounded-lg font-semibold text-gray-600 mb-10'>Verifica atentamente tu pedido. Revisa cantidades y precios antes de finalizar tu cuenta</p>
                                    <hr className='md:block hidden'/>
                                    <div className='md:visible invisible grid grid-cols-7 md:my-2 -my-5 font-medium'>
                                        <p className='col-span-3'>Producto</p>
                                        <p>Color</p>
                                        <p>Precio</p>
                                        <p>Cantidad</p>
                                        <p>Total</p>
                                    </div>
                                    <hr className='md:block hidden mb-5'/>
                                    {productos.map((product, index) => (
                                        <li key={index} className="grid md:grid-cols-7 grid-cols-1 justify-center items-center md:mb-2 mb-10">
                                            <div className='grid grid-cols-2 md:col-span-3 col-span-1'>
                                                <div className='flex'>
                                                    <div className="flex justify-center items-center text-sm m-3">
                                                        <button
                                                            value={product.id}
                                                            onClick={()=>handleDeleteProduct(product.id)}
                                                            type="button"
                                                            className="text-xl text-gray-400 hover:text-gray-800"
                                                        >
                                                            <MdClose/>
                                                        </button>
                                                    </div>
                                                    
                                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                        <img
                                                            src={product.image}
                                                            className="h-full w-full object-cover object-center"
                                                        />
                                                    </div>     
                                                </div>

                                                <div className="text-left flex flex-col  items-start'p justify-center font-normal text-gray-600">
                                                    <a>{product.title}</a>
                                                    <div className='md:hidden block text-gray-400 font-medium'>Color: Rojo</div>
                                                </div>
                                            </div>

                                            <div className='md:block hidden justify-center col-span-1 items-center my-1 text-black text-md'>
                                                <p>Rojo</p>
                                            </div>

                                            <div className='md:block hidden justify-center items-center font-normal'>
                                                <p>${product.price}</p>
                                            </div>

                                            <div className='md:block hidden justify-center items-center'>
                                                <div className='flex items-center justify-between w-20'>
                                                    <button
                                                        disabled={product.count > 1 ? false : true}
                                                        className={`${product.count > 1 ? 'bg-red-500 hover:bg-red-700' : 'bg-gray-500'} text-white rounded-full w-6 h-6`}
                                                        onClick={()=>handleDelete(product.id,product.count)} 
                                                        type="button">
                                                        -
                                                    </button>
                                                        <p className='flex items-center justify-center bg-gray-200 text-sm rounded-lg h-6 w-6 text-center px-0.5'>{product.count}</p>
                                                    <button
                                                        onClick={()=>handleAddCant(product.id,product.count)}
                                                        className='bg-light hover:bg-dark text-white rounded-full w-6 h-6'>
                                                        +
                                                    </button>
                                                </div >
                                            </div>
    
                                            <div className='md:block hidden items-center justify-center font-semibol'>
                                                <p>${product.price*product.count}</p>
                                            </div>

                                            <div className='grid grid-cols-2 m-3'>
                                                <div className='md:hidden block justify-start items-center font-normal text-gray-500'>
                                                    <p>Precio: ${product.price}</p>
                                                </div>
                                                <div className='md:hidden block justify-center items-center'>
                                                    <div className='flex items-center justify-between w-20'>
                                                        <button
                                                            disabled={product.count > 1 ? false : true}
                                                            className={`${product.count > 1 ? 'bg-red-500 hover:bg-red-700' : 'bg-gray-500'} text-white rounded-full w-6 h-6`}
                                                            onClick={()=>handleDelete(product.id,product.count)} 
                                                            type="button">
                                                            -
                                                        </button>
                                                            <p className='flex items-center justify-center bg-gray-200 text-sm rounded-lg h-6 w-6 text-center px-0.5'>{product.count}</p>
                                                        <button
                                                            onClick={()=>handleAddCant(product.id,product.count)}
                                                            className='bg-light hover:bg-dark text-white rounded-full w-6 h-6'>
                                                            +
                                                        </button>
                                                    </div >
                                                </div>
                                            </div>

                                            <div className='md:hidden block items-center justify-end font-semibold'>
                                                <p>Total: ${product.price*product.count}</p>
                                            </div>
                                        </li>
                                    ))}
                                    <div className=" flex justify-center text-center text-md">
                                    <a
                                        href="/"
                                        className="w-72 mt-8 items-center justify-center rounded-lg border border-transparent bg-blue-50 px-6 py-3 text-base font-medium text-gray-600 shadow-sm hover:bg-blue-100"
                                        >
                                        Volver y seguir comprando
                                        </a>
                                    </div>
                                </div>
                                <div className='col-span-1'>
                                    <div className='bg-gray-50 p-5 mb-5 font-medium text-xl rounded-xl'>
                                        <p className='text-gray-600'>Resumen de la cuenta</p>
                                    </div>
                                    <div className='my-8'>
                                        <p className='text-light font-medium'>Pedido mínimo: $20.000</p>
                                    </div>
                                    <div className='px-8'>
                                        <div className='grid grid-cols-2 my-2'>
                                            <div className='flex justify-start'>
                                                <p className='text-gray-600'>Subtotal</p>
                                            </div>
                                            <div className='flex justify-end'>
                                                <p className='text-dark font-semibold'>${total}</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className='grid grid-cols-3 my-2'>
                                            <div className='flex justify-start'>
                                                <p className='text-gray-600'>Envío</p>
                                            </div>
                                            <div className='flex justify-end text-right text-sm col-span-2'>
                                                <p className='text-dark font-normal'>Calculado en el siguiente paso</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className='grid grid-cols-2 my-3'>
                                            <div className='flex justify-start'>
                                                <p className='text-gray-900 font-medium text-2xl'>Total</p>
                                            </div>
                                            <div className='flex justify-end'>
                                                <p className='text-dark text-2xl font-bold'>${total}</p>
                                            </div>
                                        </div>
                                        {(()=>{
                                            if(total > 20000){
                                                return(
                                                    <div className="flex justify-center text-center text-md">
                                                        <a
                                                            href='/pagos'
                                                            className="w-full mt-8 items-center justify-center rounded-3xl border border-transparent bg-light p-5 text-2xl font-medium text-white shadow-sm hover:bg-dark"
                                                            >
                                                            Finalizar Compra
                                                        </a>
                                                    </div>
                                                );
                                            }else{
                                                return(
                                                    <div className=" flex justify-center text-center text-md">
                                                        <a
                                                            className="w-full mt-8 items-center justify-center rounded-3xl border border-transparent bg-gray-400 p-5 text-2xl font-medium text-white shadow-sm"
                                                            >
                                                            Finalizar Compra
                                                        </a>
                                                    </div>
                                                );
                                            }
                                        })()}
                                    </div>
                                </div>
                            </>
                        );
                    }
                })()}
            </div>
      </center>
    </Layout>
  )
}
