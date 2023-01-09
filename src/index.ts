import gsap from "gsap";
import SplitType from "split-type";

const getXPercent = (strLength: number, strIndex: number) => {
  return (200 * strIndex) / (strLength - 1) - 100;
};

const getYPercent = (strIndex: number) => {
  let randomOffset = Math.floor(Math.random() * 11) - 5; // random # -5 to 5
  let yPercent = strIndex % 2 === 0 ? -25 : 25;
  return yPercent + randomOffset;
};

const getRandomRotation = () => {
  return Math.floor(Math.random() * 41) - 20;
};

const init = () => {
  const explodingTextElements = document.querySelectorAll<HTMLDivElement>(
    '[wb-exploding-text="text"]'
  );

  if (!explodingTextElements) {
    console.error("Error finding explodingTextElements or explodingTextWrap");
    return;
  }

  explodingTextElements.forEach((explodingTextElement) => {
    const splitText = new SplitType(explodingTextElement);
    const chars = splitText.chars;

    explodingTextElement.addEventListener("mouseenter", () => {
      if (!chars) return;

      const allTextElements = document.querySelectorAll<HTMLDivElement>(
        "[wb-exploding-text]"
      );

      allTextElements.forEach((el) => {
        if (el === explodingTextElement) {
          gsap.to(explodingTextElement, { color: "#ececec" });
          for (let i = 0; i < chars.length; i++) {
            let xPercent = getXPercent(chars.length, i);
            let yPercent = getYPercent(i);
            let rotateZ = getRandomRotation();
            gsap.to(chars[i], {
              xPercent,
              yPercent,
              rotateZ,
            });
          }
        } else {
          gsap.to(el, { color: "#414141" });
        }
      });
    });

    explodingTextElement.addEventListener("mouseleave", () => {
      if (!chars) return;

      const allTextElements = document.querySelectorAll<HTMLDivElement>(
        "[wb-exploding-text]"
      );

      gsap.to(chars, {
        xPercent: 0,
        yPercent: 0,
        rotateZ: 0,
      });

      allTextElements.forEach((el) => {
        gsap.to(el, {
          color: "#ececec",
        });
      });
    });
  });
};

document.addEventListener("DOMContentLoaded", init);
