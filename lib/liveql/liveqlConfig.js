'use strict';

/**
  * LiveQL Config Object:
  *  {
  *    uid: {String | Optional} - The string of the unique identifer that is returned for live objects (ex: 'live_id'). Default is 'id'.
  *    directive: {String | Optional} - The string of the directive identifier (ex: @live). Just pass in the part after the @. Default is 'live'.
  *  }
*/

// Store the LiveQL server settings.
var config = {};

// Store the default settings.
var defaultSettings = { uid: 'id', directive: '@live' };

/**
 * This function sets the LiveQL config object.
 * @param {Object} settings - User settings object.
 * @returns {Object} - LiveQL settings object.
 */
var set = function set(settings) {
  if (!settings) {
    config.uid = 'id';
    config.directive = '@live';
  } else {
    config.uid = settings.uid || defaultSettings.uid;

    // Add the @ sign to the directive if one is passed in the object.
    if (settings.directive) {
      // User included @ in front of directive.
      if (settings.directive.indexOf('@') === 0) {
        config.directive = settings.directive;
      } else {
        config.directive = '@' + settings.directive;
      }
    } else {
      config.directive = '@live';
    }
  }
  return config;
};

// Return the config object.
var get = function get() {
  return config;
};

module.exports = { set: set, get: get };