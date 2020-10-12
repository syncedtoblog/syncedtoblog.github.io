var plotcharts = function(eur_legend, usa_legend, easia_legend, wasia_legend, margin, width, height, chart, regions, region_fns, legends, datasets) {
    for (var i = 0; i < regions.length; i++){

        var curr_topleft = {'left':0, 'top':0 + i*(margin.top+margin.bottom+height)}

        var subchart = chart.append("g")
                            .attr("transform", "translate(" + curr_topleft.left + "," + curr_topleft.top + ")")
                            .style("width", "100%" )
                            .style("height", "25%" )
                            .attr("font-size", "16")

        var fname = region_fns[i]
        var region = regions[i]
        var legend = legends[i]
        var data = datasets[i]

        var parseDate = d3.time.format("%Y%m%d").parse;

        var x = d3.time.scale()
            .range([0, width]);

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
            .y(function(d) { return y(d.yvalue); });


        color.domain(d3.keys(data[0]).filter(function(key) { return key !== "date"; }));

        data.forEach(function(d) {
          d.date = parseDate(d.date);
        });

        var cities = color.domain().map(function(name) {
          return {
            name: name,
            values: data.map(function(d) {
              return {date: d.date, yvalue: +d[name]};
            })
          };
        });

        x.domain(d3.extent(data, function(d) { return d.date; }));
        y.domain([
          d3.min(cities, function(c) { return d3.min(c.values, function(v) { return v.yvalue; }); }),
          d3.max(cities, function(c) { return d3.max(c.values, function(v) { return v.yvalue; }); })
        ]);

        subchart.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate("+margin.left+"," + (margin.top + height) + ")")
            .call(xAxis);

        //add y axis with text
        subchart.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate("+margin.left+"," + margin.top + ")")
            .call(yAxis);
        
        subchart.select(".y.axis")
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", -margin.left*0.9)
                .attr("x",-height/4+margin.top)
                .attr("dy", ".7em")
                .style("text-anchor", "end")
                .text("domestic / international ratio");

        //add title
        subchart.append("text")
            .attr("x", ((margin.left + width + margin.right) / 2))
            .attr("y", margin.top/2 )
            .attr("text-anchor", "middle")
            .attr("font-size", "14")
            .text(region);

        //get data for each city
        var city = subchart.selectAll(".city")
            .data(cities)
          .enter().append("g")
            .attr("transform", "translate("+margin.left+"," + margin.top + ")")
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
            .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.yvalue) + ")"; })
            .attr("x", 3)
            .attr("dy", "6")
            .attr("font-size", "10")
            .text(function(d) { return d.name; });

        subchart.selectAll('mydots')
          .data(legend)
          .enter()
          .append("circle")
            .attr("cx", 500)
            .attr("cy", function(d,i){ return 25 + i*14})
            .attr("r", 4)
            .style("fill", function(d){ return d[1]})

        subchart.selectAll("mylabels")
          .data(legend)
          .enter()
          .append("text")
            .attr("x", 510)
            .attr("y", function(d,i){ return 29 + i*14})
            .attr("font-size", "10")
            .text(function(d){ return d[0]})
            .attr("text-anchor", "left")
            .style("alignment-baseline", "middle")


    }
}



function runcharts() {

var eur_legend = [['London - LHR','#2d7fb8'], ['Paris - CDG','#ff861c'], ['Italy - FCO','#32a03e']]
var usa_legend = [['New York - JFK','#2d7fb8'], ['California - LAX','#ff861c'], ['Texas - DFW','#32a03e']]
var easia_legend = [['Hong Kong - HKG','#32a03e'], ['Seoul - ICN','#ff861c'], ['Singapore - SIN','#2d7fb8']]
var wasia_legend = [['New Delhi - DEL','#2d7fb8'], ['Dubai - DXB','#ff861c']]


var margin = {top: 60, right: 100, bottom: 70, left: 80}
    width = 500;
    height = 250;



var chart = d3.select(".chart-3-container").append("svg")
    .attr("class","domvsint")
    .attr('preserveAspectRatio', "xMinYMin meet")
    .style("width", '100%')
    .style("height", 'auto')
    .attr("viewBox", "0 0 "+( width + margin.left + margin.right)*1+" "+(height + margin.top + margin.bottom)*4)

var regions = ['Europe', 'USA', 'East Asia', 'Middle East/South Asia']
var root = '/datascripts/2020-10-11-Impact-Covid-19-On-Air-Travel-2-3/'
var region_fns = [root+'dom_v_int_eur', root+'dom_v_int_usa', root+'dom_v_int_asia', root+'dom_v_int_mid']
var legends = [eur_legend, usa_legend, easia_legend, wasia_legend]
var datasets = []



d3.tsv(region_fns[0], function (data){ 
    
    datasets.push(data); 
    d3.tsv(region_fns[1], function (data1){
      
      datasets.push(data1);
      d3.tsv(region_fns[2], function (data2){ 
          
          datasets.push(data2); 
          d3.tsv(region_fns[3], function (data3){ 
              
              datasets.push(data3);
              plotcharts(eur_legend, usa_legend, easia_legend, wasia_legend, margin, width, height, chart, regions, region_fns, legends, datasets)

          })
              
      }) 

    }) 

})


    
    
}


runcharts()

