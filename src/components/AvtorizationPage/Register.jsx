import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Импорт FontAwesomeIcon
import { faPencil, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import '../../styles/avtorization.css';
import axios from "axios";
import { CustomContext } from './Context';
import { useNavigate } from "react-router";
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const Register = () => {
  const [status, setStatus] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [eye, setEye] = useState(false);
  const { setUser, setTask } = useContext(CustomContext);
  const usenavigate = useNavigate();

  const url = 'http://localhost:3001';
  const registerUser = (e) => {
    e.preventDefault()
    if ((password.trim() !== '') && (password.length >= 6)) {
      let newUser = {
        id: uuidv4(),
        email,
        password: password
      }
      axios.post(`${url}/users`, newUser)
        .then(({ data }) => {
          setUser(newUser);
          setTask([]);
          usenavigate('/tasks');
          localStorage.setItem('user', JSON.stringify(newUser));
        })
        .catch((err) => console.log(err.message))
    } else {
      console.error('*The password must be more than 6 characters');
      setPasswordError('*The password must be more than 6 characters');
    }
  }
  const correctEmail = () => {
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus(true);
      setEmailError('');
    } else {
      console.error('Enter the correct email');
      setEmailError('*Enter the correct email');
      setStatus(false);
    }
  }
  return (
    <div className="content">
      <form className="form" onSubmit={registerUser}>
        {
          status && <p onClick={() => { setStatus(false) }} className="form-email">{email} <FontAwesomeIcon icon={faPencil} /></p>
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
              onChange={(e) => setEmail(e.target.value)}
              className="form-field"
              type='email'
              placeholder='Enter Email' ></input>
              {
                emailError && (
                  <label className='input-email-error'>{emailError}</label>)
              }
            <button
              className="form-btn"
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
                onChange={(e) => setPassword(e.target.value)}
                className="form-field"
                type={eye ? 'text' : 'password'}
                placeholder='Create a password' />
              {
                passwordError && (
                  <label className='input-password-error'>{passwordError}</label>)
              }
              <span className="form-eye" onClick={() => setEye(prev => !prev)}>
                {
                  !eye ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />
                }
              </span>
            </div>
            <button className="form-btn" type="submit">Create an account</button>
          </>
        }
        <Link className="form-link" to='/login'>Login</Link>
      </form>
    </div>
  );
};

export default Register;
