<template>
  <main>
    <NesEmulatorVue  ref="test"/>
  </main>
</template>

<script>

// 导入组件库
import NesEmulatorVue from '../nes-emulator-vue'
export default {
  name: 'App',
  components: {
    NesEmulatorVue
  },
  mounted(){
    console.info(this.$refs.test)
  }
}
</script>
<style scoped>
main{
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>