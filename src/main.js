import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(
  ScrollTrigger,
  ScrollSmoother,
  SplitText,
  ScrollToPlugin,
  Flip
);

ScrollSmoother.create({
  smooth: 1, 
  effects: true, 
  smoothTouch: 0.1, 
});

let landingText = SplitText.create(".maintext h1", {
  type: "chars",
  mask: "chars",
});
let alagtext = SplitText.create(".alagtext", {
  type: "words",
  mask: "lines",
});

window.addEventListener("load", () => {
  const counter = document.querySelector(".counter");
  const images = document.querySelectorAll("img");
  const underline = document.querySelector(".underline");
  const imageLength = images.length;
  let to_load = 0;
  const tl_loaded = gsap
    .timeline({ paused: true })
    .to(".loadingtext", {
      autoAlpha: 0,
      duration: 0.5,
      ease: "power2.inOut",
    })
    .to(
      ".colordiv",
      {
        y: "-100%",
        duration: 1,
        stagger: {
          each: 0.04,
          from: "edges",
        },
        ease: "expo.inOut",
      },
      "a"
    )
    .from(
      ".scaleImage",
      {
        scale: 2,
        duration: 2.5,
        ease: "expo.out",
      },
      "a"
    )
    .from(
      landingText.chars,
      {
        y: "100%",
        duration: 1.3,
        ease: "power2.out",
        stagger: 0.03,
      },
      "a"
    )
    .from(
      alagtext.words,
      {
        y: "100%",
        duration: 1.5,
        ease: "power2.out",
        stagger: 0.08,
      },
      "a"
    );

  const itemLoaded = () => {
    to_load++;
    const percent = ((to_load / imageLength) * 100).toFixed(0);
    counter.textContent = `${percent}%`;
    underline.style.width = `${percent}%`;
    if (to_load == imageLength) {
      tl_loaded.play(0);
    }
  };

  const preloadImage = (image) => {
    return new Promise((resolve) => {
      image.onload = resolve;
    });
  };

  gsap.set(".loadingtext", {
    autoAlpha: 0,
  });

  const tl_namaste = gsap
    .timeline()
    .from(".namaste", {
      autoAlpha: 0,
      duration: 1,
      ease: "power2.inOut",
    })
    .to(".namaste", {
      delay: 1,
      autoAlpha: 0,
      duration: 1,
      ease: "power2.inOut",
    })
    .to(".loadingtext", {
      autoAlpha: 1,
      duration: 1.5,
      ease: "power2.inOut",
      onComplete: () => {
        chalo();
      },
    });
  const chalo = () => {
    images.forEach((img) => {
      img.src = `${img.dataset.src}`;
      preloadImage(img).then(() => {
        itemLoaded();
      });
    });
  };

  // document.querySelector(".loader").remove();
});

gsap.to(".image-div", {
  scrollTrigger: {
    trigger: ".image-div",
    start: "top top",
    end: "bottom top",
    pin: true,
    scrub: true,
  },
});

// navbar animation

let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
  if (window.scrollY > lastScrollY) {
    // scrolling down
    gsap.to("nav", {
      y: "-100%",
      duration: 0.5,
      ease: "power2.Out",
    });
  } else {
    // scrolling up
    gsap.to("nav", {
      y: "0%",
      duration: 0.5,
      ease: "power2.Out",
    });
  }
  lastScrollY = window.scrollY;
});

// links hover interaction

const links = document.querySelectorAll(".links");
let linkAnimating = false;

links.forEach((link, index) => {
  const first = link.querySelector("h3:nth-child(1)");
  const second = link.querySelector("h3:nth-child(2)");
  let h3up = SplitText.create(first, { type: "chars" });
  let h3bottom = SplitText.create(second, { type: "chars" });
  link.addEventListener("mouseenter", () => {
    if (linkAnimating === true) return;
    gsap.to(h3up.chars, {
      duration: 0.3,
      y: "-100%", 
      stagger: 0.025, 
      ease: "power3.inOut",
    });
    gsap.to(h3bottom.chars, {
      duration: 0.3,
      y: "-100%", 
      stagger: 0.025, 
      ease: "power3.inOut",
    });
    linkAnimating = true;
  });

  link.addEventListener("mouseleave", () => {
    gsap.to(h3up.chars, {
      duration: 0.3,
      y: "0%", 
      stagger: -0.025, 
      ease: "power3.inOut",
    });
    gsap.to(h3bottom.chars, {
      duration: 0.3,
      y: "0%",
      stagger: -0.025, 
      ease: "power3.inOut",
      onComplete: () => {
        linkAnimating = false;
      },
    });
  });
});

// button hover interaction

const buttons = document.querySelectorAll(".buttondiv");
let buttonAnimating = false;

