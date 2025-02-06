const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema ({
    name:{
        type:String,
        required:[true, "Please provide name"],
        minlength:3,
        maxlength:50

    },
   
    department:{
        type:String,
        required:[true, "Please provide department"],
        maxlength:50
    },
    position:{
        type:String,
        required:[true, "Please provide position"],
        maxlength:50
    },
    email:{
        type:String,
        required:[true, "Please provide email"],
       unique:true,
       validate:{
        validator: validator.isEmail,
        message:"Please provide valid email"
       }
    },
    password:{
        type:String,
        required:[true, "Please provide password"],
        minlength:3
    },
    role:{
        type:String,
        enum:['user', 'manager', 'IT staff', 'supervisor'],
        default:'user'
    }
},
{timestamps:true})

    userSchema.pre('save', async function () {
        if(!this.isModified('password')) return
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)

    })
    userSchema.methods.comparePassword = async function (candidatePassword){
  const isMatch = await bcrypt.compare(candidatePassword, this.password)
  return isMatch
    }




module.exports = mongoose.model('User', userSchema) 
