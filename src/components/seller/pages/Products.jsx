
import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ProductFilters from "./ProductFilters";
import ProductList from "./ProductList";
import ProductFormModal from "./ProductFormModal";
import ProductDeleteModal from "./ProductDeleteModal";
import { Plus } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

const DEMO_PRODUCTS = [
  {
    id: "1",
    name: "Modern Wooden Coffee Table",
    category: "Furniture",
    price: 180,
    stock: 14,
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=400&q=80",
    dateAdded: "2024-06-08"
  },
  {
    id: "2",
    name: "Handmade Ceramic Vase",
    category: "Handicrafts",
    price: 45,
    stock: 7,
    status: "In Review",
    image:
      "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=400&q=80",
    dateAdded: "2024-06-10"
  },
  {
    id: "3",
    name: "Embroidered Cotton Kurti",
    category: "Clothing & Accessories",
    price: 38,
    stock: 6,
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=crop&w=400&q=80",
    dateAdded: "2024-06-11"
  },
  {
    id: "4",
    name: "Wall Mounted LED Lamp",
    category: "Home Decor",
    price: 73,
    stock: 0,
    status: "Rejected",
    image:
      "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=400&q=80",
    dateAdded: "2024-06-09"
  },
  {
    id: "5",
    name: "Herbal Aloe Vera Face Cream",
    category: "Health & Beauty",
    price: 15,
    stock: 23,
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=400&q=80",
    dateAdded: "2024-06-06"
  }
];

const Products = () => {
  // Normally these would come from API state, but we'll use local state for demo
  const [products, setProducts] = useState(DEMO_PRODUCTS);
  const [formOpen, setFormOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const [deleteModal, setDeleteModal] = useState({
    open: false,
    product: null
  });

  const [filter, setFilter] = useState({
    category: "All",
    status: "All"
  });
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");

  const navigate = useNavigate();

  // Filtering & Sorting
  const filtered = useMemo(() => {
    let list = products;
    if (filter.category !== "All") list = list.filter(p => p.category === filter.category);
    if (filter.status !== "All") list = list.filter(p => p.status === filter.status);
    if (search) {
      const s = search.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(s));
    }
    if (sort === "newest") {
      list = [...list].sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
    } else if (sort === "oldest") {
      list = [...list].sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded));
    } else if (sort === "priceLow") {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sort === "priceHigh") {
      list = [...list].sort((a, b) => b.price - a.price);
    }
    return list;
  }, [products, filter, search, sort]);

  // Responsive breakpoints
  const isMobile = window.innerWidth < 640;

  const handleEdit = product => {
    setEditProduct(product);
    setFormOpen(true);
  };

  const handleAdd = () => {
    setEditProduct(null);
    setFormOpen(true);
  };

  const handleSave = newProduct => {
    if (editProduct) {
      setProducts(prev =>
        prev.map(p => (p.id === editProduct.id ? { ...p, ...newProduct } : p))
      );
    } else {
      setProducts(prev => [
        {
          ...newProduct,
          id: String(Date.now())
        }, ...prev
      ]);
    }
  };

  const handleDelete = () => {
    if (!deleteModal.product) return;
    setProducts(prev =>
      prev.filter(p => p.id !== deleteModal.product.id)
    );
    setDeleteModal({ open: false, product: null });
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto pb-24 animate-fade-in" style={{ animationDuration: '0.4s' }}>
      {/* Header area */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
        <h2 className="font-bold text-xl sm:text-2xl text-gray-900">My Products</h2>
        <button
          className={
            buttonVariants({ variant: "default", className: "rounded-full px-5 py-2 shadow-md hover:scale-105 transition focus-visible:ring-2" }) +
            " hidden sm:inline-flex"
          }
          onClick={handleAdd}
          aria-label="Add New Product"
        >
          <Plus className="mr-1" /> Add New Product
        </button>
      </div>
      {/* Filter bar */}
      <ProductFilters
        filter={filter}
        setFilter={setFilter}
        sort={sort}
        setSort={setSort}
        search={search}
        setSearch={setSearch}
      />

      {/* Product list */}
      <ProductList
        products={filtered}
        onEdit={handleEdit}
        onDelete={product => setDeleteModal({ open: true, product })}
        onViewDetail={product => navigate(`/seller/my-products/${product.id}`)}
        mobile={isMobile}
      />

      {/* Floating Action Button for mobile */}
      <button
        className={
          buttonVariants({ variant: "default", className: "rounded-full shadow-lg fixed bottom-6 right-6 z-50 px-5 py-3 sm:hidden flex items-center gap-2 animate-fade-in" }) +
          " bg-black text-white hover:bg-gray-900 hover:scale-105"
        }
        style={{
          boxShadow: "0 6px 16px rgba(0,0,0,0.14)"
        }}
        onClick={handleAdd}
        aria-label="Add New Product"
        tabIndex={0}
      >
        <Plus size={22} className="mr-1" /> Add Product
      </button>

      {/* Add/Edit Modal Form */}
      <ProductFormModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSave={handleSave}
        editProduct={editProduct}
      />

      {/* Delete Modal */}
      <ProductDeleteModal
        open={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, product: null })}
        onDelete={handleDelete}
        productName={deleteModal.product?.name || ""}
      />
    </div>
  );
};
export default Products;
