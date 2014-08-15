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
  /** @type {Entity} The entity Ctor */
  this.Entity = Entity;
  /** @type {Entity} The entity instance */
  this.entity = new Entity();

  /** @type {Object} Overwrite controller. */
  this.controller = {
    create: this.entity[this.opts.entityCreate],
    read: this.entity[this.opts.entityRead],
    readLimit: this.entity[this.opts.entityReadLimit],
    readOne: this.entity[this.opts.entityReadOne],
    update: this.entity[this.opts.entityUpdate],
    count: this.entity[this.opts.entityCount],
  };

  this.setOptions.use(this._setDefaultsEntity.bind(this));
});

/**
 * Set default options for crude-entity.
 *
 */
CrudCtrl.prototype._setDefaultsEntity = function() {
  /** @type {Object} define default options */
  __.extend(this.opts, {
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

