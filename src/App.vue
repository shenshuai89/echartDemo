<template>
  <div id="app">
    <Claim></Claim>
  </div>
</template>

<script>
import Claim from "./components/Claim.vue";
// import Sca from "./components/Sca.vue";

export default {
  name: "app",
  components: {
    Claim
  }
};
</script>

<style>
html {
  height: 100%;
}
body {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  background-size: 100% 100%;
  position: absolute;
}
#app{
  width: 100%;
  height: 100%;
}
</style>