const express = require('express')
const router = express.Router()

const {
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
    getRequestedTickets,
    showStaffStats,
    showAllStats,
    showStaffDetail,
    showAssignedStats
} = require('../controllers/ticketController')

const {
    authenticateUser,
authorizePermission
} = require('../middlewares/authentication')

router.get('/', authenticateUser, authorizePermission('supervisor'), getAllTickets).post('/', authenticateUser, createTicket)
router.post('/uploadImage', authenticateUser, uploadImage)
router.get('/requestedTickets', authenticateUser, getRequestedTickets)
router.get("/departmentTickets", authenticateUser, authorizePermission('manager'), getDepartmentTickets)
router.get("/assignedTickets", authenticateUser, authorizePermission('IT staff'), getAssignedTickets)
router.get('/staffStats', authenticateUser, authorizePermission('IT staff'), showStaffStats)
router.get('/allStats', authenticateUser, authorizePermission('supervisor'), showAllStats)
router.get('/:id/staffDetail', authenticateUser, authorizePermission('supervisor'), showStaffDetail)
router.get('/assignedStats', authenticateUser, authorizePermission('supervisor'), showAssignedStats)
router.get('/:id', authenticateUser, getSingleTicket).patch('/:id', authenticateUser, updateTicket).delete('/:id', authenticateUser, deleteTicket)
      

router.patch('/:id/updateStatus', authenticateUser, authorizePermission('IT staff'), updateStatus)
router.patch('/:id/assignTicket', authenticateUser, authorizePermission('supervisor'), assignTicket)
router.patch('/:id/updateApproval', authenticateUser, authorizePermission('manager'), updateApproval)
router.patch('/:id/updateRemark', authenticateUser, authorizePermission('IT staff'), updateRemark)


module.exports = router