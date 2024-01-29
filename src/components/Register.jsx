import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [parentId, setParentId] = useState('');
    const [job, setJob] = useState('');
    const [companyname, setCompany] = useState('');
    const [showPassword, setShowPassword] = useState(false); 
    const [formValid, setFormValid] = useState(true);
    const [skill, setSkill] = useState('');
    const navigate = useNavigate();
    const [about, setAbout] = useState('');
    const [users, setUsers] = useState([]);
    useEffect(() => {
        // Fetch the list of users and set it to the users state
        axios
            .get('http://localhost:3001/users')
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => console.error(error));
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        // Validate the form before submitting
        if (validateForm()) {
            axios
                .post('http://localhost:3001/register', { name, email, password, parentId, job, companyname, about, skill })
                .then((result) => {
                    console.log(result);
                    if (result.data === 'Already registered') {
                        alert('E-mail already registered! Please Login to proceed.');
                        navigate('/login');
                    } else {
                        alert('Registered successfully! Please Login to proceed.');
                        navigate('/login');
                    }
                })
                .catch((err) => console.log(err));
        } else {
            setFormValid(false);
        }
    };

    const validateForm = () => {
        // Add your validation logic here
        // For example, you can check if fields are not empty, valid email format, etc.
        const isValid = name && email && password && parentId && job && companyname && skill;
        return isValid;
    };

    const isFieldEmpty = (fieldValue) => {
        return fieldValue.trim() === '';
    };


    return (
        <div>
            <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundImage: "linear-gradient(#00d5ff,#0095ff,rgba(93,0,255,.555))" }}>
                <div className="bg-white p-3 rounded" style={{ width: '40%', margin:'50px' }}>
                <h2 className="mb-3 text-primary text-center">Register</h2>
                    {!formValid && (
                        <div className="alert alert-danger" role="alert">
                            Please fill in all required fields.
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                    <div className={`mb-3 text-start ${isFieldEmpty(parentId) ? 'text-danger' : ''}`}>
                            <label htmlFor="exampleInputParent" className="form-label">
                                <strong>Reference</strong>
                            </label>
                            <select
                                className="form-control"
                                id="exampleInputParent"
                                onChange={(event) => setParentId(event.target.value)}
                                required
                            >   <option value=''>--None--</option>
                                {users.map(userdetails => (
                                    <option key={userdetails._id} value={userdetails._id}>{userdetails.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className={`mb-3 text-start ${isFieldEmpty(name) ? 'text-danger' : ''}`}>
                            <label htmlFor="exampleInputName" className="form-label">
                                <strong>Name</strong>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Name"
                                className="form-control"
                                id="exampleInputName"
                                onChange={(event) => setName(event.target.value)}
                                required
                            />
                        </div>
                        <div className={`mb-3 text-start ${isFieldEmpty(email) ? 'text-danger' : ''}`}>
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                <strong>Email Id</strong>
                            </label>
                            <input
                                type="email"
                                placeholder="Enter Email"
                                className="form-control"
                                id="exampleInputEmail1"
                                onChange={(event) => setEmail(event.target.value)}
                                required
                            />
                        </div>
                        <div className={`mb-3 text-start ${isFieldEmpty(password) ? 'text-danger' : ''}`}>
                            <label htmlFor="exampleInputPassword1" className="form-label">
                                <strong>Password</strong>
                            </label>
                            <div className="input-group">
                                <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter Password"
                                className="form-control"
                                id="exampleInputPassword1"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                required
                                />
                                <div className="input-group-append">
                                <button
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? 'Hide' : 'Show'}
                                </button>
                                </div>
                            </div>
                            </div>
                        
                        <div className={`mb-3 text-start ${isFieldEmpty(job) ? 'text-danger' : ''}`}>
                            <label htmlFor="exampleInputJob" className="form-label">
                                <strong>Job</strong>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Job"
                                className="form-control"
                                id="exampleInputJob"
                                onChange={(event) => setJob(event.target.value)}
                                required
                            />
                        </div>
                        <div className={`mb-3 text-start ${isFieldEmpty(skill) ? 'text-danger' : ''}`}>
                            <label htmlFor="exampleInputSkill" className="form-label">
                                <strong>Skill</strong>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Skill"
                                className={`form-control ${isFieldEmpty(skill) ? 'text-danger' : ''}`}
                                id="exampleInputSkill"
                                onChange={(event) => setSkill(event.target.value)}
                                required
                            />
                            <div className="invalid-feedback">Skill is required.</div>
                        </div>                        
                        <div className={`mb-3 text-start ${isFieldEmpty(companyname) ? 'text-danger' : ''}`}>
                            <label htmlFor="exampleInputCompany" className="form-label">
                                <strong>Company</strong>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Company"
                                className="form-control"
                                id="exampleInputCompany"
                                onChange={(event) => setCompany(event.target.value)}
                                required
                            />
                        </div>
                        <div className={`mb-3 text-start ${isFieldEmpty(about) ? 'text-danger' : ''}`}>
                            <label htmlFor="exampleInputAbout" className="form-label">
                                <strong>About</strong>
                            </label>
                            <textarea
                                placeholder="Tell us about yourself"
                                className={`form-control ${isFieldEmpty(about) ? 'is-invalid' : ''}`}
                                id="exampleInputAbout"
                                onChange={(event) => setAbout(event.target.value)}
                                required
                            />
                            
                        </div>
                        <button type="submit" className="btn btn-primary">Register</button>
                    </form>

                    <p className='container my-2'>Already have an account ?</p>
                    <Link to='/login' className="btn btn-secondary">Login</Link>
                </div>
            </div>
        </div>
    )
}

export default Register;
