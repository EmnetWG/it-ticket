const express = require('express')
const router = express.Router()
const { authenticateUser,
authorizePermission } = require('../middlewares/authentication')
const { getSingleUser, 
    getAllUsers, 
    updateUser,
updatePassword,
updateRole,
showCurrentUser,
getITStaffs } = require('../controllers/userController')

router.get('/', authenticateUser, authorizePermission('supervisor'), getAllUsers)
router.get(`/ITStaff`, authenticateUser, authorizePermission('supervisor'), getITStaffs)
router.get(`/showMe`, authenticateUser, showCurrentUser);
router.get(`/:id`, authenticateUser, getSingleUser)
router.patch('/updatePassword', authenticateUser, updatePassword) 
router.patch(`/:id`, authenticateUser, updateUser)

router.patch(`/:id/updateRole`, authenticateUser, authorizePermission('supervisor'), updateRole)

module.exports = router