var margin = {top: 10, right: 30, bottom: 10, left: 99},
    width = 150 - margin.left - margin.right,
    height = 180 - margin.top - margin.bottom;

var x1 = d3.scale.linear()
    .range([0, width]),
  x2 = d3.scale.linear()
    .range([0, width]),
  x3 = d3.scale.linear()
    .range([0, width]),
  x4 = d3.scale.linear()
    .range([0, width]),
  x5 = d3.scale.linear()
    .range([0, width]),
  x6 = d3.scale.linear()
    .range([0, width]);

var y = d3.scale.ordinal()
    .rangeRoundBands([0,height], .3, .3);

var yEur = d3.scale.ordinal()
  .rangeRoundBands([0,height*3], .3, .3);

var yAxisEur = d3.svg.axis()
  .scale(yEur)
  .tickSize(0)
  .orient("left");

var svg = d3.select(".chart-2-container").append("svg")
  //.attr("width", (width + margin.left + margin.right)*6)
  //.attr("height", height*3 + margin.top + margin.bottom)
  .attr('preserveAspectRatio', "xMinYMin meet")
  .attr("viewBox", "0 0 "+(width*6 + (margin.left+margin.right)*5-40)+" "+(height*3 + margin.left+margin.left))
.append("g")
  .attr("transform", "translate(40,20)");

