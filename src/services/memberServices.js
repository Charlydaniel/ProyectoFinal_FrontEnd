import ENVIRONMENT from "../config/environment";
import { CONTENT_TYPE_VALUES, HEADERS, HTTP_METHODS } from "../constants/http";
import LOCAL_STORAGE_KEYS from "../constants/localStorage";


const MEMBER_URL={
    GET_BY_WORKSPACE:'/api/workspace_member/get_by_workspaces/get_members'
}

export async function getMembers(workspace_id) {

    const workspace={
        workspace_id
    }

    const response_http = await fetch(
        `${ENVIRONMENT.URL_API}${MEMBER_URL.GET_BY_WORKSPACE}`,
        {
            method: HTTP_METHODS.POST,
            headers:{
                'Authorization': 'Bearer ' +
                    localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN),
                    [HEADERS.CONTENT_TYPE]: CONTENT_TYPE_VALUES.JSON
                },
            body:JSON.stringify(workspace)
        }
    )
    const response_data = await response_http.json()

    if (!response_data.ok) {
        throw new Error(response_data.message);
    }

    return response_data
}
