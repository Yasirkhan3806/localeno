
import React from "react";
import PropTypes from "prop-types";

const WelcomeSection = ({ sellerName }) => {
  return (
    <section
      className="w-full mb-6"
      aria-label={`Welcome section for ${sellerName}`}
    >
      <div className="animate-fade-in" style={{
        animationDuration: "0.6s",
        animationFillMode: "forwards"
      }}>
        <h2 className="text-2xl md:text-3xl font-extrabold text-black mb-1" tabIndex={0}>
          Welcome back, {sellerName}!
        </h2>
        <p className="text-gray-600 text-base">
          Here&apos;s a quick look at your store performance.
        </p>
      </div>
    </section>
  );
};

WelcomeSection.propTypes = {
  sellerName: PropTypes.string.isRequired
};

export default WelcomeSection;
