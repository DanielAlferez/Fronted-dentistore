import React from "react";
import { BiUser, BiHeart, BiSearch } from "react-icons/bi";
import IMG from '../../../images/diente1.png'

export default function Modal() {
  const [showModal, setShowModal] = React.useState(false);
  const [message, setMessage] = React.useState({
    message: '',
    error: false
  })

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
      console.log(error)
      setMessage({
          message: error.message,
          error: true
        })
    }

  }

  const handleChangeForm = (event) => {
    const {value, name} = event.target;

    setForm({
      ...form,
      [name]: value
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
          <div className=" justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className=" border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <div className="justify-center">
                      <center><img width={'100px'} src={IMG}/></center>    
                      <h1 className="text-2xl text-center font-extrabold">Registrate en DentiStore</h1>
                      <br />
                      <hr /> 
                      <br />
                  </div>
                  <form  onSubmit={handleSubmit}  className="gap-x-4 gap-y-3 grid grid-cols-2">
                    {message.message.length !== 0 && (<div className={`${message.error ? 'bg-red-500 text-white' : 'bg-green-400 text-white' } p-3 w-full rounded-xl grid col-span-2 `}>{message.message}</div>) }
                    
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
                          className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        />
                      <label
                          htmlFor="usermail"
                          for="floatingInput2" 
                          className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
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
                          className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        />
                        <label
                          htmlFor="password_user"
                          for="floatingInput4" 
                          className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
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
                          className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        />
                        <label
                        htmlFor="confirmPassword"
                        for="floatingInput5" 
                        className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white spx-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                      >
                        Confirmar Contraseña
                      </label>
                      </div>

                      
                    </div>

                    <div className="col-span-2">
                      <button
                        type="submit"
                        className="w-full justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
                      >
                        Registar
                      </button>
                    </div>
                  </form>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-white bg-red-500 hover:bg-red-800 rounded-md background-transparent font-bold px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Cerrar
                  </button>
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
