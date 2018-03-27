<template>
  <div id="app">
  <h1> Data Entry with Bar Graph </h1>
  <index/>
  </div>
</template>

<script>
import index from './components/index'

export default {
  name: 'App',
  components: {
    index
  },
}


</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
