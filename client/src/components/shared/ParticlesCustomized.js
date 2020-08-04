

import React from 'react';
import Particles from 'react-particles-js';


export default function ParticlesCustomized(props) {
  const {numParticles, size, hoverMode} = props;
  const particlesParams = {
    particles: {
      number: {
        value: props.numParticles,
      },
      size: {
        value: size,
      },

      move: {
        enable: true,
        // speed: 6,
      },
    },
    interactivity: {
      events: {
        onhover: {
          enable: true,
          mode: hoverMode,
        },
      },
    },
  };

  return (
    <Particles
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1}}
      params={particlesParams}
    />
  );
}