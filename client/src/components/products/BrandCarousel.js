import React from "react";
import { Link } from "react-router-dom";
import { Carousel } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
// import { red } from "@material-ui/core/colors";
import GoodYearImage from "./../../images/goodyear-carousel.jpg";
import DunlopImage from "./../../images/dunlop-carousel.jpg";
import SavaImage from "./../../images/sava-carousel.jpg";
import VredesteinImage from "./../../images/vredestein-carousel.jpg";
import DunlopBrand from "./../../images/dunlop-100px.jpg";
import GoodYearBrand from "./../../images/good-year-100px.jpg";
import SavaBrand from "./../../images/sava-100px.jpg";
import VredesteinBrand from "./../../images/vredestein-100px.jpg";

// const GoodYear = {};

const BrandCarousel = () => {
  return (
    <>
      <Carousel
        autoplay
        autoplaySpeed={5000}
        easing="ease-in-out"
        arrows
        prevArrow={<LeftOutlined />}
        nextArrow={<RightOutlined />}
        style={{ width: "100vw", position: "relative", left: "0" }}
      >
        <div className="carousel">
          <div className="carousel-gradient"></div>
          <div className="carousel-container">
            <Link
              to={{
                pathname: "/products/filter",
                state: { from: "Good Year" },
              }}
            >
              <h3 className="carousel-h3 carousel-h3-goodyear">
                Pregledajte gume marke{" "}
                <span style={{ color: "#5faeff", fontWeight: "500" }}>
                  {" "}
                  Good Year{" "}
                </span>
              </h3>
            </Link>
            <img src={GoodYearBrand} alt="" className="carousel-brand" />
            <img src={GoodYearImage} alt="" className="carousel-image" />
          </div>
        </div>
        <div className="carousel">
          <div className="carousel-gradient"></div>

          <div className="carousel-container">
            <Link
              to={{
                pathname: "/products/filter",
                state: { from: "Dunlop" },
              }}
            >
              <h3 className="carousel-h3 carousel-h3-dunlop">
                Pregledajte gume marke{" "}
                <span style={{ color: "#eeff00", fontWeight: "500" }}>
                  {" "}
                  Dunlop{" "}
                </span>
              </h3>
            </Link>
            <img src={DunlopBrand} alt="" className="carousel-brand" />
            <img src={DunlopImage} alt="" className="carousel-image" />
          </div>
        </div>
        <div className="carousel">
          <div className="carousel-gradient"></div>

          <div className="carousel-container">
            <Link
              to={{
                pathname: "/products/filter",
                state: { from: "Sava" },
              }}
            >
              <h3 className="carousel-h3 carousel-h3-sava">
                Pregledajte gume marke{" "}
                <span style={{ color: "#20ff20", fontWeight: "500" }}>
                  {" "}
                  Sava{" "}
                </span>
              </h3>
            </Link>
            <img src={SavaBrand} alt="" className="carousel-brand" />
            <img src={SavaImage} alt="" className="carousel-image" />
          </div>
        </div>
        <div className="carousel">
          <div className="carousel-gradient"></div>

          <div className="carousel-container">
            <Link
              to={{
                pathname: "/products/filter",
                state: { from: "Vredestein" },
              }}
            >
              <h3 className="carousel-h3 carousel-h3-vredestein">
                Pregledajte gume marke{" "}
                <span style={{ color: "#060905", fontWeight: "500" }}>
                  {" "}
                  Vredestein{" "}
                </span>
              </h3>
            </Link>
            <img src={VredesteinBrand} alt="" className="carousel-brand" />
            <img src={VredesteinImage} alt="" className="carousel-image" />
          </div>
        </div>
      </Carousel>
    </>
  );
};

export default BrandCarousel;
