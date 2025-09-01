import React, { useState } from "react";

import { auth } from "../../Firebase/firebase.init";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";

const SignUp = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSucces] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const handleSignUp = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const termsAndCondition = e.target.terms.checked;
    const name = e.target.name.value;
    const photo = e.target.photo.value;
    console.log(email, password, termsAndCondition,name,photo);

    // reset error message
    setErrorMessage("");
    setSucces(false);

    if (!termsAndCondition) {
      errorMessage("Please accept our terms and condition ");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password should be 6 carecter ");
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;

    if (!passwordRegex.test(password)) {
      setErrorMessage(
        "at least one uppercase , one lowercase, atleast one number "
      );
      return;
    }

    // if (!email || !password) {
    //   setErrorMessage("Please fill your email and password");
    //   return;
    // } else {
    //   setSucces(true); // or whatever function/state you use
    // }



    createUserWithEmailAndPassword(auth, email, password)
      .then((u) => {
        const user = u.user;
        console.log(user);
        setSucces(true);

        // send email varification

        sendEmailVerification(auth.currentUser).then(() => {
          console.log("email varify successfully ");

        });
        //update profile validation 

        const profile = {
          displayName : name,
          potoUrl  : photo
        }

        updateProfile(auth.currentUser,profile)
        .then(() =>{
          console.log('uer profile updated');
        })
        .catch(error => console.log(error,'user profile Error '))
        


      })
      .catch((error) => {
        console.log(error.message);
        setErrorMessage(error.message);
        setSucces(false);
      });
  };

  return (
    <div className="card bg-base-100 w-full max-w-sm mx-auto shadow-2xl ">
      <form onSubmit={handleSignUp} className="card-body text-center">
        <h3 className="text-2xl font-bold ">Sign Up</h3>
        <fieldset className="fieldset">
          <label className="label">Name</label>
          <input
            type="text"
            name="name"
            className="input"
            placeholder="name"
            />
          <label className="label">Email</label>
          <input
            type="email"
            name="email"
            className="input"
            placeholder="Email"
             />
          <label className="label">Photo url </label>
          <input
            type="text"
            name="photo"
            className="input"
            placeholder="photo"
          />
         
          <label className="label">Password</label>
          <input
            type={showPass ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="input"
          />
          <button
            onClick={() => setShowPass(!showPass)}
            className="btn btn-xs absolute right-12 top-78"
          >
            {showPass ? <FaRegEyeSlash /> : <FaEye />}
          </button>
          <div>
            <a className="link link-hover ">Forgot password?</a>
          </div>
          <div className="flex gap-2 ">
            <input type="checkbox" className="checkbox" name="terms" />
            <span>Trams and conditon </span>
          </div>
          <button className="btn btn-neutral mt-4">Sign Up</button>
        </fieldset>
        {errorMessage && <p className="alert text-red-600">{errorMessage}</p>}
        {success && <p className="text-green-400">Sign us successfull </p>}
      </form>
    </div>
  );
};

export default SignUp;
