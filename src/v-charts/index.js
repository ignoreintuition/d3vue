export default {
  install: function(Vue) {
    Vue.prototype.$helpers = {
      chart: {
        d3: {},
        ds: {},
        svg: {},
        x1: 0,
        y1: 0,
        /**
         * $helpers.chart.barChart
         * bind data to a bar graph.
         * @param {string} d3 - reference to d3 object.
         * @param {string} ds - dataset for the graph.
         * @param {Object} options - options for bar graph.
         * @param {string} options.selector - selector name to place the graph.
         * @param {string} options.metric - value you are measuring.
         * @param {string} options.dim - value you will be categorizing the data by.
         * @param {string} options.width - width of the chart.
         * @param {string} options.height - height of the chart.
         */
        barChart: function(d3, ds, options) {
          this.init(d3, ds, options.selector);

          var g = this.svg.selectAll("rect")
            .data(this.ds);

          var maxVal = Math.max.apply(Math, this.ds.map(function(o) {
            return o[options.metric];
          }));

          var yScale = this.d3.scaleLinear()
            .domain([0, maxVal])
            .range([options.height, 0]);

          var yAxis = this.d3.axisLeft()
            .scale(yScale);

          var xScale = this.initOrdinalScale(options.dim, options.width);
          var xAxis = this.d3.axisBottom()
            .scale(xScale)

          this.svg.selectAll("g").remove();

          g.enter()
            .append("rect")
            .merge(g)
            .attr('class', 'bar')
            .attr("width", (d, i) => {
              return (options.width / this.ds.length) - 1
            })
            .attr("height", d => {
              return options.height - yScale(d[options.metric])
            })
            .attr("x", (d, i) => {
              return (i * (options.width / this.ds.length)) + 60
            })
            .attr("y", d => {
              return yScale(d[options.metric]);
            })

          this.drawAxis(options.height, xAxis, yAxis);
          g.exit().remove();
        },

        /**
         * $helpers.chart.lineChart
         * bind data to a line graph.
         * @param {string} d3 - reference to d3 object.
         * @param {string} ds - dataset for the graph.
         * @param {Object} options - options for bar graph.
         * @param {string} options.selector - selector name to place the graph.
         * @param {string} options.metric - value you are measuring.
         * @param {string} options.dim - value you will be categorizing the data by.
         * @param {string} options.width - width of the chart.
         * @param {string} options.height - height of the chart.
         */
        lineChart: function(d3, ds, options) {
          this.init(d3, ds, options.selector);

          var maxVal = Math.max.apply(Math, this.ds.map(function(o) {
            return o[options.metric];
          }));

          var minVal = Math.min.apply(Math, this.ds.map(function(o) {
            return o[options.metric];
          }));

          var yScale = this.d3.scaleLinear()
            .domain([minVal, maxVal])
            .range([options.height, 0]);

          var yAxis = this.d3.axisLeft()
            .scale(yScale);

          var xScale = this.initOrdinalScale(options.dim, options.width);
          var xAxis = this.d3.axisBottom()
            .scale(xScale)

          var lineFunction = this.d3.line()
            .x(function(d, i) { return xScale(d[options.dim]) + 60; })
            .y(function(d) { return yScale(d[options.metric]); })

          this.svg.selectAll("g").remove();
          this.svg.selectAll("path").remove();

          this.svg.append("path")
            .datum(this.ds)
            .attr("fill", "none")
            .attr("stroke", "#ffab00")
            .attr("stroke-width", 3)
            .attr("d", lineFunction)

          this.drawAxis(options.height, xAxis, yAxis);

          this.svg.exit().remove();
        },
        /**
         * $helpers.chart.pieChart
         * bind data to a pie chart.
         * @param {string} d3 - reference to d3 object.
         * @param {string} ds - dataset for the graph.
         * @param {Object} options - options for bar graph.
         * @param {string} options.selector - selector name to place the graph.
         * @param {string} options.metric - value you are measuring.
         * @param {string} options.dim - value you will be categorizing the data by.
         * @param {string} options.width - width of the chart.
         * @param {string} options.height - height of the chart.
         */
        pieChart: function(d3, ds, options) {
          this.init(d3, ds, options.selector);

          var radius = options.height > options.width ? (options.width - options.width * 0.1) / 2 : (options.height - options.height * 0.1) / 2;

          var pie = this.d3.pie()
            .sort(null)
            .value(function(ds) {
              return ds[options.metric];
            });

          var path = this.d3.arc()
            .outerRadius(radius - 10)
            .innerRadius(25);

          var arc = this.svg.selectAll(".arc")
              .data(pie(ds))

          // Todo scale to handle more colors
          var color = d3.scaleOrdinal()
            .range(["#4D4D4D", "#5DA5DA", "#FAA43A", "#60BD68", "#F17CB0", "#B2912F", "#B276B2", "#DECF3F", "#F15854" ])

          arc.enter()
            .append("g")
            .attr("transform", "translate(" + options.width / 2 + "," + options.height / 2 + ")")
            .append("path")
            .merge(arc)
            .attr("class", "arc")
            .attr("d", path)
            .attr("fill", function(d,i) {
              return color(i);
            })
            .on("mouseover", d => {
              this.svg.append("text")
              .attr("x", 10)
              .attr("y", 10)
              .attr("class", "tt")
              .text(d.data.name + ": " + d.data.val);
            })
            .on("mouseout", d => {
                this.svg.selectAll(".tt").remove();
            });



            arc.exit().remove();

        },
        /* Helper Function */
        init: function(d3, ds, selector) {
          this.d3 = d3;
          this.ds = ds;
          this.svg = this.d3.select(selector)
        },

        initOrdinalScale: function(dim, width) {
          var domainArr = [];
          var rangeArr = [];

          this.ds.forEach((t) => {
            domainArr.push(t[dim])
          })
          this.ds.forEach((t, i) => {
            rangeArr.push(width * i / this.ds.length)
          })

          var xScale = this.d3.scaleOrdinal()
            .domain(domainArr)
            .range(rangeArr);
          return xScale;
        },

        drawAxis: function(height, xAxis, yAxis) {
          this.svg.append("g")
            .attr("transform", "translate(50,0)")
            .call(yAxis);

          this.svg.append("g")
            .attr("transform", "translate(70," + (height + 5) + ")")
            .call(xAxis);
        },
      }
    }
  }
}
