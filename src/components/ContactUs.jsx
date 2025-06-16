import React from "react";
import { Mail, Facebook, Instagram, Twitter, Phone, MapPin, Clock, Send } from "lucide-react";
const contactInfo = [{
  icon: <MapPin className="w-6 h-6" />,
  title: "Address",
  info: "123 Main Blvd, Lahore, Pakistan",
  color: "from-blue-500 to-cyan-500"
}, {
  icon: <Phone className="w-6 h-6" />,
  title: "Phone",
  info: "+92 42 9999 0001",
  color: "from-green-500 to-emerald-500"
}, {
  icon: <Mail className="w-6 h-6" />,
  title: "Email",
  info: "support@shoply.pk",
  color: "from-purple-500 to-violet-500"
}, {
  icon: <Clock className="w-6 h-6" />,
  title: "Hours",
  info: "Mon-Fri: 9AM-6PM",
  color: "from-orange-500 to-red-500"
}];
const socialLinks = [{
  icon: <Facebook className="w-6 h-6" />,
  name: "Facebook",
  color: "hover:bg-blue-600"
}, {
  icon: <Instagram className="w-6 h-6" />,
  name: "Instagram",
  color: "hover:bg-pink-600"
}, {
  icon: <Twitter className="w-6 h-6" />,
  name: "Twitter",
  color: "hover:bg-blue-400"
}];
const ContactUs = () => <section className="py-20 bg-gradient-to-br from-gray-50 to-white" id="contact">
    <div className="container mx-auto px-4 max-w-7xl">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
          Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Touch</span>
        </h2>
        <p className="max-w-3xl mx-auto text-gray-600 text-lg md:text-xl leading-relaxed">
          Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>
        <div className="mt-6 w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 mb-12">
        {/* Contact Info */}
        <div className="space-y-6 px-[20px] mx-0 my-[8px]">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Contact Information</h3>
          
          <div className="grid sm:grid-cols-2 gap-6">
            {contactInfo.map((item, index) => <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center text-white mb-4`}>
                  {item.icon}
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-gray-600">{item.info}</p>
              </div>)}
          </div>

          {/* Social Links */}
          <div className="mt-8">
            <h4 className="font-semibold text-gray-900 mb-4">Follow Us</h4>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => <a key={index} href="#" className={`w-12 h-12 bg-gray-900 text-white rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 ${social.color}`} title={social.name}>
                  {social.icon}
                </a>)}
            </div>
          </div>

          {/* Map */}
          <div className="mt-8">
            <div className="w-full h-64 rounded-2xl overflow-hidden shadow-lg">
              <iframe title="map" src="https://maps.google.com/maps?q=lahore%20pakistan&t=&z=13&ie=UTF8&iwloc=&output=embed" className="w-full h-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        
      </div>
    </div>
  </section>;
export default ContactUs;