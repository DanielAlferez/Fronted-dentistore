import React from "react";
import Spinner from "../../spinner/spinner";
import {AiFillDelete,AiFillEdit} from "react-icons/ai"
import Swal from 'sweetalert2'


export default function AdminClientes(){
    const URLC = import.meta.env.VITE_HOST + "clientes/"
    const [loadingClientes,setLoadingClientes] = React.useState(true)
    const [clientes,setClientes] = React.useState()
    const [modal,setModal] = React.useState(false)
    const [modalEdit,setModalEdit] = React.useState(false)
    const [peticion,setPeticion] = React.useState(true)
    const [token,setToken] = React.useState(localStorage.getItem('token'))
    const [nameEdit,setName] = React.useState() 

    React.useEffect(()=>{
        fetch(URLC,{
            method: 'GET',
            headers: {
                "Authorization" :  `Bearer ${token}`
            }}).then(function(res){  
            return res.json();
        }).then(function(data){
            setLoadingClientes(false)
            setClientes(data.data)
            setToken(data.token)
            localStorage.setItem('token',data.token)

        }).catch(function(error){
            alert("Error al consultar el servidor")
            console.log(error)
            setLoadingClientes(false)
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

    const handledeleteUser = async (id,name) => {
        const deleteUser = new FormData()
        deleteUser.append("userid",id)
        let status


        await Swal.fire({
            title: '¿Estas seguro de eliminar la cuenta de "'+name+'"?',
            text: "¡No podrás revertir esto! Todos sus datos seran eliminados",
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

            setLoadingClientes(true)
            fetch(URLC,{
                method: 'DELETE',
                body:deleteUser,
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
                alertError("Error al borrar usuario")
                
            })
            
            setLoadingClientes(false)
            
          })
        
          
    }


    return(
        <>
            {(()=>{
                if(loadingClientes){
                    return(
                        <>
                            <center>
                                <Spinner/>
                                <h1 className='font-semibold text-2xl'>Espera</h1>
                            </center>
                        </>
                    )
                }else if(clientes.length){
                    return(
                        <>
                            <h2 className='text-5xl mb-5'>Clientes registrados</h2>
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
                                                            Correo electronico
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                                        >
                                                            Nombre
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                                        >
                                                            Telefono
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                                        >
                                                            Fecha de registro DDD-MMM-AAA
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                                        >
                                                            Opciones
                                                        </th>
                                                        
                                                        
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-200">
                                                    
                                                {clientes.map((item,index)=>(
                                                        <tr key={index}>
                                                        <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                                                {item.usermail}
                                                        </td>
                                                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                                            {item.username}
                                                        </td>
                                                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                                            {item.userphone}
                                                        </td>
                                                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                                            {item.date_joined}
                                                        </td>
                                                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                                            <AiFillDelete className='w-8 h-8 cursor-pointer' onClick={()=>{handleDelete(item.userid,item.username)}}/>
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
                }else{
                    return(
                        <p className='text-xl'>No hay clientes registrados</p>
                    )
                }
            })()}
            
        </>
        
    )
}