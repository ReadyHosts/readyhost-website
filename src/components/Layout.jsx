import React from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import FloatingMobileCTA from "./FloatingMobileCTA.jsx";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans antialiased overflow-x-hidden">
      <Header />
      <main>{children}</main>
      <Footer />
      <FloatingMobileCTA />
    </div>
  );
}
