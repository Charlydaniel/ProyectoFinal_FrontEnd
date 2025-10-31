import ENVIRONMENT from "../config/environment";
import LOCAL_STORAGE_KEYS from "../constants/localStorage";

async function getWorkspaceList(){
const response_http= await fetch(ENVIRONMENT.URL_API + '/api/workspaces/',
        {
            method:'GET',
            headers:{
                'Authorization': 'Bearer ' + localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN)
            }
        }
    )
    const response_data= await response_http.json()
    return response_data
}
export {getWorkspaceList}