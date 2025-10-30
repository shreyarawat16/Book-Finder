import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: { 
        type: String, 
        required: true
     },
    
    description: { 
        type: String ,
        required: true
    },
    author:{
      type: String,
      
    },
    price: { 
        type: Number,
        required: true,
     },
    coverImage: { 
        type: String
     },
     openLibraryId: String,
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);
export default Book;
