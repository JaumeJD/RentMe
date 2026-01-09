import React from "react";
import "../../../css/layout.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="app-container">
      <header className="navbar">
        <Navbar />
      </header>

      <main className="main-content">
        {children}
      </main>

      <footer className="footer">
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
