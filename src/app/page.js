import Link from "next/link";

import Hero from "./components/layout/Hero";
import HomeMenu from "@/app/components/layout/HomeMenu";
import SectionHeaders from "./components/layout/SectionHeaders";

export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section className="text-center my-16" id="about">
        <SectionHeaders subHeader="Our Story" mainHeader="About Us" />
        <div className="max-w-md mx-auto">
          <p className="text-gray-500 mt-4">Learn more about our journey and the passion behind our dishes.</p>
          <p className="text-gray-500 mt-4">We believe in using the freshest ingredients and traditional recipes to create unforgettable flavors.</p>
          <p className="text-gray-500 mt-4">Join us in celebrating the love for food and community.</p>
        </div>
      </section>

      <section className="text-center my-16" id="contact">
        <SectionHeaders subHeader="Don't hesitate" mainHeader="Contact Us" />
        <div className="max-w-md mt-8 mx-auto">
          <a className="text-4xl underline text-gray-500" href="tel:+01125483909">+01125483909</a>
        </div>
      </section>
    </>

  );
}
