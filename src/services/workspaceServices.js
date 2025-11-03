import ENVIRONMENT from "../config/environment";
import { HTTP_METHODS } from "../constants/http";
import LOCAL_STORAGE_KEYS from "../constants/localStorage";

const WORKSPACE_URL={
    GET:'/api/workspaces/'
}

export async function CreateWorkspace(name, image) {

    const workspace = {
        name,
        image
    }
    const response_http = await fetch(
        `${ENVIRONMENT.URL_API}/api/workspaces/new_workspace`,
        {
            method: HTTP_METHODS.POST,
            headers: {
                [HEADERS.CONTENT_TYPE]: CONTENT_TYPE_VALUES.JSON
            },
            body: JSON.stringify(workspace)
        }
    )
    const response_data = await response_http.json()

    if (!response_data.ok){
        throw new Error(response_data.message)
    }

    return response_data
}
export const getWorkspaceList= async ()=>{

const response_http= await fetch(`${ENVIRONMENT.URL_API}${WORKSPACE_URL.GET}`,
        {
            method:HTTP_METHODS.GET,
            headers:{
                'Authorization': 'Bearer ' +
                localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN)
            }
        }
    )
    const response_data= await response_http.json()
    
    if(!response_data.ok){
        throw new Error(response_data.message)
    }
    return response_data
}
