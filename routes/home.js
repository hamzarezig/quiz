const express = require('express')
const route = express.Router()
const authCheckers = require('../middleware/authCheckers')

route.get('/',
        authCheckers.isLoggedIn,
        (req, res) => {
                res.render('pages/home')
})

route.get('/logout',
        authCheckers.isLoggedIn,
        (req, res) => {
                req.session.u_id = null
                req.flash('success','Successfully logout')
                res.redirect('/login')
})

module.exports=route
