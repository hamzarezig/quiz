const express = require('express')
const route = express.Router()
const authCheckers = require('../middleware/authCheckers')
const quiz = require('../models/quiz')
route.get('/',
        authCheckers.isLoggedIn,
        async (req, res) => {
		quizList = await quiz.find()
                res.render('pages/home',{quizList})
})

route.get('/logout',
        authCheckers.isLoggedIn,
        (req, res) => {
                req.session.u_id = null
                req.flash('success','Successfully logout')
                res.redirect('/login')
})

route.get('/quiz',
	authCheckers.isLoggedIn,
	async (req,res) => {
		fullQuiz = await quiz.findById(req.query.id)
		res.render('pages/quiz',{ fullQuiz })
})

module.exports=route
