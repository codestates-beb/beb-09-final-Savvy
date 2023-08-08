import React from "react";
import MainHeader from "../components/MainHeader";
import MainFooter from "../components/MainFooter";
import ScrollupButton from "../components/ScrollupButton";
import HomePageZero from "../components/HomePageZero";
import HomePageFirst from "../components/HomePageFirst";
import HomePageSecond from "../components/HomePageSecond";
import HomePageThird from "../components/HomePageThird";
import HomePageFourth from "../components/HomePageFourth";
import HomePageFifth from "../components/HomePageFifth";
import HomePageFinal from "../components/HomePageFinal";

export default function HomePage() {
  return (
    <div>
      <MainHeader />
      <ScrollupButton />
      <HomePageZero />
      <HomePageFirst />
      <HomePageSecond />
      <HomePageThird />
      <HomePageFourth />
      <HomePageFifth />
      <HomePageFinal />
      <MainFooter />
    </div>
  );
}
