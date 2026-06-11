import { useState, useEffect } from "react";
import { Navigation } from "./components/navigation";
import { Header } from "./components/header";
import { About } from "./components/about";
import { Speaker } from "./components/speaker";
import { Services } from "./components/services";
import { Gallery } from "./components/gallery";
import { Team } from "./components/Team";
import { Contact } from "./components/contact";
import { RegistrationHero } from "./components/registrationHero";
import { ClosedRegistrationPage } from "./components/closedRegistrationPage";
import { Footer } from "./components/footer";
import JsonData from "./data/data.json";
import "./App.css";

const App = () => {
  const [landingPageData, setLandingPageData] = useState({});

  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  useEffect(() => {
    if (window.location.pathname === "/registro" || window.location.pathname === "/deportes") return;
    if (Object.keys(landingPageData).length === 0) return;

    let lastScrollY = window.scrollY;
    let lastScrollTime = performance.now();
    let scrollSpeed = 0;

    const updateScrollSpeed = () => {
      const now = performance.now();
      const distance = Math.abs(window.scrollY - lastScrollY);
      const elapsed = Math.max(now - lastScrollTime, 1);

      scrollSpeed = distance / elapsed;
      lastScrollY = window.scrollY;
      lastScrollTime = now;
    };

    const observerOptions = {
      root: null,
      rootMargin: "0px 0px -12% 0px",
      threshold: 0.18,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const revealItems = entry.target.querySelectorAll(".reveal-scroll-item");
          const shouldAnimate = window.scrollY > 80 && scrollSpeed < 0.9;

          entry.target.classList.add("is-visible");
          entry.target.classList.toggle("has-scroll-animation", shouldAnimate);

          revealItems.forEach((item, index) => {
            item.style.setProperty("--reveal-delay", `${Math.min(index, 6) * 85}ms`);
          });

          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const revealSections = document.querySelectorAll(".reveal-scroll-section");

    const timer = setTimeout(() => {
      revealSections.forEach((section) => observer.observe(section));
    }, 100);

    window.addEventListener("scroll", updateScrollSpeed, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", updateScrollSpeed);
      revealSections.forEach((section) => observer.unobserve(section));
    };
  }, [landingPageData]);

  if (window.location.pathname === "/registro") {
    return (
      <div className="registration-page">
        <div>
          <Navigation />
          <RegistrationHero data={landingPageData.Header} />
        </div>
        <Contact data={landingPageData.Contact} />
        <Footer />
      </div>
    );
  }

  if (window.location.pathname === "/deportes") {
    return (
      <div className="registration-page">
        <div>
          <Navigation />
          <RegistrationHero
            data={landingPageData.Header}
            titleLight="Inscripción"
            titleStrong="Deportes"
          />
        </div>
        <ClosedRegistrationPage />
        <Footer />
      </div>
    );
  }

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
        <Speaker data={landingPageData.Speaker} />
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
      <Footer />
    </div>
  );
};

export default App;
