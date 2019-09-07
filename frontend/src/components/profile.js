import React,{Component} from 'react'
import '../css/profile.css'
import {Link} from 'react-router-dom'
import axios from 'axios'
import Buttons from './buttons'
// import DisplayBoards from './displayboards.js'

class Profile extends Component{
  constructor(props){
    super(props)
    this.state={
      profileId:parseInt(Object.values(this.props.match.params)),
      userInfo:[],
      pins:[],
      displayButton: false,
      displayBoard: true
    }
  }

  componentDidMount(){

    const {profileId} = this.state

    //we make a seperate axios call for indvidual pins
    axios.get(`/api/users/${profileId}`)
    .then(response=>{
      this.setState({
        userInfo:response.data.body
      })
    }).catch(err=>{
      console.log(err)
    })

    axios.get(`/api/pins/pinuser/${profileId}`)
    .then(response=>{
      // console.log(response.data.boards)
      this.setState({
        pins:response.data.boards
      })
    })
  }


  testbutton =()=>{
    this.setState({
      displayButton: !this.state.displayButton
    })
  }
  displayBoard = ()=>{
    this.setState({
      displayBoard: !this.state.displayBoard
    })
  }

  showboards=()=>{

  }


render(){
  console.log(this.state)
  // console.log(this.props.user.id)
  // const {id}=this.props.user
  const {username,bio,pic}=this.state.userInfo
  // const {profileId,displayBoard}=this.state

  return (
    <>
    <div className = 'profile1'>

      <div className = 'header1'>
          <Buttons displayButton={this.state.displayButton} testbutton={this.testbutton}/>
          <Link to='/edit'><button><img src='http://www.free-icons-download.net/images/pencil-symbol-icon-63234.png' alt=''/></button> </Link>
      </div>

      <div className = 'body1'>
        <div className = "body2">
          <div className='biotext'><h2>{username}</h2></div>
          <div className='biotext'><p>{bio}</p></div>
        </div>

        <div className = "body3">
          <img src={pic} alt='' className='profilepic'></img>
        </div>

      </div>

      <div className = "body4">
        <button onClick={this.displayBoard}>Boards</button>
        <button onClick={this.displayBoard}>Pins</button>
      </div>

    </div>

    </>
    )
  }
}
export default Profile

// <DisplayBoards profileId={profileId} displayBoard={displayBoard}/>
