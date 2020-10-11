var margin = {top: 30, right: 20, bottom: 20, left: 60},
    width = 150 - margin.left - margin.right,
    height = 120 - margin.top - margin.bottom;

    var x11 = d3.scale.linear()
        .range([0, width]),
      x12 = d3.scale.linear()
        .range([0, width]),
      x13 = d3.scale.linear()
        .range([0, width]),
      x21 = d3.scale.linear()
          .range([0, width]),
      x22 = d3.scale.linear()
        .range([0, width]),
      x23 = d3.scale.linear()
        .range([0, width]),
      x31 = d3.scale.linear()
        .range([0, width]),
      x32 = d3.scale.linear()
        .range([0, width]),
      x33 = d3.scale.linear()
        .range([0, width]),
      x41 = d3.scale.linear()
        .range([0, width]),
      x42 = d3.scale.linear()
        .range([0, width]),
      x43 = d3.scale.linear()
        .range([0, width]);

    var y11 = d3.scale.ordinal()
        .rangeRoundBands([0,height], .3, .3),
      y12 = d3.scale.ordinal()
        .rangeRoundBands([0,height], .3, .3),
      y13 = d3.scale.ordinal()
        .rangeRoundBands([0,height], .3, .3),
      y21 = d3.scale.ordinal()
        .rangeRoundBands([0,height], .3, .3),
      y22 = d3.scale.ordinal()
        .rangeRoundBands([0,height], .3, .3),
      y23 = d3.scale.ordinal()
        .rangeRoundBands([0,height], .3, .3),
      y31 = d3.scale.ordinal()
        .rangeRoundBands([0,height], .3, .3),
      y32 = d3.scale.ordinal()
        .rangeRoundBands([0,height], .3, .3),
      y33 = d3.scale.ordinal()
        .rangeRoundBands([0,height], .3, .3),
      y41 = d3.scale.ordinal()
        .rangeRoundBands([0,height], .3, .3),
      y42 = d3.scale.ordinal()
        .rangeRoundBands([0,height], .3, .3),
      y43 = d3.scale.ordinal()
        .rangeRoundBands([0,height], .3, .3);

var y = d3.scale.ordinal()
  .rangeRoundBands([0,height*12 + margin.top*3], .3, .3);

var yAxis = d3.svg.axis()
  .scale(y)
  .tickSize(0)
  .orient("left");

var svg = d3.select(".chart-2-container").append("svg")
  //.attr("width", (width + margin.left + margin.right)*3)
  //.attr("height", height*12 + margin.top*3 + margin.bottom)
  .attr('preserveAspectRatio', "xMinYMin meet")
  .attr("viewBox", "0 0 "+((width + margin.left+margin.right)*3)+" "+(height*12 + margin.top*5+margin.bottom))
.append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top +")");

