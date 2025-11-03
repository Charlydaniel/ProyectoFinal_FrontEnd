import './ErrorComponent.css'
import { FiAlertTriangle } from "react-icons/fi";


export default function ErrorComponent({error}){

    console.log('Mensaje  '+ error.message)
return(
    <div className="error-container">
        <div className='error-icon'>
            <FiAlertTriangle />
        </div>
         <div className="error-message">Error al cargar la pagina {error.message}</div>;
    </div>
)
}