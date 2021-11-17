import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loadGoogleScript } from "../../Lib/GoogleLogin";
import { updateLogin, updateUserInfo } from "../../Redux/actions";

const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.signedIn,
        name: state.userInfo.userName,
        email: state.userInfo.userEmail,
        imageUrl: state.userInfo.userImg,
    };
};

const mapDispatchToProps = {
    updateLogin,
    updateUserInfo,
};

//Part of this page came from the following tutorial...
//https://www.quod.ai/post/how-to-integrate-google-api-into-your-react-app

function SignInPage(props) {
    const [gapi, setGapi] = useState();
    const [googleAuth, setGoogleAuth] = useState();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [imageUrl, setImageUrl] = useState();

    const onSuccess = (googleUser) => {
        // (Ref. 7)
        setIsLoggedIn(true);
        const profile = googleUser.getBasicProfile();
        setName(profile.getName());
        setEmail(profile.getEmail());
        setImageUrl(profile.getImageUrl());
    };

    const onFailure = () => {
        setIsLoggedIn(false);
    };

    const logOut = () => {
        // (Ref. 8)
        console.log('googleAuth: ', googleAuth);
        (async () => {
            await googleAuth.signOut();
            setIsLoggedIn(false);
            renderSigninButton(gapi);
        })();
    };

    const renderSigninButton = (_gapi) => {
        // (Ref. 6)
        _gapi.signin2.render("google-signin", {
            scope: "profile email",
            width: 240,
            height: 50,
            longtitle: true,
            theme: "dark",
            onsuccess: onSuccess,
            onfailure: onFailure,
        });
    };

    useEffect(() => {
        // Window.gapi is available at this point
        window.onGoogleScriptLoad = () => {
            // (Ref. 1)
            console.log('on google script loading...');
            const _gapi = window.gapi; // (Ref. 2)
            setGapi(_gapi);

            _gapi.load("auth2", () => {
                // (Ref. 3)
                (async () => {
                    const _googleAuth = await _gapi.auth2.init({
                        // (Ref. 4)
                        client_id: googleClientId,
                    });
                    setGoogleAuth(_googleAuth); // (Ref. 5)
                    renderSigninButton(_gapi); // (Ref. 6)
                })();
            });
        };

        // Ensure everything is set before loading the script
        loadGoogleScript(); // (Ref. 9)
    }, []);

    return (
        <div>
            <div className="clipboard">
                <div className="clipboard top"></div>
                <div className="flex-fill">
                    <div id="main-title">
                        <h1>PE Clipboard</h1>
                    </div>
                    {!isLoggedIn && <div to='/classes' key="signInKey" id="google-signin"/>}

                    {isLoggedIn && (
                        <div className="d-flex flex-column align-items-center mb-3">
                            <div>
                                <img
                                    className="rounded-circle"
                                    src={imageUrl}
                                />
                            </div>
                            <div>{name}</div>
                            <div>{email}</div>

                            <button className="btn-primary" onClick={logOut}>
                                Log Out
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);

{
    /* <div className="clipboard">
                <div className="clipboard top"></div>
                <div className="flex-fill">
                    <div id="main-title">
                        <h1>PE Clipboard</h1>
                    </div>
                    <SignIn />

                    <Link
                        to="/classes"
                        id="sign-in"
                        className="btn bg-light"
                        type="link"
                        onClick={handleClick}
                    >
                        Sign In
                    </Link>
                </div>
            </div> */
}
