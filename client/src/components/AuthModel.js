import React from 'react'
import { useState } from 'react';
import { useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie"
import axios from "axios";

function AuthModel ({ setShowModel, isSignUp }){
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [error, setError] = useState(null);
    const [cookies, setCookie, removeCookie] = useCookies(["user"]);


    const navigate = useNavigate();

    function handleClick() {
        setShowModel(false);
    }

    async function handleSubmit(e){
        e.preventDefault(); 
        try{
            if (isSignUp && (password !== confirmPassword)){
                setError("Passwords need to match!")
                return
            }
            
            const response = await axios.post(`http://localhost:8000/${isSignUp ? "signup" : "login"}`, { email, password })
            
            setCookie("UserId", response.data.userId)
            setCookie("AuthToken", response.data.token)

            if (response.status === 201 && isSignUp) navigate("/onboarding")
            if (response.status === 201 && !isSignUp) navigate("/dashboard")

        } catch(error){
            console.log(error);
        }
        console.log(error);
    }

    return (
        <div className='auth-modal'>
            <div className='close-icon' onClick={handleClick}>X</div>
            <h2>{isSignUp ? "CREATE ACCOUNT" : "LOG IN"}</h2>
            <p>By clicking Log In, you agree to our terms.</p>
            <form onSubmit={handleSubmit} className="sign-form">
                <input 
                    type="email"
                    id="email" 
                    name="email" 
                    placeholder="email"
                    required={true}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                    type="password"
                    id="password" 
                    name="password" 
                    placeholder="password"
                    required={true}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {isSignUp && <input 
                    type="password"
                    id="confirmPassword" 
                    name="confirmPassword" 
                    placeholder="confirm password"
                    required={true}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />}
                <input type="submit" className='secondary-button'/>
            </form>
            <hr/>
            <h2>GET THE APP</h2> 
            AUTH MODAL
        </div>
    )
}

export default AuthModel