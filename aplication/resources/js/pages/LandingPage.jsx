import React from "react";
import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <h1>Bienvenido a RentMe</h1>
      <p>Tu plataforma de renting de vehículos</p>
      <Footer />
    </>
  );
};

export default LandingPage;
