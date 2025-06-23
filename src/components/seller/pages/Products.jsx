import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductFilters from "./ProductFilters";
import ProductList from "./ProductList";
import ProductFormModal from "./ProductFormModal";
import ProductDeleteModal from "./ProductDeleteModal";
import { Plus } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { useProducts } from "../../../contexts/ProductsContext";
import { auth, db } from "../../../config/firebaseConfig";
import { deleteDoc ,doc} from "firebase/firestore";

// const DEMO_PRODUCTS = [
//   {
//     id: "1",
//     name: "Table Lamp",
//     category: "Home & Living",
//     price: 6750,
//     stock: 14,
//     status: "Active",
//     image:
//       "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=400&q=80",
//     dateAdded: "2024-06-08",
//   },
//   {
//     id: "2",
//     name: "Leather Bag",
//     category: "Accessories",
//     price: 11250,
//     stock: 7,
//     status: "In Review",
//     image:
//       "https://images.unsplash.com/photo-1487252665478-49b61b47f302?auto=format&fit=crop&w=400&q=80",
//     dateAdded: "2024-06-10",
//   },
//   {
//     id: "3",
//     name: "Denim Jacket",
//     category: "Clothing",
//     price: 5700,
//     stock: 6,
//     status: "Active",
//     image:
//       "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80",
//     dateAdded: "2024-06-11",
//   },
//   {
//     id: "4",
//     name: "Bluetooth Speaker",
//     category: "Electronics",
//     price: 10950,
//     stock: 0,
//     status: "Rejected",
//     image:
//       "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80",
//     dateAdded: "2024-06-09",
//   },
//   {
//     id: "5",
//     name: "Gold Watch",
//     category: "Accessories",
//     price: 22500,
//     stock: 23,
//     status: "Active",
//     image:
//       "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80",
//     dateAdded: "2024-06-06",
//   },
// ];

const Products = () => {
  // Normally these would come from API state, but we'll use local state for demo
  const [products, setProducts] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const { product } = useProducts();

  // useEffect(() => {
  //  setUserId(auth?.currentUser?.uid)
    
  // }, []);


    useEffect(() => {

    setProducts(product);
  }, [product]);
  const [deleteModal, setDeleteModal] = useState({
    open: false,
    product: null,
  });

  const [filter, setFilter] = useState({
    category: "All",
    status: "All",
  });
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");

  const navigate = useNavigate();

  // Filtering & Sorting
  const filtered = useMemo(() => {
    let list = products;
    if (filter.category !== "All")
      list = list.filter((p) => p?.productsData?.category === filter.category);
    if (filter.status !== "All")
      list = list.filter((p) => p?.productsData?.status === filter.status);
    if (search) {
      const s = search.toLowerCase();
      list = list.filter((p) => p?.productsData?.name.toLowerCase().includes(s));
    }
    if (sort === "newest") {
      list = [...list].sort(
        (a, b) => new Date(b?.productsData?.dateAdded) - new Date(a?.productsData?.dateAdded)
      );
    } else if (sort === "oldest") {
      list = [...list].sort(
        (a, b) => new Date(a?.productsData?.dateAdded) - new Date(b?.productsData?.dateAdded)
      );
    } else if (sort === "priceLow") {
      list = [...list].sort((a, b) => a?.productsData?.price - b?.productsData?.price);
    } else if (sort === "priceHigh") {
      list = [...list].sort((a, b) => b?.productsData?.price - a?.productsData?.price);
    }
    return list;
  }, [products, filter, search, sort]);

  // Responsive breakpoints
  const isMobile = window.innerWidth < 640;

  const handleEdit = (product) => {

    setEditProduct(product);
    setFormOpen(true);
  };

  const handleAdd = () => {
    setEditProduct(null);
    setFormOpen(true);
  };

  const handleSave = (newProduct) => {
    if (editProduct) {
      setProducts((prev) =>
        prev.map((p) => (p.id === editProduct.id ? { ...p, ...newProduct } : p))
      );
    } else {
      setProducts((prev) => [
        {
          ...newProduct,
          id: String(Date.now()),
        },
        ...prev,
      ]);
    }
  };

  const handleDelete = async() => {
    if (!deleteModal.product) return;
    const docRef = doc(db,'Products',deleteModal.product.id)
    await deleteDoc(docRef)
    setProducts((prev) => prev.filter((p) => p.id !== deleteModal.product.id));
    setDeleteModal({ open: false, product: null });
  };

  return (
    <div
      className="relative w-full max-w-7xl mx-auto pb-24 animate-fade-in"
      style={{ animationDuration: "0.4s" }}
    >
      {/* Header area */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
        <h2 className="font-bold text-xl sm:text-2xl text-gray-900">
          My Products
        </h2>
        {/* <button
          className={
            buttonVariants({
              variant: "default",
              className:
                "rounded-full px-5 py-2 shadow-md hover:scale-105 transition focus-visible:ring-2",
            }) + " hidden sm:inline-flex"
          }
          onClick={handleAdd}
          aria-label="Add New Product"
        >
          <Plus className="mr-1" /> Add New Product
        </button> */}
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

      {/* Product table */}
      <ProductList
        products={filtered}
        onEdit={handleEdit}
        onDelete={(product) => setDeleteModal({ open: true, product })}
        onViewDetail={(product) => {
          // Pick the right route as per your app structure, here `/product/:id`:
          navigate(`/product/${product.id}`);
          // If you want seller's detail: navigate(`/seller/my-products/${product.id}`);
        }}
        mobile={isMobile}
      />

      {/* Floating Action Button for mobile */}
      <button
        className={
          buttonVariants({
            variant: "default",
            className:
              "rounded-full shadow-lg fixed bottom-6 right-6 z-50 px-5 py-3 sm:hidden flex items-center gap-2 animate-fade-in",
          }) + " bg-black text-white hover:bg-gray-900 hover:scale-105"
        }
        style={{
          boxShadow: "0 6px 16px rgba(0,0,0,0.14)",
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
