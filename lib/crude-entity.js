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

var Crude = require('crude/lib/crude');

/**
 * The Entity Crude Controller
 *
 * @param {string} route The route to use.
 * @param {Entity} Entity An entity Ctor.
 * @param {Express=} optExpress An express instance.
 * @contructor
 * @extends {crude}
 */
var EntityCrude = module.exports = Crude.extend(function(baseUrl, Entity, optExpress) {
  if (!(this instanceof EntityCrude)) {
    return new EntityCrude(baseUrl, Entity, optExpress);
  }

  /** @type {Entity} The entity Ctor */
  this.Entity = Entity;

  /** @type {Entity} The entity instance */
  this.entity = new Entity();

  this.config.use(this._configEntity.bind(this));

  this._setDefaultsEntity();

  // Overwrite controller methods.
  this.controller.create = this.entity[this.opts.entityCreate];
  this.controller.read = this.entity[this.opts.entityRead];
  this.controller.readLimit = this.entity[this.opts.entityReadLimit];
  this.controller.readOne = this.entity[this.opts.entityReadOne];
  this.controller.update = this.entity[this.opts.entityUpdate];
  this.controller.delete = this.entity[this.opts.entityDelete];
  this.controller.count = this.entity[this.opts.entityCount];
});

// expose CrudOps enum
EntityCrude.CrudOps = Crude.CrudOps;

/**
 * Overwrite controller validation method.
 *
 * @override
 */
Crude.prototype._validateController = function() {};

/**
 * Middleware for seting config options, will update corresponding
 * entity method if defined.
 *
 * @param {Object} opts Defined options.
 * @private
 */
EntityCrude.prototype._configEntity = function (opts) {
  if (!__.isObject(opts)) {
    return;
  }
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

  if(opts.entityDelete) {
    this.controller.delete = this.entity[opts.entityDelete];
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

    entityDelete: 'delete',

    // entity "count" method to use.
    entityCount: 'count',
  });
};

