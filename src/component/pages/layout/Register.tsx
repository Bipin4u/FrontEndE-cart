import React, { useState } from 'react';
import axios from 'axios';
import '../css/register.css';  
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/auth/users/', 
                { username:username, email:email, password:password });
            console.log('Registration successful:', response.data);
            navigate('/login')
        } catch (error: any) {
            console.error('Registration error:', error.response ? error.response.data : error.message);
        }
    };
    
    

    return (
        <div className="Register-container"> 
            <h2 className="Register-title">Register</h2>
            <form className="Register-form" onSubmit={handleSubmit}>
                <div className="Register-input-group">
                    <label className="Register-label">Username</label><br></br>
                    <input 
                        className="Register-input" 
                        type="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                    />
                </div>
                <div className="Register-input-group">
                    <label className="Register-label">Email</label><br></br>
                    <input 
                        className="Register-input" 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <div className="Register-input-group">
                    <label className="Register-label">Password</label><br></br>
                    <input 
                        className="Register-input" 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button className="Register-button" type="submit">Register</button>
            </form>
            <button className="Register-button" ><Link style={{textDecoration:"none", color:"white"}} to='/login'>Login</Link></button>

        </div>
    );
};

export default Register;
