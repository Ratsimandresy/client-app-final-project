import React, { useRef, useEffect } from "react";
import "./styles/HomeSection2.scss";

import { TimelineLite, Power2 } from "gsap";
import CSSRulePlugin from "gsap/CSSRulePlugin";

let People =
  "https://c4.wallpaperflare.com/wallpaper/125/179/731/path-street-pavement-old-wallpaper-preview.jpg";

const HomeSection2 = () => {
  let image = useRef(null);
  let container = useRef(null);
  let imageReveal = CSSRulePlugin.getRule(".img-container:after");

  let tl = new TimelineLite({ delay: 0.8 });

  useEffect(() => {
    tl.to(container, 0, { css: { visibility: "visible" } });
    tl.to(imageReveal, 1.4, { width: "0%", ease: Power2.easeInOut });
    tl.from(image, 1.4, {
      scale: 1.6,
      ease: Power2.easeInOut,
      delay: -0.9,
    });
  });

  return (
    <section className="main2">
      <p>Guess the place</p>
      <div className="container2" ref={(el) => (container = el)}>
        <>
          <div className="image-container">
            <img
              ref={(el) => {
                image = el;
              }}
              src={People}
              alt="paris"
            />
          </div>
        </>
      </div>
    </section>
  );
};

export default HomeSection2;
