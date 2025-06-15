
// Main marketplace landing page UI

import Header from "../components/Header.jsx";
import HeroCarousel from "../components/HeroCarousel.jsx";
import CategoriesGrid from "../components/CategoriesGrid.jsx";
import AboutUs from "../components/AboutUs.jsx";
import ContactUs from "../components/ContactUs.jsx";
import Footer from "../components/Footer.jsx";
import ProductDetailModal from "../components/ProductDetailModal.jsx";
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
