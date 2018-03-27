export default {
  install: function (Vue) {
    Vue.prototype.$helpers = {
      update: function(svg, ds) {
        var g = svg.selectAll("rect")
        .data(ds);

        g.enter().append("rect")
        .attr("x", 1)
        .attr("height", 20)
        .merge(g)
        .attr("width", function(d) {
          return d * 5;
        })
        .attr("y", function(d, i) {
          return i * 21 ;
        })

        g.exit().remove();
      }
    }
  }
}
