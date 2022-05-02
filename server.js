const express = require('express')
const ejsMate = require('ejs-mate')
const mongoose = require('mongoose')
const emailvalidator = require("email-validator");
const app = express()

//those middleware will be deleted later
const isValidRegisterForm = (req,res,next) => {
	let email = req.body.password;
	let username = req.body.username;
	let password = req.body.password;
	if(username&&password&&email){
		if(username.replace(/\s+/g, '')!==''&&email.replace(/\s+/g, '')!==''&&password.replace(/\s+/g, '')!==''){
			if(emailvalidator.validate(req.body.email)){
				if(/^[a-zA-Z0-9_]{3,15}$/.test(username)){
					next()
				} else {
					res.send('Username must be AlphaNumeric (Letters or Numbers), Underscore and must contain 3 to 15 characters')
				}
			} else {
				res.send('Give a valid email')
			}
		} else {
			res.send('Form must not be empty')
		}
	} else {
		res.send('Form must not be empty')
	}
	next()
}

const usernameAndEmailNotInUse = (req,res,next) => {
	//this is for testing purpeses
	next()
}

mongoose.connect('mongodb+srv://hamzarezig:long@quizapp.yplve.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
.then(() => {
	console.log('Mongodb connected succesfully')
})
.catch(e => {
	console.log('Mongodb connection error !!!')
	console.log(e)
})

app.engine('ejs',ejsMate)

app.set('views',__dirname+'/templates')
app.set('view engine','ejs')

app.use(express.urlencoded({extended:true}))
app.use(express.static('static'))

app.get('/',(req,res) => {
	res.render('pages/home')
})

app.get('/login',(req,res) => {
	res.render('pages/login')
})

app.get('/register',(req,res) => {
	res.render('pages/register')
})

app.post('/register',isValidRegisterForm,usernameAndEmailNotInUse,(req,res) => {
	//
	res.send('work')
})

app.listen(3000,() => {
	console.log('Server is working on http://localhost:3000')
})
