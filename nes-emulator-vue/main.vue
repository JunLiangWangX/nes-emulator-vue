<template>
  <div style="width:512px;height:480px;">
    <canvas :width="256" :height="240"  ref="gameScreen"></canvas>
  </div>
</template>

<script>
import jsnes from "jsnes";
import { onFrame,animationFram } from "./untils/animation.js";
import { onAudioSample, getSampleRate } from './untils/audio.js'
const nes = new jsnes.NES({
  onFrame,
  onAudioSample,
  sampleRate: getSampleRate()
});
export default {
  name: "NesEmulatorVue",
  methods:{

  }
}
</script>

<style scoped>
canvas {
  height: 100%;
  width: 100%;
}
</style>