var cast = require('../');

var jsonSchema = {
             'type': 'array',
             'items': {
                 'type': 'object',
                 'properties': {
                     'simple': {
                         'type': 'string'
                     }
                 }
             }
         };

var data = [ { simple: 1 } ];

var result = cast(jsonSchema, data);
console.log(result)
//result: [{simple: "1"}]
