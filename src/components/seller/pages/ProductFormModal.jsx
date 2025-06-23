
import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { buttonVariants } from "@/components/ui/button";
import { useCategories } from "../../../contexts/ProductsContext";
import { updateProductFields } from "../../../Firebase Functions/EditProducts";

const STATUSES = ["Active", "In Review", "Rejected"];

const emptyForm = {
 id:"",
  name: "",
  category: "Furniture",
  price: "",
  stock: 1,
  status: "Active",
  image: [],
  dateAdded: "",
};

const ProductFormModal = ({ open, onClose, onSave, editProduct }) => {
  const [form, setForm] = useState(editProduct || emptyForm);
  const fileInputRef = useRef();
  const { categories } = useCategories();

  useEffect(() => {
    if (editProduct?.productsData) setForm(editProduct?.productsData);
    else setForm({ ...emptyForm, category: "Furniture", status: "Active" });
  }, [editProduct, open]);

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "localeno_unsigned"); // Replace with your actual preset
      formData.append("cloud_name", "dwheinvov"); // Replace with your actual Cloudinary cloud name

      try {
        const res = await fetch("https://api.cloudinary.com/v1_1/dwheinvov/image/upload", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        setForm(f => ({ ...f, image: data.secure_url }));
      } catch (err) {
        console.error("Cloudinary upload failed:", err);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleSave({
      ...form,
      dateAdded: form.dateAdded || new Date().toLocaleDateString()
    });
    onClose();
  };

  const handleSave = async (formData) => {
  await updateProductFields(editProduct?.id, {
    name: formData.name,
    category: formData.category,
    price: Number(formData.price),
    stock: Number(formData.stock),
    status: formData.status,
    image: formData.image || editProduct?.productsData?.images,
    updatedAt: new Date().toISOString(),
  });
};


  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="max-w-md w-full p-0 bg-white shadow-2xl rounded-2xl animate-fade-in"
        style={{ animationDuration: "0.23s" }}
        aria-label={editProduct ? "Edit Product" : "Add Product"}
      >
        <form className="p-6 space-y-4" onSubmit={handleSubmit}>
          <h2 className="text-xl font-bold mb-1">{editProduct ? "Edit Product" : "Add New Product"}</h2>
          <label className="block font-medium text-sm mb-1">
            Product Name
            <input
              className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-black focus:outline-none"
              required
              maxLength={50}
              value={form.name}
              onChange={e=>setForm(f=>({...f, name: e.target.value}))}
              aria-label="Product Name"
            />
          </label>
          <label className="block font-medium text-sm mb-1">
            Category
            <select
              className="w-full mt-1 border rounded-lg px-3 py-2"
              value={form.category}
              onChange={e=>setForm(f=>({...f, category: e.target.value}))}
              required
            >
              <option value="">Select A Category</option>
              {categories.map(c=><option value={c.category} key={c.category}>{c.category}</option>)}
            </select>
          </label>
          <label className="block font-medium text-sm mb-1">
            Price
            <input
              type="number"
              className="w-full mt-1 border rounded-lg px-3 py-2"
              required min={1} max={100000}
              value={form.price}
              onChange={e=>setForm(f=>({...f, price: e.target.value}))}
            />
          </label>
          <label className="block font-medium text-sm mb-1">
            Stock Quantity
            <input
              type="number"
              min="0"
              className="w-full mt-1 border rounded-lg px-3 py-2"
              value={form.stock}
              onChange={e=>setForm(f=>({...f, stock: Number(e.target.value)}))}
              required
            />
          </label>
          <label className="block font-medium text-sm mb-1">
            Product Image
            <input
              type="file"
              accept="image/*"
              className="block mt-1"
              ref={fileInputRef}
              onChange={handleFile}
              aria-label="Product Image"
            />
            {form.image &&
              <img src={form.image} alt="Preview" className="mt-2 h-20 w-20 rounded-lg object-cover border" />
            }
          </label>
          <label className="block font-medium text-sm mb-1">
            Status
            <select
              className="w-full mt-1 border rounded-lg px-3 py-2"
              value={form.status}
              onChange={e=>setForm(f=>({...f, status: e.target.value}))}
              required
            >
              {STATUSES.map(s=><option value={s} key={s}>{s}</option>)}
            </select>
          </label>
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              className={buttonVariants({ variant: "outline", className: "rounded-lg px-4 py-2" })}
              onClick={onClose}
            >Cancel</button>
            <button
              type="submit"
              className={buttonVariants({ variant: "default", className: "rounded-lg px-4 py-2" })}
            >{editProduct ? "Update" : "Add Product"}</button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

ProductFormModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  editProduct: PropTypes.object
};

export default ProductFormModal;
