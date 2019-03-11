import React, {Component} from 'react';
import{Link } from 'react-router-dom'
import axios from 'axios';
import '../css/createpin.css'

class PostPin extends Component{
  constructor(props){
    super(props)
    this.state={
      user_id:props.user,
      image:null,
      title:null,
      board_id:null,
      description:null,
      options:null
    }
  }

  handleChange=(event)=>{
    this.setState({
      [event.target.name]:event.target.value})
  }
  handleSubmit=(e)=>{
    e.preventDefault();
    this.postPin();
  }

  componentDidMount(){
    const {options,user_id}=this.state

    axios.get(`/boards/user/${user_id}`)
    .then(response=>{
      this.setState({
        options:response.data.boards
      })
    }).catch(err=>{
      console.log(err)
    });

  }

  createOptions(){
    const {options}=this.state
    if(options){
      return(
      options.map(el=>{
        return(
          <option key={el.id} value = {parseInt(el.id)} >
            {el.name}
          </option>
        )
      })
    )}
  }

  postPin=()=>{
    const{user_id,image,title,board_id,description}=this.state

    axios.post('/pins',{
      user_id: user_id,
      image: image,
      title: title,
      board_id:board_id,
      description:description
    }).then(response=>{
      console.log(response.data)
    }).catch(err=>{
      console.log(err)
    })

    this.forceUpdate()
  }

  render(){

    return(
      <div className = "pinContainer">
      <form  onSubmit={this.handleSubmit} onChange={this.handleChange}>
        <div className = 'onepin'>
            <div className='pinimg'>
              <input name = 'image' type='text' placeholder="Add the URL this pin links to"/>
              </div>

            <div className='pininfo'>
              <Link to='/'>
                <button>Home</button>
              </Link>

              <input name = 'title' type='text' placeholder="Add a title"/>
                <br/>
              <input name = 'description' type='text' placeholder="Say more about this Pin"/>
                <br/>
              <select name='board_id' defaultValue="Choose a board (Required)">
                <option disabled>Choose a board (Required)</option>
                {this.createOptions()}
              </select>
                <br/>

              <input type='submit'/>
            </div>
        </div>
        </form>
      </div>

    )
  }
}
export default PostPin
