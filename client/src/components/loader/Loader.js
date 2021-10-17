import React from "react";

import { motion } from "framer-motion";

const Loader = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.8 }}
    className="loading-image"
  >
    <img
      src="https://res.cloudinary.com/sale01/image/upload/v1623307453/assets/loading.gif"
      className="loading-centered"
    />
  </motion.div>
);

export default Loader;
