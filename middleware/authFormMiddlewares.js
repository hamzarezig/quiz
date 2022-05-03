const emailvalidator = require("email-validator");

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
	next()
}

module.exports.usernameAndEmailNotInUse = (req,res,next) => {
	//this is for testing purpeses
	next()
}
