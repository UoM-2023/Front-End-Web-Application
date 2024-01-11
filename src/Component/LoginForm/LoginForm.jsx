import React from 'react'
import "./loginForm.css"

import username from '../Assets/User_light.svg'
import password from '../Assets/finger-print-outline.svg'
import contact from '../Assets/Phone.svg'

export default function LoginForm() {
  return (
    <div className='loginFormBox'>
        
        <div className='container'>
            <div className="header">
                <div className="text">Log In</div>
            </div>
            <div className="inputs">
                <div className="input">
                    <img src={username} alt="" className='inputPic' />
                    <input type="text" placeholder='User name' className='userName'/>
                </div>
                <div className="input">
                    <img src={password} alt="" className='inputPic'/>
                    <input type="password" placeholder='Password' className='userName'/>
                </div>
            </div>
            <div className="loginFormBottom">
                <div className="login-contact">
                    <div className="login">Log In</div>
                    <div className="contactUs">
                        <div className="call">
                        <img src={contact} alt=""/></div>
                        Contact Us</div>
                </div>
                <div className="resetPassword">Reset Password</div>
            </div>
        </div>
    </div>
  )
}
