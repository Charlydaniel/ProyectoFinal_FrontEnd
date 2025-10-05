import React, { useState } from 'react'
import useFetch from '../../Hooks/UseFetch'
import useForm from '../../Hooks/UseForm'
import { login } from '../../services/authService'



const LoginScreen = () => {

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

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor={FORM_FIELDS.EMAIL}>Emali</label>
          <input
            name={FORM_FIELDS.EMAIL}
            id={FORM_FIELDS.EMAIL}
            type="text"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor={FORM_FIELDS.PASSWORD}>Password</label>
          <input
            name={FORM_FIELDS.PASSWORD}
            id={FORM_FIELDS.PASSWORD}
            type="text"
            onChange={handleInputChange}
          />
        </div>
        <div>
          {
            !response
              ? <button type="submit" disabled={false}>Registrarse</button>
              :
              <>
                <button type="submit" disabled={true}>Registrarse</button>
                <span style={{ color: 'green' }}>{response.message}</span>
              </>
          }
          {
            error && <span style={{ color: 'red' }}>{error.message}</span>

          }
        </div>
      </form>
    </div>
  )
}

export default LoginScreen