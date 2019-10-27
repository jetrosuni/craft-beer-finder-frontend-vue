<template>
  <div class="cbf-loading">
    <div id="glass">
      <div id="beer"></div>
    </div>
    <div id="handle"></div>
    <div id="foam_1"></div>
    <div id="foam_2"></div>
    <div id="foam_3"></div>
    <div id="foam_4"></div>
    <div id="foam_5"></div>
    <div id="foam_bubbly"></div>
    <div id="foam_inner"></div>
    <div id="foam_inner_2"></div>
    <div id="foam_inner_3"></div>
    <div id="foam_inner_4"></div>
  </div>
</template>

<style lang="scss">
.cbf-loading {
  margin: 10rem 0;
}

#glass {
  width: $glass-width;
  height: 90px;
  background: transparent;
  border: solid 5px #37474f; /* blueGrey 800 */
  border-top: none;
  border-radius: 0 0 10px 10px;
  position: absolute;
  top: 250px;
  left: calc(50% - #{$glass-width} / 2);
  overflow: hidden;
}

#handle {
  width: 20px;
  height: 40px;
  background: transparent;
  border: solid 5px #37474f; /* blueGrey 800 */
  position: absolute;
  top: 262px;
  left: calc(50% - #{$glass-width} / 2 + #{$glass-width});
  border-radius: 0 16px 16px 0;
  border-left: none;
}

#beer {
  width: 54px;
  height: 84px;
  background: transparent;
  position: absolute;
  left: 3px;
  top: 0px;
  border-radius: 0 0 5px 5px;
  overflow: hidden;

  &::before {
    content: "";
    width: 250px;
    height: 250px;
    background: #e8b504;
    position: absolute;
    top: 83px;
    left: -190px;
    -webkit-animation: beer 10s infinite;
    animation: beer 10s infinite;
  }
}

#foam_1 {
  position: absolute;
  top: 242px;
  left: calc(50% - #{$glass-width} / 2 - 2px);
  z-index: 4;

  &::before {
    content: "";
    width: 20px;
    height: 20px;
    background: #fff8e1;
    border-radius: 50%;
    position: absolute;
    -webkit-animation: foam 10s infinite;
    animation: foam 10s infinite;
  }

  &::after {
    content: "";
    width: 17px;
    height: 17px;
    background: #fff8e1;
    border-radius: 50%;
    position: absolute;
    top: 5px;
    left: 10px;
    -webkit-animation: foam 10s infinite;
    animation: foam 10s infinite;
  }
}

#foam_2 {
  position: absolute;
  top: 242px;
  left: calc(50% - #{$glass-width} / 2 + 12px);
  z-index: 4;

  &::before {
    content: "";
    width: 20px;
    height: 20px;
    background: #fff8e1;
    border-radius: 50%;
    position: absolute;
    -webkit-animation: foam 10s infinite;
    animation: foam 10s infinite;
  }

  &::after {
    content: "";
    width: 17px;
    height: 17px;
    background: #fff8e1;
    border-radius: 50%;
    position: absolute;
    top: -5px;
    left: 10px;
    -webkit-animation: foam 10s infinite;
    animation: foam 10s infinite;
  }
}

#foam_3 {
  position: absolute;
  top: 242px;
  left: calc(50% - #{$glass-width} / 2 + 28px);
  z-index: 4;

  &::before {
    content: "";
    width: 20px;
    height: 20px;
    background: #fff8e1;
    border-radius: 50%;
    position: absolute;
    -webkit-animation: foam 10s infinite;
    animation: foam 10s infinite;
  }

  &::after {
    content: "";
    width: 17px;
    height: 17px;
    background: #fff8e1;
    border-radius: 50%;
    position: absolute;
    top: 10px;
    left: 15px;
    -webkit-animation: foam 10s infinite;
    animation: foam 10s infinite;
  }
}

#foam_4 {
  position: absolute;
  top: 242px;
  left: calc(50% - #{$glass-width} / 2 + 42px);
  z-index: 4;

  &::before {
    content: "";
    width: 20px;
    height: 20px;
    background: #fff8e1;
    border-radius: 50%;
    position: absolute;
    -webkit-animation: foam 10s infinite;
    animation: foam 10s infinite;
  }

  &::after {
    content: "";
    width: 17px;
    height: 17px;
    background: #fff8e1;
    border-radius: 50%;
    position: absolute;
    top: 5px;
    left: 10px;
    -webkit-animation: foam 10s infinite;
    animation: foam 10s infinite;
  }
}

#foam_5 {
  position: absolute;
  top: 242px;
  left: calc(50% - #{$glass-width} / 2 + 52px);
  z-index: 4;
  -webkit-animation: foam 10s infinite;
  animation: foam 10s infinite;

  &::before {
    content: "";
    width: 20px;
    height: 20px;
    background: #fff8e1;
    border-radius: 50%;
    position: absolute;
  }
}

#foam_bubbly {
  position: absolute;
  top: 262px;
  left: calc(50% - #{$glass-width} / 2 + 12px);
  z-index: 4;

  &::before {
    content: "";
    width: 12px;
    height: 12px;
    background: #fff8e1;
    border-radius: 50%;
    position: absolute;
    -webkit-animation: foam_bubbly 10s infinite;
    animation: foam_bubbly 10s infinite;
  }

  &::after {
    content: "";
    width: 8px;
    height: 8px;
    background: #fff8e1;
    border-radius: 50%;
    position: absolute;
    top: 15px;
    left: 40px;
    -webkit-animation: foam_bubbly 10s infinite;
    animation: foam_bubbly 10s infinite;
  }
}

