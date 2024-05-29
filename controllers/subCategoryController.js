const Ticket = require('../models/Ticket')
const User = require('../models/User')
const Category = require('../models/Category')
const SubCategory = require('../models/SubCategory')

const {StatusCodes} = require('http-status-codes')

const BadRequestError = require('../errors/bad-request')
const UnauthenticatedError = require('../errors/unauthenticated') 
const NotFoundError = require('../errors/not-found')

const getAllSubCategory = async (req, res) => {
    const categorys = await SubCategory.find({})
    res.status(StatusCodes.OK).json({categorys})
}

const getAllSubCategoryAndName = async(req, res)=>{
    const categorys = await SubCategory.find({}).populate('category', { name: 1, _id:1})
    res.status(StatusCodes.OK).json({categorys})
}
const createSubCategory = async (req, res) => {
    
    const category = await SubCategory.create(req.body)
    res.status(StatusCodes.CREATED).json({category})

}

const updateSubCategory = async (req, res) => {
    const{id:subCategoryId} = req.params
    

const {name, category} = req.body

if(!name || !category) {
    throw new BadRequestError('Please provide the value')
}

const categorys = await SubCategory.findByIdAndUpdate({_id:subCategoryId},
    req.body,
    { new: true, runValidators: true} )

if(!categorys) {
    throw new NotFoundError(`No category with id : ${req.params.id}`)
}


res.status(StatusCodes.OK).json({categorys})

}

const getSingleSubCategory = async (req, res) => {
    const{id:subCategoryId} = req.params
    const subCategory = await SubCategory.findOne({_id:subCategoryId})

    if(!subCategory) {
        throw new NotFoundError(`No subCategorey with id : ${req.params.id}`)
    }
    res.status(StatusCodes.OK).json({subCategory})
}

const deleteSubCategory = async (req, res) => {
    const{id:subCategoryId} = req.params
    
    const category = await SubCategory.findByIdAndDelete({_id:subCategoryId})

    if(!category) {
        throw new NotFoundError(`No sub category with id: ${req.params.id}`)
    }
    res.status(StatusCodes.OK).send();
}

module.exports = {
    getAllSubCategory,
    createSubCategory,
    updateSubCategory,
    deleteSubCategory,
    getSingleSubCategory,
    getAllSubCategoryAndName
}