import React, { useContext, useEffect, useState } from 'react'
import useFetch from '../../Hooks/UseFetch'
import useForm from '../../Hooks/UseForm'
import { login } from '../../services/authService'
import { useNavigate } from 'react-router-dom'
import LOCAL_STORAGE_KEYS from '../../constants/localStorage'
import { LoginContext } from '../../Contexts/LoginContext'
import Spinner from '../../Components/Spinner/Spinner'
import './LoginComponent.css'
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";


export default function LoguinComponent() {

    const { isLoading } = useContext(LoginContext)
    const navigate = useNavigate()

    const FORM_FIELDS =
    {
        EMAIL: 'email',
        PASSWORD: 'password'
    }

    const initial_form_state =
    {
        [FORM_FIELDS.EMAIL]: '',
        [FORM_FIELDS.PASSWORD]: ''
    }

    const { sendRequest, loading, response, error } = useFetch()

    const onLogin = (form_state) => {

        sendRequest(() => login(form_state[FORM_FIELDS.EMAIL], form_state[FORM_FIELDS.PASSWORD]))
    }

    useEffect(
        () => {
            if (response && response.ok) {
                //Guardamos el token emitido por el backend
                //para despues usarlo como credencial
                //Local storage es una tabla con clave|valor
                localStorage.setItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN, response.data.authorization_token)
                navigate('/home')
            }
        }, [response]
    )

    const {
        form_state: register_form_state,
        handleSubmit,
        handleInputChange
    } = useForm(
        {
            initial_form_state,
            onSubmit: onLogin
        }

    )

    if (isLoading) {
        return (
            <div>
                <Spinner />
            </div>
        );
    }

    return (
        <div className='login-container'>
            <header class="header-login">
                <div className='header-login-section'>

                </div>
                <div class="header-login-icon">
                    <a href="https://slack.com/">
                        <img src="https://a.slack-edge.com/bv1-13/slack_logo-ebd02d1.svg"    
                        alt="Slack Logo"
                        className="login-logo"/>
                    </a>
                </div>
                <div class="header-login-section">
                    <p className='veri_small_text'>
                        ¿Nuevo en Slack?
                    </p>
                    <a className='veri_small_text'
                        href="https://slack.com/get-started?entry_point=signin_header#/createnew">
                        Crea una cuenta
                    </a>           
                </div>
            </header>
            <div className='body-login'>
                <div className="login-title">
                    <h1 >Escribe tu correo electrónico para conectarte</h1>
                    <div className="login-subtitle">O selecciona otra forma de conectarte.</div>
                </div>
                <br />
                <form onSubmit={handleSubmit} className="login-form">
                     <div className='imputs-containers'>
                            <input
                            type="email" placeholder="nombre@work-email.com"
                            name={FORM_FIELDS.EMAIL}
                            id={FORM_FIELDS.EMAIL}
                            onChange={handleInputChange}
                        />
        
                        <input
                            name={FORM_FIELDS.PASSWORD}
                            id={FORM_FIELDS.PASSWORD}
                            type="password" placeholder="Password"
                            onChange={handleInputChange}
                        />    
                        {
                            !response
                                ? <button 
                                    className="login-button"
                                    type="submit" disabled={false}
                                    >Conectarse a travéz del correo electrónico
                                    </button>
                                :
                                <>
                                    <button 
                                        className="login-button"
                                        type="submit" disabled={true}>Registrarse
                                    </button>
                                    <span style={{ color: 'green' }}>{response.message}</span>
                                </>
                        }
                        {
                            error && <span style={{ color: 'red' }}>{error.message}</span>

                        }        
                    </div>   
                </form>
                <footer>
                    <div className='linea-texto-linea'>
                        <div className='linea'></div>
                            <span>O CONÉCTATE CON</span>
                        <div className='linea'></div>
                    </div>

                        <div class="other-connections_container">
                                <button class="other-connections_buttons">
                                    <FcGoogle />
                                    Google
                                </button>

                                <button class="other-connections_buttons">
                                    <FaApple />
                                    Apple
                                </button>

                        </div>

                    <p className='footer-support'>¿Estás teniendo problemas? <a href="https://slack.com/workspace-signin">
                            Prueba con una URL del espacio de trabajo
                        </a>
                    </p>
                </footer>
            </div>
        </div>
    )
}