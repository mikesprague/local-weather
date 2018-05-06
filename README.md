# Local Weather App

Updating an old app I wrote to be more current

## Modernize Weather App To Do (WIP)

- [x] jQuery -> vanilla JS/ES6
  - [x] $ selectors
  - [x] helper functions like $.trim()
  - [x] ajax to fetch
  - [x] tooltips to vanilla js (used plugin Tippy.js)
- [x] simpleWeather to DarkSky API
  - [x] functions to get weather
  - [x] lat/long to friendly location name (Google Maps API)
  - [x] weather icon names
- [x] mustache -> js template literals
- [ ] bootstrap -> css grid or flexbox
- [ ] css -> scss
  - [ ] npm scripts for scss
- [x] update icons (latest fontawesome is svg)
  - note: weather icons still webfont
- [x] buy domain
- [ ] use caching to help with api limits
  - [x] add localStorage caching (maybe indexdb later)
  - [x] set 10 minute limit before updating cache
  - [x] add note about cached data and time last updated
    - console.logging currently
    - [x] add function for nice time format (used moment.js)
  - [ ] (?) add link to reset/clear cache
- [ ] use async/await where it makes sense