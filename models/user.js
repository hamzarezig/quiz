const mongoose = require('mongoose')

UserSchema = new mongoose.Schema({
	username:{
		type:String,
		required:true,
		unique:true
	},
	email:{
		type:String,
		required:true,
		unique:true
	},
	password:{
		type:String,
		required:true
	},
	answered: [{
		id:{
			type:mongoose.Schema.ObjectId,
			required:true
		},
		answeres:{
			type:Object,
			required:true
		}
	}],
	isAdmin:{
		type:Boolean,
		required:true,
		default:false
	}
})

module.exports = mongoose.model('User',UserSchema)
