const express=require("express");
require('dotenv').config();
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const cookieParser = require('cookie-parser');
const app=express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}))
const cors=require("cors")
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
const db=require("./config/mongoose-connection");
const itemsRouter=require("./routes/itemsRouters.js");
const usersRouter=require("./routes/usersRouters.js")
const ownersRouter=require("./routes/ownersRouters.js")
const ordersRouter=require("./routes/ordersRouters.js");
app.use("/item",itemsRouter)
app.use("/user",usersRouter)
app.use("/master",ownersRouter)
app.use("/order",ordersRouter)
const PORT=process.env.PORT || 3000
const server=app.listen(PORT,()=>{
    console.log(`Server started at port ${server.address().port} `)
})