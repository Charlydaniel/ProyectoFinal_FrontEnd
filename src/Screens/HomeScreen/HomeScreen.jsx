import React, { useEffect } from 'react'
import useFetch from '../../Hooks/UseFetch'
import { getWorkspaceList } from '../../services/workspaceServices'

const HomeScreen = () => {

    const {loading,response,error,sendRequest}=useFetch()

    useEffect(()=>{
                    sendRequest(
                                getWorkspaceList
                            )
                  },[]
            )
            console.log(response,loading,error)
  return (
    <div>Wellcome to the HOME</div>
  )
}
export default HomeScreen