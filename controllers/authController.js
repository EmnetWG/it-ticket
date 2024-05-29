//const {createJWT} = require('../utils/jwt')
const User = require('../models/User')

const {createJWT, isValidToken} = require('../utils/jwt')
const {StatusCodes} = require('http-status-codes')
const BadRequestError = require('../errors/bad-request')
const UnauthenticatedError = require('../errors/unauthenticated')

const register = async (req, res) => {
const {name, department, position,
    email, password} = req.body
    //const emailExist = await User.findOne({email})
    //if(emailExist) {
    // throw new BadRequestError("Email already exist")   
    //}
    
    const firstAccount = (await User.countDocuments({})) === 0
    
  
    const role = firstAccount ? 'supervisor': 'user'

    const user = await User.create({name, department, position,
        email, password, role})
        console.log(user)
        const tokenUser = {name: user.name, userId: user._id, role: user.role}
        
        const token = createJWT({payload:tokenUser})

    res.status(StatusCodes.CREATED).json({user:user, token})
}

const login = async (req, res) => {
    const {email, password} = req.body

    if(!email || !password) {
        throw new BadRequestError("Please provide email and password")
    }
    const user = await User.findOne({email})
    if(!user) {
        throw new UnauthenticatedError('Invalid Credentials')
    }

const isMatch = await user.comparePassword(password)
if(!isMatch){
    throw new UnauthenticatedError('Invalid Credentials')
}

const tokenUser = {name: user.name, userId: user._id, role: user.role}
const token = createJWT({payload:tokenUser})
//res.redirect('/dashboard')
 res.status(StatusCodes.OK).json({user:user, token})
}

module.exports = {
    register,
    login
}