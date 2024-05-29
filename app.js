require('dotenv').config()
require('express-async-errors')

//security packages
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')

const express = require('express')
const app = express ()

const connectDB = require('./db/connect')

const authRouter = require('./routes/authRouter')
const userRouter = require('./routes/userRouter')
const ticketRouter = require('./routes/ticketRouter')
const categoryRouter = require('./routes/categoryRouter')
const subCategoryRouter = require('./routes/subCategoryRouter')

const errorHandlerMiddleware = require('./middlewares/error-handler')
const notFoundMiddleware = require('./middlewares/not-found')

app.use(express.static('./public'));

app.set('trust proxy', 1)
app.use(rateLimiter(
  {
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window`
  }
))
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xss())


app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/tickets', ticketRouter)
app.use('/api/v1/category', categoryRouter)
app.use('/api/v1/subCategory', subCategoryRouter)

app.use(errorHandlerMiddleware)
app.use(notFoundMiddleware)

const port = process.env.PORT || 3000

const start = async( ) => {
try {
await connectDB(process.env.MONGO_URI)
app.listen(port, () =>{
  console.log(`Server is listening on port ${port}`)  
})
}
catch(error)
{
    console.log(error)
}
}

start ()
