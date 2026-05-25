import { useState, useEffect } from "react";
import { Navigation } from "./components/navigation";
import { Header } from "./components/header";
import { About } from "./components/about";
import { Services } from "./components/services";
import { Gallery } from "./components/gallery";
import { Team } from "./components/Team";
import { Contact } from "./components/contact";
import JsonData from "./data/data.json";
import "./App.css";

const App = () => {
  const [landingPageData, setLandingPageData] = useState({});

  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  useEffect(() => {
    if (Object.keys(landingPageData).length === 0) return;

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll(".reveal-scroll-section");

    const timer = setTimeout(() => {
      revealElements.forEach((el) => observer.observe(el));
    }, 100);

    return () => {
      clearTimeout(timer);
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, [landingPageData]);

  return (
    <div>
      <Navigation />
      <div className="reveal-onload">
        <Header data={landingPageData.Header} />
      </div>
      <div className="reveal-scroll-section">
        <About data={landingPageData.About} />
      </div>
      <div className="reveal-scroll-section">
        <Services data={landingPageData.Services} />
      </div>
      <div className="reveal-scroll-section">
        <Gallery data={landingPageData.Gallery} />
      </div>
      <div className="reveal-scroll-section">
        <Team data={landingPageData.Team} />
      </div>
      <div className="reveal-scroll-section">
        <Contact data={landingPageData.Contact} />
      </div>
    </div>
  );
};

export default App;
