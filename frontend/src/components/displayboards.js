import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios'
import Createboard from './createboards.js'

class DisplayBoards extends Component{
  constructor(props){
    super(props)
    this.state={
      profileId: props.profileId,
      displayBoard:props.displayBoard,
      boards:null,
      pins:null
    }
    // console.log(props)
  }

  getboards=()=>{
    axios.get(`/boards/user/${this.state.profileId}`)
    .then(response=>{
      // console.log(response.data.boards)
      this.setState({
        boards:response.data.boards
      })
    })
  }

  componentDidMount(){
    this.getboards()
  }

  makeboards=()=>{
    const {boards}=this.state

    if(boards){
      boards.map(el=>{
        return(
          <li key={el.id}>
            <Link to={`/boards/${el.id}`}>
              {el.name}
            </Link>
          </li>
        )
      })
    }
  }


  render(){
    const{boards}=this.state
    console.log(boards)
    return(
      <div>
        this is where boards should appear
        <ul>

        </ul>
        <Createboard/>
      </div>
    )
  }
}

export default DisplayBoards
