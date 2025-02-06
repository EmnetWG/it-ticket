const Ticket = require('../models/Ticket')
const User = require('../models/User')
const Category = require('../models/Category')
const SubCategory = require('../models/SubCategory')

const {StatusCodes} = require('http-status-codes')

const BadRequestError = require('../errors/bad-request')
const UnauthenticatedError = require('../errors/unauthenticated') 
const NotFoundError = require('../errors/not-found')
const moment = require('moment')
const mongoose = require('mongoose')

const getAllTickets = async (req, res) => {
    const tickets = await Ticket.find({}).populate('category', { name: 1, _id:1})
    .populate('createdBy', {name:1, _id:1})
    .populate('approvedBy', {name:1, _id:1})
    .populate('assignedTo', {name:1, _id:1})
    .populate('subCategory', { name: 1, _id:1})
   // const ticketCategory = tickets.category
    //console.log(ticketCategory)
    //const categorys = await Category.find({_id:ticketCategory})
    //console.log(categorys.name)
    //tickets.category = categorys.name
    res.status(StatusCodes.OK).json({tickets})
}

const getRequestedTickets = async (req, res) => {
  const tickets = await Ticket.find({createdBy:req.user.userId})
  .populate('category', { name: 1, _id:1})
  .populate('createdBy', {name:1, _id:1})
  .populate('approvedBy', {name:1, _id:1})
  .populate('assignedTo', {name:1, _id:1})
  .populate('subCategory', { name: 1, _id:1})
 // const ticketCategory = tickets.category
  //console.log(ticketCategory)
  //const categorys = await Category.find({_id:ticketCategory})
  //console.log(categorys.name)
  //tickets.category = categorys.name
  res.status(StatusCodes.OK).json({tickets})
}

const getDepartmentTickets = async (req, res) => {
  const userID = req.user.userId

  const currentUser = await User.findOne({_id:userID})
    const currentDepartment = currentUser.department


    const tickets = await Ticket.find({department:currentDepartment}).populate('category', { name: 1, _id:1})
    .populate('createdBy', {name:1, _id:1})
    .populate('approvedBy', {name:1, _id:1})
    .populate('assignedTo', {name:1, _id:1})
    .populate('subCategory', { name: 1, _id:1})

    res.status(StatusCodes.OK).json({tickets})
}

const getAssignedTickets = async (req, res) => {
    const userID = req.user.userId
    //const{assignedID} = req.params.assignedTicket
    console.log(userID)
    const tickets = await Ticket.find({assignedTo:userID}).populate('category', { name: 1, _id:1})
    .populate('createdBy', {name:1, _id:1})
    .populate('approvedBy', {name:1, _id:1})
    .populate('assignedTo', {name:1, _id:1})
    .populate('subCategory', { name: 1, _id:1})

    res.status(StatusCodes.OK).json({tickets})
}
const getSingleTicket = async (req, res) => {
    const{id:ticketId} = req.params
    const ticket = await Ticket.findOne({_id:ticketId}).populate('category', { name: 1, _id:1})
    .populate('createdBy', {name:1, _id:1})
    .populate('approvedBy', {name:1, _id:1})
    .populate('assignedTo', {name:1, _id:1})
    .populate('subCategory', { name: 1, _id:1})

    if(!ticket) {
        throw new NotFoundError(`No ticket with id : ${req.params.id}`)
    }
    res.status(StatusCodes.OK).json({ticket})
}

const createTicket = async (req, res) => {
    req.body.createdBy = req.user.userId
    const ticket = await Ticket.create(req.body)
    res.status(StatusCodes.CREATED).json({ticket})

}

const updateTicket = async (req, res) => {
    const{id:ticketId} = req.params
    const userID = req.user.userId

const {subject, category, subCategory, 
   department, location
} = req.body

const ticketCategory = await Category.findOne({name:category})
const categoryid = ticketCategory._id
 

if(!subject || !category || !department) {
    throw new BadRequestError('Please provide all values')
}

//const ticket = await Ticket.findByIdAndUpdate({_id:ticketId, createdBy:userID},
 //   req.body,
 //   { new: true, runValidators: true} )
 const ticket = await Ticket.findOne({_id:ticketId, createdBy:userID})
  ticket.subject = subject
  ticket.department = department
  ticket.location = location
    ticket.category = categoryid
    if(subCategory) {
      const ticketSubCategory = await SubCategory.findOne({name:subCategory})
const subCategoryid = ticketSubCategory._id
ticket.subCategory=subCategoryid
    }

if(!ticket) {
    throw new NotFoundError(`No ticket with id : ${req.params.id}`)
}

await ticket.save() 
res.status(StatusCodes.OK).json({ticket})

}

