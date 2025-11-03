import { useContext, useEffect, useState } from "react"
import useFetch from "../../../Hooks/UseFetch"
import { getWorkspaceList } from "../../../services/workspaceServices"
import WorkspaceItem from "../Workspace-Item-Components/WorkspaceItemComponent"
import "./WorkspaceList.css"
import { getMembers } from "../../../services/memberServices"
import ErrorComponent from "../../Error-components/ErrorComponent"

export default function WorkspaceListComponent(){

  const { loading, response, error, sendRequest } = useFetch();
  const [workspaces, setWorkspaces] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const {status,message,ok,data} = await sendRequest(() => getWorkspaceList());

        setWorkspaces(data); 
      } catch (err) {

      }
    };

    fetchData();
  }, []);

 
 if (error) {
    return <ErrorComponent error={error} />
  } 

  return (
    <div className="Workspace-list-body">
      <ul className="workspace-list">
        {workspaces && workspaces.length > 0 
        ? (
            workspaces.map((workspace,clave) => (
            <div className="workspace" key={clave}>
             <WorkspaceItem
              nombre={workspace.nombre}
              imagen={workspace.img_workspace}
              id={workspace.id}
            />
            </div>
          ))
        ) : 
        (
          <p>No hay workspaces disponibles.</p>
        )}
      </ul>
    </div>
  );

}
