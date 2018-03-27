<template>
  <div class="content">
    <div class="segment">
      <div v-for="(t, index) in dataSet">
        <input v-model="t.name">
        <input v-model="t.val">
      </div>
      <button @click="addDataPoint">
        New Data Point
      </button>
    </div>
    <div class="segment">
      <svg id="chart" width="600" height="500"></svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BarChart',
  data () {
    return {
      dataSet: [
        {'val': 50,'name': 'Val 1'},
        {'val': 35,'name': 'Val 2'},
        {'val': 20,'name': 'Val 3'},
        {'val': 45,'name': 'Val 4'}
      ],
      svg: {}
    }
  },
  mounted: function() {
    this.svg = this.$d3.select("#chart")
    this.$helpers.update(this.svg, this.dataSet);
  },
  beforeUpdate: function(){
    this.$helpers.update(this.svg, this.dataSet);
  },
  methods: {
    addDataPoint: function () {
      this.dataSet.push({'val': 0, 'name': ''});
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.segment {
  width: 50%;
  float: left;
}
</style>
