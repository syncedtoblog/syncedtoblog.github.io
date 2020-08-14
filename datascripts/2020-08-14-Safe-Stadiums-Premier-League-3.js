function plotchart3() {

    var names = ["Brighton", "Watford", "Man City", "Chelsea", "Cardiff City", "Fulham", "Leicester City", "Liverpool", "Arsenal", "Everton", "Huddersfield", "Man United", "Crystal Palace", "Tottenham", "West Ham", "Southampton", "Wolverhampton", "Bournemouth", "Burnley", "Newcastle"];
    var ratios = [2.15, 1.98, 1.55, 1.51, 1.44, 1.33, 1.25, 1.15, 1.12, 0.97, 0.95, 0.93, 0.93, 0.89, 0.88, 0.62, 0.55, 0.49, 0.35, 0.15];

    var labelArea = 125;

    var chart,
        width = 300,
        bar_height = 20,
        height = bar_height * (names.length) + 60;

    var leftOffset = labelArea;

    var chart = d3.select(".chart-3-container")
        .append('svg')
        .attr('class', 'chart-3')
        .attr('width', labelArea + width)
        .attr('height', height);

    var y = d3.scale.ordinal()
        .domain(names)
        .rangeBands([30, height]); //make title area bigger/smaller

    var yPosByIndex = function(d, index){ return y(index); }

    var xTo = d3.scale.linear()
        .domain([0,d3.max(ratios)])
        .range([0,width - 50])

    chart.selectAll("rect.left")
        .data(ratios)
        .enter().append("rect") //adds rectangles
    //.attr("x", function(pos) { return - width + xFrom(pos); }) // CHANGE THIS
        .attr("x", leftOffset) // CHANGE THIS
        .attr("y", yPosByIndex) // length based on data
        .attr("class", "left") // class for css
        .attr("width", xTo) //changes start point of bar
        .attr("height", y.rangeBand()-8);

    chart.selectAll("text.leftscore") //text for left hand side
        .data(ratios)
        .enter().append("text")
        .style("font", "15px times")
    //.attr("x", function(d) { return width - xFrom(d); })
        .attr("x", function(d) { return leftOffset + xTo(d); })
        .attr("y", function(d, z){ return y(z) + y.rangeBand()/2; } )
        .attr("dx", "32") // x position of text (moves to left)
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


    chart.append("text").attr("x",labelArea+width/2-150).attr("y", 20).attr("class","title").text("Outer : Inner Crime Rating Ratio").style("font", "20px times");


}

plotchart3()
