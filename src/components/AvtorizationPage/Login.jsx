import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CustomContext } from "./Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [eye, setEye] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { setUser, setTask } = useContext(CustomContext);
  const navigate = useNavigate();
  const url = 'http://localhost:3001';

  const loginUser = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
      const response = await axios.get(`${url}/users?email=${email}`);
      if (response.data.length === 0) {
        setEmailError('*User with this email was not found');
        console.error('User with this email was not found');
        return;
      } else {
        setEmailError('');
      }
      const user = response.data[0];
      if (user.password !== password) {
        setPasswordError('*Wrong password');
        console.error('Wrong password');
        return;
      } 
      setUser(user);
      const res = await axios.get(`${url}/tasks?userId=${user.id}`);
      const task = res.data[0];
      setTask(task);
      navigate('/tasks');
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('task', JSON.stringify(task));
    } catch (error) {
      console.error('Login error:', error.message);
    }
  };
  
  return (
    <div className="content">
      <form onSubmit={loginUser}>
        <h2 className="form-title">Login</h2>
        <input className="form-field" type="email" placeholder="Email" />
        {emailError && <p className="email-error">{emailError}</p>}
        <input className="form-field" type={eye ? "text" : "password"} placeholder="Password" />
        {passwordError && <p className="password-error">{passwordError}</p>}
        <div className="form-password">
          <span className="form-eye" onClick={() => setEye(prev => !prev)}>
            {
              !eye ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />
            }
          </span>
        </div>
        <button className="form-btn btn btn-primary" type="submit">Login</button>
        <Link className="form-link" to='/register'>Create an account</Link>
      </form>
    </div>
  );
};

export default Login;
