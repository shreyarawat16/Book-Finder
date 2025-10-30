import { Link } from "react-router-dom";


export default function BookCard({ book }) {
  return (
   
   
      <Link to={`/books/${book._id}`}>
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300">
      <img
        src={book.coverImage}
        alt={book.title}
        className="h-64 w-full object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-indigo-700 truncate">
          {book.title}
        </h2>
        <p className="text-sm text-gray-500 mb-2">by {book.author}</p>
        <p className="text-gray-600 text-sm line-clamp-3 mb-3">
          {book.description?.slice(0, 120) || "No description available."}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-indigo-600">
            ₹{book.price}
          </span>
          <button className="bg-indigo-500 text-white px-3 py-1 rounded-md hover:bg-indigo-600 transition-all">
            Buy
          </button>
        </div>
      </div>
    </div>
    </Link>
  )
}

