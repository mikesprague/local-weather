'use strict';

module.exports = {
  appName: 'LocalWeather.io',
  author: 'Michael Sprague',
  cacheTimeKey: 'cacheTime',
  cacheTimeSpan: 600, // 10 minutes (number of minutes * 60 seconds)
  canonical: 'https://localweather.io/',
  description: 'Minimalist local weather app powered by Dark Sky',
  env: 'prod',
  errorMessageSelector: '.error-message',
  hideClassName: 'hide-me',
  isOnline: false,
  keywords: 'weather, local, dark sky, localweather.io, local weather',
  lat: 0,
  lng: 0,
  loadFromCache: false,
  loadingSpinnerSelector: '.loading-spinner',
  loadingText: '... beep ... boop ... beep ... boop ...',
  locationDataKey: 'locationData',
  locationName: '',
  themeColor: '#133150',
  timerHandle: 0,
  title: 'LocalWeather.io (powered by Dark Sky)',
  versionString: 'v0.14.0',
  weatherDataKey: 'weatherData',
};
