import logo from "../images/Tinder-Logo.png";
function Nav({ showModel, setShowModel, setIsSignUp }){

    const authToken = false;

    function handleClick(){
        setIsSignUp(false);
        setShowModel(true);
    }
    
    return(
        <nav>
            <div className="logo-container">
                <img className="logo" src={logo} alt=""/>
            </div>
            {!authToken && <button 
                className="nav-button"
                onClick={handleClick}
                disabled={showModel}    
            >Log in</button>}
        </nav>
        
    )
}
export default Nav;