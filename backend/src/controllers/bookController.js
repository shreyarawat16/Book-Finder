import axios from "axios";
import Book from "../models/bookModel.js";

export const getBooks = async (req, res) => {
  const { title } = req.query;
  if (!title) return res.status(400).json({ error: "Please provide a book title" });

  try {
    const existingBooks = await Book.find({ title: new RegExp(title, "i") });
    if (existingBooks.length > 0) {
      console.log("📦 Serving from MongoDB cache");
      return res.json({ books: existingBooks });
    }

    const response = await axios.get(`https://openlibrary.org/search.json?title=${title}`);
    const results = response.data.docs.slice(0, 10);

    const books = await Promise.all(
      results.map(async (book) => {
        const coverImage = book.cover_i
          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
          : "https://via.placeholder.com/200x300?text=No+Cover";

        const author = book.author_name ? book.author_name.join(", ") : "Unknown Author";
        const title = book.title || "Untitled";
        const price = (Math.random() * 1000 + 100).toFixed(2);

        let description = "No description available.";
        if (book.key) {
          try {
            const detailRes = await axios.get(`https://openlibrary.org${book.key}.json`);
            if (detailRes.data.description) {
              description =
                typeof detailRes.data.description === "string"
                  ? detailRes.data.description
                  : detailRes.data.description.value;
            }
          } catch {}
        }

        const newBook = new Book({ title, author, description, price, coverImage, openLibraryId });
        await newBook.save();

        return newBook;
      })
    );

    res.json({ books });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching books" });
  }
};


// ✅ NEW: fetch single book by ID or Open Library key
export const getBookById = async (req, res) => {
  try {
    const { id } = req.params;

    // Try to find in MongoDB first
    const existingBook = await Book.findById(id);
    console.log(existingBook);
    if (existingBook) return res.json(existingBook);

    // Otherwise try fetching from Open Library
    const openLibraryUrl = `https://openlibrary.org${id}.json`; // id will be like `/works/OL45883W`
    const { data } = await axios.get(openLibraryUrl);

    const coverImage = data.covers
      ? `https://covers.openlibrary.org/b/id/${data.covers[0]}-L.jpg`
      : "https://via.placeholder.com/150";

    const bookData = {
      title: data.title,
      author: data.authors ? data.authors[0]?.name || "Unknown" : "Unknown",
      description:
        typeof data.description === "string"
          ? data.description
          : data.description?.value || "No description available.",
      price: (Math.random() * 500 + 100).toFixed(0),
      coverImage,
      openLibraryId: id,
    };

    const newBook = new Book(bookData);
    await newBook.save();

    res.json(newBook);
  } catch (error) {
    console.error("Error fetching single book:", error.message);
    res.status(500).json({ message: "Error fetching book details" });
  }
};


// export const getBookById= async(req, res)=>{
//   try{
//     let {id}= req.params.id;
//    const book= await Book.findById(id);
//    if(!book){
//      res.status(404).json({message: "Book not found"});
//    }
//     else{
//         res.status(200).json(book);
//     }
//   }
//   catch(err){
//     console.log("There is some error in backend during fetching book by id", err.message);
//     res.status(500).json({message: "Internal server error fetching book by id"});
//   }
// }