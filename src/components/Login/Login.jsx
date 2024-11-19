import React, { useState } from 'react'
import { IoEyeOffOutline } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { FaEye } from "react-icons/fa6";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import 'react-toastify/dist/ReactToastify.css';
import { Bounce, toast } from 'react-toastify';
import {  signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {  CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { FadeLoader } from 'react-spinners';
import { useDispatch } from 'react-redux';
import { UserData } from '../../slices/UserSlice';
const Login = () => {
  // variable declaration
  const[Email,setEmail]=useState('')
  const[password,setPassword]=useState('')
  const [emailerror,setemailerror]=useState('')
  const[Passworderror,setPassworderror]= useState('')
  const[spinner,Setspinner]=useState(false)
  const [show,setShow]=useState(false)
  const navigate=useNavigate()
  // firebase variable
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  // redux variable 
  const dispatch=useDispatch()
   
  // function declare
  const handleclick=()=>{
    setShow(!show)
  }
  const handlesubmit=(e)=>{
    Setspinner(true)
e.preventDefault()
  if(!Email){
    setemailerror('Enter your email')
    Setspinner(false)
  }if(!password){
    setPassworderror('Enter your password')
    Setspinner(false)
  }else{
    signInWithEmailAndPassword(auth, Email, password)
  .then((userCredential) => {
    Setspinner(false)
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    if(user.emailVerified==false){
      
      toast.success('verify your email!',{
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
    }else{
      // send data to redux
dispatch(UserData(userCredential.user))
      navigate('/')
      toast.success('sucess!',{
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
        // set localstorage data
        localStorage.setItem('user',JSON.stringify(userCredential.user))
    }
  })
  .catch((error) => {
    Setspinner(false)
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(error);
    if(errorCode=="auth/invalid-credential"){
      toast.warn('something went wrong!', {
        position: "top-right",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
    }
  });




  }
  }

  const handlegoogle=()=>{
    signInWithPopup(auth, provider)
  .then((result) => {
    navigate('/')
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
    <h2>Login</h2>
    <div className="button">
        <button onClick={handlegoogle}><img className='' src="google.png" alt="" /> <h3>Login with google</h3></button>
        <button><img src="fb.png" alt="" /> <h3>Login with Facebook</h3></button>
    </div>
    <h4>-OR-</h4>
    <div className="accountmainform ">
      <form action="">
        
        <input onChange={(e)=>{setEmail(e.target.value),setemailerror('')}} type="text" placeholder='Email Address' />
        <span>{emailerror}</span>
        <input onChange={(e)=>{setPassword(e.target.value),setPassworderror('')}} type={show?"password":"text"} placeholder='Password' />
        <span>{Passworderror}</span>
        {
          show ?
<IoEyeOffOutline onClick={handleclick} className='absolute left-[80%] lg:left-[63%] top-[80%] lg:top-[65%]' />
:
<FaEye onClick={handleclick}  className='absolute left-[80%] lg:left-[63%] top-[80%] lg:top-[65%]' /> 
        }
        
       
      </form>
    </div>
    {
      spinner?
      <div className="createaccountbutton">
      <button ><FadeLoader /></button>
    </div>
      
    :
<div className="createaccountbutton">
      <button onClick={handlesubmit}>Login</button>
     
    </div>
    }
    
    <div className="lasttext">
      <p>Don't have an ACCOUNT?</p>
      <button onClick={()=>navigate('/register')}>Registration</button>
    </div>
    <Link to={'/forgetpass'}><p className='text-center text-[18px]'>Forget password?</p></Link>
</div>

     </div>
     
     
    </div>
    
    </>
  )
}

export default Login
