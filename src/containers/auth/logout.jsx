import React from "react";
import {VscSignOut} from 'react-icons/vsc'


export default function Logout() {

    //const URL = "https://dentistore.online:5000/api/logout/"
    const URL = "http://localhost:5000/api/logout/"

    const logoutRequest = async (e) => {
        const token = localStorage.getItem('token')
        try{
            const response = await fetch(URL,{
                method: 'POST',  
                headers: {
                "Authorization" :  `Bearer ${token}`,
                "Content-Type": 'application/json',
            }})
            const data = await response.json()
            if(response.status !== 200) throw new Error(data.detail)
            localStorage.removeItem('token')
            setTimeout(()=>window.location.reload(false),100)
            
        }catch(error){
            localStorage.removeItem('token')
            setTimeout(()=>window.location.reload(false),1500)
            alert('Su sesión ha expirado!')
        }
    }
    return(
        <div>
            <button onClick={logoutRequest}>
                <VscSignOut className='w-8 h-8 top-0 right-0 absolute mr-3 mt-3 hover:text-light'></VscSignOut>
            </button>
        </div>
    )
}