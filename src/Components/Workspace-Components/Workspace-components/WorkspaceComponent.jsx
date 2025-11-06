
import './workspaceComponent.css'
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";
import { RiHistoryLine, RiHome3Fill} from "react-icons/ri";
import { IoSearchOutline } from "react-icons/io5";
import { GoQuestion } from "react-icons/go";
import { PiBellThin } from "react-icons/pi";
import { ImFilesEmpty } from "react-icons/im";
import { LuMessagesSquare } from "react-icons/lu";
import { useContext, useEffect, useState } from 'react';
import { HomeContext } from '../../../Contexts/HomeContext';
import Spinner from '../../Spinner/Spinner';
import useFetch from '../../../Hooks/UseFetch';
import { useParams } from 'react-router-dom';
import getWorkspace from '../../../services/workspaceServices';


export default function WorkspaceCompoenent(){

const { isLoading } = useContext(HomeContext);
const {response,ok,message, sendRequest} = useFetch()
const [workspace,setWorkspace]=useState(null)


const {workspace_id}= useParams()

const id=Number=(workspace_id)

useEffect(()=>{

    const fetchData = async ()=>{

        try{
            const result = await sendRequest( ()=>getWorkspace(id))
            setWorkspace(result.data.workspace)
            console.log(workspace.img_gorkspace)
        }
        catch(err){
            console.warn(err)
        }

        }
        fetchData()

    },[]
)

    if (isLoading) {
        return (
        <div>
                <Spinner />;
        </div>
        )
    }

    return(
        <div className='workspace-component'>
            <header className="workspaces-header">
                <nav className='workspaces-header-nav'>
                    <div className='nav-left'>
                    </div>
                    <div className='workspace-history-arrows'>
                        <FaArrowLeft className='arrow-history'/>
                        <FaArrowRight className='arrow-history'/>      
                    </div>
                    <div className='workspace-history-view'>
                        <RiHistoryLine className='history-view'/>
                    </div>
                    <div className='workspace-search-container'>
                        <input placeholder = {"Buscar en " + workspace.nombre}
                         className="workspace-search" 
                        type="text" name="" id=""  />
                        <IoSearchOutline className='workspace-search-button'/>
                    </div>
                </nav>
                <div className='header-right'>
                    <GoQuestion className='question-icon'/>
                </div>
            </header>
            <div className='workspace-body'>
                <nav className="workspace-nav-left">
                    <div className='workspace-nav-left-button'>
                        <img className='workspace-icono' src={workspace?.img_workspace} 
                        alt="Profile" />
                    </div>
                    <div className='workspace-nav-left-buttons-container'>
                        <div className='button-nav-left'>
                            <div className='workspace-nav-left-button --white'>
                                <RiHome3Fill className='workspace-icon-left-nav'/>
                            </div>
                            <span className='workspace-icon-left-nav-span'>Inicio</span>
                        </div>
                        <div className='button-nav-left'>
                            <div className='workspace-nav-left-button'>
                                <LuMessagesSquare  className='workspace-icon-left-nav'/>
                            </div>
                            <span className='workspace-icon-left-nav-span'>Mensajes directos</span>
                        </div>
                        <div>
                            <div className='workspace-nav-left-button'>
                                <PiBellThin className='workspace-icon-left-nav'/>
                            </div>
                            <span className='workspace-icon-left-nav-span'>Actividad</span>
                        </div>
                        <div>
                            <div className='workspace-nav-left-button'>
                                <ImFilesEmpty className='workspace-icon-left-nav'/>
                            </div>
                            <span className='workspace-icon-left-nav-span'>Archivos</span>
                        </div>
                        <div className='workspace-nav-left-button-text'>
                            <button className='workspace-icon-left-nav-text-button'>
                                ...
                            </button>
                            <span className='workspace-icon-left-nav-text'>
                                Más
                            </span>
                        </div>
                    </div>
                    <div className='nav-inf-section'>
                        <button className='workspace-icon-left-nav-more'>
                            +
                        </button>
                    </div>
                        <div className='workspace-nav-left-button'>
                            <img className='workspace-icono' src="https://randomuser.me/api/portraits/women/86.jpg" 
                            alt="Profile" />
                        </div>
                </nav>
                <section>
                </section>
            </div>
        </div>
    )
}