import Bugsnag from '@bugsnag/js';
import LogRocket from 'logrocket';
import { register } from 'register-service-worker';
import {
  getData,
  resetData,
  useCache,
} from './cache';
import * as defaults from './defaults';
import { handleError } from './helpers';
import {
  initFontAwesomeIcons,
  initTooltips,
  initGeolocation,
  hasApprovedLocationSharing,
  refreshLastUpdatedTime,
  showInstallAlert,
  hideLoading,
  hideEl,
  showEl,
} from './ui';

const releaseStage = process.env.NODE_ENV || 'production';

LogRocket.init('skxlwh/localweatherio');

Bugsnag.beforeNotify = (data) => {
  data.metaData.sessionURL = LogRocket.sessionURL;
  return data;
};

window.bugsnagClient = Bugsnag.start({
  apiKey: 'c9beb7c090034128a89c8e58f261e972',
  appVersion: `${defaults.versionString}`,
  releaseStage,
  notifyReleaseStages: ['production'],
});

export function registerServiceWorker() {
  register('/service-worker.js', {
    // ready() {
    //   console.log('Service worker is active.');
    // },
    // registered(registration) {
    //   console.log('Service worker has been registered.', registration);
    // },
    // cached(registration) {
    //   console.log('Content has been cached for offline use.', registration);
    // },
    // updatefound(registration) {
    //   console.log('New content is downloading.', registration);
    // },
    updated() { // updated(registration)
      if (hasApprovedLocationSharing()) {
        showInstallAlert();
      }
    },
    offline() {
      console.info('No internet connection found. LocalWeather is running in offline mode.');
    },
    error(error) {
      // console.error('Error during service worker registration:', error);
      handleError(error);
    },
  });
}

registerServiceWorker();

export function init() {
  if (!useCache(getData(defaults.cacheTimeKey))) {
    resetData();
  }

  window.onerror = (msg, url, lineNo, columnNo, error) => {
    hideLoading();
    handleError(error);
    return false;
  };

  const initOnline = (() => {
    const initDataUpdateCheck = () => {
      if (defaults.timerHandle) {
        clearInterval(defaults.timerHandle);
      } else {
        clearInterval();
      }
      defaults.timerHandle = setInterval(() => {
        if (!useCache(getData(defaults.cacheTimeKey))) {
          init();
          return;
        }
        refreshLastUpdatedTime(getData(defaults.weatherDataKey));
        initTooltips();
      }, (10 * 1000)); // (num seconds * 1000 milliseconds)
    };
    hideEl('.offline-notification');
    initFontAwesomeIcons();
    initTooltips();
    initGeolocation();
    initDataUpdateCheck();
  });

  const initOffline = (() => {
    if (defaults.timerHandle) {
      clearInterval(defaults.timerHandle);
    } else {
      clearInterval();
    }
    showEl('.offline-notification');
    refreshLastUpdatedTime(getData(defaults.weatherDataKey));
    initFontAwesomeIcons();
    initTooltips();
  });

  window.addEventListener('offline', () => {
    initOffline();
  }, false);

  window.addEventListener('online', () => {
    resetData();
    initOnline();
  }, false);

  initOnline();
}
