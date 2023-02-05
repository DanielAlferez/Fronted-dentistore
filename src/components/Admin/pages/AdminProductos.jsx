import React from 'react';
import Spinner from '../../spinner/spinner';
import {AiFillDelete,AiFillEdit,AiFillEye} from "react-icons/ai"

import Swal from 'sweetalert2'

export default function AdminProductos() {
    const URLP = import.meta.env.VITE_HOST + "products/"
    const URLC = import.meta.env.VITE_HOST + "imagesProducts/"


    const [loadingProductos,setLoadingProductos] = React.useState(true)
    const [productos,setProductos] = React.useState()
    const [modal,setModal] = React.useState(false)
    const [modalEdit,setModalEdit] = React.useState(false)
    const [peticion,setPeticion] = React.useState(true)
    const [token,setToken] = React.useState(localStorage.getItem('token'))
    const [nameEdit,setName] = React.useState()
    const [images,setImages] = React.useState()
    const [imagesModal,setImagesModal] = React.useState(false)

    const [contentModal,setContentModal] = React.useState()

    React.useEffect(()=>{
        fetch(URLP,{
            method: 'GET',
            }).then(function(res){  
            return res.json();
        }).then(function(data){
            setLoadingProductos(false)
            setProductos(data)
            

        }).catch(function(error){
            alert("Error al consultar el servidor")
            console.log(error)
            setLoadingProductos(false)
            return;
        })
    },[peticion])

    const handleContent = (title,content) => {
        Swal.fire({
            title:title,
            text:content
        }
        )
    }

    const handleImages = (id,name_producto,images) =>{
        setImages({
            id,
            name_producto,
            images
        })
        setImagesModal(true)

    }

    const alertSuccessfull = (message) => {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'success',
            title: message
          })
      
        setPeticion(!peticion)
    }

    const alertError = () => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Hubo un error con el servidor!',
          })
    }

    const handleAddImage = async (e) => {
        e.preventDefault()

        const formData = new FormData();
        formData.append("image_name", e.target.elements.image_name.value);
        formData.append("image", e.target.elements.image.files[0]);
        formData.append("product_id", e.target.elements.product_id.value);
        

        setLoadingProductos(true)
        let status
        const response = await fetch(URLC,{
            method: 'POST',
            body:formData,
            headers: {
            "Authorization" :  `Bearer ${token}`
        }}).then(function(res){  
            status = res.status

            return res.json();
        }).then(function(data){
            setToken(data.token)
            if(status !== 200)throw new Error(data.token,data.message)
          
            alertSuccessfull(data.message)
            localStorage.setItem('token',data.token)
            setToken(data.token)

        }).catch(function(error){
            alertError("Error al agregar imagen")
            
            
          console.log(error)
        })
        setLoadingProductos(false)
        setImagesModal(false)
    }

    return(
        <>
            {(()=>{
                if(loadingProductos){
                    return(
                        <>
                            <center>
                                <Spinner/>
                                <h1 className='font-semibold text-2xl'>Espera</h1>
                            </center>
                        </>
                    )
                }
                else if(productos.length){
                    return(
                        <>
                            <h2 className='text-5xl mb-5'>Productos</h2>
                            <table className="table-auto border-2 border-solid border-black">
                                    <thead>
                                        <tr>
                                            <th className='font-semibold text-base border-2 border-solid border-black'>Nombre del producto</th>
                                            <th className='font-semibold text-base border-2 border-solid border-black'>Precio del producto</th>
                                            <th className='font-semibold text-base border-2 border-solid border-black'>Stock del producto</th>
                                            <th className='font-semibold text-base border-2 border-solid border-black'>Imagenes del producto</th>
                                            <th className='font-semibold text-base border-2 border-solid border-black'>Descripcion del producto</th>
                                            <th className='font-semibold text-base border-2 border-solid border-black'>Detalles del producto</th>
                                            <th className='font-semibold text-base border-2 border-solid border-black'>Categoria</th>
                                            <th className='font-semibold text-base '>Opciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {productos.map((item, index) => (
                                            <tr key={index}>
                                            <td className='text-sm border-2 border-solid border-black'>{item.product_name}</td>
                                            <td className="text-sm border-2 border-solid border-black">{item.product_price}</td>
                                            <td className="text-sm border-2 border-solid border-black">{item.product_stock}</td>
                                            <td className="text-sm border-2 border-solid border-black" onClick={()=>{handleImages(item.product_id,item.product_name,item.images)}}><AiFillEye className='cursor-pointer w-8 h-8'/></td>
                                            <td className="text-sm border-2 border-solid border-black" onClick={()=>{handleContent('Descripción',item.product_descrip)}}><AiFillEye className='cursor-pointer w-8 h-8'/></td>
                                            <td className="text-sm border-2 border-solid border-black" onClick={()=>{handleContent('Detalles',item.product_details)}}><AiFillEye className='cursor-pointer w-8 h-8'/></td>
                                            <td className="text-sm border-2 border-solid border-black">{item.category.category_name}</td>

                                            <td className="border-2 border-solid border-black"><AiFillDelete className='w-8 h-8' onClick={()=>{handledeleteUser(item.userid,item.username)}}/></td>
                                        </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </>    
                    )
                }
                else{
                    <p className='text-xl'>No hay productos registrados</p>
                }
            })()}

            {imagesModal && (
                    <div className="fixed bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center">
                    <div className="fixed inset-0 transition-opacity">
                        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>
                    <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                        <h3 className="text-lg leading-6 font-medium text-gray-900 p-4">
                                        Imagenes de {images.name_producto}
                                    </h3>
                            {(()=>{
                            if(images.images.length){
                                return(
                                    <>
                                        {images.images.map((item,index)=>(
                                            <div className='flex pl-4' key={index}>
                                                <img className='w-40 border-black border-2 rounded-md' src={'data:image/png;base64,'+item.image_text}/>  
                                                <p className='text-lg pl-4'>{item.image_name}</p>
                                            </div>
                                        ))}
                                    </>
                                )
                            }
                            else{
                                return(
                                    <p className='text-lg pl-4'>No hay imagenes para este producto</p>
                                )
                            }
                        })()}
                    
                        <form onSubmit={handleAddImage}>
                        <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <p className='text-lg '>Agregar imagen:</p>
                            <div>
                                
                                <div className="mt-2">
                                    <div className="text-sm leading-5 text-gray-500">
                                            <div className=" relative mt-1 ">
                                                <input name="product_id" type="hidden" value={images.id}/>
                                                <input
                                                    // onChange={handleChangeFormAdd}
                                                    name="image_name"    
                                                    type="text"
                                                    required
                                                    id="floatingInput1_login"
                                                    placeholder=" "
                                                    autoComplete="off"
                                                    className='block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer'/>
                                                <label
                                                    htmlFor="email"
                                                    for="floatingInput1_login" 
                                                    className='absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white spx-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1'
                                                    >
                                                        Nombre de la imagen
                                                </label>
                                            </div>
                                            <div className='mt-4'>
                                                <p className="mb-3">Imagen:</p>
                                                <input 
                                                    type="file" 
                                                    accept=".jpg,.jpeg,.png"
                                                    name="image" 
                                                    placeholder=""
                                                    required
                                                    // onChange={handleChangeFormAdd}
                                                />

                                            </div>
                                            
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            
                            <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                                <button
                                type="button"
                                className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-700 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                                onClick={()=>{setImagesModal(false)}}
                                >
                                Cerrar
                                </button>
                            </span>

                            <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                                <button
                                type="submit"
                                className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-green-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-red active:bg-green-700 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                                >
                                    Añadir
                                </button>
                            </span>
                        </div>
                        </form>
                    </div>
                    </div>
                )}  

        </>
    )
}