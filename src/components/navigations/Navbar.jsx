import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon} from '@heroicons/react/outline'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { BiSearch } from "react-icons/bi";
import {CgProfile} from "react-icons/cg"
import React from 'react';
import Modal from "../../containers/auth/Login"
import IMG from '../../../images/logo.png'
import Logout from '../../containers/auth/logout';
import Cart from '../Shop/Cart'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar({cartStatus}) {

  const URL = "https://dentistore.online:5000/api/categories"
  //const URL = "http://localhost:5000/api/categories"  
  const [data,setData] = React.useState([]);
  React.useEffect(() =>{
    async function loadCategories() {
      try{
        const res = await fetch(URL);
        const data = await res.json();
        if(!data.length){
          const dataf = [
            {"category_id":0,"category_name":"No hay categorias disponibles"}
          ]
          setData(dataf);
        }
        else{
          setData(data);
        }
      }catch(error){
        const dataf = [
          {"category_id":0,"category_name":"No hay categorias disponibles"}
        ]
        setData(dataf);
      }
      //{
      //   'mode':'cors',
      //   'headers':{
      //     'Access-Control-Allow-Origin':'*',
      //   }
      // });
    }
    loadCategories()
  },[])
  if(!data.length) return
  return (
    <div >
      {(()=>{
        if(localStorage.getItem('token')  !== null){
          return(
            <Logout/>
          )
        }
      })()}
      <Popover.Group as="nav" className="grid grid-cols-3 py-2">        
        <div className='grid justify-center'>
          <a href="/" className=" text-gray-500 hover:text-gray-900">
            <img width={'230px'} src={IMG}/>
          </a>
        </div>
        
        <div className="invisible md:visible flex items-center justify-center">
            <form className="flex space-x-1 w-full" action="">
              <input
                type="text"
                className="w-full text-black bg-white border rounded-full focus:ring-light focus:ring focus:ring-opacity-40"
                placeholder="Buscar..."
                />
              <button className="px-4 text-white bg-light hover:bg-dark rounded-full ">
                <BiSearch/>
              </button>
            </form> 
        </div>

        <div className="flex items-center justify-center">
          <div className='w-10'>
              {(()=>{
                if(localStorage.getItem('token')  !== null){
                  return(
                    <a href="/" className="text-gray-700 hover:text-light">
                      <CgProfile className='w-8 h-8'></CgProfile>
                    </a> 
                  )
                  }else{
                  return(
                    <Modal/>
                  )
                }
              })()}
          </div>
          <div className='w-10'>
            <Cart cartStatus={cartStatus}></Cart>
          </div>
        </div>
      </Popover.Group>

      <Popover className="relative ">
        <div className="absolute inset-0 shadow z-2 pointer-events-none" aria-hidden="true" />
        <div className="relative z-1 ">
          <div className=" max-w-7xl mx-auto flex justify-between items-center px-4 py-5 sm:px-6 sm:py-4 lg:px-8 md:justify-start">
            {/* Menu celular */}
            <div className="-mr-2 -my-2 md:hidden flex w-full">
              <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-light">
                <span className="sr-only">Open menu</span>
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
              {/* Search cel */}
              <div className='block md:hidden w-full mx-12'>
                <div className="flex items-center justify-center w-full">
                  <form className="flex space-x-1 w-full" action="">
                    <input
                      type="text"
                      className="w-full text-black bg-white border rounded-full focus:ring-light  focus:ring focus:ring-opacity-40"
                      placeholder="Buscar..."
                      />
                    <button className="px-4 text-white bg-light hover:bg-dark rounded-full ">
                      <BiSearch/>
                    </button>
                  </form> 
                </div>
              </div> 
            </div>
            <div className="hidden md:flex-1 md:flex md:items-center md:justify-center">
              <Popover.Group as="nav" className="flex space-x-10">
                <Popover>
                  {({ open }) => (
                    <>
                      <Popover.Button
                        className={classNames(
                          open ? 'text-gray-900' : 'text-gray-500',
                          'group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light'
                        )}
                      >
                        <span>Categorias</span>
                        <ChevronDownIcon
                          className={classNames(
                            open ? 'text-gray-600' : 'text-gray-400',
                            'ml-2 h-5 w-5 group-hover:text-gray-500'
                          )}
                          aria-hidden="true"
                        />
                      </Popover.Button>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-400"
                        enterFrom="opacity-0 -translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 -translate-y-1"
                      >
                        <Popover.Panel className="hidden md:block absolute z-10 top-full inset-x-0 transform shadow-lg bg-white">
                          <div className="max-w-7xl mx-auto grid gap-y-6 px-4 py- sm:grid-cols-2 sm:gap-8 sm:px-6 sm:py-8 lg:grid-cols-4 lg:px-8 lg:py-12 xl:py-16">
                            {data.map((item) => (
                              <a
                                key={item.category_id}
                                href={"#"}
                                className="-m-3 p-3 flex flex-col justify-between rounded-lg hover:bg-gray-50"
                              >
                                <div className="flex md:h-full lg:flex-col">
                                  <div>
                                    <p className="text-base font-medium text-gray-900">{item.category_name}</p>
                                  </div>
                                </div>
                              </a>
                            ))}
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>
                <a href="/" className="text-base font-medium text-gray-500 hover:text-gray-900">
                  Inicio
                </a>
                <a href="/nosotros" className="text-base font-medium text-gray-500 hover:text-gray-900">
                  Nosotros
                </a>
                <a href="/contacto" className="text-base font-medium text-gray-500 hover:text-gray-900">
                  Contactanos
                </a> 
                <a href="/medios-pago" className="text-base font-medium text-gray-500 hover:text-gray-900">
                  Medios de Pago
                </a> 
                      
              </Popover.Group>
            </div>
          </div>
        </div>
        <Transition
          as={Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="absolute z-30 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
          >
            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
              <div className="pt-5 pb-6 px-5 sm:pb-8">
                <div className="flex items-center justify-between">
                  <div className="-mr-2">
                    <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-light">
                      <span className="sr-only">Close menu</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <div className="mt-6 sm:mt-8">
                  <nav>
                    <div className="grid gap-7 sm:grid-cols-2 sm:gap-y-8 sm:gap-x-4">
                      {data.map((item) => (
                        <a
                          key={item.category_id}
                          href={'#'}
                          className="-m-3 flex items-center p-3 rounded-lg hover:bg-gray-50"
                        >
                          <div className="ml-4 text-base font-medium text-gray-900">{item.category_name}</div>
                        </a>
                      ))}
                    </div>
                      <div className="mt-8 text-base">
                        <a href="#" className="font-medium text-dark hover:text-light">
                          {' '}
                          Mira todas las categorias <span aria-hidden="true">&rarr;</span>
                        </a>
                      </div>
                  </nav>
                </div>
              </div>
              <div className="py-6 px-5">
                <div className="grid grid-cols-2 gap-4">
                  <a href="/" className="rounded-md text-base font-medium text-gray-900 hover:text-gray-700">
                    Inicio
                  </a>

                  <a href="/nosotros" className="rounded-md text-base font-medium text-gray-900 hover:text-gray-700">
                    Nosotros
                  </a>

                  <a href="/contacto" className="rounded-md text-base font-medium text-gray-900 hover:text-gray-700">
                    Contactanos
                  </a> 

                  <a href="/medios-pago" className="rounded-md text-base font-medium text-gray-900 hover:text-gray-700">
                    Medios de Pago
                  </a> 

                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  )
}