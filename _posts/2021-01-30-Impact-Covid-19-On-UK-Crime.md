---
layout: post
title: What Happened to Crime During the UK Lockdown?
img: images/2021-01-30-Impact-Covid-19-On-UK-Crime-1.jpg
---

Using the UK police's crime [dataset](https://data.police.uk/) we looked at how crime changed in the UK's cities during 2020's first nationwide lockdown. 


![_config.yml]({{ site.baseurl }}/images/2021-01-30-Impact-Covid-19-On-UK-Crime-1.jpg)
*by [Mark Timberlake](https://unsplash.com/photos/LIrbNMnQ-jc)*


We started by scanning crimes over a 100km squared area in five of the largest cities in the UK (London, Leeds, Birmingham, Bristol and Liverpool) during 2018, 2019 and 2020. We were looking for differences in crimes committed between the 2020 lockdown period (23rd March to Early June ) and the same period in 2018 and 2019 (we didn't extend further back in time because of incomplete data). 

Once we'd retrieved the crime data, we wanted to convert it into single scores for each city in each year. Luckily for us the Office for National Statistics (ONS) had already devised The Crime Severity Score. It is a way of assigning a single score for the crime level in an area. The ONS has given each type of crime a [weight](https://www.ons.gov.uk/peoplepopulationandcommunity/crimeandjustice/datasets/crimeseverityscoredatatool), using a broadly sentencing-based methodology:

> Sentencing data, sourced from the Ministry of Justice (MoJ) have been used as the primary source for calculating offence weights. It was decided that sentencing would provide an appropriate metric for determining the seriousness of offences. It can be argued that sentencing is an objective measure, reflecting how society views crimes differently, given that it is based on legislation set by Parliament on behalf of the public. [(source)](https://www.ons.gov.uk/peoplepopulationandcommunity/crimeandjustice/articles/researchoutputsdevelopingacrimeseverityscoreforenglandandwalesusingdataoncrimesrecordedbythepolice/2016-11-29)

So, for example, possession of cannabis (weight of 3) is at the bottom end of the scale, along with e.g. dishonest use of electricity (weight of 7). Whilst homicide has the highest weight at 7,979. For each city and each year, we collected the crimes, multiplied each crime by the severity score for its category and them summed them, finally dividing by the population. 

We've plotted the results below, aggregating the city scores for each year by taking the mean. The results show a very pronouned drop in crime serverity from March to June. It probably reinforces your intuition that lockdown would result in less crime. 

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
    font: 0.6em "Titillium Web", sans-serif;
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
*Crime severity score over lockdown period compared to previous years, mean of London, Leeds, Birmingham, Bristol and Liverpool*

<script src="https://blog.synced.to/datascripts/2021-01-30-Impact-Covid-19-On-UK-Crime-1/crimescores.js"></script>

Digging into the data a little more however, we found some nuances - which we'll show next, using London as a case study.

### Case Study - London
Digging into the datasets for each city, we saw it wasn't just a clear-cut case of crime falling across the board. Some types of crime actually rose during lockdown! As an illustrative example, we grouped all the crimes the the 10km x 10km area around London in the chart below.

During 2020's lockdown London saw more anti-social behaviour than in previous years. This would likely be instances of people defying the lockdown measures. We were further told by a serving police officer that regular offenders also used the lockdown and school closures as an opportunity to add to the anti-social behaviour statistics. 

On the other hand, instances of theft fell sharply during lockdown. With much fewer people out and about muggings and pickpocketing were less frequent. Plus many burglaries are opportunistic and with people sat at home it's harder for burglars to operate. 

The 'violence against the person' category paints a mixed picture. Perhaps there were fewer pub fights, but there was also an increase in domestic violence. We didn't really have the fine-grained data to unpick this.

<style>
.chart-2-container {
  font: 16px "Titillium Web", sans-serif;
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
*Number of crimes by type, 100km^2 square around London.* 
*ASB - anti-social behaviour, ARS - arson, DRG - drug offences, WPN - weapons offences, VEH - vehicle offences, VIO - violent crime, THF - theft*

<script src="https://blog.synced.to/datascripts/2021-01-30-Impact-Covid-19-On-UK-Crime-2/crimebreakdown.js"></script>


### Summary
The overall picture during the UK's lockdown is that while less severe crimes may have increased, more severe crime saw a decrease. The net result was a sharp decrease in overall crime severity.  


[Sachin](https://www.linkedin.com/in/sachinvasudevan/) and [Rahman](https://www.linkedin.com/in/rahman-zane/) - <team@synced.to>

_Explore more on [the Synced app](http://onelink.to/8ttzr9), where you can find meaningful places, nearaway and faraway._
