import React from "react";
import { BiUser, BiHeart, BiSearch, BiLogIn, BiUserPlus} from "react-icons/bi";
import IMG from '../../../images/diente1.png'
import validator from 'validator'
import {IoIosCloseCircleOutline} from 'react-icons/io'

export default function Modal() {
  const [showModal, setShowModal] = React.useState(false);
  const [message, setMessage] = React.useState({
    message: '',
    type:'',
    error: false
  })

  const [openTab, setOpenTab] = React.useState(1);

  const [form, setForm] = React.useState({
    username: '',
    usermail: '',
    userphone: '',
    password_user: '',
    confirmPassword: '',
  })


  const handleSubmit = async (e) => {
    e.preventDefault()
    if(form.password_user !== form.confirmPassword){
      setMessage({
        message:'Las contraseñas no coinciden',
        type:'passwords',
        error:true
      })
      return
    }

    if (!validator.isStrongPassword(form.password_user, {
      minLength: 8, minLowercase: 1,
      minUppercase: 1, minNumbers: 1, minSymbols: 1
    })) {
      setMessage({
        message:'La contraseña debe contener: Una mayuscula, una minuscula, un numero y un simbolo.',
        type:'passwords',
        error:true
      })
      return
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/register/`,{method: 'POST', body: JSON.stringify({...form, userrole: 'usuario'}), headers: {
        "Content-Type": 'application/json'
      }})
      const data = await response.json()
      console.log(data)
      if(response.status !== 200) throw new Error(data.usermail)
      setMessage({
        message: 'Registro Exitoso',
        error: false
      })
      setTimeout(()=>window.location.reload(false),1500)
    } catch (error) {
      if(error.message === 'Ya existe usuario con este usermail.'){
        setMessage({
            message: error.message,
            type:'email',
            error: true
          })
      }
      else{
        setMessage({
          message: error.message,
          error: true
        })
      }
    }

  }

  
  const handleChangeForm = (event) => {
    const {value, name} = event.target;

    setForm({
      ...form,
      [name]: value
    })
    
  }
  if(!showModal && message.error){
    setMessage({
      message:'',
      type:'',
      error:false
    })
  }


  return (
    <>
      <a
        onClick={() => setShowModal(true)}
        href="#"
        className="text-gray-600 hover:text-light"
      >
        <BiUser className="w-8 h-8" />
      </a>

      {/* Open regular modal
      </button> */}
      {showModal ? (
        <div className="z-50">
          {/*principal*/}
          <div className="container mx-auto justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="flex flex-col relative w-auto my-6 mx-auto max-w-3xl">  
            {/*content*/}
              <div className=" border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*Tabs*/}
                  <div className="bg-gray-200  rounded-t-lg text-right pr-2 pt-2">
                  <button
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        <IoIosCloseCircleOutline className='w-5 h-5'></IoIosCloseCircleOutline>
                      </button>
                  </div>
                <ul className="flex bg-gray-200 px-4">
                  <li>
                    <a href="#" onClick={() => setOpenTab(1)} className={openTab === 1 ? "rounded-t-lg  inline-block px-4 py-2 text-black bg-white" : "rounded-t-lg inline-block px-4 py-2 bg-gray-200"}> 
                        <div className="flex items-center">
                          <BiLogIn/>
                          <p className="ml-2">
                            Ingresar  
                          </p>
                        </div>
                      
                    </a>
                  </li>
                  <li>
                    <a href="#" onClick={() => setOpenTab(2)} className={openTab === 2 ? "rounded-t-lg inline-block px-4 py-2 text-black bg-white" : "inline-block px-4 py-2 bg-gray-200"}> 
                      <div className="flex items-center">
                        <BiUserPlus/>
                        <p className="ml-2">
                          Crear Cuenta
                        </p>
                      </div>
                    </a>
                  </li>
                </ul>
                {/*Body*/}
                <div className="p-3">
                  {/*Login*/}
                  <div className={openTab === 1 ? "block" : "hidden"}>
                    {/*header*/}
                    <div className="items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                      {/* <div className="justify-center">
                          <center><img width={'100px'} src={IMG}/></center>    
                          <h1 className="text-2xl text-center font-extrabold">Ingresa en DentiStore</h1>
                          <br />
                          <hr /> 
                          <br />
                      </div> */}
                      <form  onSubmit={handleSubmit}  className="gap-x-4 gap-y-3 grid grid-cols-2">
                        {message.message.length !== 0 && (<div className={`${message.error ? 'bg-red-500 text-white' : 'bg-green-400 text-white' } p-3 w-full rounded-xl grid col-span-2 max-w-sm `}>{message.message}</div>) }
                        <div className="col-span-2">
                          <div className=" relative mt-1 ">
                            <input
                              name="usermail"
                              onChange={handleChangeForm}
                              type="email"
                              required
                              id="floatingInput1"
                              placeholder=" "
                              autoComplete="off"
                              className={`${message.type === 'email'  ? 'border-red-600' : 'focus:border-blue-600'} block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer`}
                            />
                          <label
                              htmlFor="usermail"
                              for="floatingInput1" 
                              className={`${message.type === 'email' ? 'text-red-600' : 'text-gray-500'} absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white spx-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1`}
                            >
                                  Correo electrónico
                            </label>
                          </div>
                        </div>
                        <div className="col-span-2">
                          <div className="relative mt-1">
                            <input
                              name="password_user_login"
                              onChange={handleChangeForm}
                              type="password"
                              required
                              id="floatingInput2"
                              placeholder=" "
                              autoComplete="off"
                              className={`${message.type === 'passwords'  ? 'border-red-600' : 'focus:border-blue-600'} block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer`}
                            />
                            <label
                              htmlFor="password_user_login"
                              for="floatingInput2" 
                              className={`${message.type === 'passwords' ? 'text-red-600' : 'text-gray-500'} absolute text-sm text-gray-500 scale-75 duration-300 transform -translate-y-4 top-2 z-10 origin-[0] bg-white spx-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:-translate-y-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 left-1`}
                            >
                              Contraseña
                            </label>
                          </div>
                        </div>

                        <div className="col-span-2">
                          <button
                            type="submit"
                            className="w-full justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-light hover:bg-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
                          >
                            Ingresar
                          </button>
                        </div>
                      </form>
                    </div>
                    {/*footer*/}
                    
                  </div>

                  {/*Register*/}
                  <div className={openTab === 2 ? "block" : "hidden"}>
                    {/*header*/}
                    <div className="items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                      {/* <div className="justify-center">
                          <center><img width={'100px'} src={IMG}/></center>    
                          <h1 className="text-2xl text-center font-extrabold">Registrate en DentiStore</h1>
                          <br />
                          <hr /> 
                          <br />
                      </div> */}
                      <form  onSubmit={handleSubmit}  className="gap-x-4 gap-y-3 grid grid-cols-2">
                        {message.message.length !== 0 && (<div className={`${message.error ? 'bg-red-500 text-white' : 'bg-green-400 text-white' } p-3 w-full rounded-xl grid col-span-2 max-w-sm`}>{message.message}</div>) }
                        
                        <div className="col-span-2 ">
                          <div className="relative mt-1">
                            <input
                              name="username"
                              onChange={handleChangeForm}
                              type="text"
                              required
                              id="floatingInput1"
                              placeholder=" "
                              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            />
                            <label
                              htmlFor="username"
                              for="floatingInput1"
                              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                        
                            >
                              Nombre
                            </label>
                          </div>
                        </div>

                        <div>
                          <div className=" relative mt-1">
                            <input
                              name="usermail"
                              onChange={handleChangeForm}
                              type="email"
                              required
                              id="floatingInput2"
                              placeholder=" "
                              autoComplete="off"
                              className={`${message.type === 'email'  ? 'border-red-600' : 'focus:border-blue-600'} block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer`}
                            />
                          <label
                              htmlFor="usermail"
                              for="floatingInput2" 
                              className={`${message.type === 'email' ? 'text-red-600' : 'text-gray-500'} absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white spx-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1`}
                            >
                                  Correo electrónico
                            </label>
                          </div>
                        </div>
                        
                        <div>
                          <div className="relative mt-1">
                            <input
                              name="userphone"
                              onChange={handleChangeForm}
                              type="text"
                              required
                              id="floatingInput3"
                              placeholder=" "
                              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            />
                            <label
                              htmlFor="userphone"
                              for="floatingInput3" 
                              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                            >
                              Teléfono
                            </label>
                          </div>
                        </div>

                        <div>
                          <div className="relative mt-1">
                            <input
                              name="password_user"
                              onChange={handleChangeForm}
                              type="password"
                              required
                              id="floatingInput4"
                              placeholder=" "
                              autoComplete="off"
                              className={`${message.type === 'passwords'  ? 'border-red-600' : 'focus:border-blue-600'} block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer`}
                            />
                            <label
                              htmlFor="password_user"
                              for="floatingInput4" 
                              className={`${message.type === 'passwords' ? 'text-red-600' : 'text-gray-500'} absolute text-sm text-gray-500 scale-75 duration-300 transform -translate-y-4 top-2 z-10 origin-[0] bg-white spx-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:-translate-y-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 left-1`}
                            >
                              Contraseña
                            </label>
                          </div>
                        </div>

                        <div>
                          <div className="relative mt-1">
                            <input

                              name="confirmPassword"
                              onChange={handleChangeForm}
                              type="password"
                              required  
                              id="floatingInput5"
                              placeholder=" "
                              autoComplete="off"
                              className={`${message.type === 'passwords'  ? 'border-red-600' : 'focus:border-blue-600'} block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer`}
                            />
                            <label
                            htmlFor="confirmPassword"
                            for="floatingInput5" 
                            className={`${message.type === 'passwords' ? 'text-red-600' : 'text-gray-500'} absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white spx-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1`}
                          >
                            Confirmar Contraseña
                          </label>
                          </div>

                          
                        </div>

                        <div className="col-span-2">
                          <button
                            type="submit"
                            className="w-full justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-light hover:bg-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
                          >
                            Registar
                          </button>
                        </div>
                      </form>
                    </div>
                    {/*footer*/}
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-70 fixed inset-0 z-40 bg-black"></div>
        </div>
      ) : null}
    </>
  );
}
