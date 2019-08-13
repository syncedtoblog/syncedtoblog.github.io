---
layout: post
title: Implementing Pinch to Zoom in React Native
img: images/config.png
---

React native is very versatile and widely used framework, frankly speaking, it is the *best in class* for creating cross platform applications. So, I was a bit disappointed to discover that React Native doesn’t come with a simple pinch to zoom component included in the box.

![_config.yml]({{ site.baseurl }}/images/config.png)

I first ran into this inconvenience whilst working with RNCamera, a well-made and easy to implement library, unfortunately it was lacking in one aspect, it doesn’t come with a pinch to zoom feature, a common UI element in most cameras these days. The library does have a zoom constant which sets the zoom of the camera, although in order to allow the user to control the level of zoom, the value being passed into the zoom constant needs to be held in the application state. Now the real question is how do we give the user the ability to control the value of zoom being passed into the RNCamera zoom constant.

After a quick google, searching through stackoverflow questions and GitHub issues, it became painfully clear that there was no simple solution to this challenge that wouldn’t involve installing an external library. The closest thing to a solution I found was from a now [closed GitHub issue discussing options for implementing a pinch to zoom] (https://github.com/react-native-community/react-native-camera/issues/1282#issuecomment-392731643).

I studied this code carefully and decided to integrate it into my project, building a zoom component. In this basic swipe to zoom component, *dy* values returned from a gesture handler are being used to update the zoom constant held in state every time the user swipes up and down on the screen. Not quite a pinch to zoom but this basic component served as a foundation for the pinch to zoom solution I would later go on to implement.

As the demands of the application grew, it became clear that a proper pinch to zoom component would be needed, to both allow the user to zoom in when taking a picture and also to zoom in on pictures taken, to ready them for cropping. I started by taking a closer look at the gesture handler library hoping the solution would be buried in there somewhere, to my surprise I was correct. Upon doing so, I discovered that native events recorded by the gesture handler came with a variety of properties that contained detailed reports on the user’s interaction with the view, such as touch location, touch timestamp, touch identifier etc. The property that immediately caught my attention was number of touches. I could use this to detect when a user touches the screen with two fingers as they would when they are about to initiate a pinch to zoom. 

Looking deeper into the gesture handler’s native events, I soon discovered that I could also get the x and y coordinates of each touch registered on the view. From this point on it all started to come together fairly quickly. When the user has two fingers on the screen, Pythagoras’ theorem, *a2 + b2 = c2*, is used to determine the distance between each touch, and as the user moves their fingers across the screen the value of *c2* changes. 


```javascript

calculateZoom(touch0x, touch0y, touch1x, touch1y) {
    const x = touch0x - touch1x;
    const y = touch0y - touch1y;

    const distance = Math.pow(x, 2) + Math.pow(y, 2);
    
    return Math.sqrt(distance);
  }
  
```

To determine if the user if widening or shrinking their pinch, we find the difference between the present value of *c2* and its old value `var interTouchDistance = newValue – oldValue`, if this number is positive then the user is widening their pinch, if it is negative then they are decreasing their pinch. 

And that was it! Pinch to zoom for the RNCamera cracked in one afternoon. Of course I first had to reduce the value of the `interTouchDistance` by a factor that would allow it to proportionally manipulate the value held in the application state for zoom (I did this by reducing the value by a factor of 10-5). Then all I had to do was hook everything up to the application and test It out. 

A surprisingly simple solution to what seemed like a frustratingly daunting challenge.

Thank you for reading, you can check us out on the App or Google Play store and on the web at Synced.to.
