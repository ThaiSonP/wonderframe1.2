import React, {Component} from 'react';
import '../css/createboard.css'
import{Link } from 'react-router-dom'
import axios from 'axios'

class PostBoards extends Component{
  constructor(props){
    super(props)
    this.state={
      name:null,
      user_id:props.user,
      description:null
    }
  }
  handleChange=(event)=>{
    this.setState({
      [event.target.name]:event.target.value})
  }
  handleSubmit=(e)=>{
    e.preventDefault();
    this.postBoard()
  }

  postBoard=()=>{
    const {name,user_id,description}=this.state
    axios.post('/api/boards',{
      name:name,
      user_id:user_id,
      description:description
    }).then(response=>{
      console.log(response.data.message)
    }).catch(err=>{
      console.log(err)
    })
    this.forceUpdate()
  }

  render(){
    const{user_id}=this.state
    // console.log(this.props.user)
    console.log(this.state)
    return(
      <div className = 'boardcontainer'>
        <div className = 'boardform'>
          <h1>Create board</h1>
          <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
            <input className="boardinput" name='name' type='text' placeholder='Title of board'/>
              <br/>
            <input className="boardinput" name='description' type='text' placeholder='Describe your board (optional)'/>
              <br/>
            <div className='boardbuttons'>
              <input type = 'submit' className='submitboard'/>
              <br/>
              <Link to={`/user/${user_id}`}><button className='cancel'>Cancel</button></Link>
            </div>
          </form>
        </div>
      </div>
    )
  }

}
export default PostBoards
