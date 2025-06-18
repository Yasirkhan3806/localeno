
import Header from "../components/Header.jsx";
import Hero from "../components/Hero.jsx";
import CategoriesGrid from "../components/CategoriesGrid.jsx";
import FeaturedCollection from "../components/FeaturedCollection.jsx";
import AboutUs from "../components/AboutUs.jsx";
import Footer from "../components/Footer.jsx";
import ProductDetailModal from "../components/ProductDetailModal.jsx";
import React, { useState } from "react";

const Index = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div className="bg-background min-h-screen text-foreground font-body font-inter">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex flex-col gap-10 sm:gap-12 md:gap-16 mt-0">
        {/* Hero Section */}
        <Hero />

        {/* Categories Grid */}
        <CategoriesGrid />

        {/* Featured Collection */}
        <FeaturedCollection />

        {/* About Us Section */}
        <AboutUs />
      </main>

      {/* Detail Modal, shown only when a product is selected */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
