import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const hostUrl = import.meta.env.VITE_HOST_URL;
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(hostUrl+'/login', {email, password})
        .then(result => {
            console.log(result);
            if(result.status === 200){
                console.log("Login Success");
                localStorage.setItem('token', result.data.token);
                sessionStorage.setItem('user', JSON.stringify({ email }));
                navigate('/home');
            }
            else{
                alert('Incorrect password! Please try again.');
            }
        })
        .catch(err => console.log(err));
    }
  
    return (
        <div className="container-fluid vh-100">
        <div className="row justify-content-center align-items-center text-center vh-100" style={{ backgroundImage: "linear-gradient(rgb(0, 213, 255), rgb(0, 149, 255), rgba(93, 0, 255, 0.557))", height:"100vh" }}>
          <div className="col-sm-12 col-md-8 col-lg-6 bg-white p-3 rounded" style={{height:"auto", marginTop:"20px", marginBottom:"180px"}}>
            <h2 className="mb-3 text-primary">Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 text-start">
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
                        <div className="mb-3 text-start">
                            <label htmlFor="exampleInputPassword1" className="form-label">
                                <strong>Password</strong>
                            </label>
                            <input 
                                type="password" 
                                placeholder="Enter Password"
                                className="form-control" 
                                id="exampleInputPassword1" 
                                onChange={(event) => setPassword(event.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                    <p className='container my-2'>Don&apos;t have an account?</p>
                    <Link to='/register' className="btn btn-secondary">Register</Link>
                </div>
            </div>
        </div>
    )
}

export default Login;
