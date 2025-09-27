import express from 'express';
import connectDb from './lib/db';


const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());


app.listen(port,()=>{
    console.log("Server is running on port " + port);
    connectDb();
})