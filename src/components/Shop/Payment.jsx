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
    
    const [subTotal,setSubtotal] = React.useState(0);

    const randomNumber = Math.floor(Math.random() * 1000000);
    const [referenceCode, setReferenceCode] = useState("dentistore" + randomNumber);
    const [signature,setSignature] = useState();

    

    const handleRadioChange = (event) => {
        if (event.target.value === "add") {
            setTotal(subTotal + 16000);
        } else if (event.target.value === "default") {
            setTotal(subTotal);
        }
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

        const subtotal = datos_existentes.reduce((acummulator, currentvalue) => ( acummulator + currentvalue.price * currentvalue.count ), 0); 

        setTotal(subtotal + 16000)
        setSubtotal(subtotal);
        setProductos(datos_existentes);
    },[]);

    React.useEffect(()=>{
        setCantidad(productos.length);
    }, [productos]);

  return (
    <div>
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
                    {/* <form className='col-span-2 grid grid-cols-1 min-[1100px]:grid-cols-2 gap-5' action="">
                        <input className='h-10 'type="text" />
                        <input className='h-10' type="text" />
                        <input className='h-10 min-[1100px]:col-span-2' type="text" />
                        <input className='h-10'type="text" />
                        <input className='h-10' type="text" />
                        <input className='h-10'type="text" />
                        <input className='h-10' type="text" />
                    </form> */}
                     <form className='col-span-2 grid grid-cols-1 min-[1100px]:grid-cols-2 gap-5' method="post" action="https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/">
                        <input name="merchantId"      type="hidden"  value="508029"   />
                        <input name="ApiKey"          type="hidden"  value="4Vj8eK4rloUd272L48hsrarnUA"   />
                        <input name="accountId"       type="hidden"  value="512321" />
                        <input name="description"     type="hidden"  value="Test PAYU"  />
                        <input name="referenceCode"   type="hidden"  value="dentistore1" />
                        <input name="amount"          type="hidden"  value="20000"   />
                        <input name="tax"             type="hidden"  value="3193"  />
                        <input name="taxReturnBase"   type="hidden"  value="16806" />
                        <input name="currency"        type="hidden"  value="COP" />
                        <input name="signature"       type="hidden"  value="0b083ea864c153217a811984ed5eb2d2"  />
                        <input name="test"            type="hidden"  value="0" />
                        <label for="name">Nombre completo</label>
                        <input name="buyerFullName"   type="text"   className='h-10 min-[1100px]:col-span-2' id="name" required/>
                        {/* <label for="email">Correo electronico</label>
                        <input name="buyerEmail"      type="text"   className='h-10' id="email" required/> */}
                        <input name="buyerEmail"      type="hidden"  value="test@test.com" ></input>
                        <label for="phone">Telefono</label>
                        <input name="mobilePhone"     type="text"   className='h-10' id="phone" required/>
                        <input name="responseUrl"     type="hidden"  value="http://www.test.com/response" />
                        <input name="confirmationUrl" type="hidden"  value="http://www.test.com/confirmation" />
                        <label for="address">Direccion</label>
                        <input name="shippingAddress" type="text"  value="calle 93 n 47 - 65"  className='h-10' id="address" required/>
                        <label for="city">Ciudad</label>
                        <input name="shippingCity"    type="text"  value="Bogotá" className='h-10' id="city" required/>
                        <input name="shippingCountry" type="hidden"  value="CO"  />
                        <input name="Submit"          type="submit"  value="Enviar" />
                    </form>
                </div>  
                <div className='  grid-cols-2 min-[1100px]:mx-0 md:mx-3 mx-5 px-3'>
                    <h1 className='justify-items-start flex col-span-2 font-semibold text-2xl mb-7'>Tu pedido</h1>
                    {productos.map((product, index) => (
                        <div key={index} className="grid grid-cols-3 col-span-2 ">
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
                            <p>${subTotal}</p>
                        </div>
                        <hr className='col-span-2 my-3'/>
                        <div className='flex justify-start'>
                            <Radio defaultChecked ripple={false} className='-my-2' id='envio' name='type' label='Servientrega' value='add' onChange={handleRadioChange}/>
                        </div>
                        <div className='justify-end flex'>
                            <p>$16000</p>
                        </div>
                        <div className='flex justify-start col-span-2 text-left'>
                            <Radio className='mb-5' ripple={false} id='recoger' name='type' label='Recogida local (Calle No. 36-39 Br. La Esperanza 7 Etp.)' value='default' onChange={handleRadioChange}/>
                        </div>
                        <hr className='col-span-2 my-3'/>
                        <div className='flex justify-start'>
                            <p>Total</p>
                        </div>
                        <div className='justify-end flex'>
                            <p>${total}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 col-span-3 mt-10 border p-5 rounded-md ">
                        <div className='flex justify-start'>
                            <p>Paga en Línea</p>
                        </div>
                        <div className='justify-end flex'>
                            <img src="https://chile.payu.com/wp-content/uploads/sites/4/2020/05/PAYU_LOGO_LIME.png"/>
                        </div>
                        <hr className='col-span-2 my-3'/>
                    </div>
                    <a
                        href="/"
                        className="w-72 mt-8 items-center justify-center rounded-lg border border-transparent bg-blue-50 px-6 py-3 text-base font-medium text-gray-600 shadow-sm hover:bg-blue-100"
                        >
                        Volver y seguir comprando
                    </a>

                </div>     
            </div>
        </center>
        <PaymentMet/>
        </div>
  )
}
