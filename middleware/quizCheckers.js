const ObjectId = require('mongoose').Types.ObjectId;
const Quiz = require('../models/quiz')
const User = require('../models/user')

module.exports.validId = async (req,res,next) => {
	if(req.query.id&&ObjectId.isValid(req.query.id)){
		//must be in try catch block later
		quiz = await Quiz.findById(req.query.id)
		if(quiz&&Object.keys(quiz).length!==0){
			next()
		}
		else {
			req.flash('error','Quiz not found ,maybe it\'s deleted')
			res.redirect('/')
		}
	}
	else {
		req.flash('error','Not a valid quiz id ')
		res.redirect('/')
	}

}

module.exports.notAnswered = async (req,res,next) => {
	user = await User.findById(req.session.u_id)
	let isAnswered=false
	for(i of user.answered){
		if(i.id==req.query.id){
			isAnswered |=true
		}
	}
	if(!isAnswered){
		next()
	}
	else {
		req.flash('error','You already answered the quiz')
		res.redirect('/')
	}
}

module.exports.notAnsweredPost = async (req,res,next) => {
        user = await User.findById(req.session.u_id)
        let isAnswered=false
        for(i of user.answered){
                if(i.id==req.body.id){
                        isAnswered |=true
                }
        }
        if(!isAnswered){
                next()
        }
        else {
                req.flash('error','You already answered the quiz')
                res.redirect('/')
        }
}

module.exports.validAnswerForm = async (req,res,next) => {
	let isValid=true
	if(req.body.id&&ObjectId.isValid(req.body.id)&&req.body.answers){
		quiz = await Quiz.findById(req.body.id)
		if(quiz&&Object.keys(quiz).length!==0){
			for(ques of quiz.questions){
				if(['A','B','C'].includes(req.body.answers[ques.id])){
					isValid &= true
				}
				else {
					isValid &= false
				}
			}
			if (isValid){
				next()
			}
			else{
				req.flash('error','Not a valid form, please answer all the questions')
				res.redirect('/')
			}
		}
		else {
			res.flash('error','Quiz not found')
			res.redirect('/')
		}
	}
	else {
		req.flash('error','Not a valid form')
		res.redirect('/')
	}
}

module.exports.notAnsweredPost = async (req,res,next) => {
        user = await User.findById(req.session.u_id)
        let isAnswered=false
	for(i of user.answered){
                if(i.id==req.body.id){                                                                                                       isAnswered |=true                                                                                             }                                                                                                             }
        		if(!isAnswered){
                		next()
        		}
        else {
                req.flash('error','You already answered the quiz')
                res.redirect('/')
        }
}

