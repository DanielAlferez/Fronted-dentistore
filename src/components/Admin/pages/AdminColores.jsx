import React from "react";
import Spinner from "../../spinner/spinner";
import {AiFillDelete,AiFillEdit,AiFillEye} from "react-icons/ai"
import Swal from 'sweetalert2'


export default function (){

    const URLG = import.meta.env.VITE_HOST + "colors/"
    
    


    const [loadingColores,setLoadingColores] = React.useState(true)
    const [colores,setColores] = React.useState()
    const [modalAdd,setModalAdd] = React.useState(false)
    
    const [peticion,setPeticion] = React.useState(true)
    const [token,setToken] = React.useState(localStorage.getItem('token'))
    
    const [images,setImages] = React.useState()
    const [imagesModal,setImagesModal] = React.useState(false)
    const [categorias,setCategorias] = React.useState()

    const [disableAdd,setDisable] = React.useState(true)

    React.useEffect(()=>{
        fetch(URLG,{
            method: 'GET',
            }).then(function(res){  
            return res.json();
        }).then(function(data){
            setLoadingColores(false)
            if(data.length){
                setColores(data)
            }
            else{
                setColores(undefined)
            }

        }).catch(function(error){
            console.log(error)
            alert("Error al consultar el servidor")
            setLoadingColores(false)
            return;
        })
    },[peticion])

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

    const handleAddColor = async (e) =>{
        e.preventDefault()
        const formData = new FormData();
        formData.append("color_id", e.target.elements.color_id.value);
        formData.append("color_name", e.target.elements.color_name.value);

        setLoadingColores(true)
        let status
        const response = await fetch(URLG,{
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
            alertError("Error al agregar categoria")
            
            
          console.log(error)
        })
        setLoadingColores(false)
    }

    const handleDelete = (color_id,color_name) =>{
        let status
        const formData = new FormData();
        formData.append("color_id", color_id);
        formData.append("color_name", color_name);
        
         Swal.fire({
            title: '¿Estas seguro de eliminar "'+color_name+'"?',
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

            setLoadingColores(true)
            fetch(URLG,{
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
                alertError("Error al borrar producto")
                
            })
            
            setLoadingColores(false)
            
          })
    }

    return(
        <>
            <h2 className='text-5xl mb-5'>Colores</h2>
            {(()=>{
                if(loadingColores){
                    return(
                        <>
                            <center>
                                <Spinner/>
                                <h1 className='font-semibold text-2xl'>Espera</h1>
                            </center>
                        </>
                    )
                }else if(colores !== undefined){
                    return(
                        
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
                                                        ID DEL COLOR
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                                    >
                                                        NOMBRE DEL COLOR
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                                    >
                                                        OPCIONES
                                                    </th>
                                                    
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200">
                                                
                                               {colores.map((item,index)=>(
                                                    <tr key={index}>
                                                    <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                                            {item.color_id}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                                        {item.color_name}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                                    <AiFillDelete className='w-8 h-8 cursor-pointer' onClick={()=>{handleDelete(item.color_id,item.color_name)}}/>
                                                    </td>
                                                    
                                                </tr>
            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
                else{
                    return(
                        <p className='text-xl'>No hay colores registrados</p>
                    )
                }
            })()}
            <button 
                className='bg-green-500 hover:bg-green-700 text-white font-bold rounded text-base p-1'
                onClick={()=>{setModalAdd(true)}}
            >
                AGREGAR
            </button>

            {modalAdd && (
                    <div className="fixed bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center">
                    <div className="fixed inset-0 transition-opacity">
                        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>
                    <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                    
                        <form onSubmit={handleAddColor}>
                        <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div>
                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                    Agregar color
                                </h3>
                                <div className="mt-2">
                                    <div className="text-sm leading-5 text-gray-500">
                                            <div className=" relative mt-1 ">
                                                <input
                                                    // onChange={handleChangeFormAdd}
                                                    name="color_id"    
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
                                                        ID del color
                                                </label>
                                            </div>
                                            <div className='relative mt-4'>
                                                <input
                                                    // onChange={handleChangeFormAdd}
                                                    name="color_name"    
                                                    type="text"
                                                    required
                                                    id="floatingInput2_login"
                                                    placeholder=" "
                                                    autoComplete="off"
                                                    className='block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer'/>
                                                <label
                                                    htmlFor="email"
                                                    for="floatingInput2_login" 
                                                    className='absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white spx-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1'
                                                    >
                                                        Nombre del color
                                                </label>

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


        </>

    )
}