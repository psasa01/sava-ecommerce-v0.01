import React from "react";

import { Carousel } from "antd";
import { red } from "@material-ui/core/colors";
import GoodYearImage from "./../../images/goodyear-carousel.jpg";

const GoodYear = {};

const BrandCarousel = () => {
  return (
    <>
      <Carousel>
        <div className="carousel-container">
          <div
            style={{
              position: "absolute",
              backgroundImage: `linear-gradient(120deg, rgba(0, 3, 10, .9) 3%, rgba(0, 0, 0, .2) 15%)`,
              zIndex: "99",
              width: "100%",
              height: "100%",
            }}
          ></div>
          <div
            style={{
              position: "relative",
              height: "40vw",
              width: "100%",
              color: "#fff",
              textAlign: "center",
            }}
          >
            <h3
              style={{
                position: "absolute",
                left: "8%",
                top: "40%",
                zIndex: "999",
                color: "#fff",
                fontSize: "2.8vw",
                fontWeight: "200",
              }}
            >
              Pregledajte gume marke{" "}
              <span style={{ color: "#5faeff", fontWeight: "500" }}>
                {" "}
                Good Year{" "}
              </span>
            </h3>
            <img
              src={GoodYearImage}
              alt=""
              className="carousel-image"
              style={{
                width: `100%`,
                bottom: "0",
              }}
            />
          </div>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
      </Carousel>
    </>
  );
};

export default BrandCarousel;
