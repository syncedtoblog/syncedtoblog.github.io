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


 
We scanned crimes over a 100km squared area in 2020, 2019 and 2018 in five of the largest cities in the UK: London, Leeds, Birmingham, Bristol and Liverpool. We then normalised these raw crime scores by the population of these cities and our findings below depict the mean of these results.

The Crime Severity Score, devised by the Office for National Statistics, weighs different crimes to attribute a single crime severity score to a certain area.

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


We looked at flights in and out of the following 12 airports worldwide, for which good data was available - and from 17th November 2019, when the first case of coronavirus was recorded, until late September 2020.



blah blah 

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

<script src="https://blog.synced.to/datascripts/2021-01-30-Impact-Covid-19-On-UK-Crime-1/crimebreakdown.js"></script>


### Summary

It comes as no surpise that the pandemic has hugely disrupted air traffic worldwide. What's been interesting are the similarities and differences in the approaches cities adopted. Following the initial shutdown to air travel, which was worldwide and almost simultaneous (over weeks), cities have been returning to normal at different paces. From cavalier Dallas through to cautious Seoul. 

And for a brief time Alaska had one of the world's busiest airports.

[Rahman](https://www.linkedin.com/in/rahman-zane/) and [Sachin](https://www.linkedin.com/in/sachinvasudevan/) - <team@synced.to>

_Explore more on [the Synced app](http://onelink.to/8ttzr9), where you can find meaningful places, nearaway and faraway._
