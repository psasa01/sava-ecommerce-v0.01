import React from "react";

import { motion } from "framer-motion";

import SizeSearchForm from "../components/forms/SizeSearchForm";
// import SpecialOfferSlider from "../components/products/SpecialOfferSlider";
import BrandCarousel from "../components/products/BrandCarousel";
import Landing from "../components/Landing";

const Home = () => {
  return (
    <>
      <div className="landing-placeholder"></div>
      <Landing />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="container-fluid after-landing"
        id="after-landing"
      >
        <SizeSearchForm />
        <BrandCarousel />
        {/* <SpecialOfferSlider /> */}
      </motion.div>
      <br />
    </>
  );
};

export default Home;
