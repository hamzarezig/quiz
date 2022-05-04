const emailvalidator = require("email-validator");
const User = require('../models/user')

module.exports.isValidRegisterForm = (req,res,next) => {
	let email = req.body.password;
	let username = req.body.username;
	let password = req.body.password;
	if(username&&password&&email){
		if(username.replace(/\s+/g, '')!==''&&email.replace(/\s+/g, '')!==''){
			if(emailvalidator.validate(req.body.email)){
				if(/^[a-zA-Z0-9_]{3,15}$/.test(username)){
					next()
				} else {
					req.flash('error','Username must be AlphaNumeric (Letters or Numbers), Underscore and must contain 3 to 15 characters')
					res.redirect('/register')
				}
			} else {
				req.flash("error",'Give a valid email')
				res.redirect('/register')
			}
		} else {
			req.flash("error",'Form must not be empty')
			res.redirect('/register')
		}
	} else {
		req.flash("error",'Form must not be empty')
		res.redirect('/register')
	}
	
}

module.exports.usernameAndEmailNotInUse = async (req,res,next) => {
	u_user = await User.find({username:req.body.username})
	e_user = await User.find({email:req.body.email})
	if(e_user.length&&e_user[0].email||u_user.length&&u_user[0].username){
		req.flash('error','Email or username are alredy in use')
        res.redirect('/register')
	}
	else {
		next()
	}
}

module.exports.isValidLoginForm = (req,res,next) => {
	next()
}

module.exports.usernameAndPasswordCorrect = (req,res,next) => {
	next()
}
