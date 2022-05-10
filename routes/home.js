const express = require('express')
const route = express.Router()
const authCheckers = require('../middleware/authCheckers')
const quizCheckers = require('../middleware/quizCheckers')
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
	quizCheckers.validId,
	quizCheckers.notAnswered,
	async (req,res) => {
		fullQuiz = await quiz.findById(req.query.id)
                userAn = await user.findById(req.session.u_id)
                alreadyAnswered=false
                for(ques of userAn.answered){
                        if(ques.id.equals(fullQuiz._id)){
                                alreadyAnswered=true
                        }
                }
		res.render('pages/quiz',{ fullQuiz:fullQuiz, alreadyAnswered:alreadyAnswered})
})

route.post('/quiz',
	authCheckers.isLoggedIn,
	quizCheckers.validAnswerForm,
	quizCheckers.notAnsweredPost,
	async (req,res) => {
		fullQuiz = await quiz.findById(req.body.id)
		//this for loop for point countong but still in dev
                for(ques of fullQuiz.questions){
                       if(ques.correct===req.body.answers[ques._id]) console.log('correct')
                }
                userAfter = await user.findByIdAndUpdate(req.session.u_id,
                        { $push: { answered: {
                                 id :req.body.id,
                                 answeres:req.body.answers
                                } } })
                console.log(req.body)
		//res.render('pages/quiz',{ fullQuiz })
		req.flash('success','You answered quiz succesfully')
		res.redirect('/')
})

module.exports=route
