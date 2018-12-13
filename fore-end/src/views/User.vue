<template>
  <transition
    mode="out-in"
    :duration="200"
    appear
    enter-active-class="animated fadeInUpBig"
    leave-active-class="animated fadeOutDownBig"
  >
    <router-view></router-view>
  </transition>
</template>

<script>
export default {
  name: 'user'
}
</script>

<style>

</style>