//update status and remark
const updateStatus = async (req, res) => {
const {id:ticketId}= req.params
const {status, remark} = req.body

const ticket= await Ticket.findOne({_id:ticketId})
    if(!ticket) {
        throw new NotFoundError(`No ticket with id : ${req.params.id}`)
    }
    
  ticket.status = status
  ticket.remark = remark
  await ticket.save()  
    res.status(StatusCodes.OK).json({ticket})

}

const assignTicket = async (req, res) => {
    const {id:ticketId}= req.params
    let {assignedTo} = req.body
    //console.log(req.body)
    const ticket= await Ticket.findOne({_id:ticketId})
        if(!ticket) {
            throw new NotFoundError(`No ticket with id : ${req.params.id}`)
        }
       const user = await User.findOne({name:assignedTo})
       //console.log(user)
       assignedTo = user._id
        ticket.assignedTo = assignedTo
     
      await ticket.save()  
        res.status(StatusCodes.OK).json({ticket})
    
    }

const updateApproval = async (req, res) => {
    const {id:ticketId}= req.params
    const {approval} = req.body
    const userID = req.user.userId
    console.log(userID)
    const ticket= await Ticket.findOne({_id:ticketId})
        if(!ticket) {
            throw new NotFoundError(`No ticket with id : ${req.params.id}`)
        }
        
      ticket.approval = approval
      ticket.approvedBy = userID
      await ticket.save()  
        res.status(StatusCodes.OK).json({ticket})
    
    }

    const updateRemark = async (req, res) => {
        const {id:ticketId}= req.params
        const {remark} = req.body
        
        const ticket= await Ticket.findOne({_id:ticketId})
            if(!ticket) {
                throw new NotFoundError(`No ticket with id : ${req.params.id}`)
            }
            
          ticket.remark = remark
          
          await ticket.save()  
            res.status(StatusCodes.OK).json({ticket})
        
        }

const deleteTicket = async (req, res) => {
    const{id:ticketId} = req.params
    const {userID} = req.user.userId
    const ticket = await Ticket.findByIdAndDelete({_id:ticketId, createdBy:userID})

    if(!ticket) {
        throw new NotFoundError(`No ticket with id: ${req.params.id}`)
    }
    res.status(StatusCodes.OK).send();
}

