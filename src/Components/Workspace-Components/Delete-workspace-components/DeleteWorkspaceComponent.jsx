import {  useParams } from 'react-router-dom'
import './deleteWorkspace.css'
import { useEffect, useState } from 'react'
import getWorkspace from '../../../services/workspaceServices'
import useFetch from '../../../Hooks/UseFetch'

export default function DeleteWorkspace() {

    const { workspace_id } = useParams()
    const [workspace,setWorkspace]=useState()

    const { sendRequest, loading, response, error } = useFetch()

    const id = Number(workspace_id)
    
 useEffect(() => {

    const fetchData = async () => {
      try {
          const id = Number(workspace_id)
          const result = await sendRequest(() => getWorkspace(id))
        if (result.data.workspace) {
          setWorkspace(result.data.workspace)
        }
      } catch (err) {
        console.warn(err);
      }
    }
    fetchData()
  }, [workspace_id])


    return (

        <div className='workspace-component'>
            <h1>¿ESTAS SEGURO DE ELIMINAR? <span className='nombre-workspace'>{workspace?.nombre}</span></h1>
        </div>
    )
}