buttons.forEach((button, index) => {
  const first = button.querySelector("h2:nth-child(1)");
  const second = button.querySelector("h2:nth-child(2)");
  let h3up = SplitText.create(first, { type: "chars" });
  let h3bottom = SplitText.create(second, { type: "chars" });
  button.addEventListener("mouseenter", () => {
    if (buttonAnimating === true) return;
    gsap.to(h3up.chars, {
      duration: 0.3,
      y: "-100%", 
      stagger: 0.025, 
      ease: "power3.inOut",
    });
    gsap.to(h3bottom.chars, {
      duration: 0.3,
      y: "-100%", 
      stagger: 0.025, 
      ease: "power3.inOut",
    });
    linkAnimating = true;
  });

  button.addEventListener("mouseleave", () => {
    gsap.to(h3up.chars, {
      duration: 0.3,
      y: "0%",
      stagger: -0.025,
      ease: "power3.inOut",
    });
    gsap.to(h3bottom.chars, {
      duration: 0.3,
      y: "0%", 
      stagger: -0.025,
      ease: "power3.inOut",
      onComplete: () => {
        buttonAnimating = false;
      },
    });
  });
});

// project animation

const projects = [
  {
    title: "AstraRise",
    link: "https://astrarise.vercel.app/",
    year: 2024,
    tagline: "A galaxy you can feel, not just see.",
    description: `AstraRise was my first step into the world of creative web experiments — and also my first recognized work on Awwwards. 
    I wanted to build something that felt alive, something that breathes when you interact with it. 
    That's how AstraRise was born — a digital galaxy that reacts, moves, and shifts with every touch.
    
    The site lets you explore space through motion — twist the colors, adjust the density of stars, and shape your own universe in real time. 
    It's built using Three.js for 3D visualization, GSAP for animation, and Tailwind CSS for a clean, fluid design.
    
    AstraRise isn't just a visual experiment; it's a personal milestone — 
    the project that taught me how imagination can become recognition.`,
    techStack: ["HTML", "Tailwind CSS", "JavaScript", "Three.js", "GSAP"],
    highlights: [
      "Interactive control panel for real-time galaxy customization",
      "3D motion and space simulation built using Three.js",
      "Seamless animations powered by GSAP",
    ],
    recognition: [
      "Honorable Mention at Awwwards",
      "First international recognition for creative experimentation",
    ],
  },
  {
    title: "Zeigarnik",
    link: "https://ziegarnik.vercel.app/",
    year: 2024,
    tagline: "An unfinished thought turned into an interactive story.",
    description: `It all started with a simple question — why can't I relax after starting something? 
    That curiosity led me to the Zeigarnik Effect, the psychological phenomenon that explains why our minds stay restless with unfinished work.
    
    Zeigarnik is my creative expression of that feeling — 
    a blend of motion, design, and storytelling that captures the beauty of incompleteness. 
    Every scroll, animation, and element feels slightly unresolved — intentionally — 
    to make you experience the tension of wanting to finish what's left undone.
    
    It's one of my most personal projects — a digital art piece that mixes psychology, interactivity, and minimal design.`,
    techStack: ["HTML", "Tailwind CSS", "JavaScript", "GSAP", "Blender"],
    highlights: [
      "Experimental concept inspired by psychology",
      "3D visuals modeled in Blender and animated using GSAP",
      "An interactive story built through motion and design",
    ],
    recognition: [
      "Featured in creative and experimental design communities",
      "Praised for its storytelling-driven web experience",
    ],
  },
  {
    title: "Motion Step",
    link: "https://motion-steps.vercel.app/",
    year: 2023,
    tagline: "A journey through motion, built one animation at a time.",
    description: `Motion Step was created during my learning journey with Victor Work's Master Web Animation course. 
    Instead of keeping each challenge separate, I decided to combine them into one flowing experience — 
    a single website that brings together dozens of micro-interactions and transitions.
    
    The goal was to explore how movement can tell a story — 
    how subtle animations can guide the user and make every click feel alive. 
    Each section moves differently, yet together, they create a rhythm that reflects my growth as a motion designer.
    
    This project made me fall in love with animation all over again.`,
    techStack: ["HTML", "Tailwind CSS", "JavaScript", "GSAP"],
    highlights: [
      "Collection of motion experiments inspired by real challenges",
      "Advanced use of GSAP for smooth, storytelling transitions",
      "Focus on micro-interactions and timing principles",
    ],
    recognition: [
      "Learning milestone and creative practice project",
      "Helped refine my animation and UX timing sense",
    ],
  },
  {
    title: "Last Ring",
    link: "https://the-last-ride-delta.vercel.app/",
    year: 2023,
    tagline: "My first step into the 3D world of the web.",
    description: `Last Ring is where my journey into 3D design truly began. 
    I wanted to learn how to bring 3D models from Blender into a browser — and make them feel real. 
    What started as a simple test turned into something meaningful: a glowing ring, endlessly looping, 
    symbolizing how curiosity never stops.
    
    It's minimal, calm, and reflective — 
    a small reminder of how powerful it feels to see static design come alive through motion and light.`,
    techStack: ["HTML", "Tailwind CSS", "JavaScript", "Blender", "Three.js"],
    highlights: [
      "First 3D web experiment integrating Blender and Three.js",
      "Exploration of lighting, texture, and smooth transitions",
      "Symbolic motion design representing endless curiosity",
    ],
    recognition: [
      "Marked my first step into 3D interactive experiences",
      "Strengthened my understanding of 3D rendering on the web",
    ],
  },
];

