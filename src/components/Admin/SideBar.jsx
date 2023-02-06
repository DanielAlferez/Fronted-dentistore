import React, { useState, useEffect } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser, AiOutlineHeart,AiOutlineRollback } from "react-icons/ai";
import { FiMessageSquare, FiFolder, FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import IMG from '../../../images/logo.png'

import jwt_decode from 'jwt-decode';
import Spinner from '../spinner/spinner';

const SideBar = () => {
  const menus = [
    { name: "Dashboard", link: "/dashboard", icon: MdOutlineDashboard },
    { name: "Clientes", link: "/", icon: AiOutlineUser },
    { name: "Mensajes", link: "/", icon: FiMessageSquare },
    { name: "Ordenes", link: "/", icon: TbReportAnalytics},
    { name: "Ventas", link: "/", icon: FiShoppingCart },
    { name: "Categorias", link: "/admin-categorias", icon: FiFolder, margin: true },
    { name: "Productos", link: "/", icon: FiShoppingCart },
    { name: "Colores", link: "/", icon: AiOutlineHeart},
    { name: "Tamaños", link: "/", icon: AiOutlineHeart},
    { name: "Regresar",link: "/", icon: AiOutlineRollback},
  ];

  const [open, setOpen] = useState(false);

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

  return (
    <section >
      {(()=>{
          if(loading){
            return(
              <>
               <Spinner/>
               <center>
               <h1 className='font-semibold text-2xl'>Espera</h1>
               </center>
               </>
            )
          }
          else{
            return(
              <div className="flex gap-6">
                <div
                  className={`bg-white border shadow-lg min-h-screen fixed md:w-72 w-16  duration-300 text-gray-900 px-4`}
                >
                  <div className="mt-4 flex flex-col gap-4 relative">
                    {menus?.map((menu, i) => (
                      <Link
                        to={menu?.link}
                        key={i}
                        className={` ${
                          menu?.margin && "mt-5" 
                        } group hover:bg-gray-50 flex items-center text-sm  gap-3.5 font-medium p-3 hover:text-dark rounded-md`}
                      >
                        <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                        <h2
                          className={`duration-200 opacity-0 md:opacity-100  overflow-hidden`}
                        >
                          {menu?.name}
                        </h2>
                        <h2
                          className={`md:hidden absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
                        >
                          {menu?.name}
                        </h2>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )
          }
        })()}
    </section>
  );
};

export default SideBar;
