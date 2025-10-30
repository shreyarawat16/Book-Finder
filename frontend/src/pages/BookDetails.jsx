import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/books/${id}`);
        setBook(res.data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-20 text-gray-500">Loading book...</div>;
  }

  if (!book) {
    return <div className="text-center mt-20 text-red-500">Book not found</div>;
  }

  return (
    <div className="p-6 sm:p-10 max-w-5xl mx-auto">
      <Link to="/" className="text-indigo-600 hover:underline mb-6 inline-block">
        ← Back to Search
      </Link>

      <div className="bg-white shadow-xl rounded-2xl p-6 flex flex-col md:flex-row gap-8">
        <img
          src={book.coverImage}
          alt={book.title}
          className="w-full md:w-1/3 h-80 object-cover rounded-xl"
        />

        <div className="flex-1">
          <h1 className="text-3xl font-bold text-indigo-700 mb-2">{book.title}</h1>
          <p className="text-gray-600 mb-4">by {book.author}</p>
          <p className="text-gray-700 mb-6 leading-relaxed">
            {book.description || "No description available for this book."}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-semibold text-indigo-600">
              ₹{book.price}
            </span>
            <button className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-indigo-700 transition-all">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
