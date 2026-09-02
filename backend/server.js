require('dotenv').config();
const app = require('./src/app')
const connectDB = require('./src/db/db')

connectDB()


app.listen(3000,()=>{
    console.log("Running on port 3000")
})
