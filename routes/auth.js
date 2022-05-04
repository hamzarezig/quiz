const express = require('express')
const route = express.Router()
const authFormMiddlewares = require('../middleware/authFormMiddlewares')

route.get('/register',(req,res) => {
	res.render('pages/register')
})
route.post('/register',
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

route.get('/login',(req,res) => {
	res.render('pages/login')
})
route.post('/login',
	authFormMiddlewares.isValidLoginForm,
        authFormMiddlewares.usernameAndPasswordCorrect,
        (req, res) => {
                res.send('work')
	})

module.exports=route
