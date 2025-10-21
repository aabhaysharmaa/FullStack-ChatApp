import React, { useState } from 'react'
import BorderAnimatedContainer from '../components/BorderAnimationContainer'
import { LoaderIcon, LockIcon, MailIcon, MessageCircleIcon, UserIcon } from "lucide-react";
import { useAuthStore } from '../store/auth.store';
import PageLoader from '../components/PageLoader';
import { Link } from 'react-router';
const SignInPage = () => {
  const { SignUp, isSigningUp, isCheckingAuth } = useAuthStore();
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const handelSubmit = (e) => {
    e.preventDefault();
    SignUp(formData);
  }

  if (isCheckingAuth) {
    return (
      <PageLoader />
    )
  }

  return (
    <div className='w-full flex items-center justify-center p-4 bg-slate-900'>
      <div className="relative w-full max-w-6xl md:h-[800px] h-[650px]">
        <BorderAnimatedContainer>
          <div className="w-full flex flex-col md:flex-row">
            {/* FORM CLOUMN _ LEFT SIDE */}
            <div className="md:w-1/2 p-8 flex items-center justify-center md:border-r border-slate-600/30">
              {/* HEADING TEXT  */}
              <div className="w-full max-w-md">
                <div className="text-center mb-8">
                  <MessageCircleIcon className='size-12 mx-auto text-slate-400 mb-4' />
                  <h2 className='text-2xl font-bold text-slate-200 mb-2'>Create Account</h2>
                  <p className='text-slate-400'>Sign up for a new account</p>
                </div>
                {/* FORM */}
                <form onSubmit={handelSubmit} className='space-y-6'>
                  <div className="">
                    <label htmlFor="username" className='auth-input-label'>Full Name</label>
                    <div className="relative">
                      <UserIcon className='auth-input-icon' />
                      <input type="text" name="username" id="username" value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} className='input' placeholder='John Doe' />
                    </div>
                  </div>
                  <div className="">
                    <label htmlFor="email" className='auth-input-label'>Email</label>
                    <div className="relative">
                      <MailIcon className='auth-input-icon' />
                      <input type="email" name="email" id="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className='input' placeholder='John@gmail.com' />
                    </div>
                  </div>
                  <div className="">
                    <label htmlFor="password" className='auth-input-label'>Password</label>
                    <div className="relative">
                      <LockIcon className='auth-input-icon' />
                      <input type="password" name="password" id="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className='input' placeholder='*********' />
                    </div>
                  </div>
                  <button className='auth-btn' disabled={isSigningUp} type='submit'>
                    {isSigningUp ? (
                      <LoaderIcon className='w-full h-5 animate-spin text-center' />
                    ) : "Create Account"}
                  </button>
                </form>
                <div className="mt-6 text-center">
                  <Link to="/login" className='auth-link'>
                    Already have an account ? Login
                  </Link>
                </div>
              </div>
            </div>
            <div className="hidden md:w-1/2 md:flex items-center justify-center p-6 bg-gradient-to-bl from-slate-800/20 to-transparent">
              <div>
                <img src="/signup.png" alt="people using smart Phone" className="object-cover w-full h-auto" />
                <div className="mt-6 text-center">
                  <h3 className="text-xl font-medium text-cyan-400">Start Your Journey Today</h3>
                  <div className="mt-4 flex justify-center gap-4">
                    <span className="auth-badge">Free</span>
                    <span className="auth-badge">Easy Setup</span>
                    <span className="auth-badge">Private</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  )
}
export default SignInPage;