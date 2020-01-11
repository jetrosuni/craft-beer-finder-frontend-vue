<template>
  <div class="cbf-loading">
    <div id="glass">
      <div id="beer"></div>
    </div>
    <div id="handle"></div>
    <div id="top_foam_1"></div>
    <div id="top_foam_2"></div>
    <div id="top_foam_3"></div>
    <div id="top_foam_4"></div>
    <div id="top_foam_5"></div>
    <div id="foam_pop_bubbles"></div>
    <div id="foam_tiny_bubbles"></div>
    <div id="foam_tiny_bubbles_top"></div>
    <div id="foam_tiny_bubbles_3"></div>
    <div id="foam_tiny_bubbles_4"></div>
  </div>
</template>

<style lang="scss">
@media only screen and (max-width: 768px) {
  $glass-pos-top-mobile: 6rem;
  #glass {
    top: $glass-pos-top-mobile;
  }
  #handle {
    top: calc(#{$glass-pos-top-mobile} + 16px);
  }
  #top_foam_1 {
    top: calc(#{$glass-pos-top-mobile} - 11px);
  }
  #top_foam_2 {
    top: calc(#{$glass-pos-top-mobile} - 17px);
  }
  #top_foam_3 {
    top: calc(#{$glass-pos-top-mobile} - 17px);
  }
  #top_foam_4 {
    top: calc(#{$glass-pos-top-mobile} - 13px);
  }
  #top_foam_5 {
    top: calc(#{$glass-pos-top-mobile} - 11px);
  }
  #foam_pop_bubbles {
    top: calc(#{$glass-pos-top-mobile} - 2px);
  }
  #foam_tiny_bubbles {
    top: calc(#{$glass-pos-top-mobile} + 42px);
  }
  #foam_tiny_bubbles_top {
    top: calc(#{$glass-pos-top-mobile} + 22px);
  }
  #foam_tiny_bubbles_3 {
    top: calc(#{$glass-pos-top-mobile} + 40px);
  }
  #foam_tiny_bubbles_4 {
    top: calc(#{$glass-pos-top-mobile} + 35px);
  }
}

@media only screen and (min-width: 769px) {
  $glass-pos-top: 11rem;
  #glass {
    top: $glass-pos-top;
  }
  #handle {
    top: calc(#{$glass-pos-top} + 16px);
  }
  #top_foam_1 {
    top: calc(#{$glass-pos-top} - 11px);
  }
  #top_foam_2 {
    top: calc(#{$glass-pos-top} - 17px);
  }
  #top_foam_3 {
    top: calc(#{$glass-pos-top} - 17px);
  }
  #top_foam_4 {
    top: calc(#{$glass-pos-top} - 13px);
  }
  #top_foam_5 {
    top: calc(#{$glass-pos-top} - 11px);
  }
  #foam_pop_bubbles {
    top: calc(#{$glass-pos-top} - 2px);
  }
  #foam_tiny_bubbles {
    top: calc(#{$glass-pos-top} + 42px);
  }
  #foam_tiny_bubbles_top {
    top: calc(#{$glass-pos-top} + 22px);
  }
  #foam_tiny_bubbles_3 {
    top: calc(#{$glass-pos-top} + 40px);
  }
  #foam_tiny_bubbles_4 {
    top: calc(#{$glass-pos-top} + 35px);
  }
}

#glass {
  width: $glass-width;
  height: 90px;
  background: transparent;
  border: solid 5px #37474f; /* blueGrey 800 */
  border-top: none;
  border-radius: 0 0 $glass-thickness $glass-thickness;
  position: absolute;
  left: calc(50% - #{$glass-width} / 2);
  overflow: hidden;
}

#handle {
  width: 20px;
  height: 40px;
  background: transparent;
  border: solid 5px #37474f; /* blueGrey 800 */
  position: absolute;
  left: calc(50% - #{$glass-width} / 2 + #{$glass-width});
  border-radius: 0 $glass-thickness $glass-thickness 0;
  border-left: none;
}

