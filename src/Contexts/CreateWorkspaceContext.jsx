import { createContext, useEffect, useState } from "react";



export const CreateWorkspaceContext = createContext()

export default function CreateWorkspaceProvider({children}){

    const[name,setName]=useState('')
    const[members,setMembers]=useState([])
    const[user,setUser]=useState([])
    const[image,setImageUrl]=useState('')


    return(
        <CreateWorkspaceContext.Provider
        value={{name,members,user,image,setImageUrl,setName,setUser,setMembers}}
        >
        {children}
        </CreateWorkspaceContext.Provider>
    )
}