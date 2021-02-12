Hi!

To test this project just run:

    1. npm install

    2. npm start

I did not have much time and just aimed to show a working prototype so some features are not included. Specifically:

    1. My API did not support distance (computed it manually using lat & lon difference) and I did not have review number information

    2. Mobile version does not feature popover restaurant detail card

If user does not provide access to his geolocation the app falls back to Brooklyn, stops showing user location marker on map and does not compute distances to restaurants.

I used documenu.com API for restaurant list retrival and google-map-react for the map UI.

Please ask any questions at adb8432@nyu.edu
