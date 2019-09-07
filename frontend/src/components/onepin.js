import React,{Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import '../css/onepin.css'
// import Pins from './pins.js'

class Onepin extends Component{
  constructor(props){
    super(props)
    this.state={
      pinId:parseInt(Object.values(this.props.match.params)),
      pinInfo:[]
    }
  }


  componentDidMount(){

    const {pinId} = this.state

    //we make a seperate axios call for indvidual pins
    if(pinId){
      axios.get(`/api/pins/pin/${pinId}`)
      .then(response=>{
        this.setState({
          pinInfo:response.data.body
        })
      }).catch(err=>{
        console.log(err)
      })
    }

  }

 render(){
   const {pinInfo}=this.state
   console.log(pinInfo)

  return(
    <div className = "pinContainer">
      <div className = 'onepin'>

        <div className='pinimg'>
          <a href={`${pinInfo.image}`}>
          <img src={`${pinInfo.image}`} alt=''/>
          </a>
        </div>

        <div className='pininfo'>
          <Link to='/'>
            <button>Home</button>

          </Link>

          <h1>{`${pinInfo.title}`}</h1>
          Created by : {" "}
          <Link to={`/user/${pinInfo.user_id}`}>{pinInfo.username}</Link>
          <p>{`${pinInfo.description}`}</p>
        </div>

      </div>

    </div>
    )
  }


}
export default Onepin
