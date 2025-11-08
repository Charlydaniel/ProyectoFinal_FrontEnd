import { createContext, useState } from "react";



export const CreateWorkspaceContext = createContext()

export default function CreateWorkspaceProvider({children}){

    const[name,setName]=useState('')
    const[members,setMembers]=useState([])
    const[user,setUser]=useState([])

    return(
        <CreateWorkspaceContext.Provider
        value={{name,members,user,setName,setUser,setMembers}}
        >
        {children}
        </CreateWorkspaceContext.Provider>
    )
}