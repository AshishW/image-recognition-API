const handleProfileGet = (req, res, db)=>{
  const {id} = req.params;   //sending through url parameters
  db.select('*').from('users').where({id})   //it means id: id (just a shorthand way)
   .then(user=>{
     if(user.length){
       res.json(user[0])      
     }
     else{
       res.status(404).json("not found")
     }
   })
   .catch(err=>{res.status(404).json('not found')})
}

module.exports = {
  handleProfileGet
};