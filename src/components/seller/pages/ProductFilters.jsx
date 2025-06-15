
import React from "react";
import PropTypes from "prop-types";

const categories = [
  "All",
  "Furniture",
  "Handicrafts",
  "Clothing & Accessories",
  "Home Decor",
  "Health & Beauty"
];
const statuses = ["All", "Active", "In Review", "Rejected"];
const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "priceLow", label: "Price Low to High" },
  { value: "priceHigh", label: "Price High to Low" },
];

const ProductFilters = ({
  filter,
  setFilter,
  sort,
  setSort,
  search,
  setSearch
}) => {
  return (
    <form className="flex flex-col md:flex-row md:items-center gap-3 mb-5">
      <div className="flex gap-2 flex-1">
        <select
          value={filter.category}
          onChange={e => setFilter(f => ({ ...f, category: e.target.value }))}
          className="px-3 py-2 rounded-lg border bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-black transition text-sm"
          aria-label="Filter by Category"
        >
          {categories.map(cat =>
            <option value={cat} key={cat}>{cat}</option>
          )}
        </select>
        <select
          value={filter.status}
          onChange={e => setFilter(f => ({ ...f, status: e.target.value }))}
          className="px-3 py-2 rounded-lg border bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-black transition text-sm"
          aria-label="Filter by Status"
        >
          {statuses.map(st =>
            <option value={st} key={st}>{st}</option>
          )}
        </select>
        <input
          type="text"
          placeholder="Search by product name"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="px-3 py-2 rounded-lg border bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-black transition text-sm w-full md:w-48"
          aria-label="Search by product name"
        />
      </div>
      <div className="flex gap-2">
        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          className="px-3 py-2 rounded-lg border bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-black transition text-sm"
          aria-label="Sort products"
        >
          {sortOptions.map(opt =>
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          )}
        </select>
      </div>
    </form>
  );
};

ProductFilters.propTypes = {
  filter: PropTypes.object.isRequired,
  setFilter: PropTypes.func.isRequired,
  sort: PropTypes.string.isRequired,
  setSort: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired
};

export default ProductFilters;
