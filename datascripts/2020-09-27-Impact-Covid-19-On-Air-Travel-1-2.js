var eur_legend = [['London - LHR','#2d7fb8'], ['Paris - CDG','#ff861c'], ['Italy - FCO','#32a03e']]

      var margin = {top: 20, right: 50, bottom: 30, left: 60},
          width = (500 - margin.left - margin.right),
          height = (300 - margin.top - margin.bottom);

      var parseDate = d3.time.format("%Y%m%d").parse;

      var x = d3.time.scale()
          .range([0, width-10]);

      var y = d3.scale.linear()
          .range([height, 0]);

      var color = d3.scale.category10();

      var xAxis = d3.svg.axis()
          .scale(x)
          .tickFormat(d3.time.format("%b"))
          .orient("bottom")
          .ticks(6)
          ;

      var yAxis = d3.svg.axis()
          .scale(y)
          .orient("left")
          .ticks(5)
          ;

      var line = d3.svg.line()
          .interpolate("basis")
          .x(function(d) { return x(d.date); })
          .y(function(d) { return y(d.temperature); });

      var chart1 = d3.select("chart-1-container").append("svg")
          .attr('preserveAspectRatio', "xMinYMin meet")
          .attr("viewBox", "0 0 "+(width + margin.left + margin.right)+" "+( height + margin.top + margin.bottom))
        .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      d3.tsv("2020-09-27-Impact-Covid-19-On-Air-Travel-1-2.flights_eur.tsv", function(error, data) {
        color.domain(d3.keys(data[0]).filter(function(key) { return key !== "date"; }));

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

        y.domain([0,2000
          //d3.min(cities, function(c) { return d3.min(c.values, function(v) { return v.temperature; }); }),
          //d3.max(cities, function(c) { return d3.max(c.values, function(v) { return v.temperature; }); })
        ]);

        chart1.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        //add y axis with text
        chart1.append("g")
            .attr("class", "y axis")
            .call(yAxis)
          .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", -50)
            .attr("x",-height/2+margin.top)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Daily Flights");

        //get data for each city
        var city = chart1.selectAll(".city")
            .data(cities)
          .enter().append("g")
            .attr("class", "city");

        //add line for each city's data
        city.append("path")
            .attr("class", "line")
            .attr("d", function(d) { return line(d.values); })
            //.attr("data-legend",function(d,i) { return d.name + ' - '  } )
            .style("stroke", function(d) { return color(d.name); });

        //add text for each city
        city.append("text")
            .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
            .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.temperature) + ")"; })
            .attr("x", 3)
            .attr("dy", ".35em")
            .text(function(d) { return d.name; });

        //adding a legend (using the d3.legend.js script in local folder)
        /*legend = chart1.append("g")
          .attr("class","legend")
          .attr("transform","translate(300,30)")
          .style("font-size","10px")
          .call(d3.legend)*/

        chart1.selectAll('mydots')
          .data(eur_legend)
          .enter()
          .append("circle")
            .attr("cx", 340)
            .attr("cy", function(d,i){ return 5 + i*12}) // 100 is where the first dot appears. 25 is the distance between dots
            .attr("r", 4)
            .style("fill", function(d){ return d[1]})

        chart1.selectAll("mylabels")
          .data(eur_legend)
          .enter()
          .append("text")
            .attr("x", 350)
            .attr("y", function(d,i){ return 5 + i*12}) // 100 is where the first dot appears. 25 is the distance between dots
            .text(function(d){ return d[0]})
            .attr("text-anchor", "left")
            .style("alignment-baseline", "middle")
      });
