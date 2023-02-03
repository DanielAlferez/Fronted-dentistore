import React from 'react'
import SideBar from "./SideBar";
import jwt_decode from 'jwt-decode';
import Spinner from '../spinner/spinner';

export default function Dashboard() {

  const [userData,setUserData] = React.useState({})
  const [auth,setAuth] = React.useState(false)
  const [loading,setLoading] = React.useState(true)
  const URL = "http://localhost:5000/api/user/"

  React.useEffect(()=>{
    const token = localStorage.getItem('token')
    if(token  === null){
      alert("Error de autenticacion")
      window.location.replace('/')
      return;
    }
    const decodedToken = jwt_decode(token);
    setUserData(decodedToken)
    if(decodedToken.role !== 'admin'){
      alert("Error de autenticacion")
      window.location.replace('/')
      return;
    }
    const response = fetch(URL,{
        method: 'POST',  
        headers: {
        "Authorization" :  `Bearer ${token}`,
        "Content-Type": 'application/json',
    }}).then(function(res){  
      return res.json();
    }).then(function(data){
      localStorage.setItem('token',data.token)
      setLoading(false)
    }).catch(function(error){
      localStorage.removeItem('token')
      alert("Su sesión ha expirado o ha habido un error con el servidor")
      return;
    })
    
    
    setAuth(true)
  },[])


  return(
    <>
      {(()=>{
          if(loading){
            return(
              <center>
               <Spinner/>
               <h1 className='font-semibold text-2xl'>Espera</h1>
              </center>
            )
          }
          else{
            return(
              <div className="flex gap-6">
              <SideBar/>
                <div className='md:ml-72 ml-16 text-7xl max-h-screen'>
                </div>
              </div>
            )
          }
        })()}
    </>
  )
  // !auth ? (
  //   <>
  //   {
  //     //window.location.replace('/')
  //   }
  //   <div>
  //     No se autenticado
  //   </div>
  //   </>
  // )
  // :(
  //   <>
  //     <div className="flex gap-6">
  //       <SideBar/>
  //       <div className='md:ml-72 ml-16 text-7xl max-h-screen'>

  //       </div>
  //     </div>
  //   </>
  // )
}
