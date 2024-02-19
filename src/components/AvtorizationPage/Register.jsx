import React from "react";
import { useState, useNavigate } from "react";

const Register = () => {

    const [id, idChenge] = useState('');
    const [name, nameChenge] = useState('');
    const [password, passwordChenge] = useState('');
    const [email, emailChenge] = useState('');
    const [phone, phoneChenge] = useState('');
    // const navigate=useNavigate();

    const handlesubmit = (e) => {
        e.preventDefault();
        let regobj = { id, name, password, email, phone };
        // console.log(regobj);
        fetch("http://localhost:3002/user", {
            method: "POST",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(regobj)
        });
    }
        return (
            <form className="wrapper-register" onSubmit={handlesubmit}>
                <h1>User Registration</h1>
                <div className="mb-3">
                    <label>User Name</label>
                    <input value={id} onChange={e => idChenge(e.target.value)} className="form-control" placeholder="user" />
                </div>

                <div className="mb-3">
                    <label>Password</label>
                    <input value={password} onChange={e => passwordChenge(e.target.value)} type="password" className="form-control" placeholder="Password" />
                </div>

                <div className="mb-3">
                    <label>Full Name</label>
                    <input value={name} onChange={e => nameChenge(e.target.value)} className="form-control" />
                </div>

                <div className="mb-3">
                    <label>Email</label>
                    <input value={email} onChange={e => emailChenge(e.target.value)} type="email" className="form-control" placeholder="Enter email" />
                </div>

                <div className="mb-3">
                    <label>Phone</label>
                    <input value={phone} onChange={e => phoneChenge(e.target.value)} className="form-control" placeholder="Enter phone number" />
                </div>

                <button type="submit" className="">Register</button>
            </form>
        );
    };

    export default Register;
