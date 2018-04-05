<template>
  <div class="content">
    <div class="segment">
      <div v-for="(t, index) in dataSet">
        <input v-model="t.name">
        <input v-model="t.val">
        <input v-model="t.val2">
      </div>
      <button @click="addDataPoint">
        New Data Point
      </button>
    </div>
    <div class="segment">
      <svg id="chart" width="600" height="300"></svg>
      <svg id="chart2" width="600" height="300"></svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BarChart',
  data () {
    return {
      dataSet: [
        {'val': 50, 'val2': 1900, 'name': 'Jan'},
        {'val': 60,'val2': 1730, 'name': 'Feb'},
        {'val': 65,'val2': 1800, 'name': 'Mar'},
        {'val': 80,'val2': 1805, 'name': 'Apr'},
        {'val': 56,'val2': 1750, 'name': 'May'},
        {'val': 78,'val2': 1777, 'name': 'Jun'},
        {'val': 99,'val2': 2100, 'name': 'Jul'},
        {'val': 95,'val2': 2089, 'name': 'Aug'},
        {'val': 76,'val2': 1640, 'name': 'Sept'},
        {'val': 40,'val2': 1790, 'name': 'Oct'},
        {'val': 35,'val2': 1500, 'name': 'Nov'},
        {'val': 42,'val2': 1456, 'name': 'Dec'}
      ],
      options: {
        dim: 'name',
        height: 250,
        width: 400
      }
    }
  },
  mounted: function() {
    this.options.selector = '#chart',
    this.options.metric = 'val',
    this.$helpers.chart.barChart(this.$d3, this.dataSet, this.options);

    this.options.metric = 'val2',
    this.options.selector = '#chart2',
    this.$helpers.chart.lineChart(this.$d3, this.dataSet, this.options);
  },
  beforeUpdate: function(){
    this.options.metric = 'val',
    this.options.selector = '#chart',
    this.$helpers.chart.barChart(this.$d3, this.dataSet, this.options);

    this.options.metric = 'val2',
    this.options.selector = '#chart2',
    this.$helpers.chart.lineChart(this.$d3, this.dataSet, this.options);
  },
  methods: {
    addDataPoint: function () {
      this.dataSet.push({'val': 0, 'name': '', 'val2': 0});
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
