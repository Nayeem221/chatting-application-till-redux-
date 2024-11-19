import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const ForgetPassword = () => {
    // declaring the state
    const [reset,Setreset]=useState('')
    //firebase variable
    const auth = getAuth();
    // declaring a function
    const handlereset=(e)=>{
     e.preventDefault()
     if(!reset){
        alert('enter your email')
     }else{
        sendPasswordResetEmail(auth, reset)
  .then(() => {
    // Password reset email sent!
    // ..
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
     }
    }
  return (
    <>
<div className=' w-full h-screen flex justify-center items-center flex-col'>
<h2>Reset password</h2>
<div className="relative w-[500px] mt-6">
  
  <input
  onChange={(e)=>Setreset(e.target.value)}
    type="email"
    placeholder="Email address"
    autoComplete="email"
    aria-label="Email address"
    className="block w-[400px] rounded-2xl border border-neutral-300 bg-transparent py-4 pl-6 pr-20 text-base/6 text-neutral-950 ring-4 ring-transparent transition placeholder:text-neutral-500 focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5"
  />
  <div className="absolute inset-y-1 right-1 flex justify-end">
    <button
    onClick={handlereset}
      type="submit"
      aria-label="Submit"
      className="flex aspect-square h-full items-center justify-center rounded-xl bg-neutral-950 text-white transition hover:bg-neutral-800"
    >
      <svg viewBox="0 0 16 6" aria-hidden="true" className="w-4">
        <path
          fill="currentColor"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16 3 10 .5v2H0v1h10v2L16 3Z"
        ></path>
      </svg>
    </button>
  </div>
 
</div>
<Link to={'/login'}> <h2>remember password? login</h2></Link>
</div>

    </>
  )
}

export default ForgetPassword
