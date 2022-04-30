const express = require('express')
const ejsMate = require('ejs-mate')
const app = express()


app.engine('ejs',ejsMate)

app.set('views',__dirname+'/templates')
app.set('view engine','ejs')

app.use(express.static('static'))

app.get('/',(req,res) => {
	res.render('pages/home')
})

app.listen(3000,() => {
	console.log('Server is working on http://localhost:3000')
})
