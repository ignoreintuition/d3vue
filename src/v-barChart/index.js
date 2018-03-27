export default {
  install: function (Vue) {
    Vue.prototype.$helpers = {
      update: function(svg, ds) {
        var g = svg.selectAll("rect")
        .data(ds);

        g.enter().append("rect")
        .attr("width", 20)
        .merge(g)
        .attr("height", function(d) {return d.val})
        .attr("x", function(d, i){ return i * 25})
        .attr("y", function(d) {return 150 - d.val});

        g.exit().remove();
      }
    }
  }
}
