require('dotenv').config()
require('express-async-errors')

const helmet  = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')

const swaggerUI = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDocument = YAML.load('./swagger.yaml')

const express = require('express')
const app = express()
const connectDB = require('./db/connect')
const authUser = require('./middleware/authentication')
const port = process.env.PORT || 3000;

app.set('trust proxy',1)
app.use(rateLimiter({
  windowMs:15 * 60 * 1000,//15minutes
  max:100 //limit each IP to 100 request per windowMs
}))
app.use(express.json())
// extra packages
app.use(helmet())
app.use(cors())
app.use(xss())

app.get('/',(req,res)=>{
  res.send('<h1>Jobs API</h1><a href="/api-docs">Documentation</a>')
})

// routes
app.use('/api/v1/',require('./routes/auth'))
app.use('/api/v1/jobs',authUser,require('./routes/jobs'))
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerDocument))

app.use(require('./middleware/not-found'))
app.use(require('./middleware/error-handler'))


const start = async () => {
  try {
    connectDB(process.env.DATABASE_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
