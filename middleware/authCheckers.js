const { json } = require('express/lib/response')
const User = require('../models/user')

module.exports.isLoggedIn = (req,res,next) => {
	if(req.session.u_id){
		next()
	}
	else {
		req.flash('error','You have to login first')
		res.redirect('/login')
	}
}

module.exports.isAdmin = async (req,res,next) => {
	if(req.session.u_id){
		let user = await User.findById(req.session.u_id)
		if(user.isAdmin){
			next()
		}
		else{
			req.flash('error','You are not admin')
			res.redirect('/')
		}
	}
	else {
		req.flash('error','You have to login first')
		res.redirect('/login')
	}
}

module.exports.isNotLoggedIn = (req,res,next) => {
	if(!req.session.u_id){
		next()
	}
	else {
		req.flash('error','You already logged in')
		res.redirect('/')
	}
}
