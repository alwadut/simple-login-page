import React from "react";
import { auth } from "../../Firebase/firebase.init";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Register = () => {
const handleRegister =(event)=>{
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value
    console.log(email,password);


    // create user email and password 
  createUserWithEmailAndPassword(auth,email,password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log(user);
    // ...
  })
.catch((error) =>{
const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode,errorMessage);
})

}


  return (
    <div className="max-w-lg mx-auto text-center">
      <h2 className="text-4xl ">Register</h2>

      <form onSubmit={handleRegister} className=" grid grid-cols-1 justify-items-center gap-4 my-4 ">
          <label className="input w-full">
            <input type="email" name="email" className="grow" placeholder="Email" />
          </label>
        <div className="w-full flex gap-4 ">
          <label className="input">
            <input type="text" className="grow" placeholder="First Name" />
          </label>
          <label className="input">
            <input type="text" className="grow" placeholder="Last Name" />
          </label>
        </div>

        {/* password  */}
        <label className="w-full input validator">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
              <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
            </g>
          </svg>
          <input
            type="password" name="password"
            required
            placeholder="Password"
            minlength="6"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
          />
        </label>
        <p className="validator-hint hidden">
          Must be more than 8 characters, including
          <br />
          At least one number <br />
          At least one lowercase letter <br />
          At least one uppercase letter
        </p>

        <button  className="w-full btn bg-white text-black text-xl font-bold border-[#e5e5e5]">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
