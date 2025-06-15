
import React from "react";
import ProductTable from "./ProductTable";

const ProductList = ({
  products,
  onEdit,
  onDelete,
  onViewDetail,
  mobile
}) => {
  return (
    <ProductTable
      products={products}
      onEdit={onEdit}
      onDelete={onDelete}
      onViewDetail={onViewDetail}
      mobile={mobile}
    />
  );
};

export default ProductList;
