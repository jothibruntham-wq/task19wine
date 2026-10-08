import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative, Mousewheel } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

import "swiper/css";
import "swiper/css/effect-creative";
import "../assets/style/style.css";

import bottleClassic from "../assets/images/wine-bottle.png";
import bottleRed from "../assets/images/wine-bottle-red.png";
import bottleGold from "../assets/images/wine-bottle-gold.png";
import bottleGreen from "../assets/images/wine-bottle-green.png";
import bottleExotic from "../assets/images/wine-bottle-exotic.png";

const wines = [
  {
    id: 0,
    name: "Classic.",
    subtitle: "A timeless wine experience",
    background: "#bca9ff",
    bottle: bottleClassic,
    fruits: ["🍋", "🍋"],
    accent: "#ffffff",
  },
  {
    id: 1,
    name: "Velvet.",
    subtitle: "Smooth. Rich. Elegant.",
    background: "#ee7088",
    bottle: bottleRed,
    fruits: ["🍒", "🍒"],
    accent: "#ffffff",
  },
  {
    id: 2,
    name: "Golden.",
    subtitle: "Bright golden character",
    background: "#ffdc7b",
    bottle: bottleGold,
    fruits: ["🍋", "🍋"],
    accent: "#ffffff",
  },
  {
    id: 3,
    name: "Fresh.",
    subtitle: "Light and refreshing",
    background: "#91d1b7",
    bottle: bottleGreen,
    fruits: ["🍃", "🍃"],
    accent: "#ffffff",
  },
  {
    id: 4,
    name: "Exotic.",
    subtitle: "Discover something different",
    background: "#81e11b",
    bottle: bottleExotic,
    fruits: ["🍊", "🍊"],
    accent: "#ffffff",
  },
];

