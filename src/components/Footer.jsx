import React from "react";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Heart } from "lucide-react";
const footerLinks = {
  "Company": ["About Us", "Our Team", "Careers", "Press"],
  "Support": ["Help Center", "Safety Center", "Community Guidelines", "Contact Us"],
  "Legal": ["Cookies Policy", "Privacy Policy", "Terms of Service", "Law Enforcement"],
  "Install App": ["Download for iOS", "Download for Android", "Desktop App", "Browser Extension"]
};
const Footer = () => <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      {/* Main Footer Content */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12">
        {/* Brand Section */}
        <div className="col-span-2">
          <h3 className="text-3xl font-black mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Localena</h3>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Pakistan's most trusted marketplace connecting buyers and sellers with innovation, security, and reliability.
          </p>
          
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3 text-gray-300">
              <MapPin className="w-4 h-4 text-blue-400" />
              <span className="text-sm">123 Main Blvd, Lahore, Pakistan</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <Phone className="w-4 h-4 text-green-400" />
              <span className="text-sm">+92 42 9999 0001</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <Mail className="w-4 h-4 text-purple-400" />
              <span className="text-sm">support@localena.pk</span>
            </div>
          </div>
          
          <div className="flex gap-3">
            {[{
            icon: <Facebook className="w-5 h-5" />,
            color: "hover:bg-blue-600"
          }, {
            icon: <Instagram className="w-5 h-5" />,
            color: "hover:bg-pink-600"
          }, {
            icon: <Twitter className="w-5 h-5" />,
            color: "hover:bg-blue-400"
          }].map((social, index) => <a key={index} href="#" className={`w-10 h-10 bg-gray-700 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 ${social.color}`}>
                {social.icon}
              </a>)}
          </div>
        </div>

        {/* Footer Links */}
        {Object.entries(footerLinks).map(([category, links]) => <div key={category}>
            <h4 className="font-bold text-white mb-4">{category}</h4>
            <ul className="space-y-2">
              {links.map(link => <li key={link}>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm hover:underline">
                    {link}
                  </a>
                </li>)}
            </ul>
          </div>)}
      </div>

      {/* Newsletter Section (Stay Updated) */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl px-5 py-7 sm:px-8 sm:py-8 mb-8">
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6">
          <div className="w-full md:w-auto text-center md:text-left">
            <h4 className="text-2xl font-bold text-white mb-2">Stay Updated</h4>
            <p className="text-blue-100 max-w-xs mx-auto md:mx-0">
              Get the latest deals and updates delivered to your inbox
            </p>
          </div>
          <form className="flex flex-col sm:flex-row gap-2 w-full md:w-auto max-w-md sm:max-w-none mx-auto">
            <input type="email" className="flex-1 px-4 py-3 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-primary/60 text-gray-900 bg-white shadow-sm transition-all text-base" placeholder="Enter your email address" />
            <button className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all hover:scale-[1.035] whitespace-nowrap text-base shadow" type="submit">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-gray-400 text-sm flex items-center gap-2">
          <span>© 2025 Localena. Made with</span>
          <Heart className="w-4 h-4 text-red-500 fill-current" />
          <span>in Pakistan. Powered by Localena</span>
        </div>
        <div className="flex gap-6 text-sm">
          <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookies</a>
        </div>
      </div>
    </div>
  </footer>;
export default Footer;