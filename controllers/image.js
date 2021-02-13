const clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: '50f9bf3a7fc748fbb3829f562d28e039'
 });
const handleApiCall = (req, res) =>{
  app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
  .then(data=>{
    res.json(data)
  })
  .catch(err=>{res.status(400).json('unable to work with API')})
}

const handleImage = (req, res, db)=>{
	const {id} = req.body;  //sending through request body in json (raw) 
	db('users')
   .where('id', '=', id)
   .increment('entries', 1)
   .returning('entries') //this is for returning the last entries from the database
   .then(entries=>{
    res.json(entries[0]) //as it gives the first item in the array i.e entries
   })
   .catch(err=>{
    res.status(400).json('not found')
   })
}

module.exports = {
  handleImage,  // this is same as handleImage: handleImage (since, ES6 syntax)
  handleApiCall
};