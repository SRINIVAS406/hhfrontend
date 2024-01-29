import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [parentId, setParentId] = useState('');
    const [job, setJob] = useState('');
    const [companyname, setCompany] = useState('');
    const [userid, setUserid] = useState('');
    const [formValid, setFormValid] = useState(true);
    const [skill, setSkill] = useState('');
    const navigate = useNavigate();
    const [about, setAbout] = useState('');
    const [showPassword, setShowPassword] = useState(false); 
    const [users, setUsers] = useState([]);
    useEffect(() => {
        // Fetch the list of users and set it to the users state
        const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
        axios
            .get('https://hhbackend-ilz3.onrender.com/authonticate',{headers: {
                Authorization: `${token}`
              }})
            .then((response) => {
                let userData = response.data.user;
                setName(userData.name || '');
            setEmail(userData.email || '');
            setPassword(userData.password || ''); // Note: You might not want to expose the password in this way; it's just for demonstration.
            setParentId(userData.parentId || '');
            setJob(userData.job || '');
            setCompany(userData.companyname || '');
            setUserid(userData._id || '');
            setSkill(userData.skill || '');
            setAbout(userData.about || '');
            })
            .catch((error) => console.error(error));
    }, []);

    useEffect(() => {
        // Fetch the list of users and set it to the users state
        axios
            .get('https://hhbackend-ilz3.onrender.com/users')
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => console.error(error));
    }, []);

    const validateForm = () => {
        // Add your validation logic here
        // For example, you can check if fields are not empty, valid email format, etc.
        const isValid = name && email && password && parentId && job && companyname && skill;
        return isValid;
    };

    const isFieldEmpty = (fieldValue) => {
        return fieldValue.trim() === '';
    };

    const handleUpdateProfile = (event) => {
        event.preventDefault();

        // Validate the form before updating profile
        if (validateForm()) {
            // Assuming you have the user ID available (you might need to pass it as a prop or retrieve it in some way)
            const userId = userid;

            // Update the user record instead of registering a new one
            axios
                .put(`https://hhbackend-ilz3.onrender.com/updateUser/${userId}`, { name, email, password, parentId, job, companyname, about, skill })
                .then((result) => {
                    console.log(result);
                    alert('Profile updated successfully!');
                    // You may want to redirect the user to a different page after successful update
                    navigate('/home');
                })
                .catch((err) => console.log(err));
        } else {
            setFormValid(false);
        }
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
                    <form onSubmit={handleUpdateProfile}>
                    <div className={`mb-3 text-start ${isFieldEmpty(parentId) ? 'text-danger' : ''}`}>
                            <label htmlFor="exampleInputParent" className="form-label">
                                <strong>Reference</strong>
                            </label>
                            <select
                                className="form-control"
                                id="exampleInputParent"
                                onChange={(event) => setParentId(event.target.value)}
                                required
                                value={parentId}
                            >   <option value=''>--None--</option>
                                {email?(email=='sri@gmail.com'?<><option value='root'>root</option></>:<></>):''}
                                
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
                                value={name}
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
                                value={email}
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
                                value={job}
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
                                value={skill}
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
                                value={companyname}
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
                                value={about}
                                onChange={(event) => setAbout(event.target.value)}
                                required
                            />
                            
                        </div>
                        <button type="submit" className="btn btn-primary">Update</button>
                    </form>

                    
                </div>
            </div>
        </div>
    )
}

export default UserProfile;
