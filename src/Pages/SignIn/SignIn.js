import React from "react";
import { Link } from 'react-router-dom';



function SignIn(props) {
    function handleClick(){
        props.updateLogin()
    }
    
    return (
        <div>
            <div className="clipboard">
                <div className="clipboard top"></div>
                <div className="flex-fill">
                    <div id="main-title">
                        <h1>PE Clipboard</h1>
                    </div>

                    <Link to="/classes"  id="sign-in" className="btn bg-light" type="link" onClick={handleClick}>
                        Sign In
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