#beer {
  width: 54px;
  height: 82px;
  background: transparent;
  position: absolute;
  left: 3px;
  top: 0px;
  border-radius: 0 0 5px 5px;
  overflow: hidden;

  &::before {
    content: '';
    width: 250px;
    height: 250px;
    background: #ffc107; /* amber 500 */
    position: absolute;
    top: 83px;
    left: -190px;
    -webkit-animation-name: beer;
    -webkit-animation-duration: 10s;
    -webkit-animation-iteration-count: 1;
    -webkit-animation-fill-mode: forwards;
    animation-name: beer;
    animation-duration: 10s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
  }

  &::after {
    content: '';
    width: 37px;
    height: 250px;
    background: #ffca28; /* amber 400 */
    position: absolute;
    top: 83px;
    left: 9px;
    -webkit-animation-name: beer;
    -webkit-animation-duration: 10s;
    -webkit-animation-iteration-count: 1;
    -webkit-animation-fill-mode: forwards;
    animation-name: beer;
    animation-duration: 10s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
  }
}

#top_foam_1 {
  position: absolute;
  left: calc(50% - #{$glass-width} / 2 - 5px);
  z-index: 4;

  &::before {
    content: '';
    width: 20px;
    height: 20px;
    background: #fff8e1; /* amber 50 */
    border-radius: 50%;
    box-shadow: 1px 1px 1px 1px;
    color: #ffecb3; /* amber 100 */
    position: absolute;
    -webkit-animation-name: foam;
    -webkit-animation-duration: 10s;
    -webkit-animation-iteration-count: 1;
    -webkit-animation-fill-mode: forwards;
    animation-name: foam;
    animation-duration: 10s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
  }

  &::after {
    content: '';
    width: 17px;
    height: 17px;
    background: #fffde7; /* yellow 50 */
    border-radius: 50%;
    box-shadow: 1px 1px 1px 1px;
    color: #ffecb3; /* amber 100 */
    position: absolute;
    top: 5px;
    left: 12px;
    -webkit-animation-name: foam;
    -webkit-animation-duration: 10s;
    -webkit-animation-iteration-count: 1;
    -webkit-animation-fill-mode: forwards;
    animation-name: foam;
    animation-duration: 10s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
  }
}

#top_foam_2 {
  position: absolute;
  left: calc(50% - #{$glass-width} / 2 + 12px);
  z-index: 4;

  &::before {
    content: '';
    width: 20px;
    height: 20px;
    background: #fff8e1; /* amber 50 */
    border-radius: 50%;
    position: absolute;
    -webkit-animation-name: foam;
    -webkit-animation-duration: 10s;
    -webkit-animation-iteration-count: 1;
    -webkit-animation-fill-mode: forwards;
    animation-name: foam;
    animation-duration: 10s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
  }

  &::after {
    content: '';
    width: 14px;
    height: 14px;
    background: #fffde7; /* yellow 50 */
    border-radius: 50%;
    box-shadow: 1px 1px 1px 1px;
    color: #ffecb3; /* amber 100 */
    position: absolute;
    top: 12px;
    left: 9px;
    -webkit-animation-name: foam;
    -webkit-animation-duration: 10s;
    -webkit-animation-iteration-count: 1;
    -webkit-animation-fill-mode: forwards;
    animation-name: foam;
    animation-duration: 10s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
  }
}

