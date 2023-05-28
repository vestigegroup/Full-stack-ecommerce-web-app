const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const helmet = require('helmet')
require('dotenv').config();

const app = express();
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log(`Database connected successfully !`);
  })
  .catch((error) => {
    console.log(`Database connection error : ${error}`);
  });
// Middlewares
app.use(bodyParser.json({ limit: '2mb' }));
app.use(helmet())
app.use(cors())
// Route Middlewares
app.get('/',(req,res)=>res.send("Helloooooooo"))
fs.readdirSync('./routes').map((r) => app.use('/api', require('./routes/' + r)));
// Port
const port = process.env.PORT || 8000;
if(process.env.NODE_ENV=='production'){
  app.use(express.static("client/build/"))
  const path = require('path')
  app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'client','build','index.html'))
  })
}
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(app.get('env'))
});
