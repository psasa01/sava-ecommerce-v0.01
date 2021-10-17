import React from "react";
import Typewriter from "typewriter-effect";
import { Link } from "react-scroll";
import { DownOutlined } from "@ant-design/icons";

import { motion } from "framer-motion";
const Landing = () => {
  return (
    <>
      <motion.div
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="landing-all"
      >
        <div className="landing-page-static"></div>
        <div className="landing-page">
          <div className="landing-content">
            <div className="typewr">
              <div style={{ color: "white" }}>Kupite gume&nbsp;</div>
              <Typewriter
                options={{
                  pauseFor: 2500,
                  delay: 40,
                  deleteSpeed: 10,
                  strings: [
                    "iz udobnosti svoga doma",
                    "iz bilo kojeg dijela BiH",
                    "uz besplatnu dostavu",
                    "po akcijskim cijenama",
                    "u Sava Trgovini",
                  ],
                  autoStart: true,
                  loop: true,
                }}
              />{" "}
            </div>
          </div>
          <div className="cta">
            <h2>POSJETITE PRODAVNICU</h2>
          </div>
          <Link
            className="down"
            to="after-landing"
            smooth={true}
            duration={600}
            offset={-40}
          >
            <DownOutlined
              style={{
                fontSize: "2em",
                color: "#5faeff",
                background: "black",
                padding: ".5em",
                borderRadius: ".33em",
              }}
            />
          </Link>
        </div>
      </motion.div>
    </>
  );
};

export default Landing;
