import React from "react";

const Register = () => {
    return (
        <div>
            <div className="">
                <form className="container">
                    <div className="card">
                        <div className="card-header">
                            <h1>User Registration</h1>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="forms-group">
                                        <label>User Name <span>*</span></label>
                                        <input></input>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary">Register</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;