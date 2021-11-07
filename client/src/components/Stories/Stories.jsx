import React from "react";
import Story from "./Story";
import Slider from "react-slick";
import AddStory from "./AddStory";
import "./styles/Stories.css";

function Stories() {
  const settings = {
    dots: false,
    slidesToShow: 7,
    buttons: false,
    arrows: false,
    slidesToScroll: true,
    touchToMove: true,
    infinite: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          autoPlay: false,
          slidesToShow: 7,
          slidesToScroll: 3,
          arrows: false,
        },
      },
      {
        breakpoint: 650,
        settings: {
          autoPlay: false,
          slidesToShow: 6,
          slidesToScroll: 3,
          arrows: false,
        },
      },
      {
        breakpoint: 520,
        settings: {
          autoPlay: false,
          slidesToShow: 4,
          slidesToScroll: 3,
          arrows: false,
        },
      },
    ],
  };

  return (
    <Slider {...settings} className="stories">
      <AddStory />
      <Story></Story>
      <Story></Story>
      <Story></Story>
      <Story></Story>
      <Story></Story>
      <Story></Story>
      <Story></Story>
    </Slider>
  );
}

export default Stories;
