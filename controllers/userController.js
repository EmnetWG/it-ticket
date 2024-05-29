//const CustomError = require('../errors')
const User = require('../models/User')
const BadRequestError = require('../errors/bad-request')
const UnauthenticatedError = require('../errors/unauthenticated')
const NotFoundError = require('../errors/not-found')
const {StatusCodes} = require('http-status-codes')
//const {UnauthenticatedError, BadRequestError} = require('../errors')
const mongoose = require('mongoose');

const {createJWT} = require('../utils/jwt')

const getAllUsers = async(req, res) => {
    const { search, role } = req.query;
    const queryObject = {
        
      };
    if (search) {
        queryObject.name = { $regex: search, $options: 'i' };
      }

      if (role) {
        queryObject.role = role;
      }

      let result = User.find(queryObject);
      const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const users = await result;

  const totalUsers = await User.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalUsers / limit);

  res.status(StatusCodes.OK).json({ users, totalUsers, numOfPages });
    //const users = await User.find({})
    //res.status(StatusCodes.OK).json({users})
}

const getSingleUser = async(req, res) => {
   const {id:userId} = req.params
    const user = await User.findById({_id:userId})
    if(!user) {
        throw new NotFoundError(`No user with id : ${req.params.id}`)
    }
    res.status(StatusCodes.OK).json({user})
}

const updateUser = async(req, res) => {
const {name, department, position,
email
} = req.body
if((!name) || (!department)
||(!position) || (!email))
{
    throw new BadRequestError("Please provide all")
}
const user = await User.findOne({_id:req.user.userId}
)

user.name = name,
//user.lastname = lastname,
user.department = department,
user.position = position,
user.email = email
await user.save()

const tokenUser = {name: user.name, userId: user._id, role: user.role}
const token = createJWT({payload:tokenUser})
res.status(StatusCodes.OK).json({user})
}

const updatePassword = async (req, res) => {
    const {oldPassword, newPassword} = req.body
    if(!oldPassword || !newPassword) {
        throw new BadRequestError("Please provide all values")
    }
    const user = await User.findOne({_id:req.user.userId})
    const isCorrect = await user.comparePassword(oldPassword)
    
    if(!isCorrect) {
throw new UnauthenticatedError("Invalid Credentials")
    }
    user.password = newPassword
    await user.save()
    res.status(StatusCodes.OK).json({msg: "Update is successful"})

}

const updateRole = async (req, res) => {
    const {id:userId} = req.params
    const {role} = req.body
    if(!role) {
        throw new BadRequestError("Please provide the value")
    }
    const user = await User.findOne({_id:userId})
    
    user.role = role
    await user.save()
    res.status(StatusCodes.OK).json({msg: "Update is successful"})

}

const getITStaffs = async (req, res) => {
    const users = await User.find({role:'IT staff'})
    res.status(StatusCodes.OK).json({users}) 
}

const showCurrentUser = async (req, res) => {
   // const user=req.user
   // const {id:userID} = user._id
    res.status(StatusCodes.OK).json({ user:req.user });
  };

module.exports = {
    getAllUsers,
    getSingleUser,
    updateUser,
    updatePassword,
    updateRole,
    getITStaffs,
    showCurrentUser
}