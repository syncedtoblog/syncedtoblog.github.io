function plotchart1(){
    var names = ["Newcastle", "Tottenham", "Arsenal", "Everton", "Leicester City", "Liverpool", "Wolverhampton", "Chelsea", "Southampton", "Bournemouth", "Fulham", "West Ham", "Crystal Palace", "Huddersfield", "Man City", "Man United", "Watford", "Burnley", "Cardiff City", "Brighton"];
    var inseason = [97.5, 88.1, 86.2, 56.7, 54.0, 52.7, 52.3, 51.2, 47.9, 43.5, 31.1, 30.1, 29.4, 24.6, 23.4, 21.4, 18.9, 18.6, 18.1, 1.0];
    var offseason = [115.6, 95.7, 98.8, 61.1, 42.6, 55.4, 56.4, 57.4, 47.3, 54.0, 32.8, 32.9, 29.9, 17.6, 24.5, 21.1, 15.8, 24.3, 16.4, 2.0];

    var labelArea = 125;

    var chart,
        width = 170,
        bar_height = 18,
        height = bar_height * (names.length) + 100;

    var rightOffset = width + labelArea + 50;
    var leftOffset = labelArea;

    var chart = d3.select(".chart-1-container")
        .append('svg')
        .attr('class', 'chart-1')
        .attr('width', labelArea + width + width)
        .attr('height', height);

    var y = d3.scale.ordinal()
        .domain(names)
        .rangeBands([30, height]); //make title area bigger/smaller

    var yPosByIndex = function(d, index){ return y(index); }

    var xTo = d3.scale.linear()
        .domain([0,d3.max(inseason)])
        .range([0,width - 50])

    chart.selectAll("rect.left")
        .data(inseason)
        .enter().append("rect") //adds rectangles
    //.attr("x", function(pos) { return - width + xFrom(pos); }) // CHANGE THIS
        .attr("x", leftOffset - 10) // CHANGE THIS
        .attr("y", yPosByIndex) // length based on data
        .attr("class", "left") // class for css
        .attr("width", xTo) //changes start point of bar
        .attr("height", y.rangeBand()-8);

    chart.selectAll("text.leftscore") //text for left hand side
        .data(inseason)
        .enter().append("text")
        .style("font", "14px times")
    //.attr("x", function(d) { return width - xFrom(d); })
        .attr("x", function(d) { return leftOffset + xTo(d); })
        .attr("y", function(d, z){ return y(z) + y.rangeBand()/2; } )
        .attr("dx", "18") // x position of text (moves to left)
        .attr("dy", ".0em") // alters y position (brings down slightly)
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
        .attr("dy", ".0em")
        .attr("text-anchor", "end") //start, middle, end
        .attr('class', 'name')
        .text(String);

    var xTo = d3.scale.linear()
        .domain([0, d3.max(offseason)])
        .range([0, width - 50]); //change size of bar canvas

    chart.selectAll("rect.right") //right habd rectangle canvas properties
        .data(offseason)
        .enter().append("rect")
        .attr("x", rightOffset-60) //makes start point on right hand offset (try with y)
        .attr("y", yPosByIndex)
        .attr("class","right") //assign class for CSS
        .attr("width", xTo) //length of bar (function returns different values for each bar)
        .attr("height", y.rangeBand()-8);

    chart.selectAll("text.score") //right hand side text
        .data(offseason)
        .enter().append("text")
        .style("font", "14px times")
        .attr("x", function(d) { return xTo(d) +  rightOffset; })
        .attr("y", function(d,z){ return y(z) + y.rangeBand()/2; } )
        .attr("dx", - 55) //x padding
        .attr("dy", ".0em") //y padding
        .attr("text-anchor", "start") //text anchor to start, middle or end
        .attr('class', 'score') // class for CSS
        .text(String);

    chart.append("text").attr("x",labelArea+width/2-95).attr("y", 20).attr("class","title").text("In Season Crime Rating").style("font", "15px times");
    chart.append("text").attr("x",width/2+rightOffset/2+labelArea/2-35).attr("y", 20).attr("class","title").text("Off Season Crime Rating").style("font", "15px times");

}
plotchart1()
