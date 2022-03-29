import Nav from "../components/Nav";
import { useState } from "react";
import AuthModel from "../components/AuthModel";

function Home(){
    const [showModel, setShowModel] = useState(false);
    const [isSignUp, setIsSignUp] = useState(true);

    const authToken = false;
    
    const handleClick = () =>{
        setIsSignUp(true);
        setShowModel(true);
    }

    return(
        <div className="overlay">
            
            <Nav 
                setShowModel={setShowModel}
                showModel={showModel}
                setIsSignUp={setIsSignUp}
            />
            <div className="home">
                <h1 className="primary-title">Swipe Right</h1>
                <button className="primary-button" onClick={handleClick}>
                    {authToken ? "Signout" : "Create Account"}
                </button>
                {showModel && (
                    <AuthModel 
                        setShowModel={setShowModel}
                        isSignUp={isSignUp}
                    />)
                }
            </div>
        </div>
    )
}

export default Home;