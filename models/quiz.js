const mongoose = require('mongoose')

QuizSchema = new mongoose.Schema({
	name:{
		type:String,
		required:true
	},
	questions:[{
		name:{
			type:String,
			required:true
		},
		a:{
			type:String,
			required:true
		},
		b:{
			type:String,
			required:true
		},
		c:{
			type:String,
			required:true
		},
		correct:{
			type:String,
			enum:['A','B','C'],
			required:true
		}
	}]
})

module.exports = mongoose.model('Quiz',QuizSchema)
