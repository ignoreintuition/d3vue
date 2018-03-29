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
        {'val': 50,'name': 'Jan'},
        {'val': 60,'name': 'Feb'},
        {'val': 65,'name': 'Mar'},
        {'val': 80,'name': 'Apr'},
        {'val': 56,'name': 'May'},
        {'val': 78,'name': 'Jun'},
        {'val': 100,'name': 'Jul'},
        {'val': 95,'name': 'Aug'},
        {'val': 76,'name': 'Sept'},
        {'val': 40,'name': 'Oct'},
        {'val': 35,'name': 'Nov'},
        {'val': 42,'name': 'Dec'}
      ],
      options: {
        selector: '#chart',
        metric: 'val',
        dim: 'name',
        height: 250,
        width: 400
      }
    }
  },
  mounted: function() {
    this.$helpers.barChart.update(this.$d3, this.dataSet, this.options);
  },
  beforeUpdate: function(){
    this.$helpers.barChart.update(this.$d3, this.dataSet, this.options);
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
