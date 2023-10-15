import React from "react";
import myLogo from "../../public/logoMakr.png";


function Header() {
    return (
        <header className="header">
            <img className="header--image" src={myLogo} alt="vite-logo"></img>
            <h2 className="header--title" >ike dev.</h2>
            <h2 className="header--project">ian kitembe - Portfolio</h2>
        </header>        
    )
}

export default Header