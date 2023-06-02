<template>
  <div style="width:512px;height:480px;">
    <canvas :width="256" :height="240" ref="gameScreen"></canvas>  
      <button @click="start()">开始</button>
      <button @click="check()">查看</button>
      
  </div>
</template>

<script>
import jsnes from "jsnes";
import { onFrame, animationFram ,add,getTest} from "./untils/animation.js";
import { onAudioSample, getSampleRate,audioFrame,play } from './untils/audio.js';
import { resolveController } from './untils/controller.js';

let nes = new jsnes.NES({
  onFrame,
  onAudioSample,
  sampleRate: getSampleRate()
});
export default {
  name: "NesEmulatorVue",
  props: {
    // p1控制器按键
    p1: {
      type: Object,
      default: () => {
        return {
          // 上
          UP: 'KeyW',
          // 下
          DOWN: 'KeyS',
          // 左
          LEFT: 'KeyA',
          // 右
          RIGHT: 'KeyD',
          // A
          A: 'KeyJ',
          // B
          B: 'KeyI',
          // C
          C: 'Keyl',
          // D
          D: 'Keyk',
          // 选择
          SELECT: 'Digit2',
          // 开始/暂停
          START: 'Digit1',
        }
      }
    },
    // p2控制器按键
    p2: {
      type: Object,
      default: () => {
        return {
          UP: 'ArrowUp',
          DOWN: 'ArrowDown',
          LEFT: 'ArrowLeft',
          RIGHT: 'ArrowRight',
          A: 'Numpad1',
          B: 'Numpad5',
          C: 'Numpad3',
          D: 'Numpad2',
        }
      }
    }
  },
  data() {
    return {
      automatic: {
        p1: {
          C: {
            timeout: 0,
            beDown: false,
            once: true,
          },
          D: {
            timeout: 0,
            beDown: false,
            once: true,
          },
        },
        p2: {
          C: {
            timeout: 0,
            beDown: false,
            once: true,
          },
          D: {
            timeout: 0,
            beDown: false,
            once: true,
          },
        },
      }
    }
  },
  methods: {
    downKeyboardEvent(event) {
      const autoList = [this.p1.C, this.p1.D, this.p2.C, this.p2.D]
      const keyMap = this.controller[event.code]
      if (keyMap) {
        if (autoList.includes(event.code)) {
          const autoObj = this.automatic[`p${keyMap.p}`][keyMap.key]
          console.info(autoObj)
          if (autoObj.once) {
            nes.buttonDown(keyMap.p, jsnes.Controller[keyMap.value])
            autoObj.timeout = setInterval(() => {
              if (autoObj.beDown) {
                nes.buttonDown(keyMap.p, jsnes.Controller[keyMap.value])
              }
              else {
                nes.buttonUp(keyMap.p, jsnes.Controller[keyMap.value])
              }
              autoObj.beDown = !autoObj.beDown
            }, 20)
            autoObj.once = false
          }
          return
        }
        else {
          nes.buttonDown(keyMap.p, jsnes.Controller[keyMap.value])
        }
      }
    },
    upKeyboardEvent(event) {
      const autoList = [this.p1.C, this.p1.D, this.p2.C, this.p2.D]
      const keyMap = this.controller[event.code]
      if (keyMap) {
        if (autoList.includes(event.code)) {
          const autoObj = this.automatic[`p${keyMap.p}`][keyMap.key]
          clearInterval(autoObj.timeout)
          autoObj.once = true
        }
        nes.buttonUp(keyMap.p, jsnes.Controller[keyMap.value])
      }
    },
    start(){ 
       audioFrame(nes);
      // nes.frame()
      // 开始
     // play();
    },
    check(){
      console.info(add())
    }
  },
  computed: {
    controller() {
      return resolveController(this.p1, this.p2);
    }
  },
  mounted() {
    animationFram( this.$refs.gameScreen);
    nes.loadROM(require("./kabi.nes"));
    document.addEventListener('keydown', this.downKeyboardEvent)
    document.addEventListener('keyup', this.upKeyboardEvent)
  }
}
</script>

<style scoped>
canvas {
  height: 100%;
  width: 100%;
}
</style>