import React, { useState } from 'react'
import { IoEyeOffOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithPopup } from "firebase/auth";
import 'react-toastify/dist/ReactToastify.css';
import { Bounce, toast } from 'react-toastify';
import {  sendEmailVerification } from "firebase/auth";
import { CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { FadeLoader } from 'react-spinners';
import { GoogleAuthProvider } from "firebase/auth";

const Register = () => {
  // variable declare
  const [show,setShow]=useState(false)
  // function declare
  const handleshow=()=>{
    setShow(!show)
  }
  // firebase variable
  const auth = getAuth();
  const provider = new GoogleAuthProvider()

  // firebase variable end 
  //state  management
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [Password,setPassword]=useState('')
  const [nameerror,setNameerror]=useState('')
  const [emailerror,setemailerror]=useState('')
  const [Passworderror,setPassworderror]=useState('')
const [spinner,Setspinner]=useState(false)

//function for spinner



// submit function and if else condition 
  const handlesubmit=(e)=>{
    Setspinner(true)
    e.preventDefault()
    if(!name){
      setNameerror('enter your name')
      Setspinner(false)
    }
    if(!email){
      setemailerror('enter your email')
      Setspinner(false)
    }
    if(!Password){
      setPassworderror('enter your password')
      Setspinner(false)
    }else{
      createUserWithEmailAndPassword(auth, email, Password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        console.log(user);
        //Email verification code
        sendEmailVerification(auth.currentUser)
  .then(() => {
  
   Setspinner(false)
  //  set username and profile picture 
  updateProfile(auth.currentUser,{
    displayName: name, 
    photoURL:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVCHywHxDFVk0j8PEgX8FELCQ8Vbiu2a49Xg&s"

    // Email verification sent! // ...
    
  }).then(()=>{
    navigate('/login')
    toast.success('Email verification sent!',{
      position: "top-right",
      autoClose: 1200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
      });
  }) 
  });

      })
      .catch((error) => {
        Setspinner(false)
        const errorCode = error.code;
        const errorMessage = error.message;
  if(errorCode=='auth/email-already-in-use'){
    
    toast.warn('Email already in use!',{
      position: "top-right",
      autoClose: 1200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
      });
  }
      });
    }
  }
  const navigate=useNavigate()
  // google sign in 
  const handlegoogle=()=>{
    signInWithPopup(auth, provider)
  .then((result) => {
    navigate('/login')
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });

  }
  return (
    <>
    <div className='account '>
     <div className="accounttext">
        <h1>Find 3D Objects, Mockups and
Illustrations here.</h1>
        <p></p>
        <div className="accountimage">
        <img src="registerbg.png" alt="" />
     </div>
     </div>
     <div className="accountform">
<div className="accountformhead">
    <h2>Create Account</h2>
    <div className="button">
        <button onClick={handlegoogle}><img className='' src="google.png" alt="" /> <h3>Sign up with google</h3></button>
        <button><img src="fb.png" alt="" /> <h3>Sign up with Facebook</h3></button>
    </div>
    <h4>-OR-</h4>
    <div className="accountmainform ">
      <form action="">
        <input onChange={(e)=>{setName(e.target.value), setNameerror('')}} type="text" placeholder='Full Name' />
        <span>{nameerror}</span>
        <input onChange={(e)=>{setEmail(e.target.value) ,setemailerror('') }} type="text" placeholder='Email Address' />
        <span>{emailerror}</span>
        <input type={show? "text" : "password" }  onChange={(e)=>{setPassword(e.target.value) ,setPassworderror('') }}  placeholder='Password' />
        <span>{Passworderror}</span>
        {
          show ?
          <IoEyeOffOutline onClick={handleshow} className='absolute left-[80%] lg:left-[63%] top-[80%]' />
          :
          <FaEye onClick={handleshow} className='absolute left-[80%] lg:left-[63%] top-[80%]'  />

        }
        
       
      </form>
    </div>
    {
      spinner?
      <div className="createaccountbutton">
      <button>  <FadeLoader /></button>
    </div>

    :
<div className="createaccountbutton">
      <button onClick={handlesubmit}>Create Account</button>
    </div>

    }
    
    
    <div className="lasttext">
      <p>Already have an account?</p>
      <button onClick={()=>navigate('/login')}>Login</button>
    </div>
    
</div>
     </div>
     
    </div>
    </>
  )
}

export default Register
