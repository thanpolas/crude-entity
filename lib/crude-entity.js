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
var EntityCrude = module.exports = Crude.extend(function(baseUrl, Entity) {
  /** @type {Entity} The entity Ctor */
  this.Entity = Entity;

  /** @type {Entity} The entity instance */
  this.entity = new Entity();

  /** @type {Function} Store base config method in local private */
  this._baseConfig = Crude.prototype.config.bind(this);

  this._setDefaultsEntity();

  // Overwrite controller methods.
  this.controller = {};
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
 * Hijacker for seting config options, will update corresponding
 * entity method if defined and invoke parent config method.
 *
 * @param {Object} opts Defined options.
 * @return {self} Chain-able.
 */
EntityCrude.prototype.config = function (opts) {
  if (!__.isObject(opts)) {
    return this;
  }

  // invoke base config.
  this._baseConfig(opts);

  // entity "create" method to use.
  if (opts.entityCreate) {
    if (typeof this.entity[opts.entityCreate] !== 'function') {
      throw new TypeError('Method for: "entityCreate" is not defined');
    }
    this.controller.create = this.entity[opts.entityCreate];
  }

  // entity "read" method to use.
  if (opts.entityRead) {
    if (typeof this.entity[opts.entityRead] !== 'function') {
      throw new TypeError('Method for: "entityRead" is not defined');
    }
    this.controller.read = this.entity[opts.entityRead];
  }

  // entity "readLimit" method to use.
  if (opts.entityReadLimit) {
    if (typeof this.entity[opts.entityReadLimit] !== 'function') {
      throw new TypeError('Method for: "entityReadLimit" is not defined');
    }
    this.controller.readLimit = this.entity[opts.entityReadLimit];
  }

  // entity "readOne" method to use.
  if (opts.entityReadOne) {
    if (typeof this.entity[opts.entityReadOne] !== 'function') {
      throw new TypeError('Method for: "entityReadOne" is not defined');
    }
    this.controller.readOne = this.entity[opts.entityReadOne];
  }

  // entity "update" method to use.
  if (opts.entityUpdate) {
    if (typeof this.entity[opts.entityUpdate] !== 'function') {
      throw new TypeError('Method for: "entityUpdate" is not defined');
    }
    this.controller.update = this.entity[opts.entityUpdate];
  }

  if(opts.entityDelete) {
    if (typeof this.entity[opts.entityDelete] !== 'function') {
      throw new TypeError('Method for: "entityDelete" is not defined');
    }
    this.controller.delete = this.entity[opts.entityDelete];
  }

  // entity "count" method to use.
  if (opts.entityCount) {
    if (typeof this.entity[opts.entityCount] !== 'function') {
      throw new TypeError('Method for: "entityCount" is not defined');
    }
    this.controller.count = this.entity[opts.entityCount];
  }

  return this;
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

