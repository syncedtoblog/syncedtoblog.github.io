---
layout: post
title: How Safe is Matchday Across the Premier League?
img: images/2020-08-14-Safe-Stadiums-Premier-League-1.jpg
---

Is it a fun day out for all the family, or are there more risks than just seeing your team lose?

![_config.yml]({{ site.baseurl }}/images/2020-08-14-Safe-Stadiums-Premier-League-1.jpg)
*[Anfield8](https://www.flickr.com/photos/26291711@N00/1479595069) by kebabman01 is licensed under CC0 1.0*

We were posed this question by a Synced user who had noticed that crime & safety statistics on their local stadium's Synced mark were higher than the rest of the local area. We were intrigued, does matchday bring with it significantly more crime and safety problems? And do some stadiums have more of a problem than others? 

We decided to focus on Premier League stadiums, and for the period over the 2018-2019 season, for which sufficient data was available. 

**Comparing On-Season Crime Stats to Off-Season**

We started by analysing  [public data](https://data.police.uk/) available from the UK police. The first thing we did (after much data cleaning), was to look at the in-season crime severity across the Premier League's stadiums. 

This was done by breaking the number of crimes in an area down into different classes, such as theft, anti-social behaviour, etc. before multiplying the number of each of these by a crime severity factor (as suggested by the ONS). By averaging these results over the time period for which the crimes were collected, we obtained a monthly crime score for both the on and off  season, for every stadium in the Premier League.

And indeed, there is quite a discrepancy in crime scores between the stadiums. 

<script src="https://d3js.org/d3.v2.min.js"></script>

<style type="text/css">
.chart-1 {
background: "white";
display:block;
margin: auto;
padding-top: 0px;
}

.chart-1 .right {
stroke: white;
fill: indianred;
}

.chart-1 .left {
stroke: white;
fill: steelblue;
}

.chart-1 rect:hover {
fill: #64707d;
}

.chart-1 text {
fill: black;
}

.chart-1 text.name {
fill: black;
}
</style>

<div class="d3-chart-container chart-1-container"></div>
*crime severity by stadium*

<script src="https://blog.synced.to/datascripts/2020-08-14-Safe-Stadiums-Premier-League-1.js"></script>


But - this might just represent the crimes in the neighbourhood itself, and not be because of football matches. So we compared the on-season crime severity to the off-season severity at each stadium. Taking the off-season crime severity into account, the situation looks quite different. In most cases there's very little difference between when football matches are being played, and the off-season. So, relative to the background city crime, it looks like football matches are really safe...

Strangely it even looks like on-season is actually safer than off-season. Is it possible that Premier League football makes a place safer?? Probably not. The likeliest explanation we found was a known general effect that crime [tends to increase in the summer months](https://www.chicagomag.com/Chicago-Magazine/The-312/March-2012/Heat-and-Crime-Its-Not-Just-You-Feeling-It/).

So, maybe there is an increase in on-season crime because of football, but because of the increase in summer crime it looks like on-season and off-season are similar. We realised we needed to dig a bit deeper.

**Football-Related Arrests as a Proportion of All Arrests**

We started looking for a way to get the crimes in and around each football stadium that were directly related to football matches. Thankfully, our lovely friends over at the Home Office collected all the data for these football-related arrests (we used the 2018/2019 in-season) which we then compared with the official arrests data that the UK police publish. We searched over a 2km by 2km square centred around each stadium and our results can be seen on the graph below.


<style type="text/css">

.chart-2 {
background: "white";
display:block;
margin: auto;
padding-top: 0px;
}

.chart-2 .right {
stroke: white;
fill: indianred;
}

.chart-2 .left {
stroke: white;
fill: steelblue;
}

.chart-2 rect:hover {
fill: #64707d;
}

.chart-2 text {
fill: black;
}

.chart-2 text.name {
fill: black;
}

</style>

<div class="d3-chart-container chart-2-container"></div>
*football related arrests vs totall arrests over 2018-2019 season*

<script src="https://blog.synced.to/datascripts/2020-08-14-Safe-Stadiums-Premier-League-2.js"></script>


We can see match day arrests account for a very small proportion of the total arrests around each stadium. This adds to the conclusion that, from a crime perspective, football stadiums don't see an increase in crime level on match days, relative to the background criminal activity in the area. 

Note: football-related arrests incorporate all arrests on match days that the police have deemed to be directly related to the fixture, and some of these will take place outside of the immediate stadium area. For example, any arrests of football fans in the wider area around the stadium, or travelling to and from the venue, would be included in the football-related arrests but not in the police data of the stadium area. 

So it's looking like matchday is really safe.

**The Safety of a Stadium Compared with its Surroundings**

As one final test, we also looked at how the crime scores differed between the stadium area and its surroundings. Was there any indication of the stadium being a hotspot? We took the crime score of a 2km by 2km region directly around the stadium and compared this with the crime score of a 5km squared 'doughnut' region. We'd expect to see that the normalised crime scores per unit area are uniform between these regions which would indicate that football matches do not affect the crime score of an area. The graph below illustrates our findings.


<style type="text/css">

.chart-3 {
background: "white";
display:block;
margin: auto;
padding-top: 0px;
}

.chart-3 .right {
stroke: white;
fill: indianred;
}

.chart-3 .left {
stroke: white;
fill: steelblue;
}

.chart-3 rect:hover {
fill: #64707d;
}

.chart-3 text {
fill: black;
}

.chart-3 text.name {
fill: black;
}

</style>

<div class="d3-chart-container chart-3-container"></div>
*stadium area vs surroundings crime ratio (higher means stadium area has more crime than surroundings)*

<script src="https://blog.synced.to/datascripts/2020-08-14-Safe-Stadiums-Premier-League-3.js"></script>


In most cases, what we see is that this data closely agrees with our hypothesis and the crime scores of inner and outer areas of the stadium tend to be very similar. 

The general theme that we have been seeing throughout is that match day crimes are a very low proportion of the total crimes in the area around a stadium. These 'background' arrests are what explains the close correlation between on and off season crime scores and again highlights that Premier League football stadiums are in general quite safe. 

**Conclusions**

To sum up, Premier League football matches are very safe and fun for all the family, with on average just 3 arrests at matches per 100,000 fans. This is a credit to the clubs, the local councils, police and to the fans. We looked at making a ranking or football stadium safety, and also considered stadium capacity in those calculations. But a ranking would obscure the true conclusion that matchday is a very safe experience at each club.


[Rahman](https://www.linkedin.com/in/rahman-zane/) and [Sachin](https://www.linkedin.com/in/sachinvasudevan/) - <team@synced.to>

_Explore more on [the Synced app](http://onelink.to/8ttzr9), where you can find meaningful places, nearaway and faraway._
