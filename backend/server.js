import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/data.js"
import bookRoute from "./src/routes/bookRoute.js";
import path from "path";

dotenv.config();


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
const __dirname = path.resolve();

if(process.env.NODE_ENV !== "production"){ 
//this is a middleware which allow every request from every other URL
if(process.env.CORS === "true"){
   app.use(cors({
      origin: "http://localhost:5173"
   }));
   }
}
app.use("/api/books", bookRoute);

if(process.env.NODE_ENV=== "production"){
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res)=>{
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"))
  })
}


const PORT = process.env.PORT || 3000;

connectDB().then(()=>{
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
   

 


