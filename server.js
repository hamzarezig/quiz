const express = require('express')
const ejsMate = require('ejs-mate')
const mongoose = require('mongoose')
const res = require('express/lib/response')
const app = express()

mongoose.connect('mongo://hamzarezig:long@quizapp.yplve.mongodb.net/QuizApp')
.then(() => {
	console.log('work')
})
.catch(() => {
	console.log('no');
})

app.engine('ejs',ejsMate)

app.set('views',__dirname+'/templates')
app.set('view engine','ejs')

app.use(express.static('static'))

app.get('/',(req,res) => {
	res.render('pages/home')
})

app.get('/login',(req,res) => {
	res.render('pages/login')
})

app.listen(3000,() => {
	console.log('Server is working on http://localhost:3000')
})
