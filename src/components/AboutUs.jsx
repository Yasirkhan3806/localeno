import React, { useState } from "react";
import { User, Heart, ShoppingBag, Shield, Award, Users, Globe, Zap, Send, Phone, Mail, MapPin } from "lucide-react";
const aboutIcons = [{
  icon: <Heart size={32} className="text-red-500" />,
  title: "Verified Sellers",
  text: "Shop only with authenticated, reviewed stores.",
  color: "from-red-500 to-pink-500"
}, {
  icon: <Shield size={32} className="text-blue-500" />,
  title: "Secure Marketplace",
  text: "Safe payments & buyer protection always.",
  color: "from-blue-500 to-cyan-500"
}, {
  icon: <ShoppingBag size={32} className="text-green-500" />,
  title: "Wide Selection",
  text: "4,000+ items in 30+ trusted categories.",
  color: "from-green-500 to-emerald-500"
}, {
  icon: <Award size={32} className="text-purple-500" />,
  title: "Premium Quality",
  text: "Carefully curated products for excellence.",
  color: "from-purple-500 to-violet-500"
}];
const stats = [{
  icon: <Users className="w-8 h-8" />,
  number: "50K+",
  label: "Happy Customers"
}, {
  icon: <Globe className="w-8 h-8" />,
  number: "100+",
  label: "Cities Covered"
}, {
  icon: <Zap className="w-8 h-8" />,
  number: "99.9%",
  label: "Uptime"
}, {
  icon: <Award className="w-8 h-8" />,
  number: "4.9",
  label: "Rating"
}];
const AboutUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleInputChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert("Message sent successfully! We'll get back to you soon.");
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    setIsSubmitting(false);
  };
  return <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50" id="about">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Localena</span>
          </h2>
          <p className="max-w-3xl mx-auto text-gray-600 text-lg md:text-xl leading-relaxed">
            Pakistan's most trusted multi-vendor eCommerce platform, revolutionizing online shopping with innovation and reliability.
          </p>
          <div className="mt-6 w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => <div key={index} className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-blue-600 flex justify-center mb-3">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>)}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {aboutIcons.map((item, index) => <div key={item.title} className="bg-white border border-gray-100 rounded-3xl p-8 text-center shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
              <div className={`w-20 h-20 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <div className="text-white">
                  {item.icon}
                </div>
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {item.text}
              </p>
            </div>)}
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-3xl p-10 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-1">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
            <p className="text-blue-100 text-lg leading-relaxed">
              Empower every Pakistani to shop, sell, and trust eCommerce—safely and locally. We're building the future of digital commerce.
            </p>
          </div>
          
          <div className="bg-white border-2 border-gray-100 rounded-3xl p-10 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-1">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              Create a verified, innovative marketplace that defines Pakistan's digital future and connects communities nationwide.
            </p>
          </div>
        </div>

        {/* Get in Touch Section */}
        
      </div>
    </section>;
};
export default AboutUs;