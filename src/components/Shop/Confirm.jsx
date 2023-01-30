import React,{useRef} from 'react'
import {MdKeyboardArrowRight, MdClose} from "react-icons/md";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function Confirm() {

    const [params, setParams] = React.useState({});
    const [productos,setProducts] = React.useState([]);

    const handleSavePDF = () => {
        const body = document.body;
        const originalOverflow = body.style.overflow;
        body.style.overflow = "hidden";
        html2canvas(body, {scrollX: 0, scrollY: 0}).then(canvas => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF('l', 'mm', [canvas.width, canvas.height]);
            pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
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
    setProducts(JSON.parse(params.extra3))
    }, []);
    
    return(
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
                        <p className='rounded-full bg-dark w-9 h-9 flex justify-center items-center text-white font-bold text-lg'>3</p>
                        <p className='text-dark'>Confirmar compra</p>
                    </div>
                </div>
                <div>

                </div>
                <div className='grid grid-cols-2 min-[1100px]:mx-0 md:mx-3 mx-5 px-3'>
                    <h1 className='justify-items-start flex col-span-2 font-semibold text-2xl mb-7'>Detalles de tu compra</h1>
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
                </div>
                <h2>Envio: </h2>
                {(()=>{
                    if(params.extra2 == "true"){
                        return(
                            <p>Sí (+16000 al subtotal)</p>
                        )
                    }
                    else{
                        return(
                            <p>No (Recoger en tienda)</p>
                        )
                    }
                })()}
                <h2>Notas del pedido: </h2><p>{params.extra1}</p> 
                <div>
                    <h1 className='justify-items-start flex col-span-2 font-semibold text-2xl mb-7'>Detalles del pago</h1>
                    <h2>Estado de la transacción:</h2>
                    {(()=>{
                        if(params.transactionState === "4"){
                            return(
                            <p className='text-green-500'>APROBADA</p>
                            )
                        }
                        else if(params.transactionState === "6"){
                            return(
                                <p className='text-red-500'>RECHAZADA</p>
                            )
                        }
                        else if(params.transactionState === "7"){
                            return(
                                <p className='text-orange-300'>PENDIENTE</p>
                            )
                        }
                    })()}
                    <h2>Referencia de compra: </h2><p>{params.referenceCode}</p>
                    <h2>Referencia de pago: </h2><p>{params.reference_pol}</p>
                    <h2>Metodo de pago: </h2><p>{params.lapPaymentMethod}</p>
                    <h2>Total pagado: </h2><p>{params.TX_VALUE}</p>

                    <hr className='col-span-3 my-2'/>



                </div>
                <button className="w-72 mt-8 items-center justify-center rounded-lg border border-transparent bg-blue-50 px-6 py-3 text-base font-medium text-gray-600 shadow-sm hover:bg-blue-100" onClick={handleSavePDF}>Guardar en PDF</button>
                <a
                    href="/"
                    className="w-72 mt-8 items-center justify-center rounded-lg border border-transparent bg-green-400 px-6 py-3 text-base font-medium text-gray-600 shadow-sm hover:bg-green-300"
                    >
                    Finalizar compra
                </a>
                

            </center>
        </div>
    )
}