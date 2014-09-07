/**
 * @fileOverview Entity Crude Bootstrap module.
 */

var EntityCrude = require('./crude-entity');

/**
 * Entity Crude Bootstrap module.
 *
 * @param {string} baseUrl The baseUrl to use.
 * @param {Object} controller The controller.
 * @param {Express=} optExpress An express instance.
 */
module.exports = function (baseUrl, controller, optExpress) {
  return new EntityCrude(baseUrl, controller, optExpress);
};
