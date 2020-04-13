import { Bounce, Power2, TimelineLite } from "gsap";
import CSSRulePlugin from "gsap/CSSRulePlugin";
import React, { useEffect, useRef } from "react";
import "./ImageRevealEffect.scss";

export default function ImageRevealEffect(props) {
  let image = useRef(null);

  let container = useRef(null);

  useEffect(() => {
    let imageReveal = CSSRulePlugin.getRule(".img-container:after");
    let tl = new TimelineLite();

    tl.from(container, 0, { css: { visibility: "visible" } })
      .to(imageReveal, 1.4, {
        width: "0%",
        // height: "0%",
        ease: Power2.easeIn,
        scale: 0.01,
      })
      .to(image, 1.4, {
        scale: 1,
        delay: -1.4,
        ease: Bounce.easeOut,
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