function range(min_, max_ ) {
    var min = Math.max(min_, 0)
    var max = Math.max(max_, 0)
    if (min > max) {
        return []
    }
    else {
        var output = []
        for (var i = min; i < max; i++){
            output.push(i)
        }
        return output
    }
}

function toUpper(str) {

    if (!str || str.length == 0) {
        return ''
    }

    return str
        .toLowerCase()
        .split(/\s+/)
        .map(function(word) {
            return word[0].toUpperCase() + word.substr(1);
        })
        .join(' ');
}


function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}




function ajax_get(url, callback) {
    //create xmlhttprequest object
    var xmlhttp = new XMLHttpRequest();
    //specifies function to be executed every time the status of object changes
    xmlhttp.onreadystatechange = function() {
        //4 means response state is ready, 200 means status is 'OK'
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            //console.log('responseText:' + xmlhttp.responseText);
            try {
                var data = JSON.parse(xmlhttp.responseText); //responseText returns response data as string
            } catch(err) {
                console.log(err.message + " in " + xmlhttp.responseText);
                return;
            }
            callback(data); //brings back data variable for use later
        }
    };
    xmlhttp.open("GET", url, true); //GET request from url, async = True (wait till finish before proceeding)
    xmlhttp.send(); //sends request to server
}


/*
function nDaysAgo(dateobj,n) {
    //initiate date object
    var outDate = new Date();
    //Change it so that it is n days in the past. getDate returns day of day as number (1-31)
    var pastDate = dateobj.getDate() - n
    //assign outDate to pastDate
    outDate.setDate(pastDate);
    return outDate
}


function toTimestamp(dateobj){
    parseInt((dateobj.getTime() / 1000).toFixed(0))
}

function threeHoursAgo() {
    return new Date(Math.round(Date.now() / 3600000) * 3600000 - 3600000 * 3);
}

function oneDayAgo() {
    return new Date(Math.round(Date.now() / 3600000) * 3600000 - 3600000 * 24);
}
*/

/*
var tilelayer =  new ol.layer.Tile({
    source: new ol.source.Stamen({
        layer: 'terrain'
    })
})
*/

var tilelayer = new ol.layer.Tile({
    source: new ol.source.XYZ({
        url: 'https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoidHNoYWgxMDEiLCJhIjoiY2l3Yjk5dGp5MDAzdDJ0bXlqanFwaXdsaSJ9.Pld170Y73mYn0F0CNjNCdw'
    })
})


var vectorsource = new ol.source.Vector({ wrapX: false })
var vectorlayer = new ol.layer.Vector({source: vectorsource})
var layers = [tilelayer, vectorlayer]

var controls = ol.control.defaults({rotate: false}); 
//var interactions = ol.interaction.defaults({altShiftDragRotate:false, pinchRotate:false});

// create map and add layers
var map = new ol.Map({
  controls: controls, 
  //interactions: interactions,
  layers: layers,
  target: 'sydb-map',
  //layers: layers,
  view: new ol.View({
    center: ol.proj.fromLonLat([-73.8404, 40.7360]),
    zoom: 9,
    maxZoom: 20
  })
});
//map.addLayer(vectorlayer)


var duration = 1200;
function flash(feature) {
  var start = new Date().getTime();
  var listenerKey = tilelayer.on('postrender', animate);

  function animate(event) {
    var vectorContext = ol.render.getVectorContext(event);
    var frameState = event.frameState;
    var flashGeom = feature.getGeometry().clone();
    var elapsed = frameState.time - start;
    var elapsedRatio = elapsed / duration;


    pixelratio = window.devicePixelRatio
    var scaleFactor = 1
    if (pixelratio){
        var scaleFactor = 1.0/pixelratio
    }
    //console.log('pixel ratio ', pixelratio)

    // radius will be 5 at start and 30 at end.
    var radius = (ol.easing.easeOut(elapsedRatio) * 12 + 5) * scaleFactor ;
    var opacity = ol.easing.easeOut(1 - elapsedRatio);


    var colour = hexToRgb(feature.getProperties().colour)


    var style = new ol.style.Style({
      image: new ol.style.Circle({
        radius: radius,
        stroke: new ol.style.Stroke({
          color: 'rgba(181, 44, 34, ' + opacity + ')',
          width: (0.1 + opacity) * scaleFactor,
        }),
      }),
    });

    vectorContext.setStyle(style);
    vectorContext.drawGeometry(flashGeom);
    if (elapsed > duration) {
      ol.Observable.unByKey(listenerKey);
      return;
    }
    // tell OpenLayers to continue postrender animation
    map.render();
  }
}

