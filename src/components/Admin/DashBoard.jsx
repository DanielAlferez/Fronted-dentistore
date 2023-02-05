import React, { useState, useEffect } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser, AiOutlineHeart,AiOutlineRollback } from "react-icons/ai";
import { FiMessageSquare, FiFolder, FiShoppingCart } from "react-icons/fi";
import { Link, NavLink, Outlet } from "react-router-dom";
import IMG from '../../../images/logo.png'

import Clientes from "./pages/AdminCategorias";
import AdminInicio from "./pages/AdminInicio";
import AdminClientes from "./pages/AdminClientes";
import AdminProductos from "./pages/AdminProductos";

import jwt_decode from 'jwt-decode';
import Spinner from '../spinner/spinner';
import AdminCategories from "./pages/AdminCategorias";

const Home = () => {
  const menus = [
    { name: "Dashboard", link: "inicio", icon: MdOutlineDashboard },
    { name: "Clientes", link: "clientes", icon: AiOutlineUser },
    { name: "Mensajes", link: "mensajes", icon: FiMessageSquare },
    { name: "Ordenes", link: "ordenes", icon: TbReportAnalytics},
    { name: "Categorias", link: "categorias", icon: FiFolder, margin: true },
    { name: "Productos", link: "productos", icon: FiShoppingCart },
    { name: "Colores", link: "colores", icon: AiOutlineHeart},
    { name: "Tamaños", link: "tamanos", icon: AiOutlineHeart},
    { name: "Regresar",link: "/", icon: AiOutlineRollback},
  ];
  
  const [page,setPage] = React.useState("inicio")
  

  const [userData,setUserData] = React.useState({})
  
  const [loading,setLoading] = React.useState(true)
  const URL = import.meta.env.VITE_HOST + "user/"

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
    
    
    
  },[])

  const handleWindow = (pageSelected) =>{
    setPage(pageSelected)
  }

  return (
    <section >
      {(()=>{
          if(loading){
            return(
              <>
               <center>
               <Spinner/>
               <h1 className='font-semibold text-2xl'>Espera</h1>
               </center>
               </>
            )
          }
          else{
            return(
              <>
              <div className="flex gap-6">
                <div
                  className={`bg-white border shadow-lg min-h-screen fixed md:w-72 w-16  duration-300 text-gray-900 px-4`}
                >
                  <div className="mt-4 flex flex-col gap-4 relative">
                    {menus?.map((menu, i) => (
                          <div
                            // to={menu?.link}
                            key={i}
                            className={` ${
                              menu?.margin && "mt-5" 
                            } ${page === menu?.link && "bg-green-400 duration-75"}

                              group hover:bg-gray-50 flex items-center text-sm  gap-3.5 font-medium p-3 hover:text-dark rounded-md cursor-pointer`}
                            onClick={()=>{
                              handleWindow(menu?.link)
                            }}
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
                          </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className='md:ml-72 ml-16 text-7xl max-h-screen p-4'>

                {page === 'inicio' && <AdminInicio name={userData.username}/>}
                {page === 'clientes' && <AdminClientes/>}
                {page === 'categorias' && <AdminCategories/>}
                {page === 'productos' && <AdminProductos/>}
                {page === '/' && window.location.replace('/')}
                
              </div>
              </>
            )
          }
        })()}
    </section>
  );
};

export default Home;
