import { Power2, TimelineLite } from "gsap";
import CSSRulePlugin from "gsap/CSSRulePlugin";
import React, { useEffect, useRef } from "react";
import "./ImageRevealEffect.scss";

export default function ImageRevealEffect(props) {
  let image = useRef(null);
  let container = useRef(null);
  let imageReveal = CSSRulePlugin.getRule(".img-container:after");

  let tl = new TimelineLite();

  useEffect(() => {
    tl.to(container, 0, { css: { visibility: "visible" } });
    tl.to(imageReveal, 1.4, { width: "0%", ease: Power2.easeInOut });
    tl.from(image, 1.4, {
      // scale: 0.8,
      ease: Power2.easeInOut,
      height: "100%",
      width: "100%",
    });
  });

  return (
    <section className="main">
      <div className="container" ref={(el) => (container = el)}>
        <>
          <div className="img-container">
            <img
              ref={(el) => {
                image = el;
              }}
              src={props.image}
            />
          </div>
        </>
      </div>
    </section>
  );
}
