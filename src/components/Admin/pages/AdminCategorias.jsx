import React from "react";
import SideBar from "../SideBar";
import Spinner from "../../spinner/spinner";
import {AiFillDelete,AiFillEdit} from "react-icons/ai"
import Swal from 'sweetalert2'




export default function AdminCategories(){
    const URLC = import.meta.env.VITE_HOST + "categories/"
    const [loadingCategories,setLoadingCategories] = React.useState(true)
    const [categorias,setCategorias] = React.useState()
    const [modal,setModal] = React.useState(false)
    const [modalEdit,setModalEdit] = React.useState(false)
    const [peticion,setPeticion] = React.useState(true)
    const [token,setToken] = React.useState(localStorage.getItem('token'))
    const [nameEdit,setName] = React.useState() 

    React.useEffect(()=>{
        fetch(URLC,{
            method: 'GET',  
            }).then(function(res){  
            return res.json();
        }).then(function(data){
            setLoadingCategories(false)
            if(data.length){
                setCategorias(data)
            }

        }).catch(function(error){
            alert("Error al consultar el servidor")
            console.log(error)
            setLoadingCategories(false)
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

    const handledeleteCategorie = async (id,name) => {
        const deleteCategorie = new FormData()
        deleteCategorie.append("category_id",id)
        let status


        await Swal.fire({
            title: '¿Estas seguro de borrar "'+name+'"?',
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

            setLoadingCategories(true)
            fetch(URLC,{
                method: 'DELETE',
                body:deleteCategorie,
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
                alertError("Error al borrar categoria")
                
            })
            
            setLoadingCategories(false)
            
          })
        
          
    }

    const handleAddCategorie = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("category_name", e.target.elements.category_name.value);
        formData.append("category_image", e.target.elements.category_image.files[0]);

        setLoadingCategories(true)
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
            alertError("Error al agregar categoria")
            
            
          console.log(error)
        })
        setLoadingCategories(false)
    }

    
    const handleEditCategorie = async (e) =>{
        e.preventDefault()
        const formData = new FormData();
        formData.append("category_name", e.target.elements.category_name.value);
        formData.append("category_image", e.target.elements.category_image.files[0]);
        formData.append("category_id", e.target.elements.category_id.value);
        let status
        setLoadingCategories(true)
        await fetch(URLC,{
            method: 'PUT',
            body:formData,
            headers: {
            "Authorization" :  `Bearer ${token}`
        }}).then(function(res){
            status = res.status
            return res.json()
            

        }).then(function(data){
            setToken(data.token)
            if(status !== 200)throw new Error(data.token,data.message)
            alertSuccessfull(data.message)
            localStorage.setItem('token',data.token)

        }).catch(function(error){
            alertError("Error al editar categoria")
        })
        setLoadingCategories(false)

    }

    const handleEdit = (category_id,category_name) => {
        setModalEdit(true)
        setName({
            category_id,
            category_name
        })

    }
    

    return(
        <>
                {(()=>{
                    if(loadingCategories){
                        return(
                            <>
                            <center>
                            <Spinner/>
                                <h1 className='font-semibold text-2xl'>Espera</h1>
                            </center>
                        </>
                    )
                }else if(categorias.length){
                    return(
                        <>
                            <h2 className='text-5xl mb-5'>Categorias</h2>
                            <table className="table-auto border-2 border-solid border-black">
                                <thead>
                                    <tr>
                                        <th className='font-semibold text-base border-2 border-solid border-black'>Nombre de la categoria</th>
                                        <th className='font-semibold text-base border-2 border-solid border-black'>Imagen</th>
                                        <th className='font-semibold text-base '>Opciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categorias.map((item, index) => (
                                        <tr key={index}>
                                        <td className='text-sm border-2 border-solid border-black'>{item.category_name}</td>
                                        <td className="border-2 border-solid border-black"><img className='w-40' src={'data:image/png;base64,'+item.category_image}/></td>
                                        <td className="border-2 border-solid border-black"><AiFillDelete className='w-8 h-8 cursor-pointer' onClick={()=>{handledeleteCategorie(item.category_id,item.category_name)}}/></td>
                                        <td className="border-2 border-solid border-black"><AiFillEdit className='w-8 h-8 cursor-pointer' onClick={()=>{handleEdit(item.category_id,item.category_name)}}/></td>
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                            <button 
                                className='bg-green-500 hover:bg-green-700 text-white font-bold rounded text-base p-1'
                                onClick={()=>{setModal(true)}}
                            >
                                AGREGAR
                            </button>
                        </>
                    )
                }
                else{
                    return(
                        <p className='text-xl'>No hay categorias disponibles</p>
                    )
                }
            })()}

            {modal && (
                    <div className="fixed bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center">
                    <div className="fixed inset-0 transition-opacity">
                        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>
                    <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                    
                        <form onSubmit={handleAddCategorie}>
                        <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div>
                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                    Agregar categoria
                                </h3>
                                <div className="mt-2">
                                    <div className="text-sm leading-5 text-gray-500">
                                            <div className=" relative mt-1 ">
                                                <input
                                                    // onChange={handleChangeFormAdd}
                                                    name="category_name"    
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
                                                        Nombre de la categoria
                                                </label>
                                            </div>
                                            <div className='mt-4'>
                                                <p className="mb-3">Imagen:</p>
                                                <input 
                                                    type="file" 
                                                    accept=".jpg,.jpeg,.png"
                                                    name="category_image" 
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
                                onClick={()=>{setModal(false)}}
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

                {modalEdit && (
                    <div className="fixed bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center">
                    <div className="fixed inset-0 transition-opacity">
                        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>
                    <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                    
                        <form onSubmit={handleEditCategorie}>
                        <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div>
                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                    Editar categoria
                                </h3>
                                <div className="mt-2">
                                    <div className="text-sm leading-5 text-gray-500">
                                            <div className=" relative mt-1 ">
                                                <input type="hidden" value={nameEdit.category_id} name="category_id"/>
                                                <input
                                                    // onChange={handleChangeFormAdd}
                                                    name="category_name"    
                                                    type="text"
                                                    required
                                                    id="floatingInput1_login"
                                                    placeholder=" "
                                                    defaultValue={nameEdit.category_name}
                                                    autoComplete="off"
                                                    className='block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer'/>
                                                <label
                                                    htmlFor="email"
                                                    for="floatingInput1_login" 
                                                    className='absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white spx-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1'
                                                    >
                                                        Nombre de la categoria
                                                </label>
                                            </div>
                                            <div className='mt-4'>
                                                <p className="mb-3">Imagen:</p>
                                                <input 
                                                    type="file" 
                                                    accept=".jpg,.jpeg,.png"
                                                    name="category_image" 
                                                    placeholder=""
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
                                onClick={()=>{setModalEdit(false)}}
                                >
                                Cerrar
                                </button>
                            </span>

                            <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                                <button
                                type="submit"
                                className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-green-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-red active:bg-green-700 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                                >
                                    Editar
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