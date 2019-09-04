import React from 'react'
import {withRouter} from 'react-router'
import '../css/login.css'

const Form = ({
  match,
  username,
  password,
  email,
  isLoggedIn,
  loginUser,
  registerUser,
  handleChange,
})=>{
  const path = match.path;
  return(
    <>
    <div className='body'>
      <h1> {path ==='/auth/login'?'Welcome back':"Sign up to see more"}</h1>
      <form onSubmit={path==='/auth/login'?loginUser:registerUser}>
        <input
          type='text'
          value={username}
          name="username"
          placeholder="username"
          onChange={handleChange}
          />
        <br/>
        <input
          autoComplete='off'
          type='password'
          value={password}
          name="password"
          placeholder="Password"
          onChange={handleChange}
          />
        <br/>
        <input
          type='text'
          value={email}
          name="email"
          placeholder="email"
          onChange={handleChange}
          />
        <br/>
        <button type ="submit">Continue</button>
      </form>
      <p>{isLoggedIn ? "logged in!" : ""}</p>
      </div>
    </>
  )
}
export default withRouter(Form)
