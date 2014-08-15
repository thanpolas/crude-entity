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

Lorem ipsum trololol.

## API

```js

var crudeEntity = require('crude-entity');

var ArticleEntity = require('../entities/article.ent.js');

var articleCrude = crudeEntity('/article', ArticleEntity);

// pass the express app to add routes.
articleCrude.addRoutes(app);

// returns the same instance.
var sameArticleCrude = crudeEntity('/domain');

// Middleware on each OP
articleCrude.readList.use(function(req, res) { return Promise(); });

// Master Middleware, applies to all OPs
articleCrude.use(function(req, res) { return Promise(); });

// Configure Crude, default values
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

    // entity "count" method to use.
    entityCount: 'count',
});

```



**[[⬆]](#TOC)**

### <a name='toApi'>Getting an API Safe verison</a>

> ### errInstance.toApi()
>
> *Returns* `Object` A sanitized object.

Clones the error object and strips it of all the `Error` getters (like `stack`) and the following attributes:
    
    * `srcError`

```js
var appErr = require('nodeon-error');

var error = new appErr.Error();

console.log(error.toApi());
```

## Release History

- **v0.0.1**, *TBD*
    - Big Bang

## License

Copyright (c) 2014 Thanasis Polychronakis. Licensed under the MIT license.
