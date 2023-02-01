import React, { useState, useEffect } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { FiMessageSquare, FiFolder, FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import IMG from '../../../images/logo.png'

const Home = () => {
  const menus = [
    { name: "Dashboard", link: "/", icon: MdOutlineDashboard },
    { name: "Clientes", link: "/", icon: AiOutlineUser },
    { name: "Mensajes", link: "/", icon: FiMessageSquare },
    { name: "Ordenes", link: "/", icon: TbReportAnalytics},
    { name: "Categorias", link: "/", icon: FiFolder, margin: true },
    { name: "Productos", link: "/", icon: FiShoppingCart },
    { name: "Colores", link: "/", icon: AiOutlineHeart},
    { name: "Tamaños", link: "/", icon: AiOutlineHeart},
  ];

  const [open, setOpen] = useState(false);

  return (
    <section >
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
    </section>
  );
};

export default Home;
