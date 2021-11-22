import { connect } from "react-redux";
import React, { useEffect } from "react";
import { loadGoogleScript } from "../../Lib/GoogleLogin";
import {
    updateLogin,
    updateUserInfo,
    updateGoogleAuth,
} from "../../Redux/actions";

const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.signedIn,
        name: state.userInfo.userName,
        email: state.userInfo.userEmail,
        imageUrl: state.userInfo.userImg,
        googleAuth: state.googleAuth,
    };
};

const mapDispatchToProps = {
    updateLogin,
    updateUserInfo,
    updateGoogleAuth,
};

//Part of this page came from the following tutorial...
//https://www.quod.ai/post/how-to-integrate-google-api-into-your-react-app

function SignInPage(props) {
    const onSuccess = (googleUser) => {
        // (Ref. 7)
        props.updateLogin(true);
        const profile = googleUser.getBasicProfile();
        const userId = profile.getId();
        const name = profile.getName();
        const email = profile.getEmail();
        const imageUrl = profile.getImageUrl();
        props.updateUserInfo(userId, name, email, imageUrl);
    };

    const onFailure = () => {
        props.updateLogin(false);
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
            console.log("on google script loading...");
            const _gapi = window.gapi; // (Ref. 2)

            _gapi.load("auth2", () => {
                // (Ref. 3)
                (async () => {
                    const _googleAuth = await _gapi.auth2.init({
                        // (Ref. 4)
                        client_id: googleClientId,
                    });

                    props.updateGoogleAuth(_googleAuth, _gapi); //updates redux store for global access
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
                    {!props.isLoggedIn && (
                        <div to="/classes" key="signInKey" id="google-signin" />
                    )}

                    {props.isLoggedIn && (
                        <div className="d-flex flex-column align-items-center mb-3">
                            <div>
                                <img
                                    className="rounded-circle"
                                    src={props.imageUrl}
                                />
                            </div>
                            <div>{props.name}</div>
                            <div>{props.email}</div>

                            {/* <button className="btn-primary" onClick={logOut}>
                                Log Out
                            </button> */}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);
