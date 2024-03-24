import React, { useContext, useState, useReducer } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Импорт FontAwesomeIcon
import { faPencil, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import '../../styles/avtorization.css';
import axios from "axios";
import { CustomContext } from './Context';
import { useNavigate } from "react-router";
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_EMAIL':
      return {...state, email: action.payload};
    case 'SET_PASSWORD':
      return {...state, password: action.payload};
    case 'SET_EMAIL_ERROR':
      return {...state, emailError: action.payload};
    case 'SET_PASSWORD_ERROR':
      return {...state, passwordError: action.payload};
    case 'TOGGLE_EYE':
      return {...state, eye: !state.eye};
    case 'SET_STATUS':
      return {...state, status: action.payload};
    default:
      return state;
  }
}

const Register = () => {
  const { setUser, setTask } = useContext(CustomContext);
  const usenavigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, {
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    eye: false,
    status: false
  });

  const url = 'http://localhost:3001';
  const registerUser = (e) => {
    e.preventDefault();
    const {email, password} = state;
    if ((password.trim() !== '') && (password.length >= 6)) {
      let newUser = {
        id: uuidv4(),
        email,
        password: password
      }
      axios.post(`${url}/users`, newUser)
        .then(() => {
          setUser(newUser);
          setTask([]);
          usenavigate('/tasks');
          localStorage.setItem('user', JSON.stringify(newUser));
        })
        .catch((err) => console.log(err.message))
    } else {
      console.error('*The password must be more than 6 characters');
      dispatch({type: 'SET_PASSWORD_ERROR', payload: '*The password must be more than 6 characters'});
    }
  }
  const correctEmail = () => {
    const {email} = state;
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      dispatch({type: 'SET_STATUS', payload: true});
      dispatch({type: 'SET_EMAIL_ERROR', payload: ''});
    } else {
      console.error('Enter the correct email');
      dispatch({type: 'SET_EMAIL_ERROR', payload: '*Enter the correct email'});
      dispatch({type: 'SET_STATUS', payload: false});
    }
  }
  const { email, password, emailError, passwordError, eye, status } = state;
  return (
    <div className="content">
      <form className="form" onSubmit={registerUser}>
        {
          status && <p onClick={() => dispatch({type: 'SET_STATUS', payload: false})} className="form-email">{email} <FontAwesomeIcon icon={faPencil} /></p>
        }
        <h2 className="form-title" >
          {
            status ? 'Create a password to log in' : 'Registration'
          }
        </h2>
        {
          !status &&
          <>
            <input
              value={email}
              onChange={(e) => dispatch({type: 'SET_EMAIL', payload: e.target.value})}
              className="form-field"
              type='email'
              placeholder='Enter Email' ></input>
              {
                emailError && (
                  <label className='input-email-error'>{emailError}</label>)
              }
            <button
              className="form-btn btn btn-primary"
              type="button"
              onClick={correctEmail}
            >
              Continue
            </button>
          </>
        }
        {
          status &&
          <>
            <div className="form-password">
              <input
                value={password}
                onChange={(e) => dispatch({type: 'SET_PASSWORD', payload: e.target.value})}
                className="form-field"
                type={eye ? 'text' : 'password'}
                placeholder='Create a password' />
              {
                passwordError && (
                  <label className='input-password-error'>{passwordError}</label>)
              }
              <span className="form-eye" onClick={() => dispatch({type: 'TOGGLE_EYE'})}>
                {
                  !eye ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />
                }
              </span>

            </div>
            <button className="form-btn btn btn-primary" type="submit">Create an account</button>
          </>
        }
        <Link className="form-link" to='/login'>Login</Link>
      </form>
    </div>
  );
};

export default Register;
