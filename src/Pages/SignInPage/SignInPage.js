import { connect } from "react-redux";
import React, { useEffect } from "react";
import { loadGoogleScript } from "../../Lib/GoogleLogin";
import {
    updateLogin,
    updateUserInfo,
    updateGoogleAuth,
    updateStore,
} from "../../Redux/actions";
import { db } from "../../Lib/FirebaseConfig";
import { ref, onValue } from "firebase/database";


const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.signedIn,
        id: state.id,
        name: state.name,
        email: state.email,
        imageUrl: state.userImg,
        googleAuth: state.googleAuth,
    };
};

const mapDispatchToProps = {
    updateLogin,
    updateUserInfo,
    updateGoogleAuth,
    updateStore,
};

//Part of this page came from the following tutorial...
//https://www.quod.ai/post/how-to-integrate-google-api-into-your-react-app

function SignInPage(props) {
    //destructuring props
    const {
        isLoggedIn,
        name,
        email,
        imageUrl,
        updateLogin,
        updateUserInfo,
        updateGoogleAuth,
        updateStore,
    } = props;
    // fetch current user data to update redux store when first loading
    function getUserData(userId) {
        if (!userId) {
            return console.log("No user Id");
        }
        const userRef = ref(db, "/users/" + userId);
        onValue(userRef, (snapshot) => {
            const data = snapshot.val();

            //check if user has any saved data
            if (data) {
                //updates redux store with user data stored in realtime database from firebase
                updateStore(data);
            }
            return updateLogin(true);
        });
    }

    const onSuccess = (googleUser) => {
        // (Ref. 7)

        const profile = googleUser.getBasicProfile();
        const id = profile.getId();
        const name = profile.getName();
        const email = profile.getEmail();
        const imageUrl = profile.getImageUrl();
        updateUserInfo(id, name, email, imageUrl);
        getUserData(id)
    };

    const onFailure = () => {
        updateLogin(false);
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

            const _gapi = window.gapi; // (Ref. 2)

            _gapi.load("auth2", () => {
                // (Ref. 3)
                (async () => {
                    const _googleAuth = await _gapi.auth2.init({
                        // (Ref. 4)
                        client_id: googleClientId,
                    });

                    updateGoogleAuth(_googleAuth, _gapi); //updates redux store for global access
                    renderSigninButton(_gapi); // (Ref. 6)
                })();
            });
        };

        // Ensure everything is set before loading the script
        loadGoogleScript(); // (Ref. 9)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <div className="clipboard">
                <div className="clipboard top"></div>
                <div className="flex-fill">
                    <div id="main-title">
                        <h2>Coach's Clipboard</h2>
                    </div>
                    {!isLoggedIn && (
                        <div to="/classes" key="signInKey" id="google-signin" />
                    )}

                    {isLoggedIn && (
                        <div className="d-flex flex-column align-items-center mb-3">
                            <div>
                                <img
                                    className="rounded-circle"
                                    alt="profile"
                                    src={imageUrl}
                                />
                            </div>
                            <div>{name}</div>
                            <div>{email}</div>

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