d3.csv("data_eur", function(error, data) {

data.forEach(function(d) {
  d.EGLLscoreNov = +d.EGLLscoreNov
  d.EGLLscoreApr = +d.EGLLscoreApr
  d.EGLLscoreSep = +d.EGLLscoreSep

  d.LFPGscoreNov = +d.LFPGscoreNov
  d.LFPGscoreApr = +d.LFPGscoreApr
  d.LFPGscoreSep = +d.LFPGscoreSep

  d.LIRFscoreNov = +d.LIRFscoreNov
  d.LIRFscoreApr = +d.LIRFscoreApr
  d.LIRFscoreSep = +d.LIRFscoreSep

});

x11.domain([0, d3.max(data, function(d) { return d.EGLLscoreNov; })]);
x12.domain([0, d3.max(data, function(d) { return d.EGLLscoreApr; })]);
x13.domain([0, d3.max(data, function(d) { return d.EGLLscoreSep; })]);

x21.domain([0, d3.max(data, function(d) { return d.LFPGscoreNov; })]);
x22.domain([0, d3.max(data, function(d) { return d.LFPGscoreApr; })]);
x23.domain([0, d3.max(data, function(d) { return d.LFPGscoreSep; })]);

x31.domain([0, d3.max(data, function(d) { return d.LIRFscoreNov; })]);
x32.domain([0, d3.max(data, function(d) { return d.LIRFscoreApr; })]);
x33.domain([0, d3.max(data, function(d) { return d.LIRFscoreSep; })]);

y11.domain(data.map(function(d) { return d.EGLLNov; }));
y12.domain(data.map(function(d) { return d.EGLLApr; }));
y13.domain(data.map(function(d) { return d.EGLLSep; }));

y21.domain(data.map(function(d) { return d.LFPGNov; }));
y22.domain(data.map(function(d) { return d.LFPGApr; }));
y23.domain(data.map(function(d) { return d.LFPGSep; }));

y31.domain(data.map(function(d) { return d.LIRFNov; }));
y32.domain(data.map(function(d) { return d.LIRFApr; }));
y33.domain(data.map(function(d) { return d.LIRFSep; }));



var Eurbar11 = svg.selectAll(".Eurbar11")
    .data(data)
  .enter().append("g")
    .attr("class", "Eurbar");

Eurbar11.selectAll("text") //label area
  .data(["London"])
  .enter().append("text")
  //.attr("x", (labelArea / 2) + width) //alters x position start
  .attr("x", -margin.left)
  .attr("y", height/2 )
  .attr("dy", ".20em")
  .attr("text-anchor", "start") //start, middle, end
  .attr('class', 'name')
  .text(String);

Eurbar11.append("text").attr("x",margin.left + (width-margin.left)/2-15).attr("y", margin.top + height*3 - 10).text("Nov 2019").style("font", "11px").attr("text-anchor", "middle");
Eurbar11.append("text").attr("x",margin.left*2 + (width-margin.left)/2 + width-15).attr("y", margin.top + height*3 - 10).text("Apr 2020").style("font", "11px").attr("text-anchor", "middle");
Eurbar11.append("text").attr("x",margin.left*3 + (width-margin.left)/2 + width*2-15).attr("y", margin.top + height*3 - 10).text("Sep 2020").style("font", "11px").attr("text-anchor", "middle");

Eurbar11.append("text").attr("x",margin.left + (width-margin.left)/2-15).attr("y", 0).text("Nov 2019").style("font", "11px").attr("text-anchor", "middle");
Eurbar11.append("text").attr("x",margin.left*2 + (width-margin.left)/2 + width-15).attr("y",0).text("Apr 2020").style("font", "11px").attr("text-anchor", "middle");
Eurbar11.append("text").attr("x",margin.left*3 + (width-margin.left)/2 + width*2-15).attr("y",0).text("Sep 2020").style("font", "11px").attr("text-anchor", "middle");



Eurbar11.append("rect")
    .attr("x",0)
    .attr("y", function(d) { return y11(d.EGLLNov); })
    .attr("height", y11.rangeBand())
    .attr("width", function(d) { return x11(d.EGLLscoreNov) + 25; })
    .style("fill","#f65635");

Eurbar11.append("text")
    .attr("x", 3)
    .attr("y", function(d) { return y11(d.EGLLNov) + y11.rangeBand()/2 + 3; })
    .text(function (d) {
          return d.EGLLNov;
      });

Eurbar11.append("text")
    .attr("x", function(d) { return x11(d.EGLLscoreNov) + 3 + 25; })
    .attr("y", function(d) { return y11(d.EGLLNov) + y11.rangeBand()/2 + 3; })
    .text(function (d) {
          return d.EGLLscoreNov;
      });

var Eurbar12 = svg.selectAll(".Eurbar12")
    .data(data)
  .enter().append("g")
    .attr("class", "Eurbar");

Eurbar12.append("rect")
    .attr("x",width + margin.left)
    .attr("y", function(d) { return y12(d.EGLLApr); })
    .attr("height", y12.rangeBand())
    .attr("width", function(d) { return x12(d.EGLLscoreApr) + 25; })
    .style("fill","#f65635");

Eurbar12.append("text")
    .attr("x", 3 + width + margin.left)
    .attr("y", function(d) { return y12(d.EGLLApr) + y12.rangeBand()/2 + 3; })
    .text(function (d) {
          return d.EGLLApr;
      });

Eurbar12.append("text")
    .attr("x", function(d) { return x12(d.EGLLscoreApr) + 3 + 25 + width + margin.left; })
    .attr("y", function(d) { return y12(d.EGLLApr) + y12.rangeBand()/2 + 3; })
    .text(function (d) {
          return d.EGLLscoreApr;
      });

var Eurbar13 = svg.selectAll(".Eurbar13")
    .data(data)
  .enter().append("g")
    .attr("class", "Eurbar");

Eurbar13.append("rect")
    .attr("x",(width+margin.left)*2)
    .attr("y", function(d) { return y13(d.EGLLSep); })
    .attr("height", y13.rangeBand())
    .attr("width", function(d) { return x13(d.EGLLscoreSep) + 25; })
    .style("fill","#f65635");

Eurbar13.append("text")
    .attr("x", 3 + (width + margin.left)*2)
    .attr("y", function(d) { return y13(d.EGLLSep) + y13.rangeBand()/2 + 3; })
    .text(function (d) {
          return d.EGLLSep;
      });

Eurbar13.append("text")
    .attr("x", function(d) { return x13(d.EGLLscoreSep) + 3 + 25 + (width + margin.left)*2; })
    .attr("y", function(d) { return y13(d.EGLLSep) + y13.rangeBand()/2 + 3; })
    .text(function (d) {
          return d.EGLLscoreSep;
      });

var Eurbar21 = svg.selectAll(".Eurbar21")
    .data(data)
  .enter().append("g")
    .attr("class", "Eurbar");

Eurbar21.selectAll("text") //label area
  .data(["Paris"])
  .enter().append("text")
  .attr("x", -margin.left)
  .attr("y", height/2 + height )
  .attr("dy", ".20em")
  .attr("text-anchor", "start") //start, middle, end
  .attr('class', 'name')
  .text(String);

Eurbar21.append("rect")
    .attr("x",0)
    .attr("y", function(d) { return y21(d.LFPGNov) + height; })
    .attr("height", y21.rangeBand())
    .attr("width", function(d) { return x21(d.LFPGscoreNov) + 25; })
    .style("fill","#e84b70");

Eurbar21.append("text")
    .attr("x", 3)
    .attr("y", function(d) { return y21(d.LFPGNov) + y21.rangeBand()/2 + 3 + height; })
    .text(function (d) {
          return d.LFPGNov;
      });

Eurbar21.append("text")
    .attr("x", function(d) { return x21(d.LFPGscoreNov) + 3 + 25; })
    .attr("y", function(d) { return y21(d.LFPGNov) + y21.rangeBand()/2 + 3 + height; })
    .text(function (d) {
          return d.LFPGscoreNov;
      });

var Eurbar22 = svg.selectAll(".Eurbar22")
    .data(data)
  .enter().append("g")
    .attr("class", "Eurbar");

Eurbar22.append("rect")
    .attr("x",width+margin.left)
    .attr("y", function(d) { return y22(d.LFPGApr) + height; })
    .attr("height", y22.rangeBand())
    .attr("width", function(d) { return x22(d.LFPGscoreApr) + 25; })
    .style("fill","#e84b70");

Eurbar22.append("text")
    .attr("x", 3 + width + margin.left)
    .attr("y", function(d) { return y22(d.LFPGApr) + y22.rangeBand()/2 + 3 + height; })
    .text(function (d) {
          return d.LFPGApr;
      });

Eurbar22.append("text")
    .attr("x", function(d) { return x22(d.LFPGscoreApr) + 3 + 25 + width + margin.left; })
    .attr("y", function(d) { return y22(d.LFPGApr) + y22.rangeBand()/2 + 3 + height; })
    .text(function (d) {
          return d.LFPGscoreApr;
      });

var Eurbar23 = svg.selectAll(".Eurbar23")
    .data(data)
  .enter().append("g")
    .attr("class", "Eurbar");

Eurbar23.append("rect")
    .attr("x",(width+margin.left)*2)
    .attr("y", function(d) { return y23(d.LFPGSep)  + height; })
    .attr("height", y23.rangeBand())
    .attr("width", function(d) { return x23(d.LFPGscoreSep) + 25; })
    .style("fill","#e84b70");

Eurbar23.append("text")
    .attr("x", 3 + (width + margin.left)*2)
    .attr("y", function(d) { return y23(d.LFPGSep) + y23.rangeBand()/2 + 3 + height; })
    .text(function (d) {
          return d.LFPGSep;
      });

Eurbar23.append("text")
    .attr("x", function(d) { return x23(d.LFPGscoreSep) + 3 + 25 + (width + margin.left)*2; })
    .attr("y", function(d) { return y23(d.LFPGSep) + y23.rangeBand()/2 + 3 + height; })
    .text(function (d) {
          return d.LFPGscoreSep;
      });

var Eurbar31 = svg.selectAll(".Eurbar31")
    .data(data)
  .enter().append("g")
    .attr("class", "Eurbar");

Eurbar31.selectAll("text") //label area
  .data(["Rome"])
  .enter().append("text")
  .attr("x", -margin.left)
  .attr("y", height/2 + height*2 )
  .attr("dy", ".20em")
  .attr("text-anchor", "start") //start, middle, end
  .attr('class', 'name')
  .text(String);

Eurbar31.append("rect")
    .attr("x",0)
    .attr("y", function(d) { return y31(d.LIRFNov) + height*2; })
    .attr("height", y31.rangeBand())
    .attr("width", function(d) { return x31(d.LIRFscoreNov) + 25; })
    .style("fill","#bf4d96");

Eurbar31.append("text")
    .attr("x", 3)
    .attr("y", function(d) { return y31(d.LIRFNov) + y31.rangeBand()/2 + 3 + height*2; })
    .text(function (d) {
          return d.LIRFNov;
      });

Eurbar31.append("text")
    .attr("x", function(d) { return x31(d.LIRFscoreNov) + 3 + 25; })
    .attr("y", function(d) { return y31(d.LIRFNov) + y31.rangeBand()/2 + 3 + height*2; })
    .text(function (d) {
          return d.LIRFscoreNov;
      });

var Eurbar32 = svg.selectAll(".Eurbar32")
    .data(data)
  .enter().append("g")
    .attr("class", "Eurbar");

Eurbar32.append("rect")
    .attr("x",width+margin.left)
    .attr("y", function(d) { return y32(d.LIRFApr) + height*2; })
    .attr("height", y32.rangeBand())
    .attr("width", function(d) { return x32(d.LIRFscoreApr) + 25; })
    .style("fill","#bf4d96");

Eurbar32.append("text")
    .attr("x", 3 + width + margin.left)
    .attr("y", function(d) { return y32(d.LIRFApr) + y32.rangeBand()/2 + 3 + height*2; })
    .text(function (d) {
          return d.LIRFApr;
      });

Eurbar32.append("text")
    .attr("x", function(d) { return x32(d.LIRFscoreApr) + 3 + 25 + width + margin.left; })
    .attr("y", function(d) { return y32(d.LIRFApr) + y32.rangeBand()/2 + 3 + height*2; })
    .text(function (d) {
          return d.LIRFscoreApr;
      });

var Eurbar33 = svg.selectAll(".Eurbar33")
    .data(data)
  .enter().append("g")
    .attr("class", "Eurbar");

Eurbar33.append("rect")
    .attr("x",(width+margin.left)*2)
    .attr("y", function(d) { return y33(d.LIRFSep) + height*2; })
    .attr("height", y33.rangeBand())
    .attr("width", function(d) { return x33(d.LIRFscoreSep) + 25; })
    .style("fill","#bf4d96");

Eurbar33.append("text")
    .attr("x", 3 + (width + margin.left)*2)
    .attr("y", function(d) { return y33(d.LIRFSep) + y33.rangeBand()/2 + 3 + height*2; })
    .text(function (d) {
          return d.LIRFSep;
      });

Eurbar33.append("text")
    .attr("x", function(d) { return x33(d.LIRFscoreSep) + 3 + 25 + (width + margin.left)*2; })
    .attr("y", function(d) { return y33(d.LIRFSep) + y33.rangeBand()/2 + 3 + height*2; })
    .text(function (d) {
          return d.LIRFscoreSep;
      });
});


