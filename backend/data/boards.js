const db = require ('./index')

const getAllBoards = (req,res)=>{
  db.any('select * from boards')
  .then(results=>{
    res.status(200)
    .json({
      message:'these are all the boards',
      boards:results
    })
  }).catch(err=>{
    console.log(err)
  })
}

const getUserBoards = (req,res)=>{
  const id=req.params.id
  db.any('SELECT * FROM boards WHERE user_id =$1',id)
  .then(result=>{
    res.status(200)
    .json({
      message: 'these are the boards ',
      boards:result
    })
  }).catch(err=>{
    console.log(err)
  })
}

const postBoard = (req,res)=>{
  const body = req.body
  db.none('INSERT INTO boards (name,user_id,description)VALUES (${name},${user_id},${description})',body)
  .then(result=>{
    res.status(200)
    .json({
      message:'board has been created'
    })
  }).catch(err=>{
    console.log(err)
  })
}

module.exports={
  getAllBoards,
  getUserBoards,
  postBoard
}
