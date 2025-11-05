import { useEffect, useState } from "react"
import useFetch from "../../../Hooks/UseFetch"
import { getWorkspaceList } from "../../../services/workspaceServices"
import WorkspaceItem from "../Workspace-Item-Components/WorkspaceItemComponent"
import "./WorkspaceList.css"


export default function WorkspaceListComponent({ member }) {
  const { loading, response, error, sendRequest } = useFetch()
  const [workspaces, setWorkspaces] = useState([])


  useEffect(() => {

    const fetchData = async () => {
    try {
        const result = await sendRequest(() => getWorkspaceList(member.id))

        if (!result || !result.data) {
          setWorkspaces([])
        } 
        else {
          setWorkspaces(result.data)
        }
      } 
      catch (err) {
    
          setWorkspaces([]) 
      } 
      

    }

    fetchData()
  }, [member])

  if (error) {
    
  }

  return (
    <div className="Workspace-list-body">
      <ul className="workspace-list">
        {
          workspaces && workspaces.length > 0 ? 
        (
          workspaces.map((workspace, clave) => 
            (
            <div className="workspace" key={clave}>
              <WorkspaceItem
                nombre={workspace.nombre}
                imagen={workspace.img_workspace}
                id={workspace.id}
              />
            </div>
            )
          )
        ) 
        : 
        (
          <p>No hay workspaces disponibles.</p>
        )}
      </ul>
    </div>
  )
}
