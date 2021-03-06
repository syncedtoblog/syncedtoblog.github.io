
function load_chart_1() {

    var margin = {top: 20, right: 80, bottom: 30, left: 50};
    var width = 500 - margin.left - margin.right;
    var height = 300 - margin.top - margin.bottom;

    var parseDate = d3.time.format("%m%d").parse;

    var x = d3.time.scale().range([0, width]);

    var y = d3.scale.linear().range([height,0]);

    var color = d3.scale.category10();

    var xAxis = d3.svg.axis()
      .scale(x)
      .tickFormat(d3.time.format("%b"))
      .orient("bottom")
      .ticks(6);

    var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

    var line = d3.svg.line()
      .interpolate("linear")
      .x(function(d) { return x(d.date); })
      .y(function(d) { console.log(d.temperature); return y(d.temperature); });

    var svg = d3.select(".chart-1-container").append("svg")
      .attr('preserveAspectRatio', "xMinYMin meet")
      .attr("viewBox", "0 0 "+(width + margin.left + margin.right)+" "+(height + margin.top + margin.bottom))
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.tsv("/datascripts/2021-01-30-Impact-Covid-19-On-UK-Crime-1/crime_data.tsv", function(error, data) {
        
    color.domain(d3.keys(data[0]).filter(function(key) { return key !== "date"; }));

    console.log("data")
    console.log(data)


    data.forEach(function(d) {
      d.date = parseDate(d.date);
    });

    var cities = color.domain().map(function(name) {
      return {
        name: name,
        values: data.map(function(d) {
          return {date: d.date, temperature: +d[name]};
        })
      };
    });

    x.domain(d3.extent(data, function(d) { return d.date; }));

    y.domain([500,850
      //d3.min(cities, function(c) { return d3.min(c.values, function(v) { return v.temperature; }); }),
      //d3.max(cities, function(c) { return d3.max(c.values, function(v) { return v.temperature; }); })
    ]);

    console.log("cities")
    console.log(cities)

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -40)
        .attr("x",-height/2-margin.top+10)
        .attr("dy", ".71em")
        .style("text-anchor", "middle")
        .text("Mean Crime Score");

    var city = svg.selectAll(".city")
        .data(cities)
      .enter().append("g")
        .attr("class", "city");

    city.append("path")
        .attr("class", "line")
        .attr("d", function(d) { console.log(line(d.values)); return line(d.values); })
        .attr("data-legend",function(d) { return d.name})
        .style("stroke", function(d) { return color(d.name); });

    city.append("text")
        .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
        .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.temperature) + ")"; })
        .attr("x", 3)
        .attr("dy", ".35em")
        .text(function(d) { return d.name; });


    legend = svg.append("g")
      .attr("class","legend")
      .attr("transform","translate(360,150)")
      .style("font-size","12px")
      .call(d3.legend)
    });


}


load_chart_1()
