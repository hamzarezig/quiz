const express = require('express')
const ejsMate = require('ejs-mate')
const mongoose = require('mongoose')
const app = express()
mongoose.Promise = global.Promise


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
