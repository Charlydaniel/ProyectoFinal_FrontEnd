import { useContext, useEffect, useState } from 'react'
import './CreateWorkspace.css'
import useForm from '../../../Hooks/UseForm'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Spinner from '../../Spinner/Spinner'
import { CreateWorkspaceContext } from '../../../Contexts/CreateWorkspaceContext'
import ImageUploader from '../../Image-Add-Components/ImageAddComponent'
import useFile from '../../../Hooks/UseFile'
import { resizeImage, uploadImageToCloudinary } from '../../../services/cludinaryService.js'
import { CreateWorkspace } from '../../../services/workspaceServices.js'


export default function CreateWorkspaceComponent() {

    const [current_field, setCurrentField] = useState('')
    const [ismail, setIsMail] = useState(false)
    const { image: localimage, previewUrl, uploaded, 
        setUploaded, setLoading, handleFileChange, resetFile }= useFile()
    const { name, user, members, image,
        setImageUrl, setMembers, setUser, setName } = useContext(CreateWorkspaceContext)

    const { step } = useParams()
    const navigate = useNavigate()
    const min_length = 5
    const max_length = 30
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const location = useLocation();



    const FORM_FIELDS =
    {
        1: {
            VAR: 'name',
            PLACEHOLDER: "P. ej.: Ficciones S.A o Marketing 123",
            TITLE: "¿Cómo se llama tu empresa o equipo?",
            PARAGRAPH: "Este será el nombre de tu espacio de trabajo de Slack; elige algo que tu equipo pueda reconocer."
        },

        2: {
            VAR: 'user',
            PLACEHOLDER: "Nombre",
            TITLE: "¿Cómo te llamas?",
            PARAGRAPH: "Añadir tu nombre y foto de perfil ayuda a que tus compañeros te reconozcan y conecten contigo mas fácilmente"
        },
        3: {
            VAR: 'members',
            PLACEHOLDER: "Ejemplo:ellis@gmail.com,maria@gmail.com",
            TITLE: `¿Quen mas esta en el equipo de ${name}?`,
            PARAGRAPH: "Añadir compañeros de trabajo por correo electrónico"
        }

    }

    const initial_form_state =
    {
        [FORM_FIELDS.NAME]: '',
    }

    const addMemberList = () => {

        if (!members.includes(form_state["input-data"]))
            setMembers([...members, form_state["input-data"]])
    }

    const onData = async (form_state) => {

        const nextStep = (Number(step) + 1)

        if (FORM_FIELDS[nextStep]) {

            if (current_field.VAR === 'name') {
                setName(form_state["input-data"])
            }
            else if (current_field.VAR === 'user') {
                setUser(form_state["input-data"])
            }
            if (current_field.VAR === 'members') {
                setUser(form_state["input-data"])
            }

            form_state["input-data"] = ""
            navigate(`/api/workspaces/create/workspace/` + nextStep)

        }
        else {
          
            /* DATA-TEST*/
            console.log('NOMBRE:', name)
            console.log('IMAGEN:', image)
            console.log('MIEMBROS', members) 
            

            if (image) {
                try {
                    const resized = await resizeImage(image, 1200, 1200);
                    const uploadedFile = await uploadImageToCloudinary(resized)
                    if (uploadedFile?.secure_url) {
                        setImageUrl(uploadedFile.secure_url)
                        setUploaded(true)
                    }
                } catch (err) {
                    console.error("Error al subir imagen:", err)
                } finally {
                    setLoading(false)
                }

                CreateWorkspace(name,image,members)

            }   
            
        }
    }

    useEffect(() => {
            setIsMail(false);
            form_state["input-data"] = ''; 
        
    }, [location]);

    const deleteMail = (email_todelete) => {
        setMembers(prev => prev.filter(member => member !== email_todelete))
    }

    const {
        form_state,
        handleSubmit,
        handleInputChange
    } = useForm({
        initial_form_state,
        onSubmit: onData
    })

    useEffect(() => {
        if (FORM_FIELDS[step]) {
            setCurrentField(FORM_FIELDS[step])
        }
        else {
            setCurrentField(null)
        }

    }, [step]
    )

    useEffect(
        () => {
            setIsMail(false)
        }, [members]
    )
    useEffect(
        () => {
            if (regex.test(form_state["input-data"]) && step === '3') {
                setIsMail(true)
            }
            else {
                setIsMail(false)
            }
        }, [form_state["input-data"]]
    )


    if (!current_field) {
        return (
            <div>
                <Spinner />
            </div>
        )
    }

    return (
        <div className="container">
            <aside className="left-container">
            </aside>
            <div className="right-container">
                <div className='right-container-sup'>
                </div>
                <div className='rigth-content'>
                    <div>
                        {`Passo ${step} de ${Object.keys(FORM_FIELDS).length}`}
                    </div>
                    <span className='right-title'>{current_field.TITLE}</span>
                    <p className='right-paragraph'>{current_field.PARAGRAPH}</p>
                    <form onSubmit={handleSubmit}
                        className='right-data-form'>
                        <div className='right-data-input-container'>
                            {
                                step > 2
                                    ?
                                    <input
                                        name="input-data"
                                        value={form_state["input-data"]}
                                        onChange={handleInputChange}
                                        minLength={min_length}
                                        maxLength={max_length}
                                        placeholder={current_field.PLACEHOLDER}
                                        type="email"
                                        autoComplete='off'
                                    />
                                    :
                                    <input
                                        name="input-data"
                                        value={form_state["input-data"] || ""}
                                        onChange={handleInputChange}
                                        minLength={min_length}
                                        maxLength={max_length}
                                        placeholder={current_field.PLACEHOLDER}
                                        type="text"
                                        autoComplete='off'
                                    />
                            }
                            {
                                (max_length - (form_state["input-data"] ? form_state["input-data"].length : 0)) > 0
                                    ?
                                    (
                                        ((form_state["input-data"] ? form_state["input-data"].length : 0)) >= min_length
                                            ?
                                            <span className='right-data-span-max-text --green'>
                                                {max_length - (form_state["input-data"] ? form_state["input-data"].length : 0)}
                                            </span>
                                            :
                                            <span className='right-data-span-max-text --red'>
                                                {max_length - (form_state["input-data"] ? form_state["input-data"].length : 0)}
                                            </span>
                                    )

                                    :
                                    <span className='right-data-span-max-text --red'>
                                        {max_length - (form_state["input-data"] ? form_state["input-data"].length : 0)}
                                    </span>
                            }
                            {
                                ismail
                                    ?
                                    <div>
                                        <button
                                            type='button'
                                            className='mail-button'
                                            onClick={addMemberList}>
                                            {form_state["input-data"]}
                                        </button>
                                    </div>
                                    :
                                    <div>

                                    </div>
                            }
                        </div>
                        {
                            step === '3'
                                ?
                                <div className='mail-container'>
                                    {
                                        members.map((mail, index) =>
                                        (
                                            <div key={index} className='content-button-mails'>
                                                <button
                                                    key={index}
                                                    className='member-button'
                                                    type='button'>
                                                    {mail}
                                                </button>
                                                <button
                                                    key={index + 1}
                                                    className='delete-mail'
                                                    type='button'
                                                    onClick={() => deleteMail(mail)}
                                                >
                                                    X
                                                </button>
                                            </div>
                                        )
                                        )
                                    }
                                </div>
                                :
                                <div className='mails-add-box'>

                                </div>
                        }
                        {
                        step === '3'
                            ?
                            <span className='notmember-message'>*Los usuarios que no son miembros solo seran invitados a Slack</span>
                            :
                            <div>

                            </div>
                        }
                        <div className='submit-area'>

                            {step === '1' ? (
                                <div className='add-image-container'>
                                    <ImageUploader
                                        canUpload={form_state["input-data"]?.length >= min_length}
                                        onFileReady={({ file, previewUrl }) => setImageUrl(file)}
                                />
                                    <button
                                        type="submit"
                                        className="right-data-button"
                                        disabled={
                                            !(
                                                form_state["input-data"]?.length >= min_length 
                                                && image
                                            )
                                        }
                                    >
                                        Continuar
                                    </button>
                                </div>
                            ) : (
                                <button
                                    disabled={
                                            ( !form_state["input-data"] 
                                            || form_state["input-data"].length < min_length
                                            ) && step !=='3'
                                        }
                                    type='submit'
                                    className='right-data-button'>
                                    Continuar
                                </button>
                            )}

                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}