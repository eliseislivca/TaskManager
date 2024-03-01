import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesomeIcon
import { faPencil, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import '../../styles/Avtorization.css';
import axios from "axios";
import { CustomContext } from './Context';
import { useNavigate } from "react-router";
import {Link} from 'react-router-dom';  

const Register = () => {
    const [status, setStatus] = useState(false);
    const [email, setEmail] = useState('');
    const [eye, setEye] = useState(false);
    const { user, setUser } = useContext(CustomContext);
    const usenavigate = useNavigate();
    // const [password, setPassword] = useState('');

    const registerUser = (e) => {
        e.preventDefault()
        let newUser = {
            email,
            password: e.target[0].value
        }
        axios.post('http://localhost:8080/users', newUser)
            .then(({ data }) => {
                setUser(newUser)
                usenavigate('/')
                localStorage.setItem('user', JSON.stringify(newUser));
            })
            .catch((err) => console.log(err.message))
    }
    return (
        <div className="content">
            <form className="form" onSubmit={registerUser}>
                {
                    status && <p onClick={() => { setStatus(false) }} className="form-email">{email}<FontAwesomeIcon icon={faPencil} /></p>
                }
                <h2 className="form-title" >
                    {
                        status ? 'Придумай пароль для входа' : 'Регистрация'
                    }
                </h2>
                {
                    !status &&
                    <>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} className="form-field" type="email" placeholder='Введите Email' />
                        <button className="form-btn" type="button" onClick={() => setStatus(true)}>Продолжить</button>
                    </>
                }
                {
                    status &&
                    <>
                        <div className="form-password">
                            <input className="form-field" type={eye ? 'text' : 'password'} placeholder='Придумайте пароль' />
                            <span className="form-eye" onClick={() => setEye(prev => !prev)}>
                                {
                                    !eye ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />
                                }
                            </span>
                        </div>
                        <button className="form-btn" type="submit">Создать аккаунт</button>
                    </>
                }
                <Link className="form-link" to='/login'>Войти</Link>
            </form>
        </div>
    );
};

export default Register;
