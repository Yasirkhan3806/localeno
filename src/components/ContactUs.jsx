
import React from "react";
import { Mail, Facebook, Instagram, Twitter } from "lucide-react";

const ContactUs = () => (
  <section className="container mx-auto px-4 py-8" id="contact">
    <h2 className="text-2xl md:text-3xl font-bold mb-4">Contact Us</h2>
    <div className="grid sm:grid-cols-2 gap-7 mb-7">
      {/* Info Block */}
      <div>
        <div className="mb-2 font-semibold text-lg">Shoply HQ</div>
        <div className="mb-2 text-black/70">123 Main Blvd, Lahore, Pakistan</div>
        <div className="mb-2 text-black/70">Phone: +92 42 9999 0001</div>
        <div className="mb-2 text-black/70 flex gap-2 items-center">
          <Mail size={16} />
          <span>support@shoply.pk</span>
        </div>
        <div className="flex gap-3 mt-3">
          <a href="#" className="rounded-full p-2 bg-black hover:scale-110 transition-all" title="Facebook">
            <Facebook size={18} className="text-white" />
          </a>
          <a href="#" className="rounded-full p-2 bg-black hover:scale-110 transition-all" title="Instagram">
            <Instagram size={18} className="text-white" />
          </a>
          <a href="#" className="rounded-full p-2 bg-black hover:scale-110 transition-all" title="Twitter">
            <Twitter size={18} className="text-white" />
          </a>
        </div>
      </div>
      {/* Map + Contact Form */}
      <div>
        <div className="w-full h-36 mb-3 rounded-xl overflow-hidden">
          {/* Embed Google Maps — demo location */}
          <iframe
            title="map"
            src="https://maps.google.com/maps?q=lahore%20pakistan&t=&z=13&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <form className="flex flex-col gap-2">
          <input className="border px-3 py-2 rounded-lg" type="text" required placeholder="Your Name" />
          <input className="border px-3 py-2 rounded-lg" type="email" required placeholder="Your Email" />
          <textarea className="border px-3 py-2 rounded-lg min-h-[48px]" required placeholder="Type your message..." />
          <button className="bg-black rounded-lg text-white px-4 py-2 font-semibold hover:scale-105 hover:bg-neutral-700 transition-all mt-2">
            Send Message
          </button>
        </form>
      </div>
    </div>
  </section>
);

export default ContactUs;
