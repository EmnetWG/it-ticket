const Ticket = require('../models/Ticket')
const User = require('../models/User')
const Category = require('../models/Category')
const SubCategory = require('../models/SubCategory')

const {StatusCodes} = require('http-status-codes')

const BadRequestError = require('../errors/bad-request')
const UnauthenticatedError = require('../errors/unauthenticated') 
const NotFoundError = require('../errors/not-found')

const getAllCategory = async (req, res) => {
    const categorys = await Category.find({})
    //const categorys = await Category.find({} , '-_id name')
    //const {categoryName} = categorys.name
    res.status(StatusCodes.OK).json({categorys})
}

const getSingleCategory = async (req, res) => {
    const{id:categoryId} = req.params
    const category = await Category.findOne({_id:categoryId})

    if(!category) {
        throw new NotFoundError(`No categorey with id : ${req.params.id}`)
    }
    res.status(StatusCodes.OK).json({category})
}



const createCategory = async (req, res) => {
    
    const category = await Category.create(req.body)
    res.status(StatusCodes.CREATED).json({category})

}

const updateCategory = async (req, res) => {
    const{id:categoryId} = req.params
    

const categorys = req.body

if(!categorys) {
    throw new BadRequestError('Please provide the value')
}

const category = await Category.findByIdAndUpdate({_id:categoryId},
    req.body,
    { new: true, runValidators: true} )

if(!category) {
    throw new NotFoundError(`No category with id : ${req.params.id}`)
}


res.status(StatusCodes.OK).json({category})

}

const deleteCategory = async (req, res) => {
    const{id:categoryId} = req.params
    
    const category = await Category.findByIdAndDelete({_id:categoryId})

    if(!category) {
        throw new NotFoundError(`No category with id: ${req.params.id}`)
    }
    res.status(StatusCodes.OK).send();
}

module.exports = {
    getAllCategory,
    createCategory,
    updateCategory,
    deleteCategory,
    getSingleCategory
}