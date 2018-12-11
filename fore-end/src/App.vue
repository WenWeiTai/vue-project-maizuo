<template>
  <div id="app">
    <NavBar></NavBar>
  </div>
</template>

<script>
  import NavBar from './components/NavBar/index';
  export default {
    name: 'appMain',
    components: {
      NavBar
    }
  }
</script>

<style lang="scss">
  @import './styles/base';
</style>