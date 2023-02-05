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
                if(status !== 200)throw new Error(data.token,data.message)

                alertSuccessfull(data.message)

                localStorage.setItem('token',data.token)
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
                            <table className="table-auto border-2 border-solid border-black">
                                <thead>
                                    <tr>
                                        <th className='font-semibold text-base border-2 border-solid border-black'>Correo electronico</th>
                                        <th className='font-semibold text-base border-2 border-solid border-black'>Nombre</th>
                                        <th className='font-semibold text-base border-2 border-solid border-black'>Telefono</th>
                                        <th className='font-semibold text-base border-2 border-solid border-black'>Fecha de registro <br></br>D-M-A</th>
                                        <th className='font-semibold text-base '>Opciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {clientes.map((item, index) => (
                                        <tr key={index}>
                                        <td className='text-sm border-2 border-solid border-black'>{item.usermail}</td>
                                        <td className="text-sm border-2 border-solid border-black">{item.username}</td>
                                        <td className="text-sm border-2 border-solid border-black">{item.userphone}</td>
                                        <td className="text-sm border-2 border-solid border-black">{item.date_joined}</td>
                                        <td className="border-2 border-solid border-black"><AiFillDelete className='w-8 h-8 cursor-pointer' onClick={()=>{handledeleteUser(item.userid,item.username)}}/></td>
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
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