import React from "react";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
// import { useDispatch } from "react-redux";
// import { google } from "../actions/userAction";
import { Button } from "@material-tailwind/react";

const GoogleAuthBtn = () => {
  //   const dispatch = useDispatch();
  const handleSubmit = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      const userData = JSON.stringify({
        name: result.user.displayName,
        email: result.user.email,
        avatar: result.user.photoURL,
        password: "dakjfajfkjadfas",
        //entering random password, bcz google not provided the password, and later the user can not log in without the password in as an normal user
      });
      console.log(userData);
      //   dispatch(google(userData));
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  return (
    <div>
      <Button
        variant="outlined"
        size="lg"
        className="mt-6 flex h-12 items-center justify-center gap-2"
        fullWidth
        type="button"
        onClick={handleSubmit}
      >
        <img
          src={`https://www.material-tailwind.com/logos/logo-google.png`}
          alt="google"
          className="h-6 w-6"
        />{" "}
        sign in with google
      </Button>
      {/* <button type='button' onClick={handleSubmit} className='googleBtn'>Continue with Google</button> */}
    </div>
  );
};

export default GoogleAuthBtn;
