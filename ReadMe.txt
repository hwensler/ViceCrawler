How to launch: Make sure the html, css, and js file are in the same folder and then open the .html file in a web browser (I use chrome)

Directions:

Enter a full address or a location name followed by "seattle wa", otherwise it breaks

Must have a Start and End location otherwise it breaks (I hide the final button so its impossible for the user to create a route without a start and end location)

Add as many "along the way" points as you'd like

How it works:

First the HTML gathers all the submitted addresses and runs them through getLatitudeLongitude() which is sending them to a geocoder api and creating arrays of lat/longs for the addressees (this is necessary since the maps api accepts lat/long coords to generate its route)

When the user hits the Create Route button it triggers the initialize() function which creates an empty map and calls createRoute()

createRoute() runs through the array of lat/longs and inputs them into the map, creating markers. startCoords and endCoords are the start and end points respectively and all other addresses are added as "waypoints". Optimization is handled automatically.

All other functions are just helpers to make sure people can't use the app wrong (I hide buttons I don't want them touching yet, force them to complete steps that need to be done in order, and list the addresses they gave me)

