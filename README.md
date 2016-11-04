# Crude Entity

> Crude + Entities = Match made in heaven!

[![Build Status](https://secure.travis-ci.org/thanpolas/crude-entity.png?branch=master)](http://travis-ci.org/thanpolas/crude-entity)

## Install

Install the module using NPM:

```
npm install crude-entity --save
```

## <a name='TOC'>Table of Contents</a>

1. [Overview](#overview)
1. [API](#api)

## Overview

Wraps around [Crude][] to accept an [Entity][] instead of a typical expected [Crude Controller](https://github.com/thanpolas/crude/wiki/Api#crude-controller).

## API

```js
var crudeEntity = require('crude-entity');

var ArticleEntity = require('../entities/article.ent.js');

var articleCrude = crudeEntity('/article', ArticleEntity, expressApp);

// In addition to the standard Crude configuration options
// the following new ones are available
articleCrude.config({
    // All standard Crude options, plus:

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

    // entity "delete" method to use.
    entityDelete: 'delete',

    // entity "count" method to use.
    entityCount: 'count',
});

```

**[[⬆]](#TOC)**


## Release History

- **v1.0.1**, *03 Nov 2016*
    - Fixed a bug when passing the same entity on a second crude route, it messed up the references.
- **v1.0.0**, *03 Nov 2016*
    - Upgraded to Crude 1.0.0 which adds the `maxPaginateLimit` option set max limit for pagination.
- **v0.4.1**, *07 Sep 2015*
    - Upgraded to Crude 0.9.1 which Adds the `multiQueryAnd` option to allow for use of the `AND` operator in multiple items filter queries vs the default `OR`.
- **v0.4.0**, *03 Sep 2015*
    - Upgraded to Crude 0.9.0 which now will not execute a "readOne" command after the update operation.
- **v0.3.0**, *28 Jul 2015*
    - Upgraded to Crude 0.8.0, will now return HTTP Code 200 vs 404 when no results on queries.
- **v0.2.4**, *23 Jul 2015*
  - Upgraded all dependency packages to latest.
- **v0.2.3**, *29 Dec 2014*
    - Fixed nasty bug which overwrote entity's methods.
- **v0.2.2**, *09 Dec 2014*
    - Will now validate if methods defined in config exist on entities.
    - Better handling of expected Controller by Crude.
    - Upgraded all packages to latest.
- **v0.2.1**, *21 Nov 2014*
    - Upgraded to Crude 0.7.2 explicitly and updated all packages to latest.
- **v0.2.0**, *14 Sep 2014*
    - Upgraded to Crude 0.7.x which uses Express style middleware.
- **v0.1.4**, *11 Sep 2014*
    - Explicitly use latest crude `v0.6.3`.
- **v0.1.2**, *11 Sep 2014*
    - Made `crude.config()` synchronous and upgraded to Crude `v0.6.2`.
- **v0.1.1**, *08 Sep 2014*
    - Big Bang

## License

Copyright (c) 2014 [Thanasis Polychronakis][thanpolas]. Licensed under the MIT license.

[crude]: https://github.com/thanpolas/crude
[thanpolas]: http://thanpol.as
[entity]: https://github.com/thanpolas/entity
