import React from 'react'
import {Link} from 'react-router-dom'
import '../css/pins.css'

export const Createboard = (pin)=>{

const createPins = ()=>{
  return("dinosaur")
}

// pin.pin.map(pins=>{
//   return(
//     <div className="linkpins" key={pins.id}>
//       <Link to={`/pins/${pins.id}`} ><img src={`${pins.image}`}  className='smallpins' alt=''/></Link>
//     </div>
//   )

// })

return(
  <>
  <div className='pins'>
    {createPins}
  </div>
  </>
  )
}

export default Createboard
