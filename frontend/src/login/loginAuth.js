import React,{Component} from 'react';
import axios from 'axios';
import Auth from '../helper/Auth'
import '../css/login.css'


class LoginAuth extends Component {
  state={
    username:"",
    password:"",
    email:'',
    login:true
  };

  handleChange = (e)=>{
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  loginChange = ()=>{
    this.setState({
      login: !this.state.login
    })
  }

  registerUser = async (e) =>{
    e.preventDefault();
    const {username,password,email}=this.state;
    await axios.post("/users/new",{username,password,email});
    Auth.authenticateUser(username)
    await axios.post('/users/login',{username,password,email})
    await this.props.checkAuthenticateStatus()
    this.setState({
      username:"",
      password:"",
      email:''
    })
  }

  loginUser = (e)=>{
    e.preventDefault();
    const {username,password,email}=this.state
    axios.post('/users/login',{username,password,email})
    .then((res)=>{
      Auth.authenticateUser(res.data.id)
    })
    .then(()=>{
      this.props.checkAuthenticateStatus()
    })
    .then(()=>{
      this.setState({
        username:"",
        password:"",
        email:""
      })
    })
  }

  render(){
    const {username,password,email,login}= this.state
    // const {isLoggedIn}=this.props
    console.log(this.state)
    return(
      <div className='body'>
        <div className = 'login'>
          <h1>
            {login ? 'Welcome back':"Sign up to see more"}
          </h1>


          <button className = 'button' onClick={this.loginChange}> {login ? "Create an account": "Log in"}
          </button>

        <br/>

          <form onSubmit={login?this.loginUser:this.registerUser}>
            <input
              type='text'
              autoComplete='off'
              value={username}
              name="username"
              placeholder="username"
              onChange={this.handleChange}
              />
            <br/>
            <input
              autoComplete='off'
              type='password'
              value={password}
              name="password"
              placeholder="Password"
              onChange={this.handleChange}
              />
            <br/>
            <input
              type='text'
              autoComplete='off'
              value={email}
              name="email"
              placeholder="email"
              onChange={this.handleChange}
              />
            <br/>
            <button className="button" type ="submit">Continue</button>
          </form>
        </div>

      </div>
    )

  }
}

export default LoginAuth;
