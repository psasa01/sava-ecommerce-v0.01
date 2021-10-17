import React, { useEffect, useState } from "react";

import { motion } from "framer-motion";

import SizeSearchForm from "../components/forms/SizeSearchForm";
import SpecialOfferSlider from "../components/products/SpecialOfferSlider";
import Landing from "../components/Landing";

const Home = () => {
  return (
    <>
      <div className="landing-placeholder"></div>
      <Landing />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="container-fluid"
        id="after-landing"
      >
        <SizeSearchForm />

        <SpecialOfferSlider />
      </motion.div>
      <br />
    </>
  );
};

export default Home;
