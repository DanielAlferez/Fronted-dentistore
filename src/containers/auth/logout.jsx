import React from "react";
import {VscSignOut} from 'react-icons/vsc'


export default function Logout() {
    const logoutRequest = async (e) => {
        const token = localStorage.getItem('token')
        try{
            const response = await fetch(`${
                import.meta.env.VITE_API_URL}/logout/`,{
                method: 'POST',  
                headers: {
                "Authorization" :  `Bearer ${token}`,
                "Content-Type": 'application/json',
            }})
            const data = await response.json()
            if(response.status !== 200) throw new Error(data.detail)
            localStorage.removeItem('token')
            setTimeout(()=>window.location.reload(false),1500)

        }catch(error){
            console.log(error)
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