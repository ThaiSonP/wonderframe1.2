import React from 'react'

export const Boardoptions = (props)=>{
  // console.log(props)

  const createOptions =()=>{

    if(props.info){
      return(
        props.info.map(el=>{
          return(
            <option key={el.id} value={el.id} name={props.name}>
              {el.name}
            </option>
          )
        })
      )
    }
  }

  return(
    <>
      {createOptions()}
    </>
  )
}

export default Boardoptions
