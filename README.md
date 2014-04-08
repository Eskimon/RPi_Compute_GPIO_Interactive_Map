RPi Compute GPIO Interactive Map
================================

RPi Compute GPIO Interactive Map, to easily know which pin does what (and much more soon)!

### How is it working?

Easy, just hover the Raspberry Pi to see the role of the pin !

### Cool! can I have a local copy or a live copy on my website ?

Sure, do whatever you want with it! Juste don't forget the people behind it please and share your improvment to make it even better!
People to thank:
+ [raspberrypi.org](http://www.raspberrypi.org/), I stole the picture from their website, hope it's alright!
+ [Eskimon](http://eskimon.fr), it's me, I wrote all the rest of the things you can see in the "source" folder. If you want to use the map on your own website, I would appreciate a link to the page of the project as "source" as described in the licence :) [Source](http://eskimon.fr/raspberrypi-compute-gpio-interactive-map).

### How to embed the map on your website.

It's very simple.
First, copy the rpic_style.css to your stylesheet folder (or root folder). Then do the same with the rpic_script.js to your scripts folder (or root folder).
Then, you just need to copy the interesting part of the HTML file. It's very simple, it's everything in the `<body>` tag (all the div)!
Finally, don't forget to link the css and js files:
+ Add `<link type="text/css" rel="stylesheet" href="rpic_style.css" />` to the `head` of your html file
+ Add `<script type="text/javascript" src="rpic_script.js"></script>` just before the closing `</body>` tag.

(Be careful with the path to the files ;) )

And there you are!! Have Fun!
