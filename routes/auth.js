const express = require('express')
const route = express.Router()
const authFormMiddlewares = require('../middleware/authFormMiddlewares')
const User = require('../models/user')
const authCheckers = require('../middleware/authCheckers')

route.get('/register',
        authCheckers.isNotLoggedIn,
        (req,res) => {
        	res.render('pages/register')
})
route.post('/register',
        authCheckers.isNotLoggedIn,
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

route.get('/login',
        authCheckers.isNotLoggedIn,
        (req,res) => {
        	res.render('pages/login')
})
route.post('/login',
        authCheckers.isNotLoggedIn,
	authFormMiddlewares.isValidLoginForm,
        authFormMiddlewares.usernameAndPasswordCorrect,
        async (req, res) => {
		try{
			let username = req.body.username
			user = await User.find({username:username})
			req.session.u_id=user[0]._id
			req.flash('success','Welcome back ,you logged in successfully')
			res.redirect('/')
		}
                catch (e) {
			req.flash('error','opps ,server error during opperation try again later')
			res.redirect('/login')
		}
	})

module.exports=route
