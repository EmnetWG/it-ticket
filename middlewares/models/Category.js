const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please provide catagorey"],
       // enum:['Hardware', 'Software', 'Printer', 'Network', 'Other']
    }
})

module.exports = mongoose.model('Category', categorySchema)