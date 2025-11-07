import { useEffect, useState } from 'react'
import './CreateWorkspace.css'
import useForm from '../../../Hooks/UseForm'
import { useNavigate, useParams } from 'react-router-dom'
import Spinner from '../../Spinner/Spinner'

export default function CreateWorkspaceComponent(){


const[input_value,setInputValue]=useState('')
const[current_field,setCurrentField] = useState()
const navigate=useNavigate()
const min_length=10
const max_length=50
const {step}=useParams()
const nombre ="PRUEBA"


    const FORM_FIELDS =
    {
        1:{
            PLACEHOLDER:"P. ej.: Ficciones S.A o Marketing 123",
            TITLE:"¿Cómo se llama tu empresa o equipo?",
            PARAGRAPH:"Este será el nombre de tu espacio de trabajo de Slack; elige algo que tu equipo pueda reconocer."
        },
        
        2:{
            PLACEHOLDER:"Nombre",
            TITLE:"¿Cómo te llamas?",
            PARAGRAPH:"Añadir tu nombre y foto de perfil ayuda a que tus compañeros te reconozcan y conecten contigo mas fácilmente"
        },
        3:{
            PLACEHOLDER:"Ejemplo:ellis@gmail.com,maria@gmail.com",
            TITLE:`¿Quen mas esta en el equipo de ${nombre}?`,
            PARAGRAPH:"Añadir compañeros de trabajo por correo electrónico"
        }

    }

    const initial_form_state =
    {
        [FORM_FIELDS.NAME]: '',
    }
    
    

    const onData = (form_state)=>{

        const nextStep=(Number(step)+1)

        if(FORM_FIELDS[nextStep]){
         navigate(`/api/workspaces/create/workspace/`+nextStep)
        }
        else{
        console.log('FORMULARIO COMPLETADO')
        }

    }


        useEffect(() => {
                if (FORM_FIELDS[step]) {     
                setCurrentField(FORM_FIELDS[step])
                } 
                else {
                setCurrentField(null)
                }

            }, [step]
        )

    const {
        form_state: register_form_state,
        handleSubmit,
        handleInputChange
        } = useForm({
        initial_form_state,
        onSubmit: onData
        })

    if(!current_field){
        return (
            <div>
                <Spinner/>
            </div>
        )
    }




    return(
        <div className="container">
            <aside className="left-container">
            </aside>
            <div className="right-container">
                <div className='right-container-sup'>
                </div>
                <div className='rigth-content'>
                    <span className='right-title'>{current_field.TITLE}</span>
                        <p className='right-paragraph'>{current_field.PARAGRAPH}</p>
                        <form  onSubmit={handleSubmit} 
                                className='right-data-form'>
                            <div className='right-data-input-container'>
                                <input 
                                        onChange={(e)=>setInputValue(e.target.value)}
                                        minLength={min_length} 
                                        maxLength={max_length} 
                                        placeholder= {current_field.PLACEHOLDER}
                                        type="text" 
                                />
                                {
                                    (max_length-input_value.length)>0
                                    ?
                                    <span className='right-data-span-max-text'>
                                        {max_length-input_value.length}
                                    </span>
                                    :
                                    <span className='right-data-span-max-text --red'>
                                        {max_length-input_value.length}
                                    </span>
                                }

                            </div>
                                <button type='submit' className='right-data-button'>Continuar</button>
                        </form>
                </div>
            </div>

        </div>
    )
}