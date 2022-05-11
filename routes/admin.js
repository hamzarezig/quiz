const express = require('express')
const route = express.Router()
const authCheckers = require('../middleware/authCheckers')

route.get('/',
    authCheckers.isAdmin,
    (req,res) => {
        res.render('pages/admin')
})
module.exports = route