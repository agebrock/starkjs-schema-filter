# starkjs-schema-filter 

JSON Schema filter to "cut" and "cast" data befor validating.


## Getting Started
Install the module with: `npm install starkjsSchemaFilter`

```javascript
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
```


## Documentation


## Examples
See [examples](./examples)


## License
Copyright (c) 2013 agebrock
Licensed under the MIT license.