export default function Home() {
  const swiperRef = useRef(null);
  const stageRef = useRef(null);

  const [swiperSlideIndex, setSwiperSlideIndex] = useState(0);
  const [activeWine, setActiveWine] = useState(wines[0]);

  /*
   * GSAP animation for every slide
   */
  const animateSlide = (swiper, index) => {
    const slide = swiper.slides[index];

    if (!slide) return;

    const bottle = slide.querySelector(".wine-bottle");
    const title = slide.querySelector(".wine-title");
    const subtitle = slide.querySelector(".wine-subtitle");
    const fruitItems = slide.querySelectorAll(".fruit");
    const line = slide.querySelector(".bottom-line");

    // Kill previous animations
    gsap.killTweensOf([
      bottle,
      title,
      subtitle,
      fruitItems,
      line,
    ]);

    // Initial position
    gsap.set(bottle, {
      y: 40,
      scale: 0.75,
      rotate: -5,
      opacity: 0,
    });

    gsap.set(title, {
      y: 50,
      opacity: 0,
      scale: 0.9,
    });

    gsap.set(subtitle, {
      y: 25,
      opacity: 0,
    });

    gsap.set(fruitItems, {
      scale: 0,
      opacity: 0,
    });

    gsap.set(line, {
      scaleX: 0,
      transformOrigin: "center",
    });

    /*
     * Bottle animation
     */
    gsap.to(bottle, {
      y: 0,
      scale: 1,
      rotate: 0,
      opacity: 1,
      duration: 0.85,
      ease: "back.out(1.6)",
    });

    /*
     * Main title
     */
    gsap.to(title, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.75,
      delay: 0.12,
      ease: "power3.out",
    });

    /*
     * Subtitle
     */
    gsap.to(subtitle, {
      y: 0,
      opacity: 1,
      duration: 0.55,
      delay: 0.28,
      ease: "power2.out",
    });

    /*
     * Fruit animation
     */
    gsap.to(fruitItems, {
      scale: 1,
      opacity: 1,
      duration: 0.65,
      delay: 0.25,
      stagger: 0.12,
      ease: "back.out(2)",
    });

    /*
     * Bottom line
     */
    gsap.to(line, {
      scaleX: 1,
      duration: 0.6,
      delay: 0.35,
      ease: "power2.out",
    });

    /*
     * Continuous bottle floating
     */
    gsap.to(bottle, {
      y: -8,
      duration: 1.8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 0.9,
    });
  };

  /*
   * Swiper slide changed
   */
  const handleSlideChange = (swiper) => {
    const index = swiper.realIndex;

    setSwiperSlideIndex(index);
    setActiveWine(wines[index]);

    animateSlide(swiper, index);
  };

  /*
   * First animation
   */
  useEffect(() => {
    if (!swiperRef.current) return;

    const timer = setTimeout(() => {
      animateSlide(swiperRef.current, 0);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  /*
   * Keyboard controls
   */
  useEffect(() => {
    const handleKeyboard = (event) => {
      if (!swiperRef.current) return;

      if (event.key === "ArrowRight") {
        swiperRef.current.slideNext();
      }

      if (event.key === "ArrowLeft") {
        swiperRef.current.slidePrev();
      }
    };

    window.addEventListener("keydown", handleKeyboard);

    return () => {
      window.removeEventListener("keydown", handleKeyboard);
    };
  }, []);

  /*
   * Automatic carousel
   */
  useEffect(() => {
    const interval = setInterval(() => {
      if (swiperRef.current) {
        swiperRef.current.slideNext();
      }
    }, 4200);

    return () => clearInterval(interval);
  }, []);

  return (
    <main
      ref={stageRef}
      className="wine-page"
      style={{
        "--active-background": activeWine.background,
      }}
    >
      <div className="wine-frame">

        {/* Background transition */}
        <AnimatePresence mode="sync">
          <motion.div
            key={activeWine.id}
            className="background-layer"
            style={{
              background: activeWine.background,
            }}
            initial={{
              opacity: 0,
              scale: 1.08,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 0.98,
            }}
            transition={{
              duration: 0.65,
              ease: "easeInOut",
            }}
          />
        </AnimatePresence>

        {/* Top branding */}
        <div className="top-bar">
          <div className="logo">
            WINE<span>°</span>
          </div>

          <div className="slide-counter">
            {String(swiperSlideIndex + 1).padStart(2, "0")} /
            {" "}
            {String(wines.length).padStart(2, "0")}
          </div>
        </div>

        {/* Main Swiper */}
        <Swiper
          className="wine-swiper"
          modules={[EffectCreative, Mousewheel]}
          effect="creative"
          speed={1000}
          slidesPerView={1}
          centeredSlides={true}
          loop={true}
          grabCursor={true}
          mousewheel={{
            forceToAxis: true,
            sensitivity: 0.7,
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={handleSlideChange}
          creativeEffect={{
            prev: {
              translate: ["-110%", 0, -250],
              rotate: [0, -8, 0],
              opacity: 0,
            },
            next: {
              translate: ["110%", 0, -250],
              rotate: [0, 8, 0],
              opacity: 0,
            },
          }}
        >
          {wines.map((wine) => (
            <SwiperSlide key={wine.id}>
              <div className="wine-slide">

                {/* Floating decorations */}
                <div className="fruit fruit-left">
                  {wine.fruits[0]}
                </div>

                <div className="fruit fruit-right">
                  {wine.fruits[1]}
                </div>

                <div className="fruit fruit-small-left">
                  ✦
                </div>

                <div className="fruit fruit-small-right">
                  ✦
                </div>

                {/* Large title */}
                <motion.h1
                  className="wine-title"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {wine.name}
                </motion.h1>

                {/* Bottle */}
                <div className="bottle-container">
                  <img
                    className="wine-bottle"
                    src={wine.bottle}
                    alt={wine.name}
                    draggable="false"
                    onLoad={(event) => {
                      gsap.fromTo(
                        event.currentTarget,
                        {
                          opacity: 0,
                          scale: 0.8,
                        },
                        {
                          opacity: 1,
                          scale: 1,
                          duration: 0.8,
                          ease: "back.out(1.5)",
                        }
                      );
                    }}
                  />
                </div>

                {/* Subtitle */}
                <div className="wine-subtitle">
                  {wine.subtitle}
                </div>

                {/* Bottom indicator */}
                <div className="bottom-line" />

              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Bottom controls */}
        <div className="bottom-controls">

          <button
            className="nav-button"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            ←
          </button>

          <div className="progress-container">
            {wines.map((wine, index) => (
              <span
                key={wine.id}
                className={
                  index === swiperSlideIndex
                    ? "progress-dot active"
                    : "progress-dot"
                }
                onClick={() =>
                  swiperRef.current?.slideToLoop(index)
                }
              />
            ))}
          </div>

          <button
            className="nav-button"
            onClick={() => swiperRef.current?.slideNext()}
          >
            →
          </button>

        </div>

      </div>
    </main>
  );
}