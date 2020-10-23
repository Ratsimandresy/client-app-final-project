import React from "react";
import "../../styles/HomeGalery.css";

const HomeGalery = () => {
  return (
    <div className="galery">
      <section id="about" className="section-b">
        <div className="overlay">
          <div className="section-b-inner py-5">
            <h3 data-aos="fade-up" data-aos-delay="1200" className="text-2">
              Discover & Share{" "}
            </h3>
            <h2
              data-aos="fade-up"
              data-aos-delay="1500"
              className="text-5 mt-1"
            >
              People Aren't Knowing what's going on in Paris
            </h2>
            <p data-aos="fade-up" data-aos-delay="1700" className="mt-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
              repudiandae laboriosam quia, error tempore porro ducimus voluptate
              laborum nostrum iure.
            </p>
          </div>
        </div>
      </section>

      <section className="section-c">
        <div className="gallery">
          <a href="https://i.ibb.co/CHLBZnp/gal2323.jpg" className="big">
            <img
              data-aos="fade-up"
              data-aos-delay="1400"
              src="https://i.guim.co.uk/img/media/a9cc0d5c101426c497eb995dc0a1bff2db35e22d/0_289_5135_3081/master/5135.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=3e0f61dd302d8bdb4000f7485f3ddf7d"
              alt="img"
            />
          </a>
          <a href="https://i.ibb.co/4pBbhfY/gal39834.jpg" className="big">
            <img
              data-aos="fade-up"
              data-aos-delay="1600"
              src="https://c1.wallpaperflare.com/preview/564/910/477/people-man-nyc.jpg"
              alt="guitare"
            />
          </a>
          <a href="https://i.ibb.co/xSnHP7g/gal43884.jpg" className="big">
            <img
              data-aos="fade-up"
              data-aos-delay="1800"
              src="https://i.insider.com/5eba86ff3dac9a5a4d1dca9b?width=1100&format=jpeg&auto=webp"
              alt="img"
            />
          </a>
          <a href="https://i.ibb.co/QN6Bnrb/gal4958.jpg" className="big">
            <img
              data-aos="fade-up"
              data-aos-delay="2000"
              src="https://www.salutparis.fr/wp-content/uploads/2015/12/jardin-du-luxembourg-et-senat-en-1919-1024x707.jpg"
              alt=""
            />
          </a>
          <a href="https://i.ibb.co/dGZvj75/gal4545.jpg" className="big">
            <img
              data-aos="fade-up"
              data-aos-delay="2200"
              src="https://c1.wallpaperflare.com/preview/191/588/962/musician-street-paris-accordion.jpg"
              alt="img"
            />
          </a>
          <a href="https://i.ibb.co/S6FVFNt/gal74744.jpg" className="big">
            <img
              data-aos="fade-up"
              data-aos-delay="2400"
              src="https://p4.wallpaperbetter.com/wallpaper/484/936/947/paris-girls-music-the-city-wallpaper-preview.jpg"
              alt="img"
            />
          </a>
        </div>
      </section>
    </div>
  );
};

export default HomeGalery;
//
