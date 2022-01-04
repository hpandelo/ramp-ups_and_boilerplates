import React, { useContext, useState } from 'react';
import UIButton from 'components/UI/Button/Button';
import './Login.css';
import StoreContext from 'Store/Context';
import { useNavigate  } from 'react-router-dom';

const initialState = () => ({ user: '', password: '' })

const doLogin = ({ user, password }) => {
  const isValid = (user === 'admin' && password === 'admin')
  const isEmpty = (user === '' || password === '')
  return isValid ? { token: '1234' } : { error: isEmpty ? 'Preencha todos os campos' : 'Usuário ou senha inválidos' }
}

const UserLogin = () => {
  const [values, setValues] = useState(initialState)
  const { setToken } = useContext(StoreContext)
  const navigate = useNavigate()

  const onChange = ({ target }) => {
    const { value, name } = target
    setValues({ ...values, [name]: value })
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const { token, error } = doLogin(values)
    if (token) {
      setToken(token)
      return navigate('/')
    }

    window.alert(error)
    setValues(initialState)
  }

  return (
    <div className="user-login">
      <h1 className="user-login__title">Acessar o Sistema</h1>
      <form autoComplete="nope" onSubmit={ onSubmit }>
        <div className="user-login__form-control">
          <label htmlFor="user">Usuário</label>
          <input 
            id="user" type="text" name="user" autoComplete="off" 
            onChange={onChange} value={values.user} />
        </div>
        <div className="user-login__form-control">
          <label htmlFor="password">Senha</label>
          <input 
            id="password" type="password" name="password" 
            onChange={onChange} value={values.password} />
        </div>
        <UIButton
          type="submit"
          theme="contained-green"
          className="user-login__submit-button"
          rounded
        >
          Entrar
        </UIButton>
      </form>
    </div>
  );
};

export default UserLogin;
