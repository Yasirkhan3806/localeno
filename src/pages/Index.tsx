
// Main marketplace landing page UI

import Header from "../components/Header.js";
import HeroCarousel from "../components/HeroCarousel.js";
import CategoriesGrid from "../components/CategoriesGrid.js";
import AboutUs from "../components/AboutUs.js";
import ContactUs from "../components/ContactUs.js";
import Footer from "../components/Footer.js";
import ProductDetailModal from "../components/ProductDetailModal.js";
import React, { useState } from "react";

// Demo state (drop in a basic product modal system; more can be wired later)
const Index = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div className="bg-background min-h-screen text-foreground font-body font-inter">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex flex-col gap-10 sm:gap-12 md:gap-16 mt-0">
        {/* Hero/Carousel */}
        <HeroCarousel />

        {/* Categories Grid — includes featured products */}
        <CategoriesGrid onProductClick={setSelectedProduct} />

        {/* About Us Section */}
        <AboutUs />

        {/* Contact Us */}
        <ContactUs />
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
