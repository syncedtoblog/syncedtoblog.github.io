---
layout: post
title: Complaints of San Francisco
img: images/2021-07-12-Complaints-Of-San-Francisco-1.jpg
draft: 1
---

Following on from our popular [post on NYC 311 data](/Complaints-Of-New-York/), 
here is life in San Francisco seen through the everyday complaints of San Franciscans.

![_config.yml]({{ site.baseurl }}/images/2021-07-12-Complaints-Of-San-Francisco-1.jpg)


<link rel="stylesheet" href="https://synced.to/static/theme/assets/css/fontawesome/css/all.min.css" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.4.3/css/ol.css" type="text/css" />
<link rel="stylesheet" href="https://blog.synced.to/datascripts/311-complaints-articles-scripts/dashboard.css" />
<script src="https://synced.to/static/theme/assets/js/moment.min.js?v=8c2de"></script>
<script src="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.4.3/build/ol.js"></script>

<div class="sydb-container">
<div class="sydb-inner-container">
<!--
<div class="sydb-header-container">
<h4>Complaints of New York</h4>
<div style="max-width: 400px; text-align: center; margin-bottom: 6px;">
Life in New York, seen through the everyday complaints of  New Yorkers.  
</div>
</div>
-->
<div class="sydb-dashboard-container">
<div class="sydb-map-container">
<div id="sydb-map" style="height: 100%;">
</div>
<div id="sydb-date-display"></div>
</div>
<div class="sydb-content-container">
<div id="sydb-anim-controls" aria-label="Animation controls">
  <div class="sydb-slider-container">
      <input type="range" min="0" max="1440" 
             value="0" class="sydb-slider" id="sydb-timerange" />
  </div>
  <i id="sydb-toggleplay" class="sydb-toggleplay fas fa-play sydb-icon-button" aria-hidden="true"></i>
  <i id="sydb-reset" class="fas fa-stop sydb-icon-button" aria-hidden="true"></i>
  <i id="sydb-togglevolume" class="fas fa-volume-down sydb-icon-button" aria-hidden="true"></i>

</div>
<div id="sydb-content"></div>
<span id="sydb-content-cover-menu">

<div>
    <h4>Choose a date</h4>
</div>

<div id="sydb-content-cover-menu-input">
<input id="sydb-viewdate"  name="viewdate" type="date" />
<i id="sydb-toggleplay-cover-menu" class="sydb-toggleplay fas fa-play sydb-icon-button-large" 
    aria-hidden="true"></i>
</div>

<div id="sydb-suggested-dates">
    <a data-suggested-event="newyear" class="sydb-suggested" href="#" >
        New years
    </a>
    <a data-suggested-event="lockdown" class="sydb-suggested" href="#" >
        Lockdown
    </a>
</div>

<img id="sydb-loading-spinner" src="https://blog.synced.to/datascripts/311-complaints-articles-scripts/three-dots.svg" />

</span>
</div>
</div>


<div style="text-align: center; font-size: 1rem; flex: 0; padding: 6px;">
</div>

</div>
</div>

<script src="https://blog.synced.to/datascripts/311-complaints-articles-scripts/main_ts_multicity.js"></script>
<script>
    var uri_fn = function(fromstr, tostr){
                return `https://data.sfgov.org/resource/vw6y-z8j6.json?$where=requested_datetime between '${fromstr}' and '${tostr}'&$order=requested_datetime ASC&$limit=100000`
    }
    var soundpath = '/datascripts/311-complaints-articles-scripts/SFAmbience.mp3'
    var data_format_fn = function (item) {
        var output_item = {}
        output_item['created_date'] = item['requested_datetime']
        output_item['complaint_type'] = item['service_name'].replace(/_/g, ' ')
        output_item['latitude'] = item['lat']
        output_item['longitude'] = item['long']
        output_item['borough'] = item['police_district']
        output_item['agency'] = null
        output_item['street_name'] = item['street']
        output_item['descriptor'] = item['service_subtype'].replace(/_/g, ' ') + ', ' + 
                                    item['service_details'].replace(/_/g, ' ')
        return output_item
    }
    var latestdate = moment.utc().set({hour:0,minute:0,second:0,millisecond:0})
                           .subtract(3,'days').set({hour:0,minute:0,second:0,millisecond:0})
    var earliestdate = latestdate.clone().subtract(3, "years").set({hour:0,minute:0,second:0,millisecond:0})
    var opts = {
        city_coords: [-122.446747, 37.733795],
        map_zoom: 11,
        periodlength_mins: null,
        periodlength_maxcount: null,
        latestdate: latestdate,
        earliestdate: earliestdate
    }
    loadAppForCity(uri_fn, data_format_fn, soundpath, opts) 
</script>





[Tejas](https://twitter.com/syncedto) - <team@synced.to>

*311 complaints data from [DataSF](https://datasf.org/opendata/), photo by [Sam Beasley](https://unsplash.com/@sam_beasley), sound by [freesound/Barna](https://freesound.org/people/Barna/sounds/495497/)*


_See more on [the Synced app](http://onelink.to/8ttzr9), where you can explore meaningful places, nearaway and faraway._
