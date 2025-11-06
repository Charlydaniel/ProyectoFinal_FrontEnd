import { useEffect, useState } from "react"
import useFetch from "../../../Hooks/UseFetch"
import { getWorkspaceList } from "../../../services/workspaceServices"
import WorkspaceItem from "../Workspace-Item-Components/WorkspaceItemComponent"
import "./WorkspaceList.css"
import ErrorComponent from "../../Error-components/ErrorComponent"


export default function WorkspaceListComponent() {
  
  const { loading, response, error, sendRequest } = useFetch()
  const [workspaces, setWorkspaces] = useState([])


  useEffect(() => {

    const fetchData = async () => {
    try {
        const result = await sendRequest(() => getWorkspaceList())

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
  }, [])

  if (error) {
      <ErrorComponent/>
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
        <WorkspaceItem
        nombre='Nuevo Workspace'
        imagen=''
        id={0}
      />
      </ul>
    </div>
  )
}
