const express = require('express')
const route = express.Router()
const authCheckers = require('../middleware/authCheckers')
const quiz = require('../models/quiz')
const user = require('../models/user')

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
                userAn = await user.findById(req.session.u_id)
                alreadyAnswered=false
                for(ques of userAn.answered){
                        if(ques.id==fullQuiz._id){
                                alreadyAnswered=true
                        }
                }
		res.render('pages/quiz',{ fullQuiz:fullQuiz, alreadyAnswered:alreadyAnswered})
})

route.post('/quiz',
	authCheckers.isLoggedIn,
	async (req,res) => {
		fullQuiz = await quiz.findById(req.body.id)
                for(ques of fullQuiz.questions){
                       if(ques.correct===req.body.answers[ques._id]) console.log('correct') 
                }
                userAfter = await user.findByIdAndUpdate(req.session.u_id,
                        { $push: { answered: {
                                 id :req.body.id,
                                 answeres:req.body.answers
                                } } })
                console.log(req.body)
		res.render('pages/quiz',{ fullQuiz })
})

module.exports=route
