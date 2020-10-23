import React from "react";
import "../../styles/HomeSection3.css";
import { Link } from "react-router-dom";

const HomeSEction3 = () => {
  return (
    <div className="section3">
      <div data-aos="fade-up" data-aos-delay="1200" className="title">
        <Link style={{ color: "black" }} to="/HomeSection">
          <h1>About the community</h1>
        </Link>

        <hr className="gradient_line" />
      </div>

      <div data-aos="fade-up" data-aos-delay="1500" className="title">
        <Link style={{ color: "black" }} to="/HomeSection2">
          {" "}
          <h1 className="headline">See some sercet place</h1>
        </Link>
      </div>

      <div data-aos="fade-up" data-aos-delay="1900" className="title">
        <h1 className="main-headline">cool activties</h1>
        <span className="subheadline">Discover</span>
      </div>
    </div>
  );
};

export default HomeSEction3;