#top_foam_3 {
  position: absolute;
  left: calc(50% - #{$glass-width} / 2 + 28px);
  z-index: 4;

  &::before {
    content: '';
    width: 20px;
    height: 20px;
    background: #fff8e1; /* amber 50 */
    border-radius: 50%;
    box-shadow: 1px 1px 1px 1px;
    color: #ffecb3; /* amber 100 */
    position: absolute;
    -webkit-animation-name: foam;
    -webkit-animation-duration: 10s;
    -webkit-animation-iteration-count: 1;
    -webkit-animation-fill-mode: forwards;
    animation-name: foam;
    animation-duration: 10s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
  }

  &::after {
    content: '';
    width: 15px;
    height: 15px;
    background: #fffde7; /* yellow 50 */
    border-radius: 50%;
    box-shadow: 1px 1px 1px 1px;
    color: #ffecb3; /* amber 100 */
    position: absolute;
    top: 14px;
    left: 0px;
    -webkit-animation-name: foam;
    -webkit-animation-duration: 10s;
    -webkit-animation-iteration-count: 1;
    -webkit-animation-fill-mode: forwards;
    animation-name: foam;
    animation-duration: 10s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
  }
}

#top_foam_4 {
  position: absolute;
  left: calc(50% - #{$glass-width} / 2 + 38px);
  z-index: 4;

  &::before {
    content: '';
    width: 20px;
    height: 20px;
    background: #fff8e1; /* amber 50 */
    box-shadow: 1px 1px 1px 1px;
    color: #ffecb3; /* amber 100 */
    border-radius: 50%;
    position: absolute;
    -webkit-animation-name: foam;
    -webkit-animation-duration: 10s;
    -webkit-animation-iteration-count: 1;
    -webkit-animation-fill-mode: forwards;
    animation-name: foam;
    animation-duration: 10s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
  }

  &::after {
    content: '';
    width: 17px;
    height: 17px;
    background: #fffde7; /* yellow 50 */
    box-shadow: 1px 1px 1px 1px;
    color: #ffecb3; /* amber 100 */
    border-radius: 50%;
    position: absolute;
    top: 6px;
    left: 9px;
    -webkit-animation-name: foam;
    -webkit-animation-duration: 10s;
    -webkit-animation-iteration-count: 1;
    -webkit-animation-fill-mode: forwards;
    animation-name: foam;
    animation-duration: 10s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
  }
}

#top_foam_5 {
  position: absolute;
  left: calc(50% - #{$glass-width} / 2 + 54px);
  z-index: 4;
  -webkit-animation-name: foam;
  -webkit-animation-duration: 10s;
  -webkit-animation-iteration-count: 1;
  -webkit-animation-fill-mode: forwards;
  animation-name: foam;
  animation-duration: 10s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;

  &::before {
    content: '';
    width: 18px;
    height: 18px;
    background: #fff8e1; /* amber 50 */
    box-shadow: 1px 1px 1px 1px;
    color: #ffecb3; /* amber 100 */
    border-radius: 50%;
    position: absolute;
  }
}

#foam_pop_bubbles {
  position: absolute;
  left: calc(50% - #{$glass-width} / 2 + 12px);
  z-index: 4;

  &::before {
    content: '';
    width: 11px;
    height: 11px;
    background: #e0e0e0; /* grey 300 */
    border-radius: 50%;
    box-shadow: 1px 1px 1px 1px;
    color: #ffecb3; /* amber 100 */
    position: absolute;
    -webkit-animation: foam_bubbly 4s infinite;
    animation: foam_bubbly 4s infinite;
  }

  &::after {
    content: '';
    width: 7px;
    height: 7px;
    background: #e0e0e0; /* grey 300 */
    border-radius: 50%;
    box-shadow: 1px 1px 1px 1px;
    color: #ffecb3; /* amber 100 */
    position: absolute;
    top: 9px;
    left: 35px;
    -webkit-animation: foam_bubbly 3s infinite;
    animation: foam_bubbly 3s infinite;
  }
}

