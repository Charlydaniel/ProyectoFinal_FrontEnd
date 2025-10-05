import { CONTENT_TYPE_VALUES, HEADERS, HTTP_METHODS } from "../constants/http"
import ENVIRONMENT from "../config/environment"

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