vectorsource.on('addfeature', function (e) {flash(e.feature);});





//intervals between time
var fulldataset = []
var complaintsOnDisplay = {}
var colourMap = {}


var colourSet = ["#63b598", "#ce7d78", "#ea9e70", "#648177" ,"#0d5ac1"  ,"#1c0365" ,"#14a9ad" ,"#4ca2f9" ,"#a4e43f" ,"#d298e2" ,"#6119d0","#d2737d" ,"#c0a43c" ,"#f2510e" ,"#651be6" ,"#79806e" ,"#61da5e" ,"#cd2f00" ,"#9348af" ,"#01ac53" ,"#c5a4fb" ,"#996635","#b11573" ,"#4bb473" ,"#75d89e" ,"#2f3f94" ,"#2f7b99" ,"#da967d" ,"#34891f" ,"#b0d87b" ,"#ca4751" ,"#7e50a8" ,"#c4d647" ,"#e0eeb8" ,"#11dec1" ,"#289812" ,"#566ca0" ,"#ffdbe1" ,"#2f1179" ,"#935b6d" ,"#916988" ,"#513d98","#aead3a", "#9e6d71", "#4b5bdc", "#0cd36d","#250662", "#cb5bea", "#228916", "#ac3e1b", "#df514a", "#539397", "#880977","#f697c1", "#ba96ce", "#679c9d", "#c6c42c", "#5d2c52", "#48b41b", "#e1cf3b","#5be4f0", "#57c4d8", "#a4d17a", "#225b8", "#be608b", "#96b00c", "#088baf","#f158bf", "#e145ba", "#ee91e3", "#05d371", "#5426e0", "#4834d0", "#802234","#6749e8", "#0971f0", "#8fb413", "#b2b4f0", "#c3c89d", "#c9a941", "#41d158","#fb21a3", "#51aed9", "#5bb32d", "#807fb","#f205e6", "#a48a9e"];

var colourOther = '#999999'



var setDataItemVariables = function(ind) {

        //console.log('prepping var ', ind)
        fulldataset[ind]['selected'] = false
        fulldataset[ind]['colour'] = colourMap[fulldataset[ind]['complaint_class']]

        var geom = new ol.geom.Point(
                        ol.proj.fromLonLat([fulldataset[ind].longitude, fulldataset[ind].latitude])
                   )
        
        var feature = new ol.Feature({geometry: geom })
        feature.setProperties({
            complaint_class: fulldataset[ind]['complaint_class'],
            colour: fulldataset[ind]['colour'],
            created_date: fulldataset[ind]['created_date']
        })
        feature.setId(ind)
        
        var featureStyle = new ol.style.Style({
            image: new ol.style.Circle({
                radius: 4,
                fill: new ol.style.Fill({color: fulldataset[ind]['colour'] }),
                stroke: new ol.style.Stroke({color: 'rgba(0,0,0,0.6)', width: 1})
            })
        })

        var hoverStyle = new ol.style.Style({
            image: new ol.style.Circle({
                radius: 10,
                fill: new ol.style.Fill({color: fulldataset[ind]['colour'] }),
                stroke: new ol.style.Stroke({color: 'rgba(235, 189, 52,1)', width: 5})
            })
        })

        feature.setStyle(featureStyle)

        fulldataset[ind]['feature'] = feature
        fulldataset[ind]['base_style'] = featureStyle
        fulldataset[ind]['hover_style'] = hoverStyle

}

var clearDataItemVariables = function(ind) {
        fulldataset[ind]['selected'] = false
}


var prepVariables = function(data) {
  

    for (var k = 0; k < data.length; k++){
        if (data[k].complaint_type.includes('Noise')) {
            data[k].complaint_class = 'Noise'
        }
        else {
            data[k].complaint_class = data[k].complaint_type
        }
    }

    //calculate colour counts
    var counts = {}
    data.forEach( function(item){
        if (!counts.hasOwnProperty(item.complaint_class)) {
            counts[item.complaint_class] = 0
        }
        counts[item.complaint_class]++
    })

    var sortable = [];
    for (var complaint_class in counts) {
        sortable.push([complaint_class, counts[complaint_class]]);
    }

    console.log('complaint type counts')
    console.log(
        sortable.sort(function(a, b) {return b[1] - a[1];})
    )

    for (var i = 0; i < sortable.length; i++) {
        if (i < 10) {
            colourMap[sortable[i][0]] = colourSet[i]
        } else {
            colourMap[sortable[i][0]] = colourOther
        }
    }
    //////////////////////////////

    fulldataset = data
    

    //data.forEach( function(item,ind ){
    //    setDataItemVariables(ind)
    //} ) 

}