d3.csv("/datascripts/2021-01-30-Impact-Covid-19-On-UK-Crime-2/breakdown2018.csv", function(error, data) {

data.forEach(function(d) {
  d.Jan = +d.Jan
  d.Feb = +d.Feb
  d.March = +d.March
  d.April = +d.April
  d.May = +d.May
  d.June = +d.June
});

x1.domain([0, d3.max(data, function(d) { return d.Jan; })]);
x2.domain([0, d3.max(data, function(d) { return d.Feb; })]);
x3.domain([0, d3.max(data, function(d) { return d.March; })]);
x4.domain([0, d3.max(data, function(d) { return d.April; })]);
x5.domain([0, d3.max(data, function(d) { return d.May; })]);
x6.domain([0, d3.max(data, function(d) { return d.June; })]);

y.domain(data.map(function(d) { return d.type; }));



var bar11 = svg.selectAll(".bar11")
    .data(data)
  .enter().append("g")
    .attr("class", "bar");

bar11.selectAll("text") //label area
  .data(["2018"])
  .enter().append("text")
  //.attr("x", (labelArea / 2) + width) //alters x position start
  .attr("x", -(margin.left-70))
  .attr("y", height/2)
  .attr("dy", ".20em")
  .attr("text-anchor", "start") //start, middle, end
  .attr('class', 'name')
  .text(String);

bar11.append("text").attr("x",margin.left + (width-margin.left)/2-30).attr("y", 0).text("Jan").attr("text-anchor", "middle");
bar11.append("text").attr("x",margin.left*2 + (width-margin.left)/2 + width-30).attr("y", 0).text("Feb").attr("text-anchor", "middle");
bar11.append("text").attr("x",margin.left*3 + (width-margin.left)/2 + width*2-30).attr("y", 0).text("Mar").attr("text-anchor", "middle");
bar11.append("text").attr("x",margin.left*4 + (width-margin.left)/2 + width*3-30).attr("y", 0).text("Apr").attr("text-anchor", "middle");
bar11.append("text").attr("x",margin.left*5 + (width-margin.left)/2 + width*4-30).attr("y", 0).text("May").attr("text-anchor", "middle");
bar11.append("text").attr("x",margin.left*6 + (width-margin.left)/2 + width*5-30).attr("y", 0).text("Jun").attr("text-anchor", "middle");


bar11.append("rect")
    .attr("x",0)
    .attr("y", function(d) { return y(d.type); })
    .attr("height", y.rangeBand())
    .attr("width", function(d) { return x1(d.Jan) + 28; })
    .style("fill","#f65635");

bar11.append("text")
    .attr("x", 3 )
    .attr("y", function(d) { return y(d.type) + y.rangeBand()/2 + 3; })
    .text(function (d) {
          return d.type;
      });

bar11.append("text")
    .attr("x", function(d) { return x1(d.Jan) +1 + 28; })
    .attr("y", function(d) { return y(d.type) + y.rangeBand()/2 + 3; })
    .text(function (d) {
          return d.Jan;
      });

var bar12 = svg.selectAll(".bar12")
    .data(data)
  .enter().append("g")
    .attr("class", "bar");

bar12.append("rect")
    .attr("x",width + margin.left)
    .attr("y", function(d) { return y(d.type); })
    .attr("height", y.rangeBand())
    .attr("width", function(d) { return x2(d.Feb) + 28; })
    .style("fill","#f65635");

bar12.append("text")
    .attr("x", 3 + width + margin.left)
    .attr("y", function(d) { return y(d.type) + y.rangeBand()/2 + 3; })
    .text(function (d) {
          return d.type;
      });

bar12.append("text")
    .attr("x", function(d) { return x2(d.Feb) + 1 + 28  + width + margin.left; })
    .attr("y", function(d) { return y(d.type) + y.rangeBand()/2 + 3; })
    .text(function (d) {
          return d.Feb;
      });

var bar13 = svg.selectAll(".bar13")
    .data(data)
  .enter().append("g")
    .attr("class", "bar");

bar13.append("rect")
    .attr("x",(width+margin.left)*2)
    .attr("y", function(d) { return y(d.type); })
    .attr("height", y.rangeBand())
    .attr("width", function(d) { return x3(d.March) + 28; })
    .style("fill","#f65635");

bar13.append("text")
    .attr("x", 3 + (width + margin.left)*2)
    .attr("y", function(d) { return y(d.type) + y.rangeBand()/2 + 3; })
    .text(function (d) {
          return d.type;
      });

bar13.append("text")
    .attr("x", function(d) { return x3(d.March) + 1 + 28 + (width + margin.left)*2; })
    .attr("y", function(d) { return y(d.type) + y.rangeBand()/2 + 3; })
    .text(function (d) {
          return d.March;
      });


var bar14 = svg.selectAll(".bar14")
    .data(data)
  .enter().append("g")
    .attr("class", "bar");

bar14.append("rect")
    .attr("x",(width + margin.left)*3)
    .attr("y", function(d) { return y(d.type); })
    .attr("height", y.rangeBand())
    .attr("width", function(d) { return x1(d.April) + 28; })
    .style("fill","#f65635");

bar14.append("text")
    .attr("x", 3 + (width + margin.left)*3)
    .attr("y", function(d) { return y(d.type) + y.rangeBand()/2 + 3; })
    .style("font", "8px")
    .text(function (d) {
          return d.type;
      });

bar14.append("text")
    .attr("x", function(d) { return x1(d.April) + 1 + 28 + (width + margin.left)*3; })
    .attr("y", function(d) { return y(d.type) + y.rangeBand()/2 + 3; })
    .style("font", "8px")
    .text(function (d) {
          return d.April;
      });

var bar15 = svg.selectAll(".bar15")
    .data(data)
  .enter().append("g")
    .attr("class", "bar");

bar15.append("rect")
    .attr("x",(width + margin.left)*4)
    .attr("y", function(d) { return y(d.type); })
    .attr("height", y.rangeBand())
    .attr("width", function(d) { return x2(d.May) + 28; })
    .style("fill","#f65635");

bar15.append("text")
    .attr("x", 3 + (width + margin.left)*4)
    .attr("y", function(d) { return y(d.type) + y.rangeBand()/2 + 3; })
    .text(function (d) {
          return d.type;
      });

bar15.append("text")
    .attr("x", function(d) { return x2(d.May) + 1 + 28  + (width + margin.left)*4; })
    .attr("y", function(d) { return y(d.type) + y.rangeBand()/2 + 3; })
    .text(function (d) {
          return d.Feb;
      });

var bar16 = svg.selectAll(".bar16")
    .data(data)
  .enter().append("g")
    .attr("class", "bar");

bar16.append("rect")
    .attr("x",(width+margin.left)*5)
    .attr("y", function(d) { return y(d.type); })
    .attr("height", y.rangeBand())
    .attr("width", function(d) { return x3(d.June) + 28; })
    .style("fill","#f65635");

bar16.append("text")
    .attr("x", 3 + (width+margin.left)*5)
    .attr("y", function(d) { return y(d.type) + y.rangeBand()/2 + 3; })
    .text(function (d) {
          return d.type;
      });

bar16.append("text")
    .attr("x", function(d) { return x3(d.June) + 1 + 28  + (width+margin.left)*5; })
    .attr("y", function(d) { return y(d.type) + y.rangeBand()/2 + 3; })
    .text(function (d) {
          return d.June;
      });
});

