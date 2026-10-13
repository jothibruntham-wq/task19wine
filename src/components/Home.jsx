import { useEffect, useRef, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  EffectFade,
  Keyboard,
  Mousewheel,
  Navigation,
} from "swiper/modules";

import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";

import "swiper/css";
import "swiper/css/effect-fade";
import "../assets/style/style.css";

import bottleExotic from "../assets/images/wine-bottle-exotic.png";
import bottleVelvet from "../assets/images/wine-bottle-red.png";
import bottleGold from "../assets/images/wine-bottle-gold.png";
import bottleSparkling from "../assets/images/wine-bottle.png";
import bottleCitrus from "../assets/images/wine-bottle-green.png";

import fruitPassion from "../assets/fruits/passionfruit.svg";
import fruitFig from "../assets/fruits/fig.svg";
import fruitLime from "../assets/fruits/lime.svg";
import fruitStrawberry from "../assets/fruits/strawberry.svg";
import fruitLemon from "../assets/fruits/lemon.svg";

/* =========================================================
   WINE DATA
   ========================================================= */

const WINES = [
  {
    id: "exotic",
    title: "Exotic",

    bg: "#c9b8ff",
    modalBg: "#2f2b57",

    bottle: bottleExotic,
    fruit: fruitPassion,

    varietal: "Chenin Blanc, Viognier",
    abv: "12.5%",
    vintage: "2022",

    tags: [
      "Passion fruit",
      "Mango",
      "Honey",
      "Apricot",
    ],

    notes:
      "Ripe tropical fruit with a silky, honeyed finish. Serve chilled.",
  },

  {
    id: "velvet",
    title: "Velvet",

    bg: "#ee7589",
    modalBg: "#4a2433",

    bottle: bottleVelvet,
    fruit: fruitFig,

    varietal: "Merlot, Malbec",
    abv: "14%",
    vintage: "2020",

    tags: [
      "Black fig",
      "Plum",
      "Cocoa",
      "Vanilla",
    ],

    notes:
      "Soft tannins and dark fruit. Decant for 30 minutes before pouring.",
  },

  {
    id: "golden",
    title: "Golden",

    bg: "#ffd98a",
    modalBg: "#47391c",

    bottle: bottleGold,
    fruit: fruitLime,

    varietal: "Chardonnay",
    abv: "13%",
    vintage: "2021",

    tags: [
      "Lime zest",
      "Pear",
      "Butter",
      "Oak",
    ],

    notes:
      "Round and bright, with a clean mineral edge.",
  },

  {
    id: "sparkling",
    title: "Sparkling",

    bg: "#ffc8b0",
    modalBg: "#4a2f2f",

    bottle: bottleSparkling,
    fruit: fruitStrawberry,

    varietal: "Pinot Noir, Chardonnay",
    abv: "11.5%",
    vintage: "NV",

    tags: [
      "Strawberry",
      "Brioche",
      "Citrus",
      "Fine bubbles",
    ],

    notes:
      "Lively mousse with red berry freshness. Best served very cold.",
  },

  {
    id: "citrus",
    title: "Citrus",

    bg: "#93cfb0",
    modalBg: "#1f3d34",

    bottle: bottleCitrus,
    fruit: fruitLemon,

    varietal: "Sauvignon Blanc",
    abv: "12%",
    vintage: "2023",

    tags: [
      "Lemon",
      "Lime",
      "Green apple",
      "Herbs",
    ],

    notes:
      "Crisp, zesty and mouth-watering. Pairs with seafood and salads.",
  },
];

/* =========================================================
   AUTOPLAY
   ========================================================= */

const AUTOPLAY_MS = 3200;

/* =========================================================
   TITLE LETTERS
   ========================================================= */

const Letters = ({ text }) => (
  <span className="title-mask" aria-label={text}>
    {text.split("").map((char, index) => (
      <span
        className="char"
        key={index}
        aria-hidden="true"
      >
        {char}
      </span>
    ))}

    <span
      className="char"
      aria-hidden="true"
    >
      .
    </span>
  </span>
);

