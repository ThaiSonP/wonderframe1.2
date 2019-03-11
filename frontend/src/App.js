import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom'
import axios from 'axios'


import LoginAuth from './login/loginAuth'
import Auth from './helper/Auth'
// import PrivateRoute from './helper/AuthRouting'

import Header from './components/header.js'
import Editprofile from './components/editprofile.js'
import Profile from './components/profile.js'
import Pins from './components/pins.js'
import Onepin from './components/onepin.js'
import PostPin from './components/postpin.js'
import PostBoards from './components/postboards.js'

import './App.css';

class App extends Component {
  state = {
    userid:null,
    pins:[],
    user:[],
    // search:'',
    isLoggedIn:false
  }

getPins = ()=>{
  axios.get('/pins')
  .then(response=>{
    this.setState({
      pins:response.data.pins
    })
  })
}

componentDidMount = ()=>{
  this.checkAuthenticateStatus();
  this.getPins();
}

checkAuthenticateStatus = () => {
  axios.get("/users/status/login").then(user => {
    if (user.data.id === parseInt(Auth.getToken())) {
      this.setState({
        isLoggedIn: Auth.isUserAuthenticated(),
        userid: parseInt(Auth.getToken())
      })

      axios.get(`/users/${this.state.userid}`)
      .then(result=>{
        this.setState({
          user:result.data.body
        })
      })

    } else {
      if (user.data.id) {
        this.logoutUser();
    } else {
      Auth.deauthenticateUser();
      }
    }
  });
};

logoutUser = () => {
  axios
    .post("/users/logout")
    .then(() => {
      Auth.deauthenticateUser();
    })
    .then(() => {
      this.checkAuthenticateStatus();
    })
    this.forceUpdate();
};


render() {
  // console.log(this.state)
  const { isLoggedIn, userid,pins,user } = this.state;

  if(!isLoggedIn){
    return (
      <div>
          <Route
            exact path="/"
            render={() => {
              return (
                <LoginAuth
                  checkAuthenticateStatus={this.checkAuthenticateStatus}
                  isLoggedIn={isLoggedIn}
                />
              );
            }}
          />
      </div>
    );
  }else{
    return (
      <>
            <div className="App">
              <Header user={user} logoutUser={this.logoutUser}/>
                <Switch>
                  <Route exact path ='/'
                    render={(props) => <Pins {...props} pin={pins} />}
                    />
                  <Route path ='/user/:id'
                    render={(props) => <Profile {...props} user={user} />}
                    />
                  <Route path ='/edit'
                    render={(props) => <Editprofile{...props}  user={user}/>}
                    />
                  <Route path ='/pins/:id'
                    render={(props) => <Onepin {...props} pins={pins} />}
                    />
                  <Route path="/postpin"
                    render={(props)=><PostPin{...props} user={userid}/>}
                    />
                  <Route path="/postboard"
                    render={(props)=><PostBoards{...props} user={userid}/>}
                    />
                </Switch>

            </div>
      </>
    )
  }
}
}

export default App;