d3.csv("data_usa", function(error, data) {

data.forEach(function(d) {
  d.KJFKscoreNov = +d.KJFKscoreNov
  d.KJFKscoreApr = +d.KJFKscoreApr
  d.KJFKscoreSep = +d.KJFKscoreSep

  d.KLAXscoreNov = +d.KLAXscoreNov
  d.KLAXscoreApr = +d.KLAXscoreApr
  d.KLAXscoreSep = +d.KLAXscoreSep

  d.KDFWscoreNov = +d.KDFWscoreNov
  d.KDFWscoreApr = +d.KDFWscoreApr
  d.KDFWscoreSep = +d.KDFWscoreSep

});

x11.domain([0, d3.max(data, function(d) { return d.KJFKscoreNov; })]);
x12.domain([0, d3.max(data, function(d) { return d.KJFKscoreApr; })]);
x13.domain([0, d3.max(data, function(d) { return d.KJFKscoreSep; })]);

x21.domain([0, d3.max(data, function(d) { return d.KLAXscoreNov; })]);
x22.domain([0, d3.max(data, function(d) { return d.KLAXscoreApr; })]);
x23.domain([0, d3.max(data, function(d) { return d.KLAXscoreSep; })]);

x31.domain([0, d3.max(data, function(d) { return d.KDFWscoreNov; })]);
x32.domain([0, d3.max(data, function(d) { return d.KDFWscoreApr; })]);
x33.domain([0, d3.max(data, function(d) { return d.KDFWscoreSep; })]);

y11.domain(data.map(function(d) { return d.KJFKNov; }));
y12.domain(data.map(function(d) { return d.KJFKApr; }));
y13.domain(data.map(function(d) { return d.KJFKSep; }));

y21.domain(data.map(function(d) { return d.KLAXNov; }));
y22.domain(data.map(function(d) { return d.KLAXApr; }));
y23.domain(data.map(function(d) { return d.KLAXSep; }));

y31.domain(data.map(function(d) { return d.KDFWNov; }));
y32.domain(data.map(function(d) { return d.KDFWApr; }));
y33.domain(data.map(function(d) { return d.KDFWSep; }));



var USAbar11 = svg.selectAll(".USAbar11")
    .data(data)
  .enter().append("g")
    .attr("class", "USAbar");

USAbar11.selectAll("text") //label area
  .data(["New York"])
  .enter().append("text")
  .attr("x", -margin.left)
  .attr("y", height/2+height*3 + margin.top )
  .attr("dy", ".20em")
  .attr("text-anchor", "start") //start, middle, end
  .attr('class', 'name')
  .text(String);

USAbar11.append("rect")
    .attr("x",0)
    .attr("y", function(d) { return y11(d.KJFKNov) +height*3 + margin.top; })
    .attr("height", y11.rangeBand())
    .attr("width", function(d) { return x11(d.KJFKscoreNov) + 25; })
    .style("fill","#e6de58");

USAbar11.append("text")
    .attr("x", 3)
    .attr("y", function(d) { return y11(d.KJFKNov) + y11.rangeBand()/2 + 3+height*3 + margin.top; })
    .text(function (d) {
          return d.KJFKNov;
      });


USAbar11.append("text").attr("x",margin.left + (width-margin.left)/2-15).attr("y", margin.top + height*3+height*3 + margin.top - 10).text("Nov 2019").style("font", "11px").attr("text-anchor", "middle");
USAbar11.append("text").attr("x",margin.left*2 + (width-margin.left)/2 + width-15).attr("y", margin.top + height*3+height*3 + margin.top - 10).text("Apr 2020").style("font", "11px").attr("text-anchor", "middle");
USAbar11.append("text").attr("x",margin.left*3 + (width-margin.left)/2 + width*2-15).attr("y", margin.top + height*3+height*3 + margin.top - 10).text("Sep 2020").style("font", "11px").attr("text-anchor", "middle");

USAbar11.append("text")
    .attr("x", function(d) { return x11(d.KJFKscoreNov) + 3 + 25; })
    .attr("y", function(d) { return y11(d.KJFKNov) + y11.rangeBand()/2 + 3+height*3 + margin.top; })
    .text(function (d) {
          return d.KJFKscoreNov;
      });

var USAbar12 = svg.selectAll(".USAbar12")
    .data(data)
  .enter().append("g")
    .attr("class", "USAbar");

USAbar12.append("rect")
    .attr("x",width+margin.left)
    .attr("y", function(d) { return y12(d.KJFKApr)+height*3 + margin.top; })
    .attr("height", y12.rangeBand())
    .attr("width", function(d) { return x12(d.KJFKscoreApr) + 25; })
    .style("fill","#e6de58");

USAbar12.append("text")
    .attr("x", 3 + width + margin.left)
    .attr("y", function(d) { return y12(d.KJFKApr) + y12.rangeBand()/2 + 3+height*3 + margin.top; })
    .text(function (d) {
          return d.KJFKApr;
      });

USAbar12.append("text")
    .attr("x", function(d) { return x12(d.KJFKscoreApr) + 3 + 25 + width + margin.left; })
    .attr("y", function(d) { return y12(d.KJFKApr) + y12.rangeBand()/2 + 3+height*3 + margin.top; })
    .text(function (d) {
          return d.KJFKscoreApr;
      });

var USAbar13 = svg.selectAll(".USAbar13")
    .data(data)
  .enter().append("g")
    .attr("class", "USAbar");

USAbar13.append("rect")
    .attr("x",(width+margin.left)*2)
    .attr("y", function(d) { return y13(d.KJFKSep)+height*3 + margin.top; })
    .attr("height", y13.rangeBand())
    .attr("width", function(d) { return x13(d.KJFKscoreSep) + 25; })
    .style("fill","#e6de58");

USAbar13.append("text")
    .attr("x", 3 + (width + margin.left)*2)
    .attr("y", function(d) { return y13(d.KJFKSep) + y13.rangeBand()/2 + 3+height*3 + margin.top; })
    .text(function (d) {
          return d.KJFKSep;
      });

USAbar13.append("text")
    .attr("x", function(d) { return x13(d.KJFKscoreSep) + 3 + 25 + (width + margin.left)*2; })
    .attr("y", function(d) { return y13(d.KJFKSep) + y13.rangeBand()/2 + 3+height*3 + margin.top; })
    .text(function (d) {
          return d.KJFKscoreSep;
      });

var USAbar21 = svg.selectAll(".USAbar21")
    .data(data)
  .enter().append("g")
    .attr("class", "USAbar");

USAbar21.selectAll("text") //label area
  .data(["Los Angeles"])
  .enter().append("text")
  .attr("x", -margin.left)
  .attr("y", height/2 + height+height*3 + margin.top )
  .attr("dy", ".20em")
  .attr("text-anchor", "start") //start, middle, end
  .attr('class', 'name')
  .text(String);

USAbar21.append("rect")
    .attr("x",0)
    .attr("y", function(d) { return y21(d.KLAXNov) + height+height*3 + margin.top; })
    .attr("height", y21.rangeBand())
    .attr("width", function(d) { return x21(d.KLAXscoreNov) + 25; })
    .style("fill","#5cd343");

USAbar21.append("text")
    .attr("x", 3)
    .attr("y", function(d) { return y21(d.KLAXNov) + y21.rangeBand()/2 + 3 + height+height*3 + margin.top; })
    .text(function (d) {
          return d.KLAXNov;
      });

USAbar21.append("text")
    .attr("x", function(d) { return x21(d.KLAXscoreNov) + 3 + 25; })
    .attr("y", function(d) { return y21(d.KLAXNov) + y21.rangeBand()/2 + 3 + height+height*3 + margin.top; })
    .text(function (d) {
          return d.KLAXscoreNov;
      });

var USAbar22 = svg.selectAll(".USAbar22")
    .data(data)
  .enter().append("g")
    .attr("class", "USAbar");

USAbar22.append("rect")
    .attr("x",width+margin.left)
    .attr("y", function(d) { return y22(d.KLAXApr) + height+height*3 + margin.top; })
    .attr("height", y22.rangeBand())
    .attr("width", function(d) { return x22(d.KLAXscoreApr) + 25; })
    .style("fill","#5cd343");

USAbar22.append("text")
    .attr("x", 3 + width + margin.left)
    .attr("y", function(d) { return y22(d.KLAXApr) + y22.rangeBand()/2 + 3 + height+height*3 + margin.top; })
    .text(function (d) {
          return d.KLAXApr;
      });

USAbar22.append("text")
    .attr("x", function(d) { return x22(d.KLAXscoreApr) + 3 + 25 + width + margin.left; })
    .attr("y", function(d) { return y22(d.KLAXApr) + y22.rangeBand()/2 + 3 + height+height*3 + margin.top; })
    .text(function (d) {
          return d.KLAXscoreApr;
      });

var USAbar23 = svg.selectAll(".USAbar23")
    .data(data)
  .enter().append("g")
    .attr("class", "USAbar");

USAbar23.append("rect")
    .attr("x",(width+margin.left)*2)
    .attr("y", function(d) { return y23(d.KLAXSep)  + height+height*3 + margin.top; })
    .attr("height", y23.rangeBand())
    .attr("width", function(d) { return x23(d.KLAXscoreSep) + 25; })
    .style("fill","#5cd343");

USAbar23.append("text")
    .attr("x", 3 + (width + margin.left)*2)
    .attr("y", function(d) { return y23(d.KLAXSep) + y23.rangeBand()/2 + 3 + height+height*3 + margin.top; })
    .text(function (d) {
          return d.KLAXSep;
      });

USAbar23.append("text")
    .attr("x", function(d) { return x23(d.KLAXscoreSep) + 3 + 25 + (width + margin.left)*2; })
    .attr("y", function(d) { return y23(d.KLAXSep) + y23.rangeBand()/2 + 3 + height+height*3 + margin.top; })
    .text(function (d) {
          return d.KLAXscoreSep;
      });

var USAbar31 = svg.selectAll(".USAbar31")
    .data(data)
  .enter().append("g")
    .attr("class", "USAbar");

USAbar31.selectAll("text") //label area
  .data(["Dallas"])
  .enter().append("text")
  .attr("x", -margin.left)
  .attr("y", height/2 + height*2+height*3 + margin.top )
  .attr("dy", ".20em")
  .attr("text-anchor", "start") //start, middle, end
  .attr('class', 'name')
  .text(String);

USAbar31.append("rect")
    .attr("x",0)
    .attr("y", function(d) { return y31(d.KDFWNov) + height*2+height*3 + margin.top; })
    .attr("height", y31.rangeBand())
    .attr("width", function(d) { return x31(d.KDFWscoreNov) + 25; })
    .style("fill","#1a9850");

USAbar31.append("text")
    .attr("x", 3)
    .attr("y", function(d) { return y31(d.KDFWNov) + y31.rangeBand()/2 + 3 + height*2+height*3 + margin.top; })
    .text(function (d) {
          return d.KDFWNov;
      });

USAbar31.append("text")
    .attr("x", function(d) { return x31(d.KDFWscoreNov) + 3 + 25; })
    .attr("y", function(d) { return y31(d.KDFWNov) + y31.rangeBand()/2 + 3 + height*2+height*3 + margin.top; })
    .text(function (d) {
          return d.KDFWscoreNov;
      });

var USAbar32 = svg.selectAll(".USAbar32")
    .data(data)
  .enter().append("g")
    .attr("class", "USAbar");

USAbar32.append("rect")
    .attr("x",width+margin.left)
    .attr("y", function(d) { return y32(d.KDFWApr) + height*2+height*3 + margin.top; })
    .attr("height", y32.rangeBand())
    .attr("width", function(d) { return x32(d.KDFWscoreApr) + 25; })
    .style("fill","#1a9850");

USAbar32.append("text")
    .attr("x", 3 + width + margin.left)
    .attr("y", function(d) { return y32(d.KDFWApr) + y32.rangeBand()/2 + 3 + height*2+height*3 + margin.top; })
    .text(function (d) {
          return d.KDFWApr;
      });

USAbar32.append("text")
    .attr("x", function(d) { return x32(d.KDFWscoreApr) + 3 + 25 + width + margin.left; })
    .attr("y", function(d) { return y32(d.KDFWApr) + y32.rangeBand()/2 + 3 + height*2+height*3 + margin.top })
    .text(function (d) {
          return d.KDFWscoreApr;
      });

var USAbar33 = svg.selectAll(".USAbar33")
    .data(data)
  .enter().append("g")
    .attr("class", "USAbar");

USAbar33.append("rect")
    .attr("x",(width+margin.left)*2)
    .attr("y", function(d) { return y33(d.KDFWSep) + height*2+height*3 + margin.top; })
    .attr("height", y33.rangeBand())
    .attr("width", function(d) { return x33(d.KDFWscoreSep) + 25; })
    .style("fill","#1a9850");

USAbar33.append("text")
    .attr("x", 3 + (width + margin.left)*2)
    .attr("y", function(d) { return y33(d.KDFWSep) + y33.rangeBand()/2 + 3 + height*2+height*3 + margin.top; })
    .text(function (d) {
          return d.KDFWSep;
      });

USAbar33.append("text")
    .attr("x", function(d) { return x33(d.KDFWscoreSep) + 3 + 25 + (width + margin.left)*2; })
    .attr("y", function(d) { return y33(d.KDFWSep) + y33.rangeBand()/2 + 3 + height*2+height*3 + margin.top; })
    .text(function (d) {
          return d.KDFWscoreSep;
      });
});

