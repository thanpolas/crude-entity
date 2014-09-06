/*
 * crude-entity
 * Extends Crude to accept Entities as controller.
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
 * @param {Express=} optExpress An express instance.
 * @contructor
 * @extends {crude}
 */
var EntityCrude = module.exports = crude.extend(function(baseUrl, Entity, optExpress) {
  if (!(this instanceof EntityCrude)) {
    return new EntityCrude(baseUrl, Entity, optExpress);
  }

  /** @type {Entity} The entity Ctor */
  this.Entity = Entity;

  /** @type {Entity} The entity instance */
  this.entity = new Entity();

  this.config.use(this._configEntity.bind(this));

  this._setDefaultsEntity();

  /** @type {Object} Overwrite controller. */
  this.controller = {
    create: this.entity[this.opts.entityCreate],
    read: this.entity[this.opts.entityRead],
    readLimit: this.entity[this.opts.entityReadLimit],
    readOne: this.entity[this.opts.entityReadOne],
    update: this.entity[this.opts.entityUpdate],
    count: this.entity[this.opts.entityCount],
  };
});

/**
 * Middleware for seting config options, will update corresponding
 * entity method if defined.
 *
 * @param {Object} opts Defined options.
 * @private
 */
EntityCrude.prototype._configEntity = function (opts) {
  // entity "create" method to use.
  if (opts.entityCreate) {
    this.controller.create = this.entity[opts.entityCreate];
  }

  // entity "read" method to use.
  if (opts.entityRead) {
    this.controller.read = this.entity[opts.entityRead];
  }

  // entity "readLimit" method to use.
  if (opts.entityReadLimit) {
    this.controller.readLimit = this.entity[opts.entityReadLimit];
  }

  // entity "readOne" method to use.
  if (opts.entityReadOne) {
    this.controller.readOne = this.entity[opts.entityReadOne];
  }

  // entity "update" method to use.
  if (opts.entityUpdate) {
    this.controller.update = this.entity[opts.entityUpdate];
  }

  // entity "count" method to use.
  if (opts.entityCount) {
    this.controller.count = this.entity[opts.entityCount];
  }
};

/**
 * Set default options for crude-entity.
 *
 */
EntityCrude.prototype._setDefaultsEntity = function() {
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

