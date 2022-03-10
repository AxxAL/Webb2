<template>
  <div style="display: flex; flex-direction: column; justify-content: center;">
    <CalculatorVue />
  </div>
</template>

<script>
  import CalculatorVue from "./components/Calculator.vue";

  export default {
    name: 'App',
    components: {
      CalculatorVue
    }
  }
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    height: 100vh;
  }
</style>
