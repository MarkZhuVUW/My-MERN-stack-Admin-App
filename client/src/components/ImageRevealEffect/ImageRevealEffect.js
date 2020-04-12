import { Power2, TimelineLite } from "gsap";
import CSSRulePlugin from "gsap/CSSRulePlugin";
import React, { useEffect, useRef } from "react";
import "./ImageRevealEffect.scss";

export default function ImageRevealEffect(props) {
  let image = useRef(null);
  let imageReveal = CSSRulePlugin.getRule(".img-container:after");

  let tl = new TimelineLite();

  useEffect(() => {
    tl.to(imageReveal, 1.4, { width: "0%", ease: Power2.easeInOut });
    tl.from(image, 1.4, {
      scale: 1.6,
      ease: Power2.easeInOut,
      delay: -1.4,
    });
  });

  return (
    <>
      <div className="img-container">
        <img
          ref={(el) => {
            image = el;
          }}
          src={props.imageUrl}
        />
      </div>
    </>
  );
}