var prepDisplay = function(toshowdate){
    var date_display_format = "ddd D MMM 'YY"
    var date_text = moment.utc(toshowdate).format(date_display_format)
    var dateElem = document.getElementById(`sydb-date-display`);
    dateElem.innerHTML = `<div style="padding: 6px;">
                            <h6 style="margin-bottom: 0; color: white;"> 
                                ${date_text} &nbsp; (${fulldataset.length} complaints) 
                            </h6>
                          </div>`
}

var clearDisplay = function(toshowdate){
    var dateElem = document.getElementById(`sydb-date-display`);
    dateElem.innerHTML = ''
}

var onclickItem = function(e, index, scrollTo) {

    var item = fulldataset[index]
    //console.log('item clicked')
    //console.log(item)

    //item.feature.setStyle(item.selected ? item.base_style :  item.hover_style )
    //item.selected = !item.selected

    item.feature.setStyle(item.hover_style )
    var contentItem = document.getElementById(`sydb-content-item-${String(index)}`);
    if (contentItem){
        contentItem.style.borderRight = "6px solid rgba(235, 189, 52,1)";    
        if (scrollTo) {
            contentItem.scrollIntoView({ behavior: 'smooth', block: 'start'});
        }
    }
    item.selected = true

    
    setTimeout(function(){ 
        item.feature.setStyle(item.base_style )
        var contentItem = document.getElementById(`sydb-content-item-${String(index)}`);
        if (contentItem){
            contentItem.style.borderRight = "none";    
        }
        item.selected = false
    }, 4000)
}


map.on('click', function(evt) {
    var alreadyDone = false
    map.forEachFeatureAtPixel(evt.pixel,
        function(feature) {
            if (!alreadyDone){
                alreadyDone = true
                onclickItem(null, feature.getId(), true);
            }
        }
    );
})



//https://openlayers.org/en/latest/examples/feature-animation.html
var plotDataItem = function(index, updateSlider) {

    //console.log('plotting data item ', index)

    var item = fulldataset[index]

    setDataItemVariables(index)

    //console.log(item['street_name'])
    //console.log(item['borough'])
    var streetText = ''
    var agencyHTML = ''
    var descriptorHTML = ''
    if (item['street_name']) {
        streetText = streetText + toUpper(item['street_name'])
    }
    if (item['borough']) {
        streetText = streetText + (streetText.length > 0 ? ', ' : '') +
                     toUpper(item['borough'])
    }

    if (item['agency']) {
        agencyHTML =
                    `<h5 style="display: inline-block;">
                        ${item['agency']}
                     </h5>
                    `
    }

    if (item['descriptor']) {
        descriptorHTML = `<p>${toUpper(item['descriptor'])}</p>`
    }


    var created_time = moment.utc(item['created_date']).format('h:mm a')

    var contentStr = `
        <div class="sydb-content-item" id="sydb-content-item-${index}" 
             style="border-left: 3px solid ${colourMap[item['complaint_class']]};" >
            <div class="sydb-content-item-inner" 
                 style="background-color: ${colourMap[item['complaint_class']]+'1F'};">
                    <div>
                        <h5 style="display: inline-block;">
                            ${index+1} - ${toUpper(item['complaint_type'])}
                        </h5>
                        &nbsp;
                        ${agencyHTML}
                    </div>
                    ${descriptorHTML}
                    <h6><span style="font-weight: 600">${created_time}</span> &nbsp; ${streetText}</h6>
            </div>
        </div>
    `
    var contentElem = document.createElement('div')
    contentElem.classList.add("sydb-content-item-container")
    contentElem.classList.add("sydb-slide-in-blurred-top")
    contentElem.innerHTML = contentStr
    contentElem.id = `sydb-content-item-container-${String(index)}`

    var el = document.getElementById('sydb-content');
    //set the span element to string format of date
    //el.appendChild(contentElem)
    el.insertBefore(contentElem, el.firstChild)
   
    if (updateSlider){
        var slider = document.getElementById('sydb-timerange');
        var created_moment = moment.utc(item['created_date'])
        slider.value = created_moment.hour() * 60 + created_moment.minutes()
        console.log('setting slider value to ', created_moment.hour() * 60 + created_moment.minutes())
    }

    vectorsource.addFeature(item['feature'])

    contentElem.onclick = function(e){ onclickItem(e, index) }

    complaintsOnDisplay[index] = true
}

