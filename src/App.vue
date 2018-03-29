<template>
  <div id="app">
  <h1> Reactive Data with Charting </h1>
  <p> Binding data to the DOM using VueJS and using lifecyles to update the associated visualizations. </p>
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
