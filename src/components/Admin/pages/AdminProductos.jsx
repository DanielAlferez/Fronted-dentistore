import React from 'react';
import Spinner from '../../spinner/spinner';
import {AiFillDelete,AiFillEdit,AiFillEye} from "react-icons/ai"

import Swal from 'sweetalert2'

export default function AdminProductos() {
    const URLP = import.meta.env.VITE_HOST + "products/"
    const URLC = import.meta.env.VITE_HOST + "imagesProducts/"
    const URLCategorias = import.meta.env.VITE_HOST + "categories-names/"


    const [loadingProductos,setLoadingProductos] = React.useState(true)
    const [productos,setProductos] = React.useState()
    const [modalAdd,setModalAdd] = React.useState(false)
    
    const [peticion,setPeticion] = React.useState(true)
    const [token,setToken] = React.useState(localStorage.getItem('token'))
    
    const [images,setImages] = React.useState()
    const [imagesModal,setImagesModal] = React.useState(false)
    const [categorias,setCategorias] = React.useState()
    const [modalCarac,setModelCarac] = React.useState(false)
    const [dataProductModal,setDataProducModal] = React.useState()
    const [disableAdd,setDisable] = React.useState(true)

    

    React.useEffect(()=>{
        fetch(URLCategorias,{
            method: 'GET',
            }).then(function(res){  
            return res.json();
        }).then(function(data){
            setCategorias(data)
            if(data.length)setDisable(false)
        }).catch(function(error){
            alert("Error al consultar el servidor")
            console.log(error)
            return;
        })
    },[])

    React.useEffect(()=>{
        fetch(URLP,{
            method: 'GET',
            }).then(function(res){  
            return res.json();
        }).then(function(data){
            setLoadingProductos(false)
            if(data.length){
                setProductos(data)
            }
            else{
                setProductos(undefined)
            }

        }).catch(function(error){
            alert("Error al consultar el servidor")
            
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
            localStorage.setItem('token',data.token)
            if(status !== 200)throw new Error(data.token,data.message)
          
            alertSuccessfull(data.message)
            setToken(data.token)

        }).catch(function(error){
            alertError("Error al agregar imagen")
            
            
          console.log(error)
        })
        setLoadingProductos(false)
        setImagesModal(false)
    }

    const deleteImage = (image_id) =>{
        let status
        const formData = new FormData();
        formData.append("image_id", image_id);
        fetch(URLC,{
            method: 'DELETE',
            body:formData,
            headers: {
            "Authorization" :  `Bearer ${token}`
        }}).then(function(res){
            status = res.status

            return res.json();
        }).then(function(data){
            setToken(data.token)
            localStorage.setItem('token',data.token)
            if(status !== 200)throw new Error(data.token,data.message)

            alertSuccessfull(data.message)

            setToken(data.token)
        }).catch(function(error){
            alertError("Error al borrar imagen")
            
        })
        setImagesModal(false)
        setLoadingProductos(false)
    }

    const handleAddProduct = async (e) =>{
        e.preventDefault()
        const formData = new FormData();
        formData.append("product_name", e.target.elements.product_name.value);
        formData.append("product_price", e.target.elements.product_price.value);
        formData.append("product_stock", e.target.elements.product_stock.value);
        formData.append("product_descrip", e.target.elements.product_stock.value);
        formData.append("product_details", e.target.elements.product_details.value);
        formData.append("category_id",e.target.elements.categoria.value)

        setLoadingProductos(true)
        let status
        const response = await fetch(URLP,{
            method: 'POST',
            body:formData,
            headers: {
            "Authorization" :  `Bearer ${token}`
        }}).then(function(res){  
            status = res.status

            return res.json();
        }).then(function(data){
            setToken(data.token)
            localStorage.setItem('token',data.token)
            if(status !== 200)throw new Error(data.token,data.message)
          
            alertSuccessfull(data.message)
            setToken(data.token)

        }).catch(function(error){
            alertError("Error al agregar producto")
            
            
          console.log(error)
        })
        setLoadingProductos(false)
        setModalAdd(false)

    }

    const handleDeleteProduct = async (id,name) => {
        const deleteProduct = new FormData()
        deleteProduct.append("product_id",id)
        let status


        await Swal.fire({
            title: '¿Estas seguro de eliminar "'+name+'"?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Confirmar'
          }).then((result) => {
            if (!result.isConfirmed) {
                return
            }

            setLoadingProductos(true)
            fetch(URLP,{
                method: 'DELETE',
                body:deleteProduct,
                headers: {
                "Authorization" :  `Bearer ${token}`
            }}).then(function(res){
                status = res.status

                return res.json();
            }).then(function(data){
                setToken(data.token)
                localStorage.setItem('token',data.token)
                if(status !== 200)throw new Error(data.token,data.message)

                alertSuccessfull(data.message)

                setToken(data.token)
            }).catch(function(error){
                alertError("Error al borrar producto")
                
            })
            
            setLoadingProductos(false)
            
          })
        
          
    }

    const handledescripcion = (descripcion,detalles,colores,categoria) => {
        setDataProducModal({
            descripcion,
            detalles,
            colores,
            categoria
        })
        setModelCarac(true)
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
                else if(productos !== undefined){
                    return(
                        <>
                            <h2 className='text-5xl mb-5'>Productos</h2>
                            <div className="flex flex-col">
                                <div className="overflow-x-auto">
                                    

                                    <div className="p-1.5 w-full inline-block align-middle">
                                        <div className="overflow-hidden border rounded-lg">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                                        >
                                                            Nombre del producto
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                                        >
                                                            Precio del producto
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                                        >
                                                            Stock del producto
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                                        >
                                                            Imagenes del producto
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                                        >
                                                            ver mas caracteristicas
                                                        </th>
                                                        
                                                        <th
                                                            scope="col"
                                                            className="py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                                        >
                                                            Opciones
                                                        </th>
                                                        
                                                        
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-200">
                                                    
                                                {productos.map((item,index)=>(
                                                        <tr key={index}>
                                                            <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                                                    {item.product_name}
                                                            </td>
                                                            <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                                                    {item.product_price}
                                                            </td>
                                                            <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                                                    {item.product_stock}
                                                            </td>
                                                            <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                                                <AiFillEye onClick={()=>{handleImages(item.product_id,item.product_name,item.images)}} className='cursor-pointer w-8 h-8'/>
                                                            </td>
                                                            <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                                                <AiFillEye onClick={()=>{handledescripcion(item.product_descrip,item.product_details,item.colors,item.category.category_name)}} className='cursor-pointer w-8 h-8'/>
                                                            </td>
                                                           
                                                            <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                                                <AiFillDelete className='w-8 h-8 cursor-pointer' onClick={()=>{handleDeleteProduct(item.product_id,item.product_name)}}/>
                                                            </td>
                                                            
                                                        
                                                        
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                                
                            </>    
                    )
                }
                else{
                    return(
                        <p className='text-xl'>No hay productos registrados</p>
                    )
                }
            })()}

            <button 
                className='bg-green-500 hover:bg-green-700 text-white font-bold rounded text-base p-1'
                onClick={()=>{setModalAdd(true)}}
            >
                AGREGAR
            </button>

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
                                                <AiFillDelete className='w-8 h-8 cursor-pointer' onClick={()=>{deleteImage(item.image_id)}} />
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

                 
                {modalAdd && (
                    <div className="fixed bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center">
                    <div className="fixed inset-0 transition-opacity">
                        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>
                    <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                    
                        <form onSubmit={handleAddProduct}>
                        <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div>
                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                    Agregar producto
                                </h3>
                                <div className="mt-2">
                                    <div className="text-sm leading-5 text-gray-500">
                                            <div className=" relative mt-1 pb-2">
                                                <input
                                                    // onChange={handleChangeFormAdd}
                                                    name="product_name"    
                                                    type="text"
                                                    required
                                                    id="floatingInput1_login"
                                                    maxLength="30"
                                                    placeholder="Nombre del producto"
                                                    autoComplete="off"
                                                    className='block px-2.5 pb-2.5 pt-4 w-1/2 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer'/>
                                                
                                            </div>

                                            <div className=" relative mt-1 pb-2">
                                                <input
                                                    // onChange={handleChangeFormAdd}
                                                    name="product_price"    
                                                    type="number"
                                                    min="0"
                                                    required
                                                    id="floatingInput2_login"
                                                    placeholder="Precio del producto"
                                                    autoComplete="off"
                                                    className='block px-2.5 pb-2.5 pt-4 w-1/2 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer'/>
                                                
                                            </div>

                                            <div className=" relative mt-1 pb-2">
                                                <input
                                                    // onChange={handleChangeFormAdd}
                                                    name="product_stock"    
                                                    type="number"
                                                    min="0"
                                                    required
                                                    id="floatingInput3_login"
                                                    placeholder="Stock del producto"
                                                    autoComplete="off"
                                                    className='block px-2.5 pb-2.5 pt-4 w-1/2 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer'/>
                                                
                                            </div>

                                            <div className=" relative mt-1 pb-2">
                                                <input
                                                    // onChange={handleChangeFormAdd}
                                                    name="product_descrip"    
                                                    type="text"
                                                    maxLength="300"
                                                    
                                                    id="floatingInput4_login"
                                                    placeholder="Descripción del producto"
                                                    autoComplete="off"
                                                    className='block px-2.5 pb-2.5 pt-4 w-full h-28 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer'/>
                                                
                                            </div>

                                            <div className=" relative mt-1 pb-2">
                                                <input
                                                    // onChange={handleChangeFormAdd}
                                                    name="product_details"    
                                                    type="text"
                                                    maxLength="300"
                                                    
                                                    id="floatingInput5_login"
                                                    placeholder="Detalles del producto"
                                                    autoComplete="off"
                                                    className='block px-2.5 pb-2.5 pt-4 w-full h-20 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer'/>
                                                
                                            </div>

                                            
                                                {(()=>{
                                                    if(categorias.length){
                                                        return(
                                                            <>
                                                                <div className=" relative mt-1 pb-2">
                                                                    <select name="categoria" className='rounded-md'>
                                                                        {categorias.map((item,index)=>(
                                                                                <option value={item.category_id}>{item.category_name}</option>
                                                                            ))}
                                                                    </select>
                                                                </div>                                            
                                                            </>
                                                        )
                                                    }
                                                    else{
                                                        return(
                                                            <p className='text-sm'>No hay categorias disponibles para este producto, agregue una para crear un producto</p>
                                                        )
                                                    }
                                                })()}
                                            
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            
                            <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                                <button
                                type="button"
                                className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-700 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                                onClick={()=>{setModalAdd(false)}}
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

        {modalCarac && (
                    <div className="fixed bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center">
                    <div className="fixed inset-0 transition-opacity">
                        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>
                    <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                    
                    <div className="flex flex-col">
            <div className="overflow-x-auto">
                
                <div className="p-1.5 w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                    >
                                        Descripcion
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                    >
                                        Detalles
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                    >
                                        Colores
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                    >
                                        Categoria
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                <tr>
     
                                    <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                        {dataProductModal.descripcion}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                        {dataProductModal.detalles}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                        {(()=>{
                                            if(dataProductModal.colores.length){
                                                return(
                                                    <>
                                                        {dataProductModal.colores.map((item,index)=>(
                                                            <p key={index}>{item.color_name}</p>
                                                        ))}
                                                    </>
                                                )
                                            }
                                        })()}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                        {dataProductModal.categoria}
                                    </td>
                                    
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
                        
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            
                            <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                                <button
                                type="button"
                                className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-700 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                                onClick={()=>{setModelCarac(false)}}
                                >
                                Cerrar
                                </button>
                            </span>
                        </div>
                        
                    </div>
                    </div>
                )}

        </>
    )
}