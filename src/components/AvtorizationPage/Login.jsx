import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CustomContext } from "./Context";

const Login = () => {
    const { setUser } = useContext(CustomContext);
    const navigate = useNavigate();

    const loginUser = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;

        try {
            const response = await axios.get(`http://localhost:8080/users?email=${email}`);
            
            if (response.data.length === 0) {
                console.error('Пользователь с таким email не найден');
                return;
            }
            
            const user = response.data[0];
            if (user.password !== password) {
                console.error('Неправильный пароль');
                return;
            }

            localStorage.setItem('user', JSON.stringify(user));        
            setUser(user);
            navigate('/');
        } catch (error) {
            console.error('Ошибка при входе:', error.message);
        }
    };

    return (
        <div className="content">
            <form onSubmit={loginUser}>
                <h2 className="form-title">Вход</h2>
                <input className="form-field" type="email" placeholder="Email" />
                <input className="form-field" type="password" placeholder="Password" />
                <button className="form-btn" type="submit">Войти</button>
                <Link to='/register'>Создать аккаунт</Link>
            </form>
        </div>
    );
};

export default Login;
