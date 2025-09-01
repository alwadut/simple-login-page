import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import React, { Suspense, useRef, useState } from "react";
import { auth } from "../../Firebase/firebase.init";
import { Link } from "react-router-dom";

const Login = () => {
    const [success,setSucces] = useState(false)
    const [loginError,setLoginError] = useState('')
    const emailRef = useRef()





    const handleLogin = e =>{
        e.preventDefault()
       const email = e.target.email.value;
       const password = e.target.password.value;
       console.log(email,password);

    //    reset 
    setSucces(false);
    setLoginError('')

       signInWithEmailAndPassword(auth,email,password)
       .then((result) =>{
           const user = result.user;
           console.log(user);

          if(!result.user.emailVerified){
            setLoginError('please varify the email')
            
          }
          else{

            setSucces(true)
          }



       })
       .catch((error) => {
       const errorCode = error.code;
       console.log(errorCode);
       setLoginError(error.message)
       })
    }

    
    const handleForgetPass = () =>{
      console.log('get me a email ', emailRef.current.value);
      const email = emailRef.current.value;
      if(!email){
        console.log('please provide a valid email address ');
      }
      else{
        sendPasswordResetEmail(auth,email)
        .then(() => {
          alert('Password reset ')
        })
        .catch((error) =>{
            console.log(error.message);
        })
      }



    }


  return (
    <div  className="hero bg-base-200 min-h-screen">
      <div  className="hero-content flex-col lg:flex-row-reverse">
        <div  className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div  className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleLogin} className="fieldset">
              <label className="label">Email</label>
              <input type="email" name="email" ref = {emailRef} className="input" placeholder="Email" />
              <label className="label">Password</label>
              <input type="password" name="password" className="input" placeholder="Password" />
              <div onClick={handleForgetPass}>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <button className="btn btn-neutral mt-4">Login</button>
              
            </form>
            {
                success && <p className="text-green-500" > user login successfull </p> 
            }
            {
                loginError && <p className="text-red-500" > {loginError}</p> 
            }
            <p>if u r new in this website plz <Link to='/signup'>Sign Up</Link> </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
