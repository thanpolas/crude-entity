# crude-entity

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

- **v0.1.0**, *08 Sep 2014*
    - Big Bang

## License

Copyright (c) 2014 [Thanasis Polychronakis][thanpolas]. Licensed under the MIT license.

[crude]: https://github.com/thanpolas/crude
[thanpolas]: http://thanpol.as
[entity]: https://github.com/thanpolas/entity
