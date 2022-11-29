<template>
  <div class="app">
    <Nav />
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue'

export default {
  name: 'app',
  components: {
    Nav,
  },
  data() {
    return {

    }
  },
}
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
.app-info {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(178, 94, 239, 0.5);
  padding: 10px;
  z-index: 999;
}
</style>