#foam_inner {
  position: absolute;
  top: 272px;
  left: calc(50% - #{$glass-width} / 2 + 18px);
  z-index: 4;
  opacity: 0.9;

  &::before {
    content: "";
    width: 6px;
    height: 6px;
    background: #fff8e1;
    border-radius: 50%;
    position: absolute;
    -webkit-animation: foam_inner 10s infinite;
    animation: foam_inner 10s infinite;
  }

  &::after {
    content: "";
    width: 4px;
    height: 4px;
    background: #fff8e1;
    border-radius: 50%;
    position: absolute;
    top: 15px;
    left: 30px;
    -webkit-animation: foam_inner 5s infinite;
    animation: foam_inner 5s infinite;
  }
}

#foam_inner_2 {
  position: absolute;
  top: 270px;
  left: calc(50% - #{$glass-width} / 2 + 25px);
  z-index: 4;
  opacity: 0.9;

  &::before {
    content: "";
    width: 7px;
    height: 7px;
    background: #fff8e1;
    border-radius: 50%;
    position: absolute;
    -webkit-animation: foam_inner 10s infinite;
    animation: foam_inner 10s infinite;
  }

  &::after {
    content: "";
    width: 3px;
    height: 3px;
    background: #fff8e1;
    border-radius: 50%;
    position: absolute;
    top: 5px;
    left: 17px;
    -webkit-animation: foam_inner 5s infinite;
    animation: foam_inner 5s infinite;
  }
}

#foam_inner_3 {
  position: absolute;
  top: 280px;
  left: calc(50% - #{$glass-width} / 2 + 32px);
  z-index: 4;
  opacity: 0.9;

  &::before {
    content: "";
    width: 9px;
    height: 9px;
    background: #fff8e1;
    border-radius: 50%;
    position: absolute;
    -webkit-animation: foam_inner 10s infinite;
    animation: foam_inner 10s infinite;
  }

  &::after {
    content: "";
    width: 5px;
    height: 5px;
    background: #fff8e1;
    border-radius: 50%;
    position: absolute;
    top: 8px;
    left: 12px;
    -webkit-animation: foam_inner 5s infinite;
    animation: foam_inner 5s infinite;
  }
}

#foam_inner_4 {
  position: absolute;
  top: 285px;
  left: calc(50% - #{$glass-width} / 2 + 38px);
  z-index: 4;
  opacity: 0.9;

  &::before {
    content: "";
    width: 2px;
    height: 2px;
    background: #fff8e1;
    border-radius: 50%;
    position: absolute;
    -webkit-animation: foam_inner 10s infinite;
    animation: foam_inner 10s infinite;
  }

  &::after {
    content: "";
    width: 5.5px;
    height: 5.5px;
    background: #fff8e1;
    border-radius: 50%;
    position: absolute;
    top: 28px;
    left: 2px;
    -webkit-animation: foam_inner 5s infinite;
    animation: foam_inner 5s infinite;
  }
}

/* ANIMATIONS */

@-webkit-keyframes beer {
  0% {
    transform: translateY(-5);
  }
  17% {
    transform: translateY(-82px);
  }
  100% {
    transform: translateY(-82px);
  }
}

@keyframes beer {
  0% {
    transform: translateY(-5);
  }
  17% {
    transform: translateY(-82px);
  }
  100% {
    transform: translateY(-82px);
  }
}

@-webkit-keyframes foam {
  0% {
    transform: scale(0);
  }
  10% {
    transform: scale(0);
  }
  20% {
    transform: scale(1);
  }
}

@keyframes foam {
  0% {
    transform: scale(0);
  }
  10% {
    transform: scale(0);
  }
  20% {
    transform: scale(1);
  }
}

@-webkit-keyframes foam_bubbly {
  0% {
    transform: scale(0) translateY(0px);
  }
  10% {
    transform: scale(0) translateY(0px);
  }
  20% {
    transform: scale(1) translateY(-20px);
  }

  40% {
    opacity: 0;
  }

  100% {
    transform: scale(1) translateY(-80px);
    opacity: 0;
  }
}

@keyframes foam_bubbly {
  0% {
    transform: scale(0) translateY(0px);
  }
  10% {
    transform: scale(0) translateY(0px);
  }
  20% {
    transform: scale(1) translateY(-20px);
  }

  40% {
    opacity: 0;
  }

  100% {
    transform: scale(1) translateY(-80px);
    opacity: 0;
  }
}

@-webkit-keyframes foam_inner {
  0% {
    transform: scale(0) translateY(0px);
  }
  20% {
    transform: scale(0) translateY(0px);
  }
  40% {
    transform: scale(1) translateY(-60px);
  }

  50% {
    opacity: 0;
  }

  100% {
    transform: scale(1) translateY(-60px);
    opacity: 0;
  }
}

@keyframes foam_inner {
  0% {
    transform: scale(0) translateY(0px);
  }
  20% {
    transform: scale(0) translateY(0px);
  }
  40% {
    transform: scale(1) translateY(-60px);
  }

  50% {
    opacity: 0;
  }

  100% {
    transform: scale(1) translateY(-60px);
    opacity: 0;
  }
}
</style>