/* =========================================================
   HOME
   ========================================================= */

export default function Home() {
  const rootRef = useRef(null);
  const swiperRef = useRef(null);
  const prevIndex = useRef(null);

  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const [cycle, setCycle] = useState(0);

  /* =======================================================
     GSAP SLIDE ANIMATION
     ======================================================= */

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prev = prevIndex.current;

      /* Calculate direction of slide movement */
      let direction = 1;
      if (prev !== null) {
        if (active > prev) {
          direction = active === WINES.length - 1 && prev === 0 ? -1 : 1;
        } else if (active < prev) {
          direction = active === 0 && prev === WINES.length - 1 ? 1 : -1;
        }
      }

      /* ---------------------------------------------------
         OUTGOING SLIDE - BOTTLE ROTATES OUT
         --------------------------------------------------- */

      if (prev !== null && prev !== active) {
        gsap.to(
          `.slide-${prev} .bottle-img`,
          {
            rotate: 65 * direction,
            rotateY: 45 * direction,
            xPercent: 35 * direction,
            yPercent: -15,
            opacity: 0,
            scale: 0.8,
            duration: 0.65,
            ease: "power2.in",
          }
        );

        gsap.to(
          `.slide-${prev} .char`,
          {
            yPercent: -110,
            duration: 0.5,
            stagger: 0.02,
            ease: "power3.in",
          }
        );

        gsap.to(
          `.slide-${prev} .fruit`,
          {
            scale: 0,
            duration: 0.4,
            ease: "back.in(2)",
          }
        );
      }

      /* ---------------------------------------------------
         INCOMING TIMELINE - BOTTLE ROTATES IN
         --------------------------------------------------- */

      const tl = gsap.timeline({
        delay: prev === null ? 0.15 : 0.2,
      });

      /* Bottle Rotating Transition */

      tl.fromTo(
        `.slide-${active} .bottle-img`,

        {
          rotate: -75 * direction,
          rotateY: -45 * direction,
          xPercent: -35 * direction,
          yPercent: 20,
          opacity: 0,
          scale: 0.82,
        },

        {
          rotate: 0,
          rotateY: 0,
          xPercent: 0,
          yPercent: 0,
          opacity: 1,
          scale: 1,
          duration: 1.15,
          ease: "power3.out",
        },

        0
      )

        /* Title */

        .fromTo(
          `.slide-${active} .char`,

          {
            yPercent: 110,
          },

          {
            yPercent: 0,
            duration: 0.9,
            stagger: 0.05,
            ease: "power4.out",
          },

          0.1
        )

        /* Fruits */

        .fromTo(
          `.slide-${active} .fruit`,

          {
            scale: 0,
            rotate: -120,
          },

          {
            scale: 1,
            rotate: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: "back.out(1.8)",
          },

          0.35
        );

      /* ---------------------------------------------------
         FLOATING SVG FRUITS
         --------------------------------------------------- */

      gsap.to(
        `.slide-${active} .fruit-inner`,
        {
          y: "random(-14, 14)",
          x: "random(-8, 8)",
          rotate: "random(-12, 12)",
          duration: "random(1.8, 2.6)",
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          repeatRefresh: true,
          stagger: 0.3,
        }
      );

      /* ---------------------------------------------------
         FLOATING BOTTLE (WITH GENTLE ROCKING ROTATION)
         --------------------------------------------------- */

      gsap.to(
        `.slide-${active} .bottle-float`,
        {
          y: -12,
          rotate: 2.5,
          duration: 2.4,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        }
      );
    }, rootRef);

    prevIndex.current = active;

    return () => ctx.revert();
  }, [active]);

  /* =======================================================
     STOP AUTOPLAY WHEN MODAL IS OPEN
     ======================================================= */

  useEffect(() => {
    const swiper = swiperRef.current;

    if (!swiper || !swiper.autoplay) {
      return;
    }

    if (open) {
      swiper.autoplay.stop();
    } else {
      swiper.autoplay.start();
    }
  }, [open]);

  /* =======================================================
     ESC CLOSE MODAL
     ======================================================= */

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener(
      "keydown",
      onKey
    );

    return () => {
      window.removeEventListener(
        "keydown",
        onKey
      );
    };
  }, []);

  const wine = WINES[active];

  /* =======================================================
     JSX
     ======================================================= */

  return (
    <main
      className="home"
      ref={rootRef}
    >
      {/* =================================================
          SWIPER
          ================================================= */}

      <Swiper
        modules={[
          Autoplay,
          EffectFade,
          Keyboard,
          Mousewheel,
          Navigation,
        ]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => {
          setActive(swiper.realIndex);
          setCycle((count) => count + 1);
        }}
        effect="fade"
        fadeEffect={{
          crossFade: true,
        }}
        speed={900}
        loop
        autoplay={{
          delay: AUTOPLAY_MS,
          disableOnInteraction: false,
        }}
        keyboard={{
          enabled: true,
        }}
        mousewheel={{
          forceToAxis: true,
          thresholdDelta: 20,
          releaseOnEdges: false,
        }}
        navigation={{
          prevEl: ".nav-prev",
          nextEl: ".nav-next",
        }}
        className="wine-swiper"
      >
        {WINES.map((wineItem, index) => (
          <SwiperSlide
            key={wineItem.id}
            className={`slide slide-${index}`}
            style={{
              background: wineItem.bg,
            }}
          >
            {/* ==========================================
                4 SIDES SVG FRUITS
                ========================================== */}

            {/* TOP-LEFT SVG FRUIT */}
            <div className="fruit fruit-tl fruit-left">
              <img
                className="fruit-inner"
                src={wineItem.fruit}
                alt=""
                draggable="false"
              />
            </div>

            {/* TOP-RIGHT SVG FRUIT */}
            <div className="fruit fruit-tr fruit-right">
              <img
                className="fruit-inner"
                src={wineItem.fruit}
                alt=""
                draggable="false"
              />
            </div>

            {/* BOTTOM-LEFT SVG FRUIT */}
            <div className="fruit fruit-bl fruit-bottom-left">
              <img
                className="fruit-inner"
                src={wineItem.fruit}
                alt=""
                draggable="false"
              />
            </div>

            {/* BOTTOM-RIGHT SVG FRUIT */}
            <div className="fruit fruit-br fruit-bottom-right">
              <img
                className="fruit-inner"
                src={wineItem.fruit}
                alt=""
                draggable="false"
              />
            </div>

            {/* ==========================================
                BIG TITLE
                ========================================== */}

            <h1 className="title">
              <Letters
                text={wineItem.title}
              />
            </h1>

            {/* ==========================================
                BOTTLE
                ========================================== */}

            <button
              className="bottle"
              onClick={() => setOpen(true)}
              aria-label={`Open ${wineItem.title} details`}
            >
              {!(
                open &&
                active === index
              ) && (
                <motion.div
                  layoutId={`bottle-${wineItem.id}`}
                  className="bottle-motion"
                >
                  <div className="bottle-float">
                    <img
                      className="bottle-img"
                      src={wineItem.bottle}
                      alt={`${wineItem.title} wine bottle`}
                      draggable="false"
                    />
                  </div>
                </motion.div>
              )}
            </button>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* =================================================
          PREVIOUS BUTTON
          ================================================= */}

      <button
        className="nav nav-prev"
        aria-label="Previous wine"
      >
        <svg
          viewBox="0 0 24 24"
          width="22"
          height="22"
        >
          <path
            d="M15 5l-7 7 7 7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* =================================================
          NEXT BUTTON
          ================================================= */}

      <button
        className="nav nav-next"
        aria-label="Next wine"
      >
        <svg
          viewBox="0 0 24 24"
          width="22"
          height="22"
        >
          <path
            d="M9 5l7 7-7 7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* =================================================
          PROGRESS
          ================================================= */}

      <div
        className="progress"
        aria-hidden="true"
      >
        <motion.span
          key={cycle}
          className="progress-bar"
          initial={{
            scaleX: 0,
          }}
          animate={{
            scaleX: open ? 0 : 1,
          }}
          transition={{
            duration: AUTOPLAY_MS / 1000,
            ease: "linear",
          }}
        />
      </div>

      {/* =================================================
          DETAILS MODAL
          ================================================= */}

      <AnimatePresence>
        {open && (
          <motion.div
            className="backdrop"
            style={{
              background: `${wine.modalBg}e6`,
            }}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.35,
            }}
            onClick={() => setOpen(false)}
          >
            <motion.section
              className="modal"
              role="dialog"
              aria-modal="true"
              aria-label={`${wine.title} details`}
              initial={{
                opacity: 0,
                y: 40,
                scale: 0.94,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 40,
                scale: 0.94,
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 26,
              }}
              onClick={(event) =>
                event.stopPropagation()
              }
            >
              {/* CLOSE */}

              <button
                className="modal-close"
                onClick={() => setOpen(false)}
                aria-label="Close"
              >
                ×
              </button>

              {/* MODAL BOTTLE */}

              <div className="modal-bottle">
                <motion.div
                  layoutId={`bottle-${wine.id}`}
                  className="modal-bottle-motion"
                >
                  <img
                    src={wine.bottle}
                    alt={`${wine.title} wine bottle`}
                    draggable="false"
                  />
                </motion.div>
              </div>

              {/* MODAL CONTENT */}

              <div className="modal-body">
                <motion.h2
                  initial={{
                    opacity: 0,
                    y: 14,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.15,
                  }}
                >
                  {wine.title}
                </motion.h2>

                <motion.p
                  className="modal-sub"
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  transition={{
                    delay: 0.2,
                  }}
                >
                  {wine.notes}
                </motion.p>

                {/* STATS */}

                <motion.div
                  className="stats"
                  initial="hidden"
                  animate="show"
                  variants={{
                    show: {
                      transition: {
                        staggerChildren: 0.07,
                        delayChildren: 0.25,
                      },
                    },
                  }}
                >
                  {[
                    [
                      "Varietal",
                      wine.varietal,
                    ],
                    [
                      "ABV",
                      wine.abv,
                    ],
                    [
                      "Vintage",
                      wine.vintage,
                    ],
                  ].map(
                    ([label, value]) => (
                      <motion.div
                        className="stat"
                        key={label}
                        variants={{
                          hidden: {
                            opacity: 0,
                            y: 12,
                          },
                          show: {
                            opacity: 1,
                            y: 0,
                          },
                        }}
                      >
                        <span className="stat-label">
                          {label}
                        </span>

                        <strong>
                          {value}
                        </strong>
                      </motion.div>
                    )
                  )}
                </motion.div>

                {/* TAGS */}

                <motion.ul
                  className="tags"
                  initial="hidden"
                  animate="show"
                  variants={{
                    show: {
                      transition: {
                        staggerChildren: 0.05,
                        delayChildren: 0.4,
                      },
                    },
                  }}
                >
                  {wine.tags.map(
                    (tag) => (
                      <motion.li
                        key={tag}
                        variants={{
                          hidden: {
                            opacity: 0,
                            scale: 0.8,
                          },
                          show: {
                            opacity: 1,
                            scale: 1,
                          },
                        }}
                      >
                        {tag}
                      </motion.li>
                    )
                  )}
                </motion.ul>

                {/* CTA */}

                <motion.button
                  className="cta"
                  whileHover={{
                    scale: 1.03,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  onClick={() =>
                    alert(
                      `${wine.title} added to cart`
                    )
                  }
                >
                  Add to cart
                </motion.button>
              </div>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}