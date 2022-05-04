const express = require('express')
const ejsMate = require('ejs-mate')
const mongoose = require('mongoose')
const flash = require('connect-flash')
const session = require('express-session')
const User = require('./models/user')
const authRoutes = require('./routes/auth')
const authCheckers = require('./middleware/authCheckers')
const app = express()

mongoose.connect('mongodb+srv://hamzarezig:long@quizapp.yplve.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
	.then(() => {
		console.log('Mongodb connected succesfully')
	})
	.catch(e => {
		console.log('Mongodb connection error !!!')
		console.log(e)
	})

app.engine('ejs', ejsMate)

app.set('views', __dirname + '/templates')
app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true }))
app.use(express.static('static'))
app.use(session({
	secret: 'thisisdevsecret',
	resave: false,
	saveUninitialized: true
}))
app.use(flash())

app.use((req, res, next) => {
	res.locals.success = req.flash('success')
	res.locals.error = req.flash('error')
	next()
})

app.get('/',authCheckers.isLoggedIn,(req, res) => {
	res.render('pages/home')
})

app.use('/',authCheckers.isNotLoggedIn,authRoutes)

app.listen(3000, () => {
	console.log('Server is working on http://localhost:3000')
})