const uploadImage = async (req, res) => {
    if (!req.files) {
      throw new CustomError.BadRequestError('No File Uploaded');
    }
    const ticketImage = req.files.image;
  
    if (!ticketImage.mimetype.startsWith('image')) {
      throw new CustomError.BadRequestError('Please Upload Image');
    }
  
    const maxSize = 1024 * 1024;
  
    if (ticketImage.size > maxSize) {
      throw new CustomError.BadRequestError(
        'Please upload image smaller than 2MB'
      );
    }
  
    const imagePath = path.join(
      __dirname,
      '../public/uploads/' + `${ticketImage.name}`
    );
    await mage.mv(imagePath);
    res.status(StatusCodes.OK).json({ image: `/uploads/${ticketImage.name}` });
  };

  const showAllStats = async (req, res) => {
    let stats = await Ticket.aggregate([
      //{ $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);
  
    stats = stats.reduce((acc, curr) => {
      const { _id: title, count } = curr;
      acc[title] = count;
      return acc;
    }, {});
  
    const defaultStats = {
      pending: stats.pending || 0,
      accepted: stats.accepted || 0,
      resolved: stats.resolved || 0,
    };
  
   let monthlyApplications = await Ticket.aggregate([
    {
      $lookup:
        {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "categoryname"
        }
   },
     
   { $match: { status: 'resolved' } },
      {
        $group: {
          _id: { category:'$categoryname.name', year: { $year: '$createdAt' }, month: { $month: '$createdAt' },
      
       },
          count: { $sum: 1 },
        },
      },
      
     
      { $sort: { '_id.year': -1, '_id.month': -1 } },
      
      
    ]);

    //await Category.populate(monthlyApplications, {path:"category", select:{name:1} })
  
    monthlyApplications = monthlyApplications
      .map((item) => {
        const {
          _id: { year, month, category},
          count,
        } = item;
        const date = moment()
          .month(month - 1)
          .year(year)
          .format('MMM Y');
        return { date, category, count
        };
      })
      .reverse();
  
    res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
  };
////StaffStats
  const showStaffStats = async (req, res) => {
    let stats = await Ticket.aggregate([
      { $match: { assignedTo: new mongoose.Types.ObjectId(req.user.userId)  } },
     // { $match: { assignedTo: req.user.userId } },
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);
  
    stats = stats.reduce((acc, curr) => {
      const { _id: title, count } = curr;
      acc[title] = count;
      return acc;
    }, {});
   
    const defaultStats = {
      pending: stats.pending || 0,
      accepted: stats.accepted || 0,
      resolved: stats.resolved || 0,
    };
  
    let monthlyApplications = await Ticket.aggregate([
      {
        $lookup:
          {
            from: "categories",
            localField: "category",
            foreignField: "_id",
            as: "categoryname"
          }
     },

      { $match: { assignedTo: new mongoose.Types.ObjectId(req.user.userId), status:'resolved'  } },
      {
        $group: {
          _id: { category:'$categoryname.name', year: { $year: '$createdAt' }, month: { $month: '$createdAt' },
            },
          count: { $sum: 1 },
        },
      },
      { $sort: { '_id.year': -1, '_id.month': -1 } },
      
    ]);
  
    monthlyApplications = monthlyApplications
      .map((item) => {
        const {
          _id: { year, month, category },
          count,
        } = item;
        const date = moment()
          .month(month - 1)
          .year(year)
          .format('MMM Y');
        return { date, category, count };
      })
      .reverse();
  
    res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
  };
///
const showStaffDetail = async (req, res) => {
  let stats = await Ticket.aggregate([
    { $match: { assignedTo: new mongoose.Types.ObjectId(req.params.id) } },
   // { $match: { assignedTo: req.user.userId } },
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ]);

  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});
 
  const defaultStats = {
    pending: stats.pending || 0,
    accepted: stats.accepted || 0,
    resolved: stats.resolved || 0,
  };

  let monthlyApplications = await Ticket.aggregate([
    {
      $lookup:
        {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "categoryname"
        }
   },

    { $match: { assignedTo: new mongoose.Types.ObjectId(req.params.id), status:'resolved'  } },
    {
      $group: {
        _id: { category:'$categoryname.name', year: { $year: '$createdAt' }, month: { $month: '$createdAt' },
          },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } },
    
  ]);

  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month, category },
        count,
      } = item;
      const date = moment()
        .month(month - 1)
        .year(year)
        .format('MMM Y');
      return { date, category, count };
    })
    .reverse();

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};
///////
  const showAssignedStats = async (req, res) => {
    let stats = await Ticket.aggregate([
      //{ $match: { department: mongoose.Types.ObjectId(req.user.department) } },
      { $group: { _id:{ status:'$status', assignedTo:'$assignedTo', count: { $sum: 1 } } } },
    ]);
  
    stats = stats.reduce((acc, curr) => {
      const { _id: title, count } = curr;
      acc[title] = count;
      return acc;
    }, {});
   console.log(stats)
    const defaultStats = {
      pending: stats.pending || 0,
      accepted: stats.accepted || 0,
      resolved: stats.resolved || 0,
    };
  
    let monthlyApplications = await Ticket.aggregate([
      //{ $match: { department: mongoose.Types.ObjectId(req.user.department) } },
      {
        $group: {
          _id: { category:'$category', assignedTo:'$assignedTo', year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { '_id.year': -1, '_id.month': -1 } },
      
    ]);
  
    monthlyApplications = monthlyApplications
      .map((item) => {
        const {
          _id: { year, month, assignedTo, category },
          count,
        } = item;
        const date = moment()
          .month(month - 1)
          .year(year)
          .format('MMM Y');
        return { assignedTo, date, category, count };
      })
      .reverse();
  
    res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
  };

module.exports = {
    getAllTickets,
    getSingleTicket,
    createTicket,
    updateTicket,
    deleteTicket,
    updateStatus,
    assignTicket,
    updateApproval,
    updateRemark,
    uploadImage,
    getDepartmentTickets,
    getAssignedTickets,
    showAllStats,
    showStaffStats,
    showAssignedStats,
    showStaffDetail,
    getRequestedTickets
}
