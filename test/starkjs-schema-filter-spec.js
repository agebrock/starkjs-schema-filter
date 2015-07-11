var schemaFilter = require('../'),
    _ = require('starkjs-underscore'),
    expect = require('chai').expect;

var tests = [
    {
        should:'set default value on undefined input',
        schema: {
            'type': 'string',
            'default': 'test'
        },
        input: undefined,
        output: 'test'
    },
    {
        should:'set default value on undefined input',
        schema: {
            'type': 'string'
        },
        input: {a:1},
        output: {a:1}
    },
    {
        should:'set default value on null input',
        schema: {
            'type': 'string',
            'default': 'test'
        },
        input: null,
        output: 'test'
    },
    {
        should:'cast to string',
        schema: {
            'type': 'string'
        },
        input: 1,
        output: '1'
    },
    {
        should:'cast to number',
        schema: {
            'type': 'number'
        },
        input: '1',
        output: 1
    },
    {
        should:'trim a string',
        schema: {
            'type': 'string',
            'trim': true
        },
        input: ' test ',
        output: 'test'
    },
    {
        should:'not allow additional properties',
        schema: {
            'type': 'object',
            'properties': {
                'simple': {
                    'type': 'string'
                }
            }
        },
        input: {simple: 1, removeMe: 1},
        output: {simple: '1'}
    },
    {
        should:'allow additional properties',
        schema: {
            'type': 'object',
            'additionalProperties': true,
            'properties': {
                'simple': {
                    'type': 'string'
                }
            }
        },
        input: {simple: 1, keepMe: 1},
        output: {simple: '1', keepMe: 1}
    },
    {
        should:'cast all values inside an array',
        schema: {
            'type': 'array',
            'items': {
                'type': 'string'
            }
        },
        input: [1, 2, 3],
        output: ['1', '2', '3']
    },
    {
        should:'cast deep inside complex structures',
        schema: {
            'type': 'array',
            'items': {
                'type': 'object',
                'properties': {
                    'simple': {
                        'type': 'string'
                    }
                }
            }
        },
        input: [
            {simple: 1}
        ],
        output: [
            {simple: '1'}
        ]
    }
];


describe('starkjs-schema', function () {
    _.each(tests, function (test) {
        it(test.should, function () {
            expect(schemaFilter(test.schema, test.input)).to.deep.equal(test.output);
        });
    });
});