var plotDataItems = function(indexes, updateSlider) {
    var i;
    for (i = 0; i < indexes.length; i++){
        plotDataItem(indexes[i], updateSlider)
    }
}

var clearDataItems = function(indexes) {

    /*
    indexes.map( function(index){        
                    var contentElem = 
                        document.getElementById(`content-item-container-${String(index)}`);
                    if (contentElem){
                        contentElem.parentNode.removeChild(contentElem); 
                    }
                    delete complaintsOnDisplay[index]
                 })
    */
  
    if (!indexes){return}

    //var visibleIndexes = []
    //indexes.forEach( function(ind_) {
    //    var contentElem = document.getElementById(`content-item-container-${String(ind_)}`)
    //    if (contentElem) { visibleIndexes.push(ind_) }
    //})


    //console.log('in clearDataItems, removing indexes ', indexes)
    
    indexes.forEach( function(index){ 
        var contentElem = document.getElementById(`sydb-content-item-container-${String(index)}`);
        if (contentElem){
            contentElem.classList.remove("sydb-slide-in-blurred-top")
            contentElem.classList.add("sydb-slide-out-blurred-bottom")
        }
    })

    setTimeout(function(){ 
        indexes.forEach( function(index){ 
                        //console.log('removing index ', index)
                        var contentElem = 
                            document.getElementById(`sydb-content-item-container-${String(index)}`);
                        if (contentElem){
                            //console.log('removed index ', index)
                            contentElem.parentNode.removeChild(contentElem); 
                        }

                        clearDataItemVariables(index)
                        
                        if (fulldataset[index]['feature'] &&
                            vectorsource.getFeatureById(fulldataset[index]['feature'].getId())  ) {
                            //get actual displayed feature since addplotitem might have changed feature object
                            //but id would be the same
                            var feature = 
                                vectorsource.getFeatureById(fulldataset[index]['feature'].getId())
                            vectorsource.removeFeature(feature)
                        }
                        
                        delete complaintsOnDisplay[index]
                     })
        }, 700)
    
}

var clearPlot = function() {
    var indexes_arr = []
    var i;
    for (i = fulldataset.length - 1; i >= 0; i--){
        indexes_arr.push(i)
    }

    /* should get rid of everything on the map, for some reason when deleting individual elements, some stuck around */
    /* 
    var features = vectorsource.getFeatures();
    features.forEach((feature) => {
        vectorsource.removeFeature(feature);
    });
    */
    

    clearDataItems(indexes_arr)
}

var toggleSpinnerVisibility = function(action) {
    var spinner = document.getElementById('sydb-loading-spinner')

    if (action == 'show') {
        spinner.classList.add('visible')
    } else {
        spinner.classList.remove('visible')
    }
}

var togglePlayMenuVisibility = function(action) {
    var menu = document.getElementById('sydb-content-cover-menu');

    if (action == 'show') {
        menu.classList.remove('hidden')
        menu.classList.remove('fadeOut')
        menu.classList.add('fadeIn')
        clearDisplay()
    } else {
        menu.classList.remove('fadeIn')
        menu.classList.add('fadeOut')
        setTimeout(function(){ 
            toggleSpinnerVisibility('hide')
            menu.classList.add('hidden')
        }, 1000)

    }
}


var toggleplayButton = function(operation) {

    var toremove = operation == 'play' ? 'fa-play' : 'fa-pause'
    var toadd = operation == 'play' ? 'fa-pause' : 'fa-play'

    /*
    var toggleplayButtons = document.querySelectorAll('.sydb-toggleplay');

    toggleplayButtons.forEach( function(button) {
        button.classList.remove(toremove)
        button.classList.add(toadd)
    })
    */

    var toggleplayButton = document.getElementById('sydb-toggleplay')
    toggleplayButton.classList.remove(toremove)
    toggleplayButton.classList.add(toadd)
}


//define controls
var periodlength_mins = 30
var animationIndex = -1;
var plotLimit = 3;
var animationLoop = null
var muted = false
var audio = new Audio('/datascripts/2021-07-01-Complaints-Of-New-York/NYCAmbience.mp3');
audio.loop = true;


var stop = function () {

    toggleplayButton('pause')


    if (animationLoop !== null) {
        window.clearInterval(animationLoop);
        animationLoop = null;
    }
    audio.pause()
};

