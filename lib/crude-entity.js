/*
 * crude-entity
 * An awesome project description
 * https://github.com/thanpolas/crude-entity
 *
 * Copyright (c) 2014 Thanasis Polychronakis
 * Licensed under the MIT license.
 */

/**
 * @fileOverview crude-entity Base.
 */

var __ = require('lodash');

var crude = require('crude');

/**
 * The Entity Crude Controller
 *
 * @param {string} route The route to use.
 * @param {Entity} Entity An entity Ctor.
 * @contructor
 * @extends {crude}
 */
var CrudCtrl = module.exports = crude.extend(function(route, Entity) {
  this.route = route;
  this.Entity = Entity;
  this.entity = new Entity();
  this.setOptions();
});

/**
 * Set options.
 *
 * @param {Object=} optOptions User defined options.
 */
CrudCtrl.prototype.setOptions = function(optOptions) {
  var userOpts = {};
  if (__.isObject(optOptions)) {
    userOpts = optOptions;
  }

  /** @type {Object} define default options */
  this.opts = __.defaults(userOpts, {
    // entity "create" method to use.
    entityCreate: 'create',

    // entity "read" method to use.
    entityRead: 'read',

    // entity "readLimit" method to use.
    entityReadLimit: 'readLimit',

    // entity "readOne" method to use.
    entityReadOne: 'readOne',

    // entity "update" method to use.
    entityUpdate: 'update',

    // entity "count" method to use.
    entityCount: 'count',
  });
};