gsap.set(".projectoverlay .colordivs", {
  y: "100%",
});

const projectBox = document.querySelectorAll(".projectBox");
const previews = document.querySelectorAll(".projectPreview");

const projectsOverlay = document.querySelector(".projects-overlay");
const flipTarget = document.querySelector(".projectflip .project-img");
const closeBtn = document.querySelector(".closeBtn");

const heading = document.querySelector(".infoverview .heading");
const right = document.querySelector(".infoverview .right-part");

projectBox.forEach((box, index) => {
  box.addEventListener("click", () => {
    const originalParent = previews[index];

    const project = projects[index];
    heading.innerHTML = `<h3
                class="projecttitle text-[14vw] md:text-[7.6vw] leading-[1] text-white"
              >
                ${project.title}
              </h3>
              <div class="subheading flex items-center gap-[3vw] md:gap-[2vw]">
                <div class="year">
                  <h2
                    class="projectyear text-white text-[4vw] leading-[1.1] md:text-[2vw]"
                  >
                   ${project.year}
                  </h2>
                </div>
                <div class="shortdescription">
                  <h4
                    class="projectshorttag text-white text-[3vw] leading-[1] md:text-[1.3vw]"
                  >
                     ${project.tagline}
                  </h4>
                </div>
              </div>
              <div class="livelink mt-[3vw] md:mt-[1vw]">
                <a target="_blank" href= ${project.link}>
                  <div
                    class="buttondiv w-fit border border-white cursor-pointer px-[3vw] md:px-[2vw] py-[1.5vw] md:py-[0.65vw] bg-[#242A23]"
                  >
                    <div class="links cursor-pointer h-[1rem] overflow-hidden">
                      <h2
                        class="text-white text-[4vw] md:text-[1.3vw] leading-[1]"
                      >
                        live link
                      </h2>
                      <h2
                        class="text-white text-[4vw] md:text-[1.3vw] leading-[1]"
                      >
                        live link
                      </h2>
                    </div>
                  </div>
                </a>
              </div>
          `;
    right.innerHTML = `<div class="right-part-wrapper px-[2vw]">
              <div class="description">
                <h2 class="text-white text-[5.5vw] md:text-[2.5vw]">
                  description
                </h2>
                <h4
                  class="text-[2.5vw] md:text-[1.2vw] mt-[1.3vw] text-white leading-[1.2]"
                >
                  ${project.description}
                </h4>
              </div>
              <div
                class="techstackandhighlights mt-[4vw] md:mt-[2vw] h-[25vh] md:h-[20vh] w-full flex md:flex-row flex-col"
              >
                <div
                  class="techstack flex flex-row md:flex-col justify-between h-[50%] md:h-full w-full md:w-[35%]"
                >
                  <h2 class="text-white text-[4.5vw] md:text-[1.8vw]">
                    tech Stack
                  </h2>
                  <div class="tech flex mt-[1.5vw] flex-col gap-[0.2vw]">
                  ${project.techStack
                    .map(
                      (tech) =>
                        `<h4 class="text-white text-[2.5vw] md:text-[0.8vw] leading-[1.1]">${tech}</h4>`
                    )
                    .join("")}
                    
                  </div>
                </div>
                <div
                  class="highlights flex flex-row md:flex-col justify-between h-[50%] md:h-full w-full w-[65%]"
                >
                  <h2 class="text-white text-[4.5vw] md:text-[1.8vw]">
                    highlights
                  </h2>
                  <div
                    class="tech flex mt-[1.5vw] flex-col gap-[1vw] md:gap-[0.4vw]"
                  >
                   ${project.highlights
                     .map(
                       (h) =>
                         `<h4 class="text-white text-[2.5vw] md:text-[1vw] leading-[1.1]">${h}</h4>`
                     )
                     .join("")}
                  </div>
                </div>
              </div>
            </div>`;

    const previewImgDiv = previews[index].querySelector(".project-img");

    let title = SplitText.create(".projecttitle", {
      type: "chars",
      mask: "chars",
    });
    let year = SplitText.create(".projectyear", {
      type: "chars",
      mask: "chars",
    });
    let tag = SplitText.create(".projectshorttag", {
      type: "words",
      mask: "words",
    });

    gsap.set([title.chars, year.chars, tag.words], {
      y: "100%",
    });

    gsap.set(
      [
        ".closeBtn",
        ".livelink",
        ".description h2",
        ".techstackandhighlights h2",
        ".right-part-wrapper",
      ],
      {
        autoAlpha: 0,
      }
    );

    
    function closeProject() {
      
      closeBtn.removeEventListener("click", closeProject);

      const state = Flip.getState(previewImgDiv);

      gsap
        .timeline() // Flip animation (move image back to original box)
        .to(
          [
            ".closeBtn",
            ".livelink",
            ".description h2",
            ".techstackandhighlights h2",
            ".right-part-wrapper",
          ],
          {
            autoAlpha: 0,
            duration: 1.5,
            ease: "power2.inOut",
          },
          "a"
        )
        .to(
          [title.chars, year.chars, tag.words],
          {
            y: "100%",
            stagger: 0.05,
            duration: 1.4,
            ease: "expo.out",
          },
          "a"
        )
        .add(() => {
          originalParent.appendChild(previewImgDiv);
          Flip.from(state, {
            delay: 0.8,
            duration: 1.2,
            ease: "power3.inOut",
            absolute: true,
            scale: true,
          }, "a");
        })
        .to(".projectoverlay .colordivs", {
          y: "-100%",
          duration: 1,
          stagger: {
            each: 0.07,
            from: "edges",
          },
          ease: "power2.inOut",
          onComplete: () => {
            projectsOverlay.classList.add("hidden");
            gsap.set(".projectoverlay .colordivs", {
              y: "100%",
            });
          },
        });
    }

    
    const state = Flip.getState(previewImgDiv);

    // Make overlay visible
    projectsOverlay.classList.remove("hidden");

    // Add close event listener (once)
    closeBtn.addEventListener("click", closeProject);

    gsap
      .timeline()
      // Flip image into overlay target
      .add(() => {
        flipTarget.appendChild(previewImgDiv);
        Flip.from(state, {
          delay: 0.8,
          duration: 1,
          ease: "power3.inOut",
          absolute: true,
          scale: true,
        });
      })
      .to(".projectoverlay .colordivs", {
        y: "0%",
        duration: 1,
        stagger: {
          each: 0.07,
          from: "edges",
        },
        ease: "power2.inOut",
      })
      .to(
        [
          ".closeBtn",
          ".livelink",
          ".description h2",
          ".techstackandhighlights h2",
          ".right-part-wrapper",
        ],
        {
          autoAlpha: 1,
          duration: 1.5,
          ease: "power2.inOut",
        },
        "a"
      )
      .to(
        [title.chars, year.chars, tag.words],
        {
          y: "0%",
          stagger: 0.05,
          duration: 1.4,
          ease: "expo.out",
        },
        "a"
      );
  });

  box.addEventListener("mouseenter", () => {
    const image = previews[index].querySelector(".project-img img");
    gsap.to(previews[index], {
      "--moveX": "0%", // reveal the preview
      duration: 1.2,
      ease: "expo.out",
    });
    gsap.to(image, {
      scale: 1,
      duration: 1.2,
      ease: "expo.out",
    });
  });

  box.addEventListener("mouseleave", () => {
    const image = previews[index].querySelector(".project-img img");
    gsap.to(previews[index], {
      "--moveX": "100%", // hide again
      duration: 1,
      ease: "expo.out",
    }); // optional speed adjustment
    gsap.to(image, {
      scale: 1.2,
      duration: 1,
      ease: "expo.out",
    });
  });

  window.addEventListener("scroll", () => {
    gsap.to(previews, {
      "--moveX": "100%", // hide again
      duration: 1,
      ease: "expo.out",
    });
  });
});

// nav

const about = document.querySelector("#aboutlink");
const project = document.querySelector("#projectlink");
const reco = document.querySelector("#recolink");
const contact = document.querySelector("#contactlink");

about.addEventListener("click", () => {
  gsap.to(window, { duration: 0.8, scrollTo: "#about", ease: "power2.out" });
});
project.addEventListener("click", () => {
  gsap.to(window, { duration: 0.8, scrollTo: "#projects", ease: "power2.out" });
});
reco.addEventListener("click", () => {
  gsap.to(window, { duration: 0.8, scrollTo: "#cover", ease: "power2.out" });
});
contact.addEventListener("click", () => {
  gsap.to(window, { duration: 0.8, scrollTo: "#contact", ease: "power2.out" });
});
