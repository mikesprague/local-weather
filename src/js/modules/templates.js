'use strict';

import * as defaults from './defaults';
import * as ui from './ui';
import * as datetime from './datetime';

export function populateLocation(data) {
  const city = defaults.locationName.split(',')[0].trim();;
  const locationTemplate = `
    <h1 class="location has-tooltip" title="
      <i class='fas fa-fw fa-globe'></i> <strong>${defaults.locationName}</strong>
      <br>
      <i class='fas fa-fw fa-map-marker-alt'></i> ${Math.fround(data.latitude).toFixed(4)},${data.longitude.toFixed(4)}
    ">${city}</h1>
  `;
  const locationEl = document.querySelector('.location');
  locationEl.innerHTML = locationTemplate;
}

export function populatePrimaryData(data) {
  const currentConditionsTooltip = `
    <div class='text-left'>
      <strong>RIGHT NOW</strong>
      <br>
      <i class='wi wi-fw wi-forecast-io-${data.currently.icon}'></i>
      ${Math.round(data.currently.temperature)}<i class='wi wi-degrees'></i>
      ${data.currently.summary}
      <hr>
      <strong>NEXT 24 HOURS</strong>
      <br>
      <i class='wi wi-fw wi-forecast-io-${data.hourly.icon}'></i> ${data.hourly.summary}
      <hr>
      <strong>NEXT 7 DAYS</strong>
      <br>
      <i class='wi wi-fw wi-forecast-io-${data.daily.icon}'></i> ${data.daily.summary}
      <hr>
    </div>
  `;
  const primaryDataTemplate = `
    <div class="col-3 current-icon">
      <p class="text-center">
        <i class="wi wi-fw wi-forecast-io-${data.currently.icon}"></i>
      </p>
    </div>
    <div class="col-6 text-center current-conditions p-0 has-tooltip" title="${currentConditionsTooltip}">
      <h2>${data.currently.summary}</h2>
    </div>
    <div class="col-3 current-temp text-center">
      <p class="primary-unit text-center">
        ${Math.round(data.currently.temperature)}<i class="wi wi-degrees"></i>
      </p>
    </div>
  `;
  const priamryDataEl = document.querySelector('.primary-conditions-data');
  priamryDataEl.innerHTML = primaryDataTemplate;
}

export function populateWeatherData(data) {
  const moonUi = ui.getMoonUi(data);
  const weatherDataTemplate = `
    <div class="col col-md-2 text-center has-tooltip" title="Wind">
      <p>
        <i class="wi wi-fw wi-strong-wind"></i><br>
        <i class="wi wi-fw wi-wind from-${data.currently.windBearing}-deg"></i>${Math.round(data.currently.windSpeed)}mph
      </p>
    </div>
    <div class="col col-md-2 text-center has-tooltip" title="Precipitation">
      <p><i class="fas fa-fw fa-umbrella"></i><br>${Math.round(data.currently.precipProbability * 100)}%</p>
    </div>
    <div class="col col-md-2 text-center has-tooltip" title="UV">
      <p><i class="fas fa-fw fa-sun"></i><br>${Math.round(data.currently.uvIndex)}</p>
    </div>
    <div class="col col-md-2 text-center has-tooltip" title="Visibility">
      <p><i class="fas fa-fw fa-eye"></i><br>${data.currently.visibility}mi</p>
    </div>
    <div class="col col-md-2 d-none d-md-block text-center has-tooltip" title="Cloud Cover">
      <p><i class="fas fa-fw fa-cloud"></i><br>${Math.round(data.currently.cloudCover * 100)}%</p>
    </div>
    <div class="col col-md-2 text-center has-tooltip" title="Sunrise">
      <p><i class="wi wi-sunrise"></i><br>${datetime.formatUnixTimeForSun(data.daily.data[0].sunriseTime)}am</p>
    </div>
    <div class="w-100"></div>
    <div class="col col-md-2 text-center has-tooltip" title="Pressue">
      <p><i class="wi wi-fw wi-barometer"></i><br>${Math.round(data.currently.pressure)}mb</i></p>
    </div>
    <div class="col col-md-2 text-center has-tooltip" title="Humidity">
      <p><i class="wi wi-fw wi-humidity"></i><br>${Math.round(data.currently.humidity * 100)}%</p>
    </div>
    <div class="col col-md-2 text-center has-tooltip" title="Dew Point">
      <p><i class="wi wi-fw wi-raindrop"></i><br>${Math.round(data.currently.dewPoint)}<i class="wi wi-degrees"></i></p>
    </div>
    <div class="col col-md-2 text-center has-tooltip" title="Feels Like">
      <p><i class="wi wi-fw wi-thermometer"></i><br>${Math.round(data.currently.apparentTemperature)}<i class="wi wi-degrees"></i></p>
    </div>
    <div class="col col-md-2 d-none d-md-block text-center has-tooltip" title="Moon">
      <p class="moon-phase"><i class="wi wi-fw ${moonUi.icon}"></i><br>${moonUi.phase}</p>
    </div>
    <div class="col col-md-2 text-center has-tooltip" title="Sunset">
      <p><i class="wi wi-fw wi-sunset"></i><br>${datetime.formatUnixTimeForSun(data.daily.data[0].sunsetTime)}pm</p>
    </div>
  `;
  const weatherDataEl = document.querySelector('.current-weather-data');
  weatherDataEl.innerHTML = weatherDataTemplate;
}

