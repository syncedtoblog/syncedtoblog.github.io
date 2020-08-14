function plotchart2() {
      var names = ["Man. City", "Man United", "Tottenham", "Chelsea", "Newcastle", "Arsenal", "West Ham", "Everton", "Burnley", "Southampton", "Leicester City", "Wolverhampton", "Brighton", "Liverpool", "Cardiff City", "Crystal Palace", "Fulham", "Huddersfield", "Bournemouth", "Watford"];
      var fRelated = [39, 36, 34, 30, 30, 27, 25, 23, 19, 19, 18, 18, 16, 14, 14, 12, 6, 5, 3, 3];
      var totalCrime = [546, 685, 2342, 1344, 4910, 1781, 795, 789, 516, 737, 507, 2127, 44, 1288, 301, 615, 612, 368, 823, 404];

      var labelArea = 125;

      var chart,
              width = 170,
              bar_height = 18,
              height = bar_height * (names.length) + 60;

      var rightOffset = width + labelArea + 50;
      var leftOffset = labelArea;

      var chart = d3.select(".chart-2-container")
        .append('svg')
        .attr('class', 'chart2')
        .attr('width', labelArea + width + width)
        .attr('height', height);

      var y = d3.scale.ordinal()
         .domain(names)
         .rangeBands([30, height]); //make title area bigger/smaller

      var yPosByIndex = function(d, index){ return y(index); }

      var xTo = d3.scale.linear()
        .domain([0,d3.max(fRelated)])
        .range([0,width - 50])

      chart.selectAll("rect.left")
        .data(fRelated)
        .enter().append("rect") //adds rectangles
        //.attr("x", function(pos) { return - width + xFrom(pos); }) // CHANGE THIS
        .attr("x", leftOffset-10) // CHANGE THIS
        .attr("y", yPosByIndex) // length based on data
        .attr("class", "left") // class for css
        .attr("width", xTo) //changes start point of bar
        .attr("height", y.rangeBand()-8);

      chart.selectAll("text.leftscore") //text for left hand side
        .data(fRelated)
        .enter().append("text")
        .style("font", "14px times")
        //.attr("x", function(d) { return width - xFrom(d); })
        .attr("x", function(d) { return leftOffset + xTo(d); })
        .attr("y", function(d, z){ return y(z) + y.rangeBand()/2; } )
        .attr("dx", "10") // x position of text (moves to left)
        .attr("dy", ".12em") // alters y position (brings down slightly)
        .attr("text-anchor", "end") //makes sure text is at end of bar
        .attr('class', 'leftscore')
        .text(String);

      chart.selectAll("text.name") //label area
        .data(names)
        .enter().append("text")
        .style("font", "14px times")
        //.attr("x", (labelArea / 2) + width) //alters x position start
        .attr("x", labelArea-20)
        .attr("y", function(d){ return y(d) + y.rangeBand()/2; } )
        .attr("dy", ".15em")
        .attr("text-anchor", "end") //start, middle, end
        .attr('class', 'name')
        .text(String);

      var xTo = d3.scale.linear()
         .domain([0, d3.max(totalCrime)])
         .range([0, width - 50]); //change size of bar canvas

      chart.selectAll("rect.right") //right habd rectangle canvas properties
        .data(totalCrime)
        .enter().append("rect")
        .attr("x", rightOffset-60) //makes start point on right hand offset (try with y)
        .attr("y", yPosByIndex)
        .attr("class","right") //assign class for CSS
        .attr("width", xTo) //length of bar (function returns different values for each bar)
        .attr("height", y.rangeBand()-8);

      chart.selectAll("text.score") //right hand side text
        .data(totalCrime)
        .style("font", "14px times")
        .enter().append("text")
        .style("font", "14px times")
        .attr("x", function(d) { return xTo(d) +  rightOffset; })
        .attr("y", function(d,z){ return y(z) + y.rangeBand()/2; } )
        .attr("dx", - 54) //x padding
        .attr("dy", ".15em") //y padding
        .attr("text-anchor", "start") //text anchor to start, middle or end
        .attr('class', 'score') // class for CSS
        .text(String);

        chart.append("text").attr("x",labelArea+width/2-96).attr("y", 20).attr("class","title").text("Football Related Arrests").style("font", "16px times");
    chart.append("text").attr("x",width/2+rightOffset/2+labelArea/2-38).attr("y", 20).attr("class","title").text("Total Arrests").style("font", "16px times");
}

plotchart2()