d3.csv("/datascripts/2021-01-30-Impact-Covid-19-On-UK-Crime-2/breakdown2019.csv", function(error, data) {

data.forEach(function(d) {
  d.Jan = +d.Jan
  d.Feb = +d.Feb
  d.March = +d.March
  d.April = +d.April
  d.May = +d.May
  d.June = +d.June
});

x1.domain([0, d3.max(data, function(d) { return d.Jan; })]);
x2.domain([0, d3.max(data, function(d) { return d.Feb; })]);
x3.domain([0, d3.max(data, function(d) { return d.March; })]);
x4.domain([0, d3.max(data, function(d) { return d.April; })]);
x5.domain([0, d3.max(data, function(d) { return d.May; })]);
x6.domain([0, d3.max(data, function(d) { return d.June; })]);

y.domain(data.map(function(d) { return d.type; }));



var bar21 = svg.selectAll(".bar21")
    .data(data)
  .enter().append("g")
    .attr("class", "bar");

bar21.selectAll("text") //label area
  .data(["2019"])
  .enter().append("text")
  .attr("x", -(margin.left-70))
  .attr("y", height/2 + height)
  .attr("dy", ".20em")
  .attr("text-anchor", "start") //start, middle, end
  .attr('class', 'name')
  .text(String);

bar21.append("rect")
    .attr("x",0)
    .attr("y", function(d) { return y(d.type)+ height; })
    .attr("height", y.rangeBand())
    .attr("width", function(d) { return x1(d.Jan) + 28; })
    .style("fill","	#4BAEE8");

bar21.append("text")
    .attr("x", 3 )
    .attr("y", function(d) { return y(d.type) + y.rangeBand()/2 + 3+ height; })
    .text(function (d) {
          return d.type;
      });

bar21.append("text")
    .attr("x", function(d) { return x1(d.Jan) +1 + 28; })
    .attr("y", function(d) { return y(d.type) + y.rangeBand()/2 + 3+ height; })
    .text(function (d) {
          return d.Jan;
      });

var bar22 = svg.selectAll(".bar22")
    .data(data)
  .enter().append("g")
    .attr("class", "bar");

bar22.append("rect")
    .attr("x",width + margin.left)
    .attr("y", function(d) { return y(d.type)+ height; })
    .attr("height", y.rangeBand())
    .attr("width", function(d) { return x2(d.Feb) + 28; })
    .style("fill","	#4BAEE8");

bar22.append("text")
    .attr("x", 3 + width + margin.left)
    .attr("y", function(d) { return y(d.type) + y.rangeBand()/2 + 3+ height; })
    .text(function (d) {
          return d.type;
      });

bar22.append("text")
    .attr("x", function(d) { return x2(d.Feb) + 1 + 28  + width + margin.left; })
    .attr("y", function(d) { return y(d.type) + y.rangeBand()/2 + 3+ height; })
    .text(function (d) {
          return d.Feb;
      });

var bar23 = svg.selectAll(".bar23")
    .data(data)
  .enter().append("g")
    .attr("class", "bar");

bar23.append("rect")
    .attr("x",(width+margin.left)*2)
    .attr("y", function(d) { return y(d.type)+ height; })
    .attr("height", y.rangeBand())
    .attr("width", function(d) { return x3(d.March) + 28; })
    .style("fill","	#4BAEE8");

bar23.append("text")
    .attr("x", 3 + (width + margin.left)*2)
    .attr("y", function(d) { return y(d.type) + y.rangeBand()/2 + 3+ height; })
    .text(function (d) {
          return d.type;
      });

bar23.append("text")
    .attr("x", function(d) { return x3(d.March) + 1 + 28 + (width + margin.left)*2; })
    .attr("y", function(d) { return y(d.type) + y.rangeBand()/2 + 3+ height; })
    .text(function (d) {
          return d.March;
      });


var bar24 = svg.selectAll(".bar24")
    .data(data)
  .enter().append("g")
    .attr("class", "bar");

bar24.append("rect")
    .attr("x",(width + margin.left)*3)
    .attr("y", function(d) { return y(d.type)+ height; })
    .attr("height", y.rangeBand())
    .attr("width", function(d) { return x1(d.April) + 28; })
    .style("fill","	#4BAEE8");

bar24.append("text")
    .attr("x", 3 + (width + margin.left)*3)
    .attr("y", function(d) { return y(d.type) + y.rangeBand()/2 + 3+ height; })
    .style("font", "8px")
    .text(function (d) {
          return d.type;
      });

bar24.append("text")
    .attr("x", function(d) { return x1(d.April) + 1 + 28 + (width + margin.left)*3; })
    .attr("y", function(d) { return y(d.type) + y.rangeBand()/2 + 3+ height; })
    .style("font", "8px")
    .text(function (d) {
          return d.April;
      });

var bar25 = svg.selectAll(".bar25")
    .data(data)
  .enter().append("g")
    .attr("class", "bar");

bar25.append("rect")
    .attr("x",(width + margin.left)*4)
    .attr("y", function(d) { return y(d.type)+ height; })
    .attr("height", y.rangeBand())
    .attr("width", function(d) { return x2(d.May) + 28; })
    .style("fill","	#4BAEE8");

bar25.append("text")
    .attr("x", 3 + (width + margin.left)*4)
    .attr("y", function(d) { return y(d.type) + y.rangeBand()/2 + 3+ height; })
    .text(function (d) {
          return d.type;
      });

bar25.append("text")
    .attr("x", function(d) { return x2(d.May) + 1 + 28  + (width + margin.left)*4; })
    .attr("y", function(d) { return y(d.type) + y.rangeBand()/2 + 3+ height; })
    .text(function (d) {
          return d.Feb;
      });

var bar26 = svg.selectAll(".bar26")
    .data(data)
  .enter().append("g")
    .attr("class", "bar");

bar26.append("rect")
    .attr("x",(width+margin.left)*5)
    .attr("y", function(d) { return y(d.type)+ height; })
    .attr("height", y.rangeBand())
    .attr("width", function(d) { return x3(d.June) + 28; })
    .style("fill","	#4BAEE8");

bar26.append("text")
    .attr("x", 3 + (width+margin.left)*5)
    .attr("y", function(d) { return y(d.type) + y.rangeBand()/2 + 3+ height; })
    .text(function (d) {
          return d.type;
      });

bar26.append("text")
    .attr("x", function(d) { return x3(d.June) + 1 + 28  + (width+margin.left)*5; })
    .attr("y", function(d) { return y(d.type) + y.rangeBand()/2 + 3+ height; })
    .text(function (d) {
          return d.June;
      });
});