#foam_tiny_bubbles {
  position: absolute;
  left: calc(50% - #{$glass-width} / 2 + 18px);
  z-index: 4;
  opacity: 0.9;

  &::before {
    content: '';
    width: 5px;
    height: 5px;
    background: #fff59d; // yellow 200
    border-radius: 50%;
    position: absolute;
    -webkit-animation: foam_inner 4s infinite;
    animation: foam_inner 4s infinite;
  }

  &::after {
    content: '';
    width: 3px;
    height: 3px;
    background: #fff59d; // yellow 200
    border-radius: 50%;
    position: absolute;
    top: 15px;
    left: 30px;
    -webkit-animation: foam_inner 4s infinite;
    animation: foam_inner 4s infinite;
  }
}

#foam_tiny_bubbles_top {
  position: absolute;
  left: calc(50% - #{$glass-width} / 2 + 20px);
  z-index: 4;
  opacity: 0.9;

  &::before {
    content: '';
    width: 7px;
    height: 7px;
    background: #fff8e1; // amber 50
    box-shadow: 0px 0px 1px 1px;
    color: #cfd8dc; // blueGrey 100
    border-radius: 50%;
    position: absolute;
    -webkit-animation: foam_inner 5s infinite;
    animation: foam_inner 5s infinite;
  }

  &::after {
    content: '';
    width: 5px;
    height: 5px;
    background: #fff8e1; // amber 50
    box-shadow: 0px 0px 1px 1px;
    color: #cfd8dc; // blueGrey 100
    border-radius: 50%;
    position: absolute;
    top: 15px;
    left: 22px;
    -webkit-animation: foam_inner 4s infinite;
    animation: foam_inner 4s infinite;
  }
}

#foam_tiny_bubbles_3 {
  position: absolute;
  left: calc(50% - #{$glass-width} / 2 + 32px);
  z-index: 4;
  opacity: 0.9;

  &::before {
    content: '';
    width: 9px;
    height: 9px;
    background: #fff8e1; // amber 50
    border-radius: 50%;
    position: absolute;
    -webkit-animation: foam_inner 6s infinite;
    animation: foam_inner 6s infinite;
  }

  &::after {
    content: '';
    width: 5px;
    height: 5px;
    background: #fff8e1; // amber 50
    border-radius: 50%;
    position: absolute;
    top: 8px;
    left: 12px;
    -webkit-animation: foam_inner 5s infinite;
    animation: foam_inner 5s infinite;
  }
}

#foam_tiny_bubbles_4 {
  position: absolute;
  left: calc(50% - #{$glass-width} / 2 + 38px);
  z-index: 4;
  opacity: 0.9;

  &::before {
    content: '';
    width: 3px;
    height: 3px;
    background: #fff8e1; // amber 50
    box-shadow: 0px 0px 1px 1px;
    color: #cfd8dc; // blueGrey 100
    border-radius: 50%;
    position: absolute;
    -webkit-animation: foam_inner 3s infinite;
    animation: foam_inner 3s infinite;
  }

  &::after {
    content: '';
    width: 5px;
    height: 5px;
    background: #fff8e1; // amber 50
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
    opacity: 0.9;
    transform: scale(0) translateY(0px);
  }
  20% {
    opacity: 0.9;
    transform: scale(0) translateY(0px);
  }
  40% {
    opacity: 0.9;
    transform: scale(1) translateY(-60px);
  }
  50% {
    opacity: 0.5;
  }
  60% {
    opacity: 0.25;
  }
  70% {
    opacity: 0;
  }

  100% {
    transform: scale(1) translateY(-60px);
    opacity: 0;
  }
}

@keyframes foam_inner {
  0% {
    opacity: 0.9;
    transform: scale(0) translateY(0px);
  }
  20% {
    opacity: 0.9;
    transform: scale(0) translateY(0px);
  }
  40% {
    opacity: 0.9;
    transform: scale(1) translateY(-60px);
  }
  50% {
    opacity: 0.5;
  }
  60% {
    opacity: 0.25;
  }
  70% {
    opacity: 0;
  }

  100% {
    transform: scale(1) translateY(-60px);
    opacity: 0;
  }
}
</style>
