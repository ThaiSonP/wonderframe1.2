import React from 'react'
import {Link} from 'react-router-dom'
import '../css/header.css'

export const Header = (props) =>{
  if(props){

  const user = props.user
  // console.log(props)
  return(
    <nav>
    <div className = 'header'>
        <div className = 'div1'>
          <Link to='/'> <img className='logo' src ='https://i.etsystatic.com/9660676/r/il/bf6889/1513168774/il_570xN.1513168774_513y.jpg' alt=''/> </Link>
        </div>
        <div className = 'div2'>
          <>
          <img className='logo' src ='https://www.pinclipart.com/picdir/middle/102-1020850_google-clipart-search-bar-search-magnifying-glass-png.png' alt=''/>
          </>
          <input type='text'/>
        </div>
        <div className = 'div3'>

          <div className = 'miniDiv1'>
            <Link to='/'>
              <button>Home</button>
            </Link>
          </div>

          <div className = 'miniDiv2'>
            <Link to={`/user/${user.id}`}>
              <button>
                <img className='logo' src={`${user.pic}`} alt=''/>
                {user.username}
              </button>
            </Link>

            <Link to ='/'>
              <button onClick ={props.logoutUser}> Log Out
              </button>
            </Link>

          </div>

        </div>

    </div>

    </nav>
  )
}
}

export default Header
