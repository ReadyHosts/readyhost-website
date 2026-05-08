import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import ForHosts from "./pages/ForHosts.jsx";
import ForCleaners from "./pages/ForCleaners.jsx";
import ForPropertyManagers from "./pages/ForPropertyManagers.jsx";
import ForHotels from "./pages/ForHotels.jsx";
import AddOns from "./pages/AddOns.jsx";
import Contact from "./pages/Contact.jsx";

/**
 * ReadyHost — multi-page app-centric site
 * Brand: Teal #1B6C72 / Orange #FF6B35
 * Email: hello@readyhosts.co  |  Domain: readyhosts.co
 * Form: Formspree xnjwbzke
 */

// Scroll to top (or to hash) on route change
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, hash]);
  return null;
}

// Update document title per route
const TITLES = {
  "/": "ReadyHost — Airbnb Cleaning, Hotel-Grade Standards",
  "/for-hosts": "For Airbnb Hosts | ReadyHost",
  "/for-cleaners": "Join Our Cleaning Team | ReadyHost",
  "/for-property-managers": "For Property Managers | ReadyHost",
  "/for-hotels": "Hotel Housekeeping at Scale | ReadyHost",
  "/add-ons": "Add-on Services | ReadyHost",
  "/contact": "Contact | ReadyHost",
};

function TitleManager() {
  const { pathname } = useLocation();
  useEffect(() => {
    document.title = TITLES[pathname] || "ReadyHost";
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <Layout>
      <ScrollManager />
      <TitleManager />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/for-hosts" element={<ForHosts />} />
        <Route path="/for-cleaners" element={<ForCleaners />} />
        <Route path="/for-property-managers" element={<ForPropertyManagers />} />
        <Route path="/for-hotels" element={<ForHotels />} />
        <Route path="/add-ons" element={<AddOns />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Layout>
  );
}
