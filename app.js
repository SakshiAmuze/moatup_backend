import express from 'express';
import bodyParser from 'body-parser';
import 'dotenv/config';
import cors from 'cors';
import dbconnection from './database/mongodb.js';
import userRoute from './Routes/userRoutes.js';


dbconnection()
.then((res)=>{
    console.log("db connected");
    // console.log(res);
    
    
})
.catch((err) =>{
 console.log("error", err);
 
})


// Initialize Express app
const app = express();

// CORS configuration
const corsOptions = {
    origin: 'http://localhost:3000',  // Allow requests from this origin (your frontend)
    credentials: true,  // Allow credentials such as cookies, authorization headers
};

// Apply CORS middleware with the defined options
app.use(cors(corsOptions));

// Other middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/user", userRoute);

app.listen(process.env.port, function () {
    console.log("app started");

});


