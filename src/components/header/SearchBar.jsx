
import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ searchQuery, setSearchQuery, handleSearch }) => {
  return (
    <form onSubmit={handleSearch} className="flex items-center">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search products..."
        className="w-56 px-4 py-2 border border-neutral-200 rounded-l-xl bg-neutral-50 text-sm outline-none focus:ring-2 focus:ring-neutral-300 focus:bg-white transition-all"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-black text-white rounded-r-xl hover:bg-neutral-800 transition-colors"
      >
        <Search size={16} />
      </button>
    </form>
  );
};

export default SearchBar;