export function populateForecastData(data, numDays = 7) {
  for (let i = 0; i < numDays; i++) {
    let next = i + 1;
    let forecastTemplate = `
      <p class="has-tooltip" title="${data.daily.data[next].summary}">
        <strong>${datetime.getDayFromUnixTime(data.daily.data[next].time)}</strong>
        <br>
        <i class="wi wi-fw wi-forecast-io-${data.daily.data[next].icon}"></i>
        <br>
        ${Math.round(data.daily.data[next].temperatureHigh)}&deg;/${Math.round(data.daily.data[next].temperatureLow)}&deg;
      </p>
    `;
    let forecastEl = document.querySelector(`.forecast-${next}`);
    forecastEl.innerHTML = forecastTemplate;
  }
}

export function populateHourlyData(data, numHours = 12) {
  for (let i = 0; i < numHours; i++) {
    let next = i + 1;
    let hourlyPopup = `
      <!-- more complete detail here -->
    `;
    let precipitationText = Math.floor(data.hourly.data[next].precipProbability * 100) ?
      `${Math.floor(data.hourly.data[next].precipProbability * 100)}% chance of ${data.hourly.data[next].precipType}` :
      "No precipitation";
    let hourlyTemplate = `
      <p class="has-tooltip" title="${data.hourly.data[next].summary}<br>${precipitationText}">
        <strong>${datetime.getHourAndPeriodFromUnixTime(data.hourly.data[next].time)}</strong>
        <br>
        <i class="wi wi-fw wi-forecast-io-${data.hourly.data[next].icon}"></i>
        ${Math.round(data.hourly.data[next].apparentTemperature)}&deg;
      </p>
    `;
    let hourlyEl = document.querySelector(`.hourly-${next}`);
    hourlyEl.innerHTML = hourlyTemplate;
  }
}

export function populateAlertMessage(msg, type, icon) {
  const alertMessageTemplate = `
    <div class="alert alert-${type} alert-dismissible fade-in alert-message" role="alert">
      <button type="button" class="close alert-close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
      <p>
        <span class="${icon}" aria-hidden="true"></span> ${msg}
      </p>
    </div>
  `;
  const alertContainer = document.querySelector('.alert-container');
  alertContainer.innerHTML = alertMessageTemplate;
  ui.registerAlertClickHandler();
}

export function populateLastUpdated(data) {
  const lastUpdatedString = `
    Weather data cached at: ${datetime.formatUnixTimeAsLocalString(data.currently.time)}
    <br>
    Weather data is cached for 10 minutes.
    <br>
    Next data refresh available after:
    ${datetime.formatUnixTimeAsLocalString(data.currently.time + defaults.cacheTimeSpan)}
  `;
  const lastUpdatedTemplate = `
    <p class="last-updated has-tooltip" title="${lastUpdatedString}">
      Weather data last updated ${datetime.getTimeFromUnixTime(data.currently.time)}
    </p>
  `;
  const lastUpdatedEl = document.querySelector('.last-updated');
  lastUpdatedEl.innerHTML = lastUpdatedTemplate;
}

export function populateFooter() {
  const footerTemplate = `
    <ul class="list-inline">
      <li class="list-inline-item">
        <a href="https://localweather.io" title="LocalWeather.io ${defaults.versionString}">
          LocalWeather.io ${defaults.versionString}
        </a>
      </li>
      <li class="list-inline-item">
        <a href="https://darksky.net/poweredby/" target="_blank" rel="noopener" title="Powered by Dark Sky">
          <i class="fas fa-tint"></i> Powered by Dark Sky
        </a>
      </li>
      <li class="list-inline-item">
        <a href="https://github.com/mikesprague/local-weather/" rel="noopener" target="_blank" title="Coded by Michael Sprague">
          <i class="far fa-code"></i> by Michael Sprague
        </a>
      </li>
    </ul>
  `;
  const footerEl = document.querySelector('.powered-by-dark-sky');
  footerEl.innerHTML = footerTemplate;
}
