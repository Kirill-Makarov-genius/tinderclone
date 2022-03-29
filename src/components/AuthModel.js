import React from 'react'
import { useState } from 'react';
function AuthModel ({ setShowModel, isSignUp }){
    

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [error, setError] = useState(null);
    

    function handleClick() {
        setShowModel(false);
    }

    function handleSubmit(e){
        e.preventDefault();
        try{
            if (isSignUp && (password !== confirmPassword)){
                setError("Passwords need to match!");
            }
            console.log("make a post request to our database");
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