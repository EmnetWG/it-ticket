const mongoose = require('mongoose')
const SubCategory = require('./SubCategory')

const ticketSchema = mongoose.Schema({
    subject:{
        type:String,
        required:[true, 'Please provide description']
    },
    department:{
        type:String,
        required:[true, "Please provide department"]
    },
    location:{
        type:String,
        required:false

    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true

    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:true
    },
    subCategory:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'SubCategory',
        required:false
    },
    approval:{
        type:String,
        enum:['approved', "not approved", 'pending'],
        default:'pending',
        required:true
    },
    approvedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
       // required:false
    },
    assignedTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
       // required:false
    },
    status:{
        type:String,
        required:true,
        enum:['pending', 'accepted', 'resolved'],
        default:'pending'
    },
    ticketImage:{
        type:String,
        default:'public/upload/example.png'
    },
    remark:{
        type:String,
        required:false
    }

},
{timestamps:true})

ticketSchema.pre('save', async function (next) {
    if (this.subCategory) {
      try {
        const check = await SubCategory.findById(this.subCategory);
        if (!check || JSON.stringify(check.category) !== JSON.stringify(this.category)) {
          throw new Error('Check your Category and/or SubCategory');
        }
      } catch (error) {
        throw error;
      }
    }
    next();
  });

module.exports = mongoose.model('Ticket', ticketSchema)