import React,{useRef} from 'react'
import {MdKeyboardArrowRight, MdClose} from "react-icons/md";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas'
import { BsCartCheckFill } from "react-icons/bs";
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlineNotes } from "react-icons/md";
import useProductsContext from '../../hooks/useProducts';


export default function Confirm() {

    const [params, setParams] = React.useState({});
    const [productos,setProducts] = React.useState([]);
    const {products} = useProductsContext();


    const handleSavePDF = () => {
        const body = document.body;
        const originalOverflow = body.style.overflow;
        body.style.overflow = "hidden";
        const width = body.scrollWidth;
        const height = body.scrollHeight;  // aumentar altura máxima aquí
        html2canvas(body, {width, height, scrollX: 0, scrollY: 0}).then(canvas => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF('p', 'pt', [width * 4 / 3, height * 4 / 3]);
            pdf.addImage(imgData, 'PNG', 0, 0, width, height);
            pdf.save("pago_" + params.reference_pol + ".pdf");
            body.style.overflow = originalOverflow;
        });
};

    React.useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const params = {};
        for (const [key, value] of searchParams.entries()) {
            params[key] = value;
        }
        setParams(params);

        const datos_existentes = JSON.parse(params.extra3)
        datos_existentes.forEach(function(i){
            products.forEach(function(j){
                if(i.id === j.id){
                    i.title = j.title
                    i.image = j.image
                    i.price = j.price
                }
            })
        })


        setProducts(datos_existentes)
        localStorage.removeItem('car');
    }, []);
    
    return(
        <div>
            <center >
                <div className='max-w-7xl'>
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
                            <p className='rounded-full bg-dark w-9 h-9 flex justify-center items-center text-white font-bold text-lg'>3</p>
                            <p className='text-dark'>Confirmar compra</p>
                        </div>
                    </div>
                    
                    <div className='my-20'>
                        <BsCartCheckFill className='text-green-600 mb-5 w-16 h-16'/>
                        <h1 className='font-bold text-4xl'>Gracias por tu compra</h1>
                    </div>

                    <div className='grid md:grid-cols-2'>
                        <div>
                            <h1 className='font-semibold text-2xl'>Detalles de tu compra</h1>
                            <div className='flex flex-wrap justify-center'>
                                {productos.map((product, index) => (
                                    <div className='m-5 text-left ' key={index} >
                                        <div>
                                            <div>
                                                <img
                                                    className='w-32 h-32'
                                                    src={product.image}
                                                />
                                            </div>     
                                            <div className='w-40'>
                                                <p className='font-semibold text-sm'>{product.title} x{product.count}</p>
                                                <p className='font-medium text-xs text-gray-500'>Color: {product.color}</p>
                                            </div>
                                        </div>

                                        <div >
                                            <p className='text-dark text-sm font-semibold'>${product.price*product.count}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        
                            <div className='grid md:grid-cols-2 mt-10 mx-10 gap-y-8'>
                                <div >
                                    <h1 className='font-medium text-2xl mb-3'>Envio:</h1>
                                        {(()=>{
                                            if(params.extra2 == "true"){
                                                return(
                                                    <p className='text-dark font-medium text-xl'>Sí (+16000 al subtotal)</p>
                                                )
                                            }
                                            else{
                                                return(
                                                    <p className='text-red-700 font-medium text-xl'>No (Recoger en tienda)</p>
                                                )
                                            }
                                        })()}
                                    <TbTruckDelivery className='text-gray-500 w-14 h-14 mr-3 mt-2'/>
                                </div>

                                <div className='mx-5'>
                                    <h2 className='font-medium text-2xl mb-2'>Notas del pedido: </h2>
                                    <div className='flex justify-center items-center'>
                                        <p className='border p-3 rounded-lg bg-gray-100 border-gray-200'>{params.extra1}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='border mx-5 bg-gray-50 rounded-lg h-80 mt-20 md:mt-0'>
                            <h1 className='font-semibold text-2xl my-3'>Detalles del pago</h1>
                            <hr />
                            <div className='p-1 m-3 flex justify-center items-center'>
                                <h2 className='mr-2'>Total pagado:</h2>
                                <p className='text-2xl font-semibold'>${params.TX_VALUE}</p>
                            </div>
                            
                            {/* <h2 className='mb-3 text-lg font-medium'>Estado de la transacción:</h2> */}
                            {(()=>{
                                if(params.transactionState === "4"){
                                    return(
                                    <p className='bg-green-400 w-44 p-1 rounded-lg text-white text-lg font-medium mb-3'>APROBADA</p>
                                    )
                                }
                                else if(params.transactionState === "6"){
                                    return(
                                        <p className='bg-red-400 w-44 rounded-lg text-white text-lg font-medium mb-3'>RECHAZADA</p>
                                    )
                                }
                                else if(params.transactionState === "7"){
                                    return(
                                        <p className='bg-orange-400 w-44 rounded-lg text-white text-lg font-medium mb-3'>PENDIENTE</p>
                                    )
                                }
                            })()}
                            <div className='p-1 m-3 flex justify-center items-center'>
                                <h2 className='mr-2'>Referencia de compra:</h2>
                                <p className='font-medium'>{params.referenceCode}</p>
                            </div>
                            <div className='p-1 m-3 flex justify-center items-center'>
                                <h2 className='mr-2'>Referencia de pago:</h2>
                                <p className='font-medium'>{params.reference_pol}</p>
                            </div>
                            <div className='p-1 m-3 flex justify-center items-center'>
                                <h2 className='mr-2'>Metodo de pago:</h2>
                                <p className='font-medium'>{params.lapPaymentMethod}</p>
                            </div>                            
                        </div>
                    </div>
                    

                    <div className='mt-10 mb-20 flex justify-center'>
                        <button className="w-72 mt-8 items-center justify-center rounded-lg border border-transparent bg-blue-50 px-6 py-3 text-base font-medium text-gray-600 shadow-sm hover:bg-blue-100" onClick={handleSavePDF}>Guardar en PDF</button>
                        <a
                            href="/"
                            className="w-72 mt-8 items-center justify-center rounded-lg border border-transparent bg-green-400 px-6 py-3 text-base font-medium text-gray-600 shadow-sm hover:bg-green-300"
                            >
                            Finalizar compra
                        </a>
                    </div>
                </div>
            </center>
        </div>
    )
}