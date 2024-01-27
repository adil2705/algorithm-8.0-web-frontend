import React from "react";
import Lottie from 'react-lottie';
import SignUpAnimation from '../assets/lottie/signup.json'

import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import { useState } from "react";
import { auth } from "../../firebase-config";

import Alert from "../components/Alert";

export default function SignUp() {
  const isMobile = window.innerWidth < 768;

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: SignUpAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [conpassword, setConPassword] = useState('');

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');

  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault()

    if(password !== conpassword) {
      alert('Passwords do not match')
      return
    } else {
        setLoading(true);
        await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          setLoading(false);
          setAlertMessage('Sign-Up successful');
          setAlertType('success');
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 2000);
          // navigate('/signin');
        })
        .catch((error) => {
          setLoading(false);
          setAlertMessage(error.message);
          setAlertType('error');
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 2000);
        });
    }
  }

  return (
    <section>
      <div className="fixed w-full top-0 z-10">
          {showAlert && <Alert message={alertMessage} type={alertType} />}
      </div>
      <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
        <div className="md:w-1/2 max-w-lg">
          <Lottie 
            options={defaultOptions}
            height={isMobile ? 250 : 500}
            width={isMobile ? 350 : 500}
          />
        </div>
        <div className="md:w-1/2 max-w-sm">
          <div className="my-4 font-semibold text-2xl text-slate-500 text-center md:text-left">
            Sign-Up for an account
          </div>
          <input 
              className="text-xl w-full px-4 py-2 border border-solid border-gray-300 rounded-xl" 
              type="text" 
              label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}  
              required 
              placeholder="Email Address" />
          <input 
              className="text-xl w-full px-4 py-2 border border-solid border-gray-300 rounded-xl mt-4" 
              type="password" 
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              required 
              placeholder="Password" />
          <input 
              className="text-xl w-full px-4 py-2 border border-solid border-gray-300 rounded-xl mt-4" 
              type="password" 
              label="Confirm Password"
              value={conpassword}
              onChange={(e) => setConPassword(e.target.value)} 
              required 
              placeholder="Confirm Password" />
          <div className="text-center md:text-left font-bold">
            <button 
              className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded-xl tracking-wider text-base" 
              type="submit"
              style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}
              onClick={onSubmit}>
              {loading ? 
              <svg 
                  aria-hidden="true" 
                  className="w-8 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" 
                  viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" 
                    fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" 
                    fill="currentFill"/>
              </svg> 
              : 'Sign-Up'}
            </button>
          </div>
          <div className="mt-4 font-semibold text-lg text-slate-500 text-center md:text-left">
            Already have an account? <a className="text-red-600 hover:underline hover:underline-offset-4 font-bold" href="/signin">Sign-In</a>
          </div>
        </div>
      </section>
    </section>
  );
}