var reset = function (updateSlider) {
    stop()
    animationIndex = -1;
    clearPlot()
    if (updateSlider){
        var slider = document.getElementById('sydb-timerange');
        slider.value = 0
        console.log('setting slider value to ', 0)
    }
}


var toggleplay = function () {

  if (animationLoop == null) {
    //not already playing, or at end, play now

    toggleplayButton('play')

    animationLoop = setInterval(function() {
        if ( animationIndex < fulldataset.length - 1 && fulldataset.length > 0 ) {

          var nextAnimationIndex = animationIndex + 1
          
          var numberRemaining = fulldataset.length - nextAnimationIndex
          var numberToPlot = numberRemaining <= plotLimit ? numberRemaining : plotLimit
          plotDataItems(range(nextAnimationIndex, nextAnimationIndex+numberToPlot ), true); 
          
          //clear older data items
          var complaintsOnDisplay_inds = Object.keys(complaintsOnDisplay)
          //if (complaintsOnDisplay_inds.length > 100) {
              var toClearInds = []
              complaintsOnDisplay_inds.forEach( function(ind){
                  var dataitem = fulldataset[ind]

                  var curr_created_date = fulldataset[nextAnimationIndex] ? 
                                          fulldataset[nextAnimationIndex].created_date : null

                  if (curr_created_date && dataitem.created_date &&
                      Date.parse(dataitem.created_date) + periodlength_mins*60*1000 < 
                      Date.parse(curr_created_date)){

                      toClearInds.push(ind)

                  }
              })
              clearDataItems(toClearInds)
          //}
            //
          //subtract 1 since nextAnimationIndex adds one of the number to plot already
          animationIndex = nextAnimationIndex + numberToPlot - 1;
       
          if (!muted && audio.paused) {
            audio.play()
          }

        }
        else {
          //at end
          reset(true)
          togglePlayMenuVisibility('show');
        }
      }, 4000)


      if (!muted && audio.paused) {
        audio.play()
      }

  }
  else {
    stop()
  }
};


var seek = function (day, minute) {

    var hours = Math.floor(minute/60)
    var minutes = minute % 60
    
    //reset the animation
    reset()

    //filter the indices by datetime
    var period_end_time = day.clone().set({hour:hours,minute:minutes,second:0,millisecond:0})
    var period_start_time = period_end_time.clone().subtract(periodlength_mins, "minutes")
    var period_indices = []

    var closest_item = null

    
    for (var j = 0; j < fulldataset.length; j++){
        var created_moment = moment.utc(fulldataset[j].created_date)
        //we only want the data in this period, not the data from the very start
       
        //console.log(created_moment.toISOString())
        //console.log(created_moment.diff(period_start_time))
        //console.log(period_end_time.diff(created_moment))

        if (created_moment.diff(period_start_time) > 0 && 
            period_end_time.diff(created_moment) >= 0  ) {
            //append data to current period data array
            period_indices.push(j)
        }

        if (!closest_item || 
            Math.abs(period_end_time.diff(created_moment)) <
            Math.abs(period_end_time.diff(moment.utc(closest_item.created_date)))
        ) {
            closest_item = fulldataset[j]
        } 

    }

    console.log('seek period start time ', period_start_time.toISOString())
    console.log('seek period end time ', period_end_time.toISOString())
    console.log('seek period indices ', period_indices)
    console.log('hours', hours, 'minutes', minutes)
    console.log('closest item', closest_item)

    //display the indices
    //set the current animation index to latest 
    if (period_indices.length > 0){
        setTimeout(function(){ 
            plotDataItems(period_indices,false)
            animationIndex = period_indices[period_indices.length - 1] 
            //play
            toggleplay() 
        }, 1200)
    }
    else if (closest_item != null) {
        var closest_date = moment.utc(closest_item.created_date)
        seek(day, Math.min(closest_date.hour() * 60 + closest_date.minutes() + 1, 60*24) )
    }
    else {
        toggleplay()
    }
}

