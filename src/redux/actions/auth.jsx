import { axios } from "axios";

const URL = "http://localhost:8000/api/register/"


export const singUp = (user_name, user_mail, user_cel, user_pass, re_pass) => async dispatch => {
    const config = {
         headers: {
            'Content-Type': 'application/json'
        }
    }

    const body =JSON.stringify({
        userid,
        usermail,
        username,
        password_user,
        userphone,
        userrole
    });

    try {
        const res = await axios.post(URL, body, config)
        if(res.status === 200){
            alert("Registro exitoso!")
        }else{
            alert("No se pudo realizar el registro!")
        }

    } catch (err) {
        alert("Hubo un error al registrarse");
    }
} 