---
layout: post
title: What Happened to Crime During the UK Lockdown?
img: images/2021-01-30-Impact-Covid-19-On-UK-Crime-1.jpg
draft: 1
---



Using the UK police's crime dataset we 



Using crowdsourced flight tracking data, we quantified Covid-19's unprecedented disruption to air travel. In [Part 1](https://blog.synced.to/Impact-Covid-19-On-Air-Travel-1/) we showed how we did it using the [OpenSky Network](https://opensky-network.org/ "OpenSky Network Homepage") dataset, and now in **Part 2** we show what we found.

![_config.yml]({{ site.baseurl }}/images/2021-01-30-Impact-Covid-19-On-UK-Crime-1.jpg)
*by [Mark Timberlake](https://unsplash.com/photos/LIrbNMnQ-jc)*


The Crime Severity Score, devised by the Office for National Statistics, weighs different crimes to attribute a single crime severity score to a certain area. We scanned crimes over a 100km squared area in 2020, 2019 and 2018 in five of the largest cities in the UK: London, Leeds, Birmingham, Bristol and Liverpool. 

For each city we then created crime scores from the raw crimes and normalised them by the city's population. 



<style>
table {
    border: 0;
    border-collapse: collapse;
    border-spacing: 0;
    font: 0.7em "Titillium Web", sans-serif;
    margin-left: auto;
    margin-right: auto;
}
th {
    border: 0;
    padding: 10px;
    text-align: left;
    text-shadow: 1px 1px 1px #fff;
    font-weight: bold;
}
tbody td {
    border: 0;
    color: #333;
    padding: 10px;
    text-shadow: 1px 1px 1px #fff;
}
</style>

<script src="https://d3js.org/d3.v3.js"></script>
<script src="https://blog.synced.to/datascripts/2021-01-30-Impact-Covid-19-On-UK-Crime-1/d3.legend.js"></script>

<style>
.chart-1-container {
    font: 0.7em "Titillium Web", sans-serif;
}

.chart-1-container .axis path, .chart-1-container .axis line {
    fill: none;
    stroke: #000;
    shape-rendering: crispEdges;
}

.chart-1-container .x.axis path {
    display: none;
}

.chart-1-container .line {
    fill: none;
    stroke: steelblue;
    stroke-width: 1.5px;
}

.chart-1-container .legend rect {
    fill:white;
    stroke:black;
    opacity:0.8;
}
</style>

<div class="d3-chart-container chart-1-container"></div>
*Crime severity score over lockdown period compared to previous years*

<script src="https://blog.synced.to/datascripts/2021-01-30-Impact-Covid-19-On-UK-Crime-1/crimescores.js"></script>


What we notice immediately from this graph is that there is a substantial drop in the mean crime score in April 2020. This diverges from the trend of the previous two years. This, of course,  corresponds with the national lockdown and from this we can infer that the severity of crimes on the whole drastically fell as a result. When looking at the May data we also see a bit of a bounce back which coincides with the easing of some aspects of the lockdown and this increase in crime severity is greater that that of 2018 and 2019.

Another interesting point we can glean from this chart is that, out of the three years, 2020 is the only year not to see a rise in crime severity between Feburary and March. While both 2018 and 2019 saw the largest increase in crime severity between these months out of the six months we searched over, 2020 actually saw a decrease in this period. We believe this can be attributed to the impact of the lockdown being implemented mid-way through March which had a significant effect on the score for the month and dampened out other factors which normally contribute to a rise in the crime score between these months.




<style>
.chart-2-container {
  font: 11px sans-serif;
}

.chart-2-container .axis path, .chart-2-container .axis line {
  fill: none;
  stroke: #000;
  shape-rendering: crispEdges;
}

.chart-2-container .x.axis {
  display: none;
}
</style>

<div class="d3-chart-container chart-2-container"></div>
*Crime breakdown by type*

<script src="https://blog.synced.to/datascripts/2021-01-30-Impact-Covid-19-On-UK-Crime-2/crimebreakdown.js"></script>


### Summary

Summary goes here

[Sachin](https://www.linkedin.com/in/sachinvasudevan/) and [Rahman](https://www.linkedin.com/in/rahman-zane/) - <team@synced.to>

_Explore more on [the Synced app](http://onelink.to/8ttzr9), where you can find meaningful places, nearaway and faraway._
