# About

This is a SAML 2.0 validator meant to be used together with [Samlify](https://github.com/tngan/samlify)

This is a fork of https://github.com/authenio/samlify-node-xmllint removing the memory leak in the compiled node-xmllint module. 


## How to use this module

```
import * as samlify from 'samlify';
import * as validator from 'samlify-validator-js';

samlify.setSchemaValidator(validator);

```
