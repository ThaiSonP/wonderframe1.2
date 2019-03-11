import React from 'react'
import {Link} from 'react-router-dom'
import '../css/buttons.css'

export const Buttons = (props)=>{
  const {testbutton,displayButton}= props

  const subButtons = ()=>{
    if(displayButton){
      return(
        <div className = 'subButtons'>
          <Link to ='/postboard'><button>Create Board</button></Link>
          <Link to='/postpin'><button>Create Pins</button></Link>
        </div>
      )
    }else{
      return null
    }
  }

  return(
  <div className = 'buttonContainer'>
      <button onClick={testbutton}>
        <img src='https://icons-for-free.com/free-icons/png/512/392530.png'alt=''/>
      </button>
      {subButtons()}
  </div>
  )
}
export default Buttons
