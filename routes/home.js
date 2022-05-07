const express = require('express')
const route = express.Router()

route.get('/',(req, res) => {
        res.render('pages/home')
})

route.get('/logout',(req, res) => {
        req.session.u_id = null
        req.flash('success','Successfully logout')
        res.redirect('/login')
})

module.exports=route
