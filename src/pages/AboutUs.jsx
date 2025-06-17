import React from "react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { Shield, Truck, Heart, Users, Award, Globe } from "lucide-react";
const AboutUs = () => {
  const features = [{
    icon: Shield,
    title: "Secure Shopping",
    description: "Your security is our priority with encrypted transactions and verified sellers."
  }, {
    icon: Truck,
    title: "Fast Delivery",
    description: "Quick and reliable delivery service to get your products when you need them."
  }, {
    icon: Heart,
    title: "Customer First",
    description: "We put our customers at the heart of everything we do with 24/7 support."
  }, {
    icon: Users,
    title: "Community Driven",
    description: "Building a community of trusted buyers and sellers across the region."
  }, {
    icon: Award,
    title: "Quality Assured",
    description: "Every product is verified for quality and authenticity before listing."
  }, {
    icon: Globe,
    title: "Wide Reach",
    description: "Serving customers across multiple cities with expanding coverage."
  }];
  const team = [{
    name: "Ahmad Hassan",
    role: "CEO & Founder",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    description: "Visionary leader with 10+ years in e-commerce."
  }, {
    name: "Fatima Khan",
    role: "Head of Operations",
    image: "https://images.unsplash.com/photo-1494790108755-2616b9e1a9bb?auto=format&fit=crop&w=300&q=80",
    description: "Operations expert ensuring smooth platform experience."
  }, {
    name: "Ali Ahmed",
    role: "Technology Lead",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
    description: "Tech innovator building cutting-edge solutions."
  }, {
    name: "Zara Malik",
    role: "Customer Success",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80",
    description: "Dedicated to ensuring exceptional customer experience."
  }];
  const stats = [{
    number: "50K+",
    label: "Happy Customers"
  }, {
    number: "100K+",
    label: "Products Sold"
  }, {
    number: "500+",
    label: "Verified Sellers"
  }, {
    number: "99.5%",
    label: "Customer Satisfaction"
  }];
  return <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-900 rounded-full mb-6">
              <span className="text-3xl text-white">🛍️</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">About Localena</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We're revolutionizing the way people buy, sell, and rent products online. 
              Our platform connects millions of users in a secure, trusted marketplace 
              where quality meets convenience.
            </p>
          </div>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Our Story</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>Founded in 2025, Localena began as a simple idea: to create a marketplace that truly serves both buyers and sellers. We noticed that existing platforms either favored one side or were too complex to navigate.</p>
              <p>
                Our founders, coming from diverse backgrounds in technology, retail, and 
                customer service, combined their expertise to build something different. 
                A platform that's intuitive, secure, and puts the community first.
              </p>
              <p>
                Today, we're proud to serve thousands of customers across the region, 
                facilitating not just sales but also rentals - because we believe in 
                sustainable commerce and giving people access to products when they need them.
              </p>
            </div>
          </div>
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80" alt="Our team working together" className="w-full h-full object-cover rounded-2xl shadow-lg" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>)}
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Why Choose Localena?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're committed to providing the best marketplace experience 
              with features that matter most to our community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => <div key={index} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>)}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">The passionate people behind Localena who work tirelessly to make your marketplace experience exceptional.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                <div className="aspect-square overflow-hidden">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-gray-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </div>
              </div>)}
          </div>
        </div>

        {/* Mission Section */}
        <div className="bg-gradient-to-r from-gray-900 to-black rounded-2xl p-8 lg:p-12 text-white text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">Our Mission</h2>
          <p className="text-xl leading-relaxed max-w-4xl mx-auto mb-8">
            To democratize commerce by creating a platform where anyone can buy, sell, 
            or rent products safely and efficiently. We believe in building trust, 
            fostering community, and making quality products accessible to everyone.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="text-4xl mb-4">🌟</div>
              <h3 className="text-xl font-bold mb-2">Excellence</h3>
              <p className="text-gray-300">Striving for the highest quality in everything we do</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-bold mb-2">Trust</h3>
              <p className="text-gray-300">Building lasting relationships through transparency</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-bold mb-2">Innovation</h3>
              <p className="text-gray-300">Continuously evolving to serve you better</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>;
};
export default AboutUs;