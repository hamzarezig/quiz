const express = require('express')
const ejsMate = require('ejs-mate')
const mongoose = require('mongoose')
const flash = require('connect-flash')
const session = require('express-session')
const authFormMiddlewares = require('./middleware/authFormMiddlewares')
const User = require('./models/user')
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

app.get('/', (req, res) => {
	res.render('pages/home')
})

app.get('/login', (req, res) => {
	res.render('pages/login')
})

app.get('/register', (req, res) => {
	res.render('pages/register')
})

app.post('/register',
	authFormMiddlewares.isValidRegisterForm,
	authFormMiddlewares.usernameAndEmailNotInUse,
	async (req, res) => {
		try {
			newUser = await User.create({
				username: req.body.username,
				email: req.body.email,
				password: req.body.password
			})
			req.flash('success', `You successfully singed up as ${newUser.username},now you can sign in`)
			res.redirect('/login')
		}
		catch (e) {
			console.log(e);
			req.flash('error', 'oops ,an error in the server try again later ')
			res.redirect('/register')
		}
	})

app.post('/login',
	authFormMiddlewares.isValidLoginForm,
	authFormMiddlewares.usernameAndPasswordCorrect,
	(req, res) => {
		res.send('work')
})
app.listen(3000, () => {
	console.log('Server is working on http://localhost:3000')
})