d3.csv("data_asia", function(error, data) {

data.forEach(function(d) {
  d.WSSSscoreNov = +d.WSSSscoreNov
  d.WSSSscoreApr = +d.WSSSscoreApr
  d.WSSSscoreSep = +d.WSSSscoreSep

  d.RKSIscoreNov = +d.RKSIscoreNov
  d.RKSIscoreApr = +d.RKSIscoreApr
  d.RKSIscoreSep = +d.RKSIscoreSep

  d.VHHHscoreNov = +d.VHHHscoreNov
  d.VHHHscoreApr = +d.VHHHscoreApr
  d.VHHHscoreSep = +d.VHHHscoreSep

  d.RJTTscoreNov = +d.RJTTscoreNov
  d.RJTTscoreApr = +d.RJTTscoreApr
  d.RJTTscoreSep = +d.RJTTscoreSep

});

x11.domain([0, d3.max(data, function(d) { return d.WSSSscoreNov; })]);
x12.domain([0, d3.max(data, function(d) { return d.WSSSscoreApr; })]);
x13.domain([0, d3.max(data, function(d) { return d.WSSSscoreSep; })]);

x21.domain([0, d3.max(data, function(d) { return d.RKSIscoreNov; })]);
x22.domain([0, d3.max(data, function(d) { return d.RKSIscoreApr; })]);
x23.domain([0, d3.max(data, function(d) { return d.RKSIscoreSep; })]);

x31.domain([0, d3.max(data, function(d) { return d.VHHHscoreNov; })]);
x32.domain([0, d3.max(data, function(d) { return d.VHHHscoreApr; })]);
x33.domain([0, d3.max(data, function(d) { return d.VHHHscoreSep; })]);

x41.domain([0, d3.max(data, function(d) { return d.RJTTscoreNov; })]);
x42.domain([0, d3.max(data, function(d) { return d.RJTTscoreApr; })]);
x43.domain([0, d3.max(data, function(d) { return d.RJTTscoreSep; })]);

y11.domain(data.map(function(d) { return d.WSSSNov; }));
y12.domain(data.map(function(d) { return d.WSSSApr; }));
y13.domain(data.map(function(d) { return d.WSSSSep; }));

y21.domain(data.map(function(d) { return d.RKSINov; }));
y22.domain(data.map(function(d) { return d.RKSIApr; }));
y23.domain(data.map(function(d) { return d.RKSISep; }));

y31.domain(data.map(function(d) { return d.VHHHNov; }));
y32.domain(data.map(function(d) { return d.VHHHApr; }));
y33.domain(data.map(function(d) { return d.VHHHSep; }));

y41.domain(data.map(function(d) { return d.RJTTNov; }));
y42.domain(data.map(function(d) { return d.RJTTApr; }));
y43.domain(data.map(function(d) { return d.RJTTSep; }));


var ASIAbar11 = svg.selectAll(".ASIAbar11")
    .data(data)
  .enter().append("g")
    .attr("class", "ASIAbar");

ASIAbar11.selectAll("text") //label area
  .data(["Singapore"])
  .enter().append("text")
  .attr("x", -margin.left)
  .attr("y", height/2 + height*6 + margin.top*2)
  .attr("dy", ".20em")
  .attr("text-anchor", "start") //start, middle, end
  .attr('class', 'name')
  .text(String);

ASIAbar11.append("rect")
    .attr("x",0)
    .attr("y", function(d) { return y11(d.WSSSNov)+ height*6 + margin.top*2; })
    .attr("height", y11.rangeBand())
    .attr("width", function(d) { return x11(d.WSSSscoreNov) + 25; })
    .style("fill","#8aebed");

ASIAbar11.append("text")
    .attr("x", 3)
    .attr("y", function(d) { return y11(d.WSSSNov) + y11.rangeBand()/2 + 3+ height*6 + margin.top*2; })
    .text(function (d) {
          return d.WSSSNov;
      });

ASIAbar11.append("text").attr("x",margin.left + (width-margin.left)/2-15).attr("y", margin.top + height*4+ height*6 + margin.top*2 - 10).text("Nov 2019").style("font", "11px").attr("text-anchor", "middle");
ASIAbar11.append("text").attr("x",margin.left*2 + (width-margin.left)/2 + width-15).attr("y", margin.top + height*4+ height*6 + margin.top*2 - 10).text("Apr 2020").style("font", "11px").attr("text-anchor", "middle");
ASIAbar11.append("text").attr("x",margin.left*3 + (width-margin.left)/2 + width*2-15).attr("y", margin.top + height*4+ height*6 + margin.top*2 - 10).text("Sep 2020").style("font", "11px").attr("text-anchor", "middle");


ASIAbar11.append("text")
    .attr("x", function(d) { return x11(d.WSSSscoreNov) + 3 + 25; })
    .attr("y", function(d) { return y11(d.WSSSNov) + y11.rangeBand()/2 + 3+ height*6 + margin.top*2; })
    .text(function (d) {
          return d.WSSSscoreNov;
      });

var ASIAbar12 = svg.selectAll(".ASIAbar12")
    .data(data)
  .enter().append("g")
    .attr("class", "ASIAbar");

ASIAbar12.append("rect")
    .attr("x",width+margin.left)
    .attr("y", function(d) { return y12(d.WSSSApr)+ height*6 + margin.top*2; })
    .attr("height", y12.rangeBand())
    .attr("width", function(d) { return x12(d.WSSSscoreApr) + 25; })
    .style("fill","#8aebed");

ASIAbar12.append("text")
    .attr("x", 3 + width + margin.left)
    .attr("y", function(d) { return y12(d.WSSSApr) + y12.rangeBand()/2 + 3+ height*6 + margin.top*2; })
    .text(function (d) {
          return d.WSSSApr;
      });

ASIAbar12.append("text")
    .attr("x", function(d) { return x12(d.WSSSscoreApr) + 3 + 25 + width + margin.left; })
    .attr("y", function(d) { return y12(d.WSSSApr) + y12.rangeBand()/2 + 3+ height*6 + margin.top*2; })
    .text(function (d) {
          return d.WSSSscoreApr;
      });

var ASIAbar13 = svg.selectAll(".ASIAbar13")
    .data(data)
  .enter().append("g")
    .attr("class", "ASIAbar");

ASIAbar13.append("rect")
    .attr("x",(width+margin.left)*2)
    .attr("y", function(d) { return y13(d.WSSSSep)+ height*6 + margin.top*2; })
    .attr("height", y13.rangeBand())
    .attr("width", function(d) { return x13(d.WSSSscoreSep) + 25; })
    .style("fill","#8aebed");

ASIAbar13.append("text")
    .attr("x", 3 + (width + margin.left)*2)
    .attr("y", function(d) { return y13(d.WSSSSep) + y13.rangeBand()/2 + 3+ height*6 + margin.top*2; })
    .text(function (d) {
          return d.WSSSSep;
      });

ASIAbar13.append("text")
    .attr("x", function(d) { return x13(d.WSSSscoreSep) + 3 + 25 + (width + margin.left)*2; })
    .attr("y", function(d) { return y13(d.WSSSSep) + y13.rangeBand()/2 + 3+ height*6 + margin.top*2; })
    .text(function (d) {
          return d.WSSSscoreSep;
      });

var ASIAbar21 = svg.selectAll(".ASIAbar21")
    .data(data)
  .enter().append("g")
    .attr("class", "ASIAbar");

ASIAbar21.selectAll("text") //label area
  .data(["Seoul"])
  .enter().append("text")
  .attr("x", -margin.left)
  .attr("y", height/2 + height + height*6 + margin.top*2)
  .attr("dy", ".20em")
  .attr("text-anchor", "start") //start, middle, end
  .attr('class', 'name')
  .text(String);

ASIAbar21.append("rect")
    .attr("x",0)
    .attr("y", function(d) { return y21(d.RKSINov) + height+ height*6 + margin.top*2; })
    .attr("height", y21.rangeBand())
    .attr("width", function(d) { return x21(d.RKSIscoreNov) + 25; })
    .style("fill","#00c8fe");

ASIAbar21.append("text")
    .attr("x", 3)
    .attr("y", function(d) { return y21(d.RKSINov) + y21.rangeBand()/2 + 3 + height+ height*6 + margin.top*2; })
    .text(function (d) {
          return d.RKSINov;
      });

ASIAbar21.append("text")
    .attr("x", function(d) { return x21(d.RKSIscoreNov) + 3 + 25; })
    .attr("y", function(d) { return y21(d.RKSINov) + y21.rangeBand()/2 + 3 + height+ height*6 + margin.top*2; })
    .text(function (d) {
          return d.RKSIscoreNov;
      });

var ASIAbar22 = svg.selectAll(".ASIAbar22")
    .data(data)
  .enter().append("g")
    .attr("class", "ASIAbar");

ASIAbar22.append("rect")
    .attr("x",width+margin.left)
    .attr("y", function(d) { return y22(d.RKSIApr) + height+ height*6 + margin.top*2; })
    .attr("height", y22.rangeBand())
    .attr("width", function(d) { return x22(d.RKSIscoreApr) + 25; })
    .style("fill","#00c8fe");

ASIAbar22.append("text")
    .attr("x", 3 + width + margin.left)
    .attr("y", function(d) { return y22(d.RKSIApr) + y22.rangeBand()/2 + 3 + height+ height*6 + margin.top*2; })
    .text(function (d) {
          return d.RKSIApr;
      });

ASIAbar22.append("text")
    .attr("x", function(d) { return x22(d.RKSIscoreApr) + 3 + 25 + width + margin.left; })
    .attr("y", function(d) { return y22(d.RKSIApr) + y22.rangeBand()/2 + 3 + height+ height*6 + margin.top*2; })
    .text(function (d) {
          return d.RKSIscoreApr;
      });

var ASIAbar23 = svg.selectAll(".ASIAbar23")
    .data(data)
  .enter().append("g")
    .attr("class", "ASIAbar");

ASIAbar23.append("rect")
    .attr("x",(width+margin.left)*2)
    .attr("y", function(d) { return y23(d.RKSISep)  + height+ height*6 + margin.top*2; })
    .attr("height", y23.rangeBand())
    .attr("width", function(d) { return x23(d.RKSIscoreSep) + 25; })
    .style("fill","#00c8fe");

ASIAbar23.append("text")
    .attr("x", 3 + (width + margin.left)*2)
    .attr("y", function(d) { return y23(d.RKSISep) + y23.rangeBand()/2 + 3 + height+ height*6 + margin.top*2; })
    .text(function (d) {
          return d.RKSISep;
      });

ASIAbar23.append("text")
    .attr("x", function(d) { return x23(d.RKSIscoreSep) + 3 + 25 + (width + margin.left)*2; })
    .attr("y", function(d) { return y23(d.RKSISep) + y23.rangeBand()/2 + 3 + height+ height*6 + margin.top*2; })
    .text(function (d) {
          return d.RKSIscoreSep;
      });

var ASIAbar31 = svg.selectAll(".ASIAbar31")
    .data(data)
  .enter().append("g")
    .attr("class", "ASIAbar");

ASIAbar31.selectAll("text") //label area
  .data(["Hong Kong"])
  .enter().append("text")
  .attr("x", -margin.left)
  .attr("y", height/2 + height*2+ height*6 + margin.top*2 )
  .attr("dy", ".20em")
  .attr("text-anchor", "start") //start, middle, end
  .attr('class', 'name')
  .text(String);

ASIAbar31.append("rect")
    .attr("x",0)
    .attr("y", function(d) { return y31(d.VHHHNov) + height*2+ height*6 + margin.top*2; })
    .attr("height", y31.rangeBand())
    .attr("width", function(d) { return x31(d.VHHHscoreNov) + 25; })
    .style("fill","#407cff");

ASIAbar31.append("text")
    .attr("x", 3)
    .attr("y", function(d) { return y31(d.VHHHNov) + y31.rangeBand()/2 + 3 + height*2+ height*6 + margin.top*2; })
    .text(function (d) {
          return d.VHHHNov;
      });

ASIAbar31.append("text")
    .attr("x", function(d) { return x31(d.VHHHscoreNov) + 3 + 25; })
    .attr("y", function(d) { return y31(d.VHHHNov) + y31.rangeBand()/2 + 3 + height*2+ height*6 + margin.top*2; })
    .text(function (d) {
          return d.VHHHscoreNov;
      });

var ASIAbar32 = svg.selectAll(".ASIAbar32")
    .data(data)
  .enter().append("g")
    .attr("class", "ASIAbar");

ASIAbar32.append("rect")
    .attr("x",width+margin.left)
    .attr("y", function(d) { return y32(d.VHHHApr) + height*2+ height*6 + margin.top*2; })
    .attr("height", y32.rangeBand())
    .attr("width", function(d) { return x32(d.VHHHscoreApr) + 25; })
    .style("fill","#407cff");

ASIAbar32.append("text")
    .attr("x", 3 + width + margin.left)
    .attr("y", function(d) { return y32(d.VHHHApr) + y32.rangeBand()/2 + 3 + height*2+ height*6 + margin.top*2; })
    .text(function (d) {
          return d.VHHHApr;
      });

ASIAbar32.append("text")
    .attr("x", function(d) { return x32(d.VHHHscoreApr) + 3 + 25 + width + margin.left; })
    .attr("y", function(d) { return y32(d.VHHHApr) + y32.rangeBand()/2 + 3 + height*2+ height*6 + margin.top*2; })
    .text(function (d) {
          return d.VHHHscoreApr;
      });

var ASIAbar33 = svg.selectAll(".ASIAbar33")
    .data(data)
  .enter().append("g")
    .attr("class", "ASIAbar");

ASIAbar33.append("rect")
    .attr("x",(width+margin.left)*2)
    .attr("y", function(d) { return y33(d.VHHHSep) + height*2+ height*6 + margin.top*2; })
    .attr("height", y33.rangeBand())
    .attr("width", function(d) { return x33(d.VHHHscoreSep) + 25; })
    .style("fill","#407cff");

ASIAbar33.append("text")
    .attr("x", 3 + (width + margin.left)*2)
    .attr("y", function(d) { return y33(d.VHHHSep) + y33.rangeBand()/2 + 3 + height*2+ height*6 + margin.top*2; })
    .text(function (d) {
          return d.VHHHSep;
      });

ASIAbar33.append("text")
    .attr("x", function(d) { return x33(d.VHHHscoreSep) + 3 + 25 + (width + margin.left)*2; })
    .attr("y", function(d) { return y33(d.VHHHSep) + y33.rangeBand()/2 + 3 + height*2+ height*6 + margin.top*2; })
    .text(function (d) {
          return d.VHHHscoreSep;
      });

var ASIAbar41 = svg.selectAll(".ASIAbar31")
    .data(data)
  .enter().append("g")
    .attr("class", "ASIAbar");

ASIAbar41.selectAll("text") //label area
  .data(["Tokyo - HND"])
  .enter().append("text")
  .attr("x", -margin.left)
  .attr("y", height/2 + height*3+ height*6 + margin.top*2 )
  .attr("dy", ".20em")
  .attr("text-anchor", "start") //start, middle, end
  .attr('class', 'name')
  .text(String);

ASIAbar41.append("rect")
    .attr("x",0)
    .attr("y", function(d) { return y41(d.RJTTNov) + height*3+ height*6 + margin.top*2; })
    .attr("height", y41.rangeBand())
    .attr("width", function(d) { return x41(d.RJTTscoreNov) + 25; })
    .style("fill","#6f73c0");

ASIAbar41.append("text")
    .attr("x", 3)
    .attr("y", function(d) { return y41(d.RJTTNov) + y41.rangeBand()/2 + 3 + height*3+ height*6 + margin.top*2; })
    .text(function (d) {
          return d.RJTTNov;
      });

ASIAbar41.append("text")
    .attr("x", function(d) { return x41(d.RJTTscoreNov) + 3 + 25; })
    .attr("y", function(d) { return y41(d.RJTTNov) + y41.rangeBand()/2 + 3 + height*3+ height*6 + margin.top*2; })
    .text(function (d) {
          return d.RJTTscoreNov;
      });

var ASIAbar42 = svg.selectAll(".ASIAbar32")
    .data(data)
  .enter().append("g")
    .attr("class", "ASIAbar");

ASIAbar42.append("rect")
    .attr("x",width+margin.left)
    .attr("y", function(d) { return y42(d.RJTTApr) + height*3+ height*6 + margin.top*2; })
    .attr("height", y42.rangeBand())
    .attr("width", function(d) { return x42(d.RJTTscoreApr) + 25; })
    .style("fill","#6f73c0");

ASIAbar42.append("text")
    .attr("x", 3 + width + margin.left)
    .attr("y", function(d) { return y42(d.RJTTApr) + y42.rangeBand()/2 + 3 + height*3+ height*6 + margin.top*2; })
    .text(function (d) {
          return d.RJTTApr;
      });

ASIAbar42.append("text")
    .attr("x", function(d) { return x42(d.RJTTscoreApr) + 3 + 25 + width + margin.left; })
    .attr("y", function(d) { return y42(d.RJTTApr) + y42.rangeBand()/2 + 3 + height*3+ height*6 + margin.top*2; })
    .text(function (d) {
          return d.RJTTscoreApr;
      });

var ASIAbar43 = svg.selectAll(".ASIAbar33")
    .data(data)
  .enter().append("g")
    .attr("class", "ASIAbar");

ASIAbar43.append("rect")
    .attr("x",(width+margin.left)*2)
    .attr("y", function(d) { return y43(d.RJTTSep) + height*3+ height*6 + margin.top*2; })
    .attr("height", y43.rangeBand())
    .attr("width", function(d) { return x43(d.RJTTscoreSep) + 25; })
    .style("fill","#6f73c0");

ASIAbar43.append("text")
    .attr("x", 3 + (width + margin.left)*2)
    .attr("y", function(d) { return y43(d.RJTTSep) + y43.rangeBand()/2 + 3 + height*3+ height*6 + margin.top*2; })
    .text(function (d) {
          return d.RJTTSep;
      });

ASIAbar43.append("text")
    .attr("x", function(d) { return x43(d.RJTTscoreSep) + 3 + 25 + (width + margin.left)*2; })
    .attr("y", function(d) { return y43(d.RJTTSep) + y43.rangeBand()/2 + 3 + height*3+ height*6 + margin.top*2; })
    .text(function (d) {
          return d.RJTTscoreSep;
      });
});

