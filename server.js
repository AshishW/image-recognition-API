const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors'); //for secure communication between client- server
const knex = require('knex');

const signin = require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');



const db= knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'ashish',
    database : 'smartbrain'
  }
});


const app = express();


app.use(express.json());
app.use(cors()); // to allow the frontend communication

app.get('/',(req, res)=>{
	res.json('it is working')
})

// signin:
app.post('/signin', signin.handleSignin(db, bcrypt)) //another way of dependency injection (take a look signin controller)
// register:
app.post('/register',(req, res)=> {register.handleRegister(req, res, db, bcrypt)}) //dependency injection
// profile:
app.get('/profile/:id',(req, res)=> {profile.handleProfileGet(req, res, db)})
// image: (for updating entries)
app.put('/image', (req, res)=> {image.handleImage(req, res, db)})
app.post('/imageUrl', (req, res)=> {image.handleApiCall(req, res)})

app.listen(process.env.PORT || 3001, ()=>{
	console.log(`server is running on PORT ${process.env.PORT}`)
}); //server running on port 3001

/*
END_POINTS:
signin--> POST via body>
register--> POST via body
pofile/user id: GET --> user
image-->PUT ==>user
*/