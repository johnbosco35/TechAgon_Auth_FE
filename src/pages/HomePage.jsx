// src/pages/Home.jsx
import React from "react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="flex items-center justify-between p-6 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-indigo-600">MyBrand</h1>
        <nav className="hidden space-x-6 md:block">
          <a href="#about" className="hover:text-indigo-600">
            About
          </a>
          <a href="#services" className="hover:text-indigo-600">
            Services
          </a>
          <a href="#contact" className="hover:text-indigo-600">
            Contact
          </a>
        </nav>
        <a
          href="#contact"
          className="hidden px-4 py-2 text-white transition bg-indigo-600 rounded-lg md:inline-block hover:bg-indigo-700"
        >
          Get Started
        </a>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-6 py-20 text-center bg-gradient-to-r from-indigo-50 to-white">
        <h2 className="mb-4 text-4xl font-bold md:text-6xl">
          Your space, your style.
        </h2>
        <p className="max-w-2xl mb-8 text-lg text-gray-600 md:text-xl">
          We make design simple, functional, and beautiful — for everyone.
        </p>
        <a
          href="#services"
          className="px-6 py-3 text-lg text-white transition bg-indigo-600 rounded-lg hover:bg-indigo-700"
        >
          Explore Now
        </a>
      </section>

      {/* About Section */}
      <section id="about" className="max-w-6xl px-6 py-16 mx-auto text-center">
        <h3 className="mb-4 text-3xl font-semibold">About Us</h3>
        <p className="max-w-3xl mx-auto text-gray-600">
          We believe great design starts with understanding your needs. Our
          mission is to transform spaces into places you love.
        </p>
      </section>

      {/* Services Section */}
      <section id="services" className="px-6 py-16 bg-gray-50">
        <h3 className="mb-12 text-3xl font-semibold text-center">
          What We Offer
        </h3>
        <div className="grid max-w-6xl gap-8 mx-auto md:grid-cols-3">
          {[
            {
              title: "Interior Design",
              desc: "Tailored designs for every room.",
            },
            { title: "Consultation", desc: "Expert advice for your projects." },
            { title: "Custom Furniture", desc: "Made to fit your style." },
          ].map((service, index) => (
            <div
              key={index}
              className="p-6 transition bg-white shadow rounded-2xl hover:shadow-lg"
            >
              <h4 className="mb-2 text-xl font-bold text-indigo-600">
                {service.title}
              </h4>
              <p className="text-gray-600">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="px-6 py-16 text-center">
        <h3 className="mb-4 text-3xl font-semibold">Get in Touch</h3>
        <p className="mb-6 text-gray-600">
          Ready to start your project? Let’s talk!
        </p>
        <form className="max-w-lg mx-auto space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <textarea
            placeholder="Your Message"
            className="w-full p-3 border border-gray-300 rounded-lg"
            rows="4"
          ></textarea>
          <button
            type="submit"
            className="px-6 py-3 text-white transition bg-indigo-600 rounded-lg hover:bg-indigo-700"
          >
            Send Message
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-white bg-gray-900">
        <p>&copy; {new Date().getFullYear()} MyBrand. All rights reserved.</p>
      </footer>
    </div>
  );
}
