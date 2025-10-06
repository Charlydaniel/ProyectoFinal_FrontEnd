import { CONTENT_TYPE_VALUES, HEADERS, HTTP_METHODS } from "../constants/http"
import ENVIRONMENT from "../config/environment"

export async function register(name, email, password) {

    const usuario = {
        email,
        name,
        password
    }

    //FETCH Ordena al navegador a hacer una consulta http
    //Devuelve una promesa
    //Revcibe la URL de consulta y un objeto de configuracion de la consulta
    const response_http = await fetch(
        `${ENVIRONMENT.URL_API}/api/auth/register`,
        {
            method: HTTP_METHODS.POST,
            //Aclaramos el tipo de contenido que vamos a enviar
            headers: {
                [HEADERS.CONTENT_TYPE]: CONTENT_TYPE_VALUES.JSON
            },
            body: JSON.stringify(usuario)
        }
    )
    //Transformamos a objeto de js al body de la respuesta del servidor
    const response_data = await response_http.json()

    if (!response_data.ok) {
        throw new Error(response_data.message);
    }

    return response_data
}


export async function login(email, password) {  

    const usuario = {
        email,
        password
    }

    const response_http = await fetch(
        `${ENVIRONMENT.URL_API}/api/auth/login`,
        {
            method: HTTP_METHODS.POST,
            headers: {
                [HEADERS.CONTENT_TYPE]: CONTENT_TYPE_VALUES.JSON
            },
            body: JSON.stringify(usuario)
        }
    )
    const response_data = await response_http.json()

    if (!response_data.ok){
        throw new Error(response_data.message)
    }

    return response_data
}

