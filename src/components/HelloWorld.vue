<template>
  <div class="hello">
    <div class="segment">
      <div v-for="(t, index) in myArr">
        <input v-model="myArr[index]">
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
  name: 'HelloWorld',
  data () {
    return {
      myArr: [1,2,3],
      svg: {},
      g: {}
    }
  },
  mounted: function() {
    this.svg = this.$d3.select("#chart")
    this.update()
  },
  beforeUpdate: function(){
    this.update();
  },
  methods: {
    update: function(){
      this.g = this.svg.selectAll("rect")
      .data(this.myArr);

      this.g.enter().append("rect")
      .attr("x", 1)
      .attr("height", 20)
      .merge(this.g)
      .attr("width", function(d) {
        return d * 5;
      })
      .attr("y", function(d, i) {
        return i * 21 ;
      })

      this.g.exit().remove();
    },
    addDataPoint: function () {
      this.myArr.push(0);
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
