const quiz = require('./models/quiz')
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://hamzarezig:long@quizapp.yplve.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
        .then(() => {
                console.log('Mongodb connected succesfully')
        })
        .catch(e => {
                console.log('Mongodb connection error !!!')
                console.log(e)
        })
quiz.create({
	name:'first quiz',
	questions:[{
		name:'first quiz',
		a:'wrong',
		b:'correct',
		c:'wrong',
		correct:'B'
	}]
})

