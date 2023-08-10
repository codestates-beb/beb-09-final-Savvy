import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const preventCopy = (e) => {
  e.preventDefault();
};

const preventRightClick = (e) => {
  e.preventDefault();
};

const HomePageFirst = () => {
  const baseSpeed = 3000;
  const settings = {
    dots: false,
    infinite: true,
    speed: baseSpeed,
    slidesToShow: 9,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    arrows: false,
    cssEase: "linear",
    pauseOnHover: false,
    pauseOnFocus: false,
    rtl: false,
    lazyLoad: "ondemand",
    responsive: [
      {
        breakpoint: 1800,
        settings: {
          slidesToShow: 11,
        },
      },
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 9,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 7,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };


  const baseImageUrl = process.env.PUBLIC_URL;
  const imageUrls = [
    "/coin1.png",
    "/coin2.png",
    "/coin3.png",
    "/coin4.png",
    "/coin5.png",
    "/coin6.png",
    "/coin7.png",
    "/coin8.png",
    "/coin9.png",
    "/coin10.png",
    "/coin11.png",
    "/coin12.png",
    "/coin13.png",
    "/coin14.png",
    "/coin15.png",
    "/coin16.png",
    "/coin1.png",
    "/coin2.png",
    "/coin3.png",
    "/coin4.png",
    "/coin5.png",
    "/coin6.png",
    "/coin7.png",
    "/coin8.png",
    "/coin9.png",
    "/coin10.png",
    "/coin11.png",
    "/coin12.png",
    "/coin13.png",
    "/coin14.png",
    "/coin15.png",
    "/coin16.png",
  ];

  return (
    <div
      style={{
        backgroundColor: "#000",
        height: "90px",
        paddingTop: "30px",
        padding: "0 2%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          width: "50%",
          background:
            "linear-gradient(to right, #000 0%, rgba(0, 0, 0, 0.1) 100%)",
          zIndex: 2,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          width: "50%",
          background:
            "linear-gradient(to left, #000 0%, rgba(0, 0, 0, 0.1) 100%)",
          zIndex: 2,
        }}
      />
      <Slider {...settings} style={{ overflow: "visible", zIndex: 1 }}>
        {imageUrls.map((imageUrl, index) => (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "0 10px",
              width: "90px",
            }}
            key={index}
          >
            <img
              src={baseImageUrl + imageUrl}
              alt={`Image ${index + 1}`}
              style={{
                width: "55px",
                height: "auto",
              }}
              onDragStart={preventCopy}
              onMouseDown={preventCopy}
              onContextMenu={preventRightClick}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HomePageFirst;