var loadForDate = function(toloaddate) {

    reset(true)

    //initiate date object
    //var nowdate = new Date()
    //go 2 days ago at midnight
   
    //var fromdt = toloaddate.clone().set({hour:0,minute:0,second:0,millisecond:0})
    var fromdt = toloaddate.clone()
    var todt = fromdt.clone().add(1,'days').set({hour:0,minute:0,second:0,millisecond:0})

    //var fromdt = toloaddate.clone().subtract(1,'days')
    //                               .set({hour:0,minute:0,second:0,millisecond:0})
    
    //fromdt.setHours(1,0,0,0); //add the one to correct for daylight
    //go 1 day ago at midnight
    //var todt = nDaysAgo(toloaddate,1)
    //var todt = toloaddate
    //todt.setHours(1,0,0,0);


    console.log(fromdt.toISOString())
    console.log(todt.toISOString())


    //string formmat of the from and to dates
    var fromdt_str = fromdt.toISOString().split('T')[0] + "T00:00:00"
    var todt_str = todt.toISOString().split('T')[0] + "T00:00:00"

    var displaydt = moment.utc(fromdt.toISOString().split('T')[0] + "T00:00:00")


    var uri = "https://data.cityofnewyork.us/resource/erm2-nwe9.json?"+
        "$where="+"created_date between '"+fromdt_str+"' and '"+todt_str+"'&$order=created_date ASC&$limit=100000"






    ajax_get(encodeURI(uri), //encoded URI as first input
        function (data){
            
            //make sure assumed variables exist
            //make sure created_date falls in day
            data = data.filter( function(item) { 
                            
                            return item.created_date &&
                                   displaydt.isSame( moment.utc(item.created_date) , 'day') &&
                                   item.complaint_type
                        } 
                   )


            prepVariables(data)
            prepDisplay(displaydt)


            map.getLayers()["array_"] = layers
            
            
            //get play element from html and set it to run play function on click
            
            //var startButton = document.getElementById('toggleplay');
            var toggleplayButton = document.getElementById('sydb-toggleplay');
            toggleplayButton.addEventListener('click', toggleplay, false);

            var resetButton = document.getElementById('sydb-reset');
            resetButton.addEventListener('click', 
                            function () {
                                reset(true); 
                                togglePlayMenuVisibility('show');
                            }, false);

            var togglevolumeButton = document.getElementById('sydb-togglevolume')
            togglevolumeButton.addEventListener('click', 
                            function () {

                                if (muted) {
                                    //audio is current muted, unmute
                                    muted = false;
                                    togglevolumeButton.classList.remove("fa-volume-mute")
                                    togglevolumeButton.classList.add("fa-volume-down")
                                } else {
                                    muted = true;
                                    audio.pause()
                                    togglevolumeButton.classList.remove("fa-volume-down")
                                    togglevolumeButton.classList.add("fa-volume-mute")
                                }
                            },false)



            var timerange_elem = document.getElementById('sydb-timerange')
            if (timerange_elem){
                timerange_elem.onchange = function() { seek(displaydt, this.value)}
            }

            document.addEventListener("visibilitychange", function() {
                if (document.hidden){
                    stop()
                    console.log("Browser tab is hidden")
                } else {
                    console.log("Browser tab is visible")
                }
            });

            togglePlayMenuVisibility('hide')

            toggleplay()


        } )


}








var viewDateInput = document.getElementById(`sydb-viewdate`);

var latestdate = moment.utc().set({hour:0,minute:0,second:0,millisecond:0})
                       .subtract(3,'days').set({hour:0,minute:0,second:0,millisecond:0})
var earliestdate = latestdate.clone().subtract(3, "years").set({hour:0,minute:0,second:0,millisecond:0})

viewDateInput.value = latestdate.format('YYYY-MM-DD')
viewDateInput.max = viewDateInput.value
viewDateInput.min = earliestdate.format('YYYY-MM-DD')

//console.log(a)
//loadForDate(latestdate)


var toggleplayMenuButton = document.getElementById('sydb-toggleplay-cover-menu');
toggleplayMenuButton.addEventListener('click', 
    function () {
      
        var viewDateInput = document.getElementById(`sydb-viewdate`)
        var toloaddt = moment.utc(viewDateInput.value, "YYYY-MM-DD")
                        .set({hour:0,minute:0,second:0,millisecond:0})
       
        if (toloaddt && latestdate.diff(toloaddt) >= 0 && toloaddt.diff(earliestdate) >= 0) {
            //all good the date is valid
        } else {
            viewDateInput.value = latestdate.format('YYYY-MM-DD')
            toloaddt = latestdate
        }


        //console.log('toloaddt')
        //console.log(earliestdate)
        //console.log(toloaddt)
        //console.log(latestdate.toISOString())
        //console.log(latestdate.format('YYYY-MM-DD'))
        //console.log(toloaddt.toISOString())


        toggleSpinnerVisibility('show')
        loadForDate(toloaddt);

    }, false);


