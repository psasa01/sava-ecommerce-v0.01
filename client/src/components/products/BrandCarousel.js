import React from "react";

import { Carousel } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { red } from "@material-ui/core/colors";
import GoodYearImage from "./../../images/goodyear-carousel.jpg";
import DunlopImage from "./../../images/dunlop-carousel.jpg";

const GoodYear = {};

const BrandCarousel = () => {
  return (
    <>
      <Carousel
        autoplay
        arrows
        prevArrow={<LeftOutlined />}
        nextArrow={<RightOutlined />}
      >
        <div className="carousel-container">
          <div
            style={{
              position: "absolute",
              backgroundImage: `linear-gradient(110deg, rgba(0, 3, 10, .9), rgba(0, 0, 0, .1) 15%)`,
              zIndex: "99",
              width: "100%",
              height: "100%"
            }}
          ></div>
          <div
            style={{
              position: "relative",
              height: "40vw",
              width: "100%",
              color: "#fff",
              textAlign: "center"
            }}
          >
            <h3
              className="carousel-h3"
              style={{
                position: "absolute",
                left: "15%",
                top: "45%",
                margin: "auto",
                zIndex: "999",
                color: "#fff",
                fontSize: "2vw",
                fontWeight: "200",
                border: "1px solid #5faeff",
                padding: ".5em 1em .75em 1em",
                borderRadius: "1em",
                backgroundColor: "rgba(0,20,50, .3)",
                cursor: "pointer"
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
                bottom: "0"
              }}
            />
          </div>
        </div>
        <div className="carousel-container">
          <div
            style={{
              position: "absolute",
              backgroundImage: `linear-gradient(110deg, rgba(0, 3, 10, .9), rgba(0, 0, 0, .1) 15%)`,
              zIndex: "99",
              width: "100%",
              height: "100%"
            }}
          ></div>
          <div
            style={{
              position: "relative",
              height: "40vw",
              width: "100%",
              color: "#fff",
              textAlign: "center"
            }}
          >
            <h3
              style={{
                position: "absolute",
                left: "15%",
                top: "45%",
                margin: "auto",
                zIndex: "999",
                color: "#fff",
                fontSize: "2.8vw",
                fontWeight: "200"
              }}
            >
              Pregledajte gume marke{" "}
              <span style={{ color: "#eeff00", fontWeight: "500" }}>
                {" "}
                Dunlop{" "}
              </span>
            </h3>
            <img
              src={DunlopImage}
              alt=""
              className="carousel-image"
              style={{
                width: `100%`,
                bottom: "0"
              }}
            />
          </div>
        </div>{" "}
        <div>
          <h3>5</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
      </Carousel>
    </>
  );
};

export default BrandCarousel;
