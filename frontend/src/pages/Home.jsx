import { useState } from "react";

import BookCard from "../components/BookCard.jsx";

import api from "../lib/axios.js"

export default function Home() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await api.get(`/books?title=${setQuery}`);
      setBooks(res.data.books || []);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch books");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 sm:p-10 max-w-6xl mx-auto">
      <h1 className="text-3xl sm:text-5xl font-bold text-center mb-8 text-indigo-600">
        📚 Book Finder
      </h1>

      <form
        onSubmit={handleSearch}
        className="flex flex-col sm:flex-row justify-center gap-3 mb-10"
      >
        <input
          type="text"
          placeholder="Search by title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border border-gray-300 rounded-xl px-4 py-2 w-full sm:w-96 focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-indigo-700 transition-all"
        >
          Search
        </button>
      </form>

      {loading && (
        <div className="text-center text-lg text-gray-600 animate-pulse">
          🔍 Searching for books...
        </div>
      )}

      {!loading && books.length === 0 && (
        <div className="text-center text-gray-500">
          Try searching for your favorite books!
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
        {books.map((book, i) => (
          <BookCard key={i} book={book} />
        ))}
      </div>
    </div>
  );
}
