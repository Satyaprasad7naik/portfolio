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
    title: "NovaBrew",
    link: "#",
    year: 2024,
    tagline: "From zero to 4.2x ROAS in 90 days.",
    description: `NovaBrew, a premium D2C coffee brand, came to Satyaprakash with a problem: high ad spend, low returns, and a loyal customer base they couldn't scale.

    We audited their entire funnel — from Meta creatives to landing page copy — and rebuilt the strategy from the ground up. A thumb-stopping UGC-first creative approach, combined with laser-targeted lookalike audiences and a retargeting ladder, turned cold traffic into repeat buyers.

    In 90 days, NovaBrew went from a 1.1x ROAS to a 4.2x ROAS, with their email list growing 340% through a lead magnet we designed and deployed. This is what data-driven performance marketing looks like when it's done right.`,
    techStack: ["Meta Ads", "Google Ads", "Email Marketing", "CRO", "Analytics"],
    highlights: [
      "4.2x ROAS achieved within the first 90-day campaign cycle",
      "340% email list growth via targeted lead magnet funnel",
      "CPL reduced by 62% through creative iteration and A/B testing",
    ],
    recognition: [
      "Client renewed contract for a 12-month retainer engagement",
      "Featured as a case study in our internal performance marketing playbook",
    ],
  },
  {
    title: "Luminary Skin",
    link: "#",
    year: 2024,
    tagline: "Organic reach amplified. Revenue tripled.",
    description: `Luminary Skin had great products but an invisible brand. Their Instagram sat at 4,200 followers with virtually no engagement, and their SEO was non-existent. They needed a complete digital presence overhaul — without burning through a massive budget.

    Satyaprakash built a content ecosystem from the ground up. We developed a 90-day organic content calendar, optimized their site for high-intent skincare keywords, and launched a micro-influencer collaboration program targeting nano creators with authentic skin-journey content.

    Within six months, Luminary Skin's Instagram grew to 41,000 followers, organic traffic increased by 280%, and monthly revenue tripled — proving that the right story, told consistently, beats paid spend every time.`,
    techStack: ["SEO", "Social Media", "Influencer Marketing", "Content Strategy", "Analytics"],
    highlights: [
      "Instagram grew from 4.2K to 41K followers organically in 6 months",
      "Organic search traffic increased 280% through targeted keyword strategy",
      "Monthly revenue tripled with zero paid ad dependency",
    ],
    recognition: [
      "Recognized as a top-performing organic growth case in our 2024 portfolio",
      "Strategy model now used as a template for all D2C beauty clients",
    ],
  },
  {
    title: "Vertex Legal",
    link: "#",
    year: 2023,
    tagline: "62 qualified leads in 30 days. Zero fluff.",
    description: `Vertex Legal, a mid-sized law firm specializing in corporate contracts, had tried Google Ads before — and failed. Their previous agency burned ₹3.2 lakh with less than 8 leads to show for it. They came to us skeptical, and rightfully so.

    We restructured everything. New keyword architecture, intent-matched landing pages, and a call-only campaign built specifically for mobile users seeking immediate legal help. We paired this with a LinkedIn thought leadership content strategy that positioned Vertex's senior partners as go-to voices in corporate law.

    The result: 62 qualified leads in the first 30 days, at a cost-per-lead 74% lower than their previous agency. Vertex Legal signed on as a long-term partner the following month.`,
    techStack: ["Google Ads", "LinkedIn Ads", "Landing Page CRO", "Lead Gen", "Content Marketing"],
    highlights: [
      "62 qualified leads delivered in the first 30-day campaign",
      "Cost-per-lead reduced by 74% compared to previous agency",
      "LinkedIn content strategy drove 3,800+ organic impressions weekly",
    ],
    recognition: [
      "Vertex Legal became a long-term retainer client after the first month",
      "Case study presented at our internal B2B lead generation workshop",
    ],
  },
  {
    title: "Ironhaven Gym",
    link: "#",
    year: 2023,
    tagline: "Local business. National-level marketing results.",
    description: `Ironhaven Gym was a premium fitness studio with one location and ambitions to open three more. Their digital footprint was limited to a Facebook page and a basic website. Walk-ins were declining, and they had no system for capturing or nurturing leads online.

    Satyaprakash designed a full local marketing engine: Google Business Profile optimization, hyper-local Meta ads targeting a 5km radius, and an automated WhatsApp lead nurturing sequence that converted trial inquiries into paid memberships.

    Within four months, Ironhaven saw a 210% increase in monthly membership sign-ups, their Google rating improved from 3.8 to 4.7, and they opened their second location — ahead of schedule — funded entirely by the revenue growth we helped generate.`,
    techStack: ["Local SEO", "Meta Ads", "WhatsApp Automation", "GBP Optimization", "Marketing Automation"],
    highlights: [
      "210% increase in monthly membership sign-ups over four months",
      "Google Business Profile rating improved from 3.8 to 4.7 stars",
      "WhatsApp automation converted 38% of trial inquiries into paid memberships",
    ],
    recognition: [
      "Ironhaven opened their second location ahead of schedule on the back of this growth",
      "Strategy became the blueprint for our local business marketing service offering",
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
                    Channels
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