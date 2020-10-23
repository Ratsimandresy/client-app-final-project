import React, { useEffect, useRef } from "react";
import "./styles/HomeSection.scss";
import { TimelineLite, TweenMax, Power3 } from "gsap";

let guitare =
  "https://i.pinimg.com/originals/3b/30/f6/3b30f6f77bece943ef26a1803c7beeef.jpg";
let people =
  "https://offrebourses.com/wp-content/uploads/2020/09/college-students-hanging-out-810x540.jpg";
{
  /* <img src={"./logo512.png"} alt="" />; */
}
const HomeSection = () => {
  let app = useRef(null);
  let images = useRef(null);
  let content = useRef(null);
  let tl = new TimelineLite({ delay: 1.2 });

  useEffect(() => {
    const people = images.firstElementChild; // or children[0]
    const guitare = images.lastElementChild;

    const headlineFirst = content.children[0].children[0];
    const headlineSecond = headlineFirst.nextSibling;
    const headlineThird = headlineSecond.nextSibling;
    const contentP = content.children[1];
    const contentButton = content.children[2];

    TweenMax.to(app, 0, { css: { visibility: "visible" } });

    tl.from(people, 1.2, { y: 1280, ease: Power3.easeOut }, "Start")
      .from(
        people.firstElementChild,
        2,
        { scale: 1.6, ease: Power3.easeOut },
        0.2
      )
      .from(guitare, 1.4, { y: 1280, ease: Power3.easeOut }, 0.2)
      .from(
        guitare.firstElementChild,
        2,
        { scale: 1.6, ease: Power3.easeOut },
        0.2
      );

    //Content Animation
    tl.staggerFrom(
      [headlineFirst.children, headlineSecond.children, headlineThird.children],
      1,
      {
        y: 44,
        ease: Power3.easeOut,
        delay: 0.8,
      },
      0.15,
      "Start"
    )
      .from(contentP, 1, { y: 20, opacity: 0, ease: Power3.easeOut }, 1.4)
      .from(contentButton, 1, { y: 20, opacity: 0, ease: Power3.easeOut }, 1.6);
  }, [tl]);

  return (
    <div className="hero" ref={(el) => (app = el)}>
      <div className="container">
        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-content-inner" ref={(el) => (content = el)}>
              <h1>
                <div className="hero-content-line">
                  <div className="hero-content-line-inner">
                    Being with people
                  </div>
                </div>
                <div className="hero-content-line">
                  <div className="hero-content-line-inner">
                    enjoying some company
                  </div>
                </div>
                <div className="hero-content-line">
                  <div className="hero-content-line-inner">is benefic</div>
                </div>
              </h1>
              <p>
                Expend your your environment, meet new friends, share your
                passion, enjoy your life.
              </p>
              <div className="btn-row">
                <button className="explore-button">
                  Check
                  <div className="arrow-icon">
                    <img
                      src="https://i.pinimg.com/originals/fc/a8/eb/fca8ebcaf5c8a070cda8f917d6b83b1b.png"
                      alt="row"
                    />
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div className="hero-images">
            <div ref={(el) => (images = el)} className="hero-images-inner">
              <div className="hero-image girl">
                <img src={people} alt="girl" />
              </div>
              <div className="hero-image boy">
                <img src={guitare} alt="boy" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSection;
