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

function FirebaseSignIn(props) {

    //fetch current user data to update redux store when first loading
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
                props.updateStore(data);
            } 
            // else {
            //     writeUserData()
            // }
            return props.updateLogin(true);
        });
    

    //     const profile = googleUser.getBasicProfile();
    //     const id = profile.getId();
    //     const name = profile.getName();
    //     const email = profile.getEmail();
    //     const imageUrl = profile.getImageUrl();
    //     props.updateUserInfo(id, name, email, imageUrl);
    //     getUserData(id);
    // };

    // const onFailure = () => {
    //     props.updateLogin(false);
    // };


  
    return (
        <>
        
        </>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(FirebaseSignIn);
