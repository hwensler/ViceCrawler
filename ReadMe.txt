How to launch: 
1. Make sure the html, css, and js file are in the same folder on your machine.
2. Click the .html file to open in your web browser (Developers confirm it works in Edge and Chrome.)


Directions:

Always enter a full address with no commas (Example: 901 12th Ave Seattle WA 98122).

Note: You must enter first the start location then the end location. The next location entered will be stop 2. The next, stop 3. And so on.

You may have as many points between your defined start and end as you would like.



How it works:

1. The HTML gathers all the submitted addresses and runs them through getLatitudeLongitude(). This function sends them to a geocoder api which creating arrays of latitudes and longitudes for the addressees. This is necessary because the googlemaps api accepts latitude and longitude coordinates to generate its the route.

2. When the user hits "Create Route," it triggers initialize(). This function creates an empty map and calls createRoute().

3. createRoute() runs through the array of coordinates and inputs them into the map, creating markers. startCoords and endCoords are the start and end points. All other addresses are added as "waypoints". Optimization is handled automatically.

4. All other functions are just helpers to make sure people can't use the app wrong. For example: Buttons that are not essential for the current step are hidden to force the user to interact with the site in the manner the developers desire.

