import React from 'react'
import Layout from "../../hocs/Layout";
import { Fragment, useState } from 'react'
import {MdKeyboardArrowRight, MdClose} from "react-icons/md";
import useProductsContext from '../../hooks/useProducts';
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { addProduct,reduceProduct,deleteProduct } from './CartFunctions';
import PaymentMet from "../../containers/static/PaymentMet";
import { Radio } from "@material-tailwind/react";
import md5 from 'md5';

//CartStatus, es necesario?
export default function Payment() {

    const {products} = useProductsContext();
    const [localStorageState, setLocalStorageState] = useState(localStorage.getItem('car'));
    const [open, setOpen] = useState(false)
    const [productos,setProductos] = React.useState([])
    const [cantidad,setCantidad] = React.useState(0)
    const [venta,setVenta] = React.useState()
    const [total,setTotal] = React.useState();
    
    const [subTotal,setSubtotal] = React.useState(0);

    const [formData,setFormData] = useState();
    const [envio,setEnvio] = useState(true);

    const handleRadioChange = (event) => {
        if (event.target.value === "add") {
            setTotal(subTotal + 16000);
            setEnvio(true);
        } else if (event.target.value === "default") {
            setTotal(subTotal);
            setEnvio(false);
        }
    }
      

    React.useEffect(()=>{
        let datos_existentes = localStorage.getItem('car');
        datos_existentes = datos_existentes === null ? [] : JSON.parse(datos_existentes);
        
        const data = JSON.parse(localStorage.getItem('car'));
        setVenta(data)

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

    React.useEffect(() => {

        const data = {
            referenceCode: "",
            signature: "",
        };
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < 16; i++) {
          data.referenceCode += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        
        const signatureDescrypt = "4Vj8eK4rloUd272L48hsrarnUA" + "~" + "508029" + "~" + data.referenceCode + "~" + total + "~" +  "COP";
        data.signature = md5(signatureDescrypt);
        setFormData(data);
    },[total]);

  return (
    <div>
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
            {(()=>{
                    if(productos.length == 0){
                        return(
                            <div className='col-span-3 my-40 flex flex-col items-center justify-center content-center text-gray-300'>
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
                    }else if(subTotal < 20001){
                        return(
                            <div className='col-span-3 my-40 flex flex-col items-center justify-center content-center text-gray-300'>
                                <MdOutlineRemoveShoppingCart className='w-48 h-48 opacity-50'/>
                                <p className='mt-5 text-2xl'> 
                                    El producto que desea comprar tiene un valor menor al minimo permitido
                                </p>
                                <a
                                href="/"
                                className="w-48 mt-8 items-center justify-center rounded-lg border border-transparent bg-light px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-dark"
                                >
                                Volver al inicio
                                </a>
                            </div>
                        )
                    }else{
                        return(
                            <form  method="post" action="https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/">
                                <div className='md:max-w-6xl max-w-lg grid min-[1100px]:grid-cols-3 grid-cols-1 my-16 min-[1100px]:gap-x-16 gap-x-0 gap-y-10'>
                                    <div className='h-4/5 col-span-1 min-[1100px]:col-span-2 min-[1100px]:grid-cols-2 text-left min-[1100px]:mx-0 md:mx-3 mx-5 px-3 grid grid-cols-1 gap-x-10 gap-y-5'>
                                        <h1 className='col-span-2 font-semibold text-2xl mb-5'>Detalles de facturación</h1>
                                        <h3 className='col-span-2 font-semibold text-1xl mb-5 text-red-600'>Esta es una pasarela de pagos de prueba, la pagina web sigue en desarrollo y este apartado no ha sido terminado.</h3>
                                        <input name="merchantId"      type="hidden"  value="508029"   />
                                        <input name="ApiKey"          type="hidden"  value="4Vj8eK4rloUd272L48hsrarnUA"   />
                                        <input name="accountId"       type="hidden"  value="512321" />
                                        <input name="description"     type="hidden"  value="Compra en dentistore.online"  />
                                        <input name="referenceCode"   type="hidden"  value={formData.referenceCode} />
                                        <input name="amount"          type="hidden"  value={total}   />
                                        <input name="tax"             type="hidden"  value="0"  />
                                        <input name="taxReturnBase"   type="hidden"  value="0" />
                                        <input name="currency"        type="hidden"  value="COP" />
                                        <input name="signature"       type="hidden"  value={formData.signature}  />
                                        <input name="test"            type="hidden"  value="1" />
                                        <div className='flex flex-col col-span-2'>
                                            <label className='font-semibold mb-2' for="name">Nombre completo</label>
                                            <input name="buyerFullName" className='rounded-md'  type="text" id="name" required/>
                                        </div>
                                        <div className='flex flex-col col-span-2'>
                                            <label className='font-semibold mb-2' for="address">Direccion</label>
                                            <input name="shippingAddress" type="text" className='rounded-md' value="calle 93 n 47 - 65" id="address" required/>
                                        </div>
                                        {/* <label for="email">Correo electronico</label>
                                        <input name="buyerEmail"      type="text"   className='h-10' id="email" required/> */}
                                        <input name="buyerEmail"      type="hidden"  value="test@test.com" ></input>
                                        <input name="responseUrl"     type="hidden"  value="https://dentistore.online/confirmar-pago" />
                                        {/* <input name="confirmationUrl" type="hidden"  value="http://www.test.com/confirmation" /> */}
                                        <div className='flex flex-col col-span-2 min-[1100px]:col-span-1'>
                                            <label  className='font-semibold mb-2' for="phone">Telefono</label>
                                            <input name="mobilePhone" className='rounded-md' type="text" id="phone" required/>
                                        </div>
                                        <div className='flex flex-col col-span-2 min-[1100px]:col-span-1'>
                                            <label  className='font-semibold mb-2' for="city">Ciudad</label>
                                            <input name="shippingCity" className='rounded-md' type="text"  value="Bogotá" id="city" required/>
                                        </div>
                                        <div className='flex flex-col col-span-2 '>
                                            <label  className='font-semibold mb-2' for="city">Notas del pedido (Opcional)</label>
                                            <textarea name="extra1" className='rounded-md h-32' type="text"  id="note"/>
                                        </div>
                                        <input name="shippingCountry" type="hidden"  value="CO"  />
                                        <input name="extra2" type="hidden"  value={envio}  />
                                        <input name="extra3" type="hidden" value={JSON.stringify(venta)}/>

                                    </div>
                                <div className='grid grid-cols-2 min-[1100px]:mx-0 md:mx-3 mx-5 px-3'>
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
                                        <div className='flex justify-start font-semibold text-lg'>
                                            <p>Total</p>
                                        </div>
                                        <div className='justify-end flex font-semibold text-lg'>
                                            <p>${total}</p>
                                        </div>
                                        <div className='flex text-sm'>
                                            <p>*IVA incluido</p>
                                        </div>
                                    </div>
                                    <div className="col-span-3 mt-10 border p-2 rounded-md ">
                                        <div className='flex justify-center'>
                                            <p>Paga en Línea con PayU</p>
                                        </div>
                                        <div className='justify-center flex h-16'>
                                            <img src="https://chile.payu.com/wp-content/uploads/sites/4/2020/05/PAYU_LOGO_LIME.png"/>
                                        </div>
                                    </div>
                                    <input name="Submit" className='mt-5 rounded-md border col-span-2 cursor-pointer text-white font-semibold text-md bg-light h-12 hover:bg-dark' type="submit"  value="Comprar" />
                                </div>     
                            </div>
                        </form>
                        );
                    }})()}
        </center>
        <PaymentMet/>
        </div>
  )
}