d3.csv("data_mid", function(error, data) {

data.forEach(function(d) {
  d.VIDPscoreNov = +d.VIDPscoreNov
  d.VIDPscoreApr = +d.VIDPscoreApr
  d.VIDPscoreSep = +d.VIDPscoreSep

  d.OMDBscoreNov = +d.OMDBscoreNov
  d.OMDBscoreApr = +d.OMDBscoreApr
  d.OMDBscoreSep = +d.OMDBscoreSep

});

x11.domain([0, d3.max(data, function(d) { return d.VIDPscoreNov; })]);
x12.domain([0, d3.max(data, function(d) { return d.VIDPscoreApr; })]);
x13.domain([0, d3.max(data, function(d) { return d.VIDPscoreSep; })]);

x21.domain([0, d3.max(data, function(d) { return d.OMDBscoreNov; })]);
x22.domain([0, d3.max(data, function(d) { return d.OMDBscoreApr; })]);
x23.domain([0, d3.max(data, function(d) { return d.OMDBscoreSep; })]);

y11.domain(data.map(function(d) { return d.VIDPNov; }));
y12.domain(data.map(function(d) { return d.VIDPApr; }));
y13.domain(data.map(function(d) { return d.VIDPSep; }));

y21.domain(data.map(function(d) { return d.OMDBNov; }));
y22.domain(data.map(function(d) { return d.OMDBApr; }));
y23.domain(data.map(function(d) { return d.OMDBSep; }));


var MIDbar11 = svg.selectAll(".MIDbar11")
    .data(data)
  .enter().append("g")
    .attr("class", "MIDbar");

MIDbar11.selectAll("text") //label area
  .data(["New Delhi"])
  .enter().append("text")
  .attr("x", -margin.left)
  .attr("y", height/2 + height*10 + margin.top*3)
  .attr("dy", ".20em")
  .attr("text-anchor", "start") //start, middle, end
  .attr('class', 'name')
  .text(String);

MIDbar11.append("rect")
    .attr("x",0)
    .attr("y", function(d) { return y11(d.VIDPNov) + height*10 + margin.top*3; })
    .attr("height", y11.rangeBand())
    .attr("width", function(d) { return x11(d.VIDPscoreNov) + 25; })
    .style("fill","#cb4787");

MIDbar11.append("text")
    .attr("x", 3)
    .attr("y", function(d) { return y11(d.VIDPNov) + y11.rangeBand()/2 + 3 + height*10 + margin.top*3; })
    .text(function (d) {
          return d.VIDPNov;
      });

MIDbar11.append("text")
    .attr("x", function(d) { return x11(d.VIDPscoreNov) + 3 + 25; })
    .attr("y", function(d) { return y11(d.VIDPNov) + y11.rangeBand()/2 + 3 + height*10 + margin.top*3; })
    .text(function (d) {
          return d.VIDPscoreNov;
      });

var MIDbar12 = svg.selectAll(".MIDbar12")
    .data(data)
  .enter().append("g")
    .attr("class", "MIDbar");

MIDbar12.append("rect")
    .attr("x",width+margin.left)
    .attr("y", function(d) { return y12(d.VIDPApr) + height*10 + margin.top*3; })
    .attr("height", y12.rangeBand())
    .attr("width", function(d) { return x12(d.VIDPscoreApr) + 25; })
    .style("fill","#cb4787");

MIDbar12.append("text")
    .attr("x", 3 + width + margin.left)
    .attr("y", function(d) { return y12(d.VIDPApr) + y12.rangeBand()/2 + 3 + height*10 + margin.top*3; })
    .text(function (d) {
          return d.VIDPApr;
      });

MIDbar12.append("text")
    .attr("x", function(d) { return x12(d.VIDPscoreApr) + 3 + 25 + width + margin.left; })
    .attr("y", function(d) { return y12(d.VIDPApr) + y12.rangeBand()/2 + 3 + height*10 + margin.top*3; })
    .text(function (d) {
          return d.VIDPscoreApr;
      });

var MIDbar13 = svg.selectAll(".MIDbar13")
    .data(data)
  .enter().append("g")
    .attr("class", "MIDbar");

MIDbar13.append("rect")
    .attr("x",(width+margin.left)*2)
    .attr("y", function(d) { return y13(d.VIDPSep) + height*10 + margin.top*3; })
    .attr("height", y13.rangeBand())
    .attr("width", function(d) { return x13(d.VIDPscoreSep) + 25; })
    .style("fill","#cb4787");

MIDbar13.append("text")
    .attr("x", 3 + (width + margin.left)*2)
    .attr("y", function(d) { return y13(d.VIDPSep) + y13.rangeBand()/2 + 3 + height*10 + margin.top*3; })
    .text(function (d) {
          return d.VIDPSep;
      });

MIDbar13.append("text")
    .attr("x", function(d) { return x13(d.VIDPscoreSep) + 3 + 25 + (width + margin.left)*2; })
    .attr("y", function(d) { return y13(d.VIDPSep) + y13.rangeBand()/2 + 3 + height*10 + margin.top*3; })
    .text(function (d) {
          return d.VIDPscoreSep;
      });

var MIDbar21 = svg.selectAll(".MIDbar21")
    .data(data)
  .enter().append("g")
    .attr("class", "MIDbar");

MIDbar21.selectAll("text") //label area
  .data(["Dubai"])
  .enter().append("text")
  .attr("x", -margin.left)
  .attr("y", height/2 + height + height*10 + margin.top*3 )
  .attr("dy", ".20em")
  .attr("text-anchor", "start") //start, middle, end
  .text(String);


MIDbar21.append("rect")
    .attr("x",0)
    .attr("y", function(d) { return y21(d.OMDBNov) + height + height*10 + margin.top*3; })
    .attr("height", y21.rangeBand())
    .attr("width", function(d) { return x21(d.OMDBscoreNov) + 25; })
    .style("fill","#ff4828");

MIDbar21.append("text")
    .attr("x", 3)
    .attr("y", function(d) { return y21(d.OMDBNov) + y21.rangeBand()/2 + 3 + height + height*10 + margin.top*3; })
    .text(function (d) {
          return d.OMDBNov;
      });

MIDbar21.append("text")
    .attr("x", function(d) { return x21(d.OMDBscoreNov) + 3 + 25; })
    .attr("y", function(d) { return y21(d.OMDBNov) + y21.rangeBand()/2 + 3 + height + height*10 + margin.top*3; })
    .text(function (d) {
          return d.OMDBscoreNov;
      });

var MIDbar22 = svg.selectAll(".MIDbar22")
    .data(data)
  .enter().append("g")
    .attr("class", "MIDbar");

MIDbar22.append("rect")
    .attr("x",width+margin.left)
    .attr("y", function(d) { return y22(d.OMDBApr) + height + height*10 + margin.top*3; })
    .attr("height", y22.rangeBand())
    .attr("width", function(d) { return x22(d.OMDBscoreApr) + 25; })
    .style("fill","#ff4828");

MIDbar22.append("text")
    .attr("x", 3 + width + margin.left)
    .attr("y", function(d) { return y22(d.OMDBApr) + y22.rangeBand()/2 + 3 + height + height*10 + margin.top*3; })
    .text(function (d) {
          return d.OMDBApr;
      });

MIDbar22.append("text")
    .attr("x", function(d) { return x22(d.OMDBscoreApr) + 3 + 25 + width + margin.left; })
    .attr("y", function(d) { return y22(d.OMDBApr) + y22.rangeBand()/2 + 3 + height + height*10 + margin.top*3; })
    .text(function (d) {
          return d.OMDBscoreApr;
      });

var MIDbar23 = svg.selectAll(".MIDbar23")
    .data(data)
  .enter().append("g")
    .attr("class", "MIDbar");

MIDbar23.append("rect")
    .attr("x",(width+margin.left)*2)
    .attr("y", function(d) { return y23(d.OMDBSep)  + height + height*10 + margin.top*3; })
    .attr("height", y23.rangeBand())
    .attr("width", function(d) { return x23(d.OMDBscoreSep) + 25; })
    .style("fill","#ff4828");

MIDbar23.append("text")
    .attr("x", 3 + (width + margin.left)*2)
    .attr("y", function(d) { return y23(d.OMDBSep) + y23.rangeBand()/2 + 3 + height + height*10 + margin.top*3; })
    .text(function (d) {
          return d.OMDBSep;
      });

MIDbar23.append("text")
    .attr("x", function(d) { return x23(d.OMDBscoreSep) + 3 + 25 + (width + margin.left)*2; })
    .attr("y", function(d) { return y23(d.OMDBSep) + y23.rangeBand()/2 + 3 + height + height*10 + margin.top*3; })
    .text(function (d) {
          return d.OMDBscoreSep;
      });

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .selectAll("text")
      .style("font-weight","bold");
});
