const {isValidToken} = require('../utils/jwt')

const UnauthorizedError = require('../errors/unauthorized')
const UnauthenticatedError = require('../errors/unauthenticated')

const authenticateUser = async (req, res, next) => {
    const authHeader = req.headers.authorization
    
  //console.log(authHeader)
   if (!authHeader?.startsWith('Bearer')) {
        throw new UnauthenticatedError('Authentication Invalida')
    }
   let token = authHeader.split(' ')[1]
//console.log(token)
    try
    {
const {userId, name, role} = isValidToken({token})
req.user = {name, userId, role}





next ()
    }
    catch(error) 
    {
throw new UnauthenticatedError("Authentication Invalidd")
    }
}

const authorizePermission = (...roles) => {
    return (req, res, next) => {
if(!roles.includes(req.user.role)){
    throw new UnauthorizedError("Unauthorized to access this route")

}
next ()
    }

}

module.exports = {
    authenticateUser,
    authorizePermission
}
