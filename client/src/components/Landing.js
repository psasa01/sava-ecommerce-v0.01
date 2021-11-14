import React from "react";
import Typewriter from "typewriter-effect";
import { Link as ScrollLink } from "react-scroll";
import { Link } from "react-router-dom";
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
          <Link
            to={{
              pathname: "/products/filter",
              state: { from: "nista" },
            }}
          >
            <div className="cta">
              <h2>POSJETITE PRODAVNICU</h2>
            </div>
          </Link>
          <ScrollLink
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
          </ScrollLink>
        </div>
      </motion.div>
    </>
  );
};

export default Landing;
