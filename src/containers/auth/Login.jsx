import React from "react";
import { BiUser, BiHeart, BiSearch } from "react-icons/bi";

export default function Modal() {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <>
      {/* <button
        className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      > */}
      <a
        onClick={() => setShowModal(true)}
        href="#"
        className="text-black hover:text-light"
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
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <form onSubmit={(e) => onSubmit(e)} className="space-y-6">
                    <div className="justify-center">
                        <center><img width={'100px'} src="../public/diente1.png"/></center>
                                
                        <h1 className="text-2xl text-center font-extrabold">Registrate en DentiStore</h1>
                        <br />
                        <hr /> 
                    </div>

                    <div>
                      <label
                        htmlFor="first_name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Nombre
                      </label>
                      <div className="mt-1">
                        <input
                          name="first_name"
                          onChange={(e) => onChange(e)}
                          type="text"
                          required
                          className="appearance-none block w-80 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
                        />
                      </div>
                    </div>
                    

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email address
                      </label>
                      <div className="mt-1">
                        <input
                          name="email"
                          onChange={(e) => onChange(e)}
                          type="email"
                          required
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label
                        htmlFor="userphone"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Telefono
                      </label>
                      <div className="mt-1">
                        <input
                          name="userphone"
                          onChange={(e) => onChange(e)}
                          type="text"
                          required
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Password
                      </label>
                      <div className="mt-1">
                        <input
                          name="password"
                          onChange={(e) => onChange(e)}
                          type="password"
                          required
                          autoComplete="off"
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Repeat Password
                      </label>
                      <div className="mt-1">
                        <input
                          name="re_password"
                          onChange={(e) => onChange(e)}
                          type="password"
                          required  
                          autoComplete="off"
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
                      >
                        Register
                      </button>
                    </div>
                  </form>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-white bg-red-600 hover:bg-red-900 rounded-md background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
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
