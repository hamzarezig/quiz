module.exports.isLoggedIn = (req,res,next) => {
	if(req.session.u_id){
		next()
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
