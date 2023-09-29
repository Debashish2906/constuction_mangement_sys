const express=require('express');
const Router = require('./router/user');
const morgan=require('morgan')
const mongoose=require('mongoose')
const app=express();
const dotenv=require('dotenv').config();
const bodyparser=require('body-parser');
const cors=require('cors');
const fileupload=require('express-fileupload');
app.use(cors());
app.use(express.json());
const port=process.env.PORT||3000;
app.use(morgan('dev'));
app.use(bodyparser.json());
app.use(fileupload({useTempFiles:true}));
app.use("/user",Router);

const db=process.env.DB_URL.replace('<password>',process.env.DB_PASSWORD);
mongoose.set('strictQuery', false);
mongoose.connect(db,  {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(()=>{
  console.log('DB connection is successfull!');
}).catch(err=>console.log(err));



app.listen(port,()=>{
  console.log(`app is running on ${port}`);
})