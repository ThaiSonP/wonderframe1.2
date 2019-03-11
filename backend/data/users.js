const db = require ('./index')
const authHelpers = require ('../auth/helpers')

const getAllUsers = (req,res)=>{
  db.any('select * from users')
  .then(results=>{
    res.status(200)
      .json({
      message: 'these are all the users',
      users:results
    })
  }).catch(err=>{
    console.log(err)
  })
}

const getSingleUser = (req,res)=>{
  const id = req.params.id;
  db.one('SELECT * FROM users WHERE id = $1',id)
  .then(result=>{
    res.status(200)
      .json({
      message: 'this is ONE user',
      body: result
    })
  }).catch(err=>{
    console.log(err)
  })
}

const patchUser = (req,res)=>{
  const hash = authHelpers.createHash(req.body.password);
  db.none(
    "UPDATE users SET username=${username}, password=${password}, email=${email}, bio=${bio}, pic=${pic} WHERE id=${id}",
    {
      username:req.body.username,
      password:hash,
      email:req.body.email,
      bio:req.body.bio,
      pic:req.body.pic,
      id:parseInt(req.params.id)
    }
  ).then(()=>{
    res.status(200)
      .json({
      message: 'user has been updated'
    })
  }).catch(err=>{
    console.log(err)
  })
}

const deleteUser = (req,res)=>{
  const id=req.params.id
  db.none('DELETE from users where id=$1',[id])
  .then(results=>{
    res.status(200)
      .json({
      message:'user deleted'
    })
  }).catch(err=>{
    console.log(err)
  })
}

const createUser = (req,res,next) =>{
  const hash = authHelpers.createHash(req.body.password);

  db.none(
      "INSERT INTO users (username, password, email) VALUES (${username},${password},${email})",
      {username:req.body.username, password:hash,email:req.body.email}
  )
  .then(()=>{
    res.status(200).json({
      message: 'signup successful'
    })
  })
  .catch(err=>{
    res.status(500).json({
      message:err
    })
  })
}

const loginUser = (req, res)=> {
  res.json(req.user);
}

const isLoggedIn = (req, res)=> {
  console.log('is logged in');

  if (req.user) {
    res.json({ id: req.user });
  } else {
    res.json({ id: null });
  };

}


function logoutUser(req, res, next) {
  req.logout();
  res.status(200).send("log out success");
}

module.exports ={
  getAllUsers,
  getSingleUser,
  patchUser,
  deleteUser,
  createUser,
  loginUser,
  isLoggedIn,
  logoutUser,
}
