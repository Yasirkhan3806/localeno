
import React from "react";
import PropTypes from "prop-types";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { buttonVariants } from "@/components/ui/button";

const ProductDeleteModal = ({ open, onClose, onDelete, productName }) => (
  <Dialog open={open} onOpenChange={onClose}>
    <DialogContent className="max-w-xs w-full p-0 bg-white shadow-2xl rounded-xl animate-fade-in"
      aria-label="Delete Product"
      style={{ animationDuration: "0.19s"}}>
      <div className="p-6">
        <h2 className="text-lg font-bold mb-3">Delete Product</h2>
        <p className="text-sm text-gray-700 mb-4">
          Are you sure you want to delete{" "}
          <span className="font-semibold">{productName}</span>?
        </p>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            className={buttonVariants({ variant:"outline", className:"rounded-lg px-4 py-2"})}
            onClick={onClose}
          >Cancel</button>
          <button
            type="button"
            className={buttonVariants({ variant:"destructive", className:"rounded-lg px-4 py-2" })}
            onClick={onDelete}
          >Delete</button>
        </div>
      </div>
    </DialogContent>
  </Dialog>
);

ProductDeleteModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  productName: PropTypes.string.isRequired
};

export default ProductDeleteModal;
