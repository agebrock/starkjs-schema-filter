/*
 * starkjs-schema-filter
 * https://github.com/agebrock/starkjs-schema-filter
 *
 * Copyright (c) 2014 Christoph Hagenbrock
 * Licensed under the MIT license.
 */

'use strict';

var _ = require('starkjs-underscore');

function shouldSetDefaultValue(schema, instance) {
  return _.isDefined(schema.default) && !_.isDefined(instance);
}

function shouldCastToString(schema, instance) {
  return schema.type === 'string' && !_.isString(instance) && instance.toString;
}

function shouldCastToNumber(schema, instance) {
  return schema.type === 'number' && !_.isNumber(instance);
}

function shouldTrimWhitespaces(schema) {
  return schema.type === 'string' && schema.trim === true;
}

function handleProperty(schema, instance) {
  if (_.isObject(instance)) {
    return instance;
  }

  if (_.isArray(instance)) {
    return instance;
  }

  if (shouldSetDefaultValue(schema, instance)) {
    instance = schema.default;
  }

  if (!_.isDefined(instance)) {
    return instance;
  }

  if (shouldCastToString(schema, instance)) {
    instance = instance.toString();
  }

  if (shouldCastToNumber(schema, instance)) {
    instance = parseFloat(instance);
  }
  //extended field based modifications
  if (shouldTrimWhitespaces(schema, instance)) {
    instance = instance.trim();
  }
  return instance;
}

function handleArray(schema, instances) {
  _.each(instances, function(instance, index) {
    instances[index] = cast(schema.items, instance);
  });
  return instances;
}

function handleObject(schema, instance) {
  /*
   if(!_.isObject(instance)){
   return instance;
   }*/
  _.each(schema.properties, function(schema, propertyName) {
    if (!instance[propertyName]) {
      return;
    }
    instance[propertyName] = cast(schema, instance[propertyName]);
  });

  if (schema.additionalProperties !== true) {
    instance = _.pick(instance, _.keys(schema.properties));
  }

  return instance;
}

function cast(schema, instance) {

  if (!_.isFunction(instance)) {
    instance = _.clone(instance);
  }
  if (schema.type === 'object') {
    instance = handleObject(schema, instance);
  } else if (schema.type === 'array') {
    instance = handleArray(schema, instance);
  } else {
    instance = handleProperty(schema, instance);
  }
  return instance;
}

module.exports = cast;
