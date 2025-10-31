import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/data.js"
import bookRoute from "./src/routes/bookRoute.js";

dotenv.config();


const app = express();
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
  res.send("📚 Book Finder Backend is running successfully on Render!");
});

app.use("/api/books", bookRoute);

const PORT = process.env.PORT || 3000;

connectDB().then(()=>{
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
   

 