d3.csv("/datascripts/2021-01-30-Impact-Covid-19-On-UK-Crime-2/breakdown2020.csv", function(error, data) {

data.forEach(function(d) {
  d.Jan = +d.Jan
  d.Feb = +d.Feb
  d.March = +d.March
  d.April = +d.April
  d.May = +d.May
  d.June = +d.June

});

x1.domain([0, d3.max(data, function(d) { return d.Jan; })]);
x2.domain([0, d3.max(data, function(d) { return d.Feb; })]);
x3.domain([0, d3.max(data, function(d) { return d.March; })]);
x4.domain([0, d3.max(data, function(d) { return d.April; })]);
x5.domain([0, d3.max(data, function(d) { return d.May; })]);
x6.domain([0, d3.max(data, function(d) { return d.June; })]);

y.domain(data.map(function(d) { return d.type; }));



var bar31 = svg.selectAll(".bar31")
    .data(data)
  .enter().append("g")
    .attr("class", "bar");

bar31.selectAll("text") //label area
  .data(["2019"])
  .enter().append("text")
  .attr("x", -(margin.left-70))
  .attr("y", height/2 + height*2)
  .attr("dy", ".20em")
  .attr("text-anchor", "start") //start, middle, end
  .attr('class', 'name')
  .text(String);

bar31.append("rect")
    .attr("x",0)
    .attr("y", function(d) { return y(d.type)+ height*2; })
    .attr("height", y.rangeBand())
    .attr("width", function(d) { return x1(d.Jan) + 28; })
    .style("fill","	#ADE84B");

bar31.append("text")
    .attr("x", 3 )
    .attr("y", function(d) { return y(d.type) + y.rangeBand()/2 + 3+ height*2; })
    .text(function (d) {
          return d.type;
      });

bar31.append("text")
    .attr("x", function(d) { return x1(d.Jan) +1 + 28; })
    .attr("y", function(d) { return y(d.type) + y.rangeBand()/2 + 3+ height*2; })
    .text(function (d) {
          return d.Jan;
      });

var bar32 = svg.selectAll(".bar32")
    .data(data)
  .enter().append("g")
    .attr("class", "bar");

bar32.append("rect")
    .attr("x",width + margin.left)
    .attr("y", function(d) { return y(d.type)+ height*2; })
    .attr("height", y.rangeBand())
    .attr("width", function(d) { return x2(d.Feb) + 28; })
    .style("fill","	#ADE84B");

bar32.append("text")
    .attr("x", 3 + width + margin.left)
    .attr("y", function(d) { return y(d.type) + y.rangeBand()/2 + 3+ height*2; })
    .text(function (d) {
          return d.type;
      });

bar32.append("text")
    .attr("x", function(d) { return x2(d.Feb) + 1 + 28  + width + margin.left; })
    .attr("y", function(d) { return y(d.type) + y.rangeBand()/2 + 3+ height*2; })
    .text(function (d) {
          return d.Feb;
      });

var bar33 = svg.selectAll(".bar33")
    .data(data)
  .enter().append("g")
    .attr("class", "bar");

bar33.append("rect")
    .attr("x",(width+margin.left)*2)
    .attr("y", function(d) { return y(d.type)+ height*2; })
    .attr("height", y.rangeBand())
    .attr("width", function(d) { return x3(d.March) + 28; })
    .style("fill","	#ADE84B");

bar33.append("text")
    .attr("x", 3 + (width + margin.left)*2)
    .attr("y", function(d) { return y(d.type) + y.rangeBand()/2 + 3+ height*2; })
    .text(function (d) {
          return d.type;
      });

bar33.append("text")
    .attr("x", function(d) { return x3(d.March) + 1 + 28 + (width + margin.left)*2; })
    .attr("y", function(d) { return y(d.type) + y.rangeBand()/2 + 3+ height*2; })
    .text(function (d) {
          return d.March;
      });


var bar34 = svg.selectAll(".bar34")
    .data(data)
  .enter().append("g")
    .attr("class", "bar");

bar34.append("rect")
    .attr("x",(width + margin.left)*3)
    .attr("y", function(d) { return y(d.type)+ height*2; })
    .attr("height", y.rangeBand())
    .attr("width", function(d) { return x1(d.April) + 28; })
    .style("fill","	#ADE84B");

bar34.append("text")
    .attr("x", 3 + (width + margin.left)*3)
    .attr("y", function(d) { return y(d.type) + y.rangeBand()/2 + 3+ height*2; })
    .style("font", "8px")
    .text(function (d) {
          return d.type;
      });

bar34.append("text")
    .attr("x", function(d) { return x1(d.April) + 1 + 28 + (width + margin.left)*3; })
    .attr("y", function(d) { return y(d.type) + y.rangeBand()/2 + 3+ height*2; })
    .style("font", "8px")
    .text(function (d) {
          return d.April;
      });

var bar35 = svg.selectAll(".bar35")
    .data(data)
  .enter().append("g")
    .attr("class", "bar");

bar35.append("rect")
    .attr("x",(width + margin.left)*4)
    .attr("y", function(d) { return y(d.type)+ height*2; })
    .attr("height", y.rangeBand())
    .attr("width", function(d) { return x2(d.May) + 28; })
    .style("fill","	#ADE84B");

bar35.append("text")
    .attr("x", 3 + (width + margin.left)*4)
    .attr("y", function(d) { return y(d.type) + y.rangeBand()/2 + 3+ height*2; })
    .text(function (d) {
          return d.type;
      });

bar35.append("text")
    .attr("x", function(d) { return x2(d.May) + 1 + 28  + (width + margin.left)*4; })
    .attr("y", function(d) { return y(d.type) + y.rangeBand()/2 + 3+ height*2; })
    .text(function (d) {
          return d.Feb;
      });

var bar36 = svg.selectAll(".bar36")
    .data(data)
  .enter().append("g")
    .attr("class", "bar");

bar36.append("rect")
    .attr("x",(width+margin.left)*5)
    .attr("y", function(d) { return y(d.type)+ height*2; })
    .attr("height", y.rangeBand())
    .attr("width", function(d) { return x3(d.June) + 28; })
    .style("fill","	#ADE84B");

bar36.append("text")
    .attr("x", 3 + (width+margin.left)*5)
    .attr("y", function(d) { return y(d.type) + y.rangeBand()/2 + 3+ height*2; })
    .text(function (d) {
          return d.type;
      });

bar36.append("text")
    .attr("x", function(d) { return x3(d.June) + 1 + 28  + (width+margin.left)*5; })
    .attr("y", function(d) { return y(d.type) + y.rangeBand()/2 + 3+ height*2; })
    .text(function (d) {
          return d.June;
      });

svg.append("g")
    .attr("class", "y axis")
    .call(yAxisEur)
  .selectAll("text")
    .style("font-weight","bold");

});