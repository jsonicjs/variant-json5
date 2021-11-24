"use strict";
/* Copyright (c) 2021 Richard Rodger and other contributors, MIT License */
Object.defineProperty(exports, "__esModule", { value: true });
const jsonic_1 = require("jsonic");
const json5_1 = require("../json5");
const j = jsonic_1.Jsonic.make().use(json5_1.Json5);
// NOTE: tests adapted from https://github.com/json5/json5/blob/master/test/parse.js
// Copyright (c) 2012-2018 Aseem Kishore, and others. MIT Licensed.
describe('json5', () => {
    test('happy', () => {
        expect(j('{"a":1}')).toEqual({ a: 1 });
        expect(j('{"a":1,"b":2}')).toEqual({ a: 1, b: 2 });
        expect(j('[1,2]')).toEqual([1, 2]);
    });
    test('objects', () => {
        expect(j('{}')).toEqual({}); // parses empty objects
        expect(j('{"a":1}')).toEqual({ a: 1 }); // parses double string property names
        expect(j("{'a':1}")).toEqual({ a: 1 }); // parses single string property names
        expect(j('{a:1}')).toEqual({ a: 1 }); // parses unquoted property names
        // parses special character property names
        expect(j('{$:1,$_:2,_$:3}')).toEqual({ $: 1, $_: 2, _$: 3 });
        expect(j('{$_:1}')).toEqual({ $_: 1 });
        expect(j('{$_:1,_$:2,a\u200C:3}')).toEqual({ $_: 1, _$: 2, 'a\u200C': 3 });
        // parses unicode property names
        expect(j('{ùńîċõďë:9}')).toEqual({ 'ùńîċõďë': 9 });
        // parses escaped property names
        expect(j('{\\u0061\\u0062:1,\\u0024\\u005F:2,\\u005F\\u0024:3}')).toEqual({ ab: 1, $_: 2, _$: 3 });
        expect(j('{abc:1,def:2}')).toEqual({ abc: 1, def: 2 }); // parses multiple properties
        expect(j('{a:{b:2}}')).toEqual({ a: { b: 2 } }); // parses nested objects'
    });
    test('arrays', () => {
        expect(j('[]')).toEqual([]); // parses empty arrays
        expect(j('[1]')).toEqual([1]); // parses array values
        expect(j('[1,2]')).toEqual([1, 2]); // parses multiple array values
        expect(j('[1,[2,3]]')).toEqual([1, [2, 3]]); // parses nested arrays'
    });
    test('nulls', () => {
        expect(j('null')).toEqual(null); // parses nulls'
    });
    test('Booleans', () => {
        expect(j('true')).toEqual(true); // parses true
        expect(j('false')).toEqual(false); // parses false'
    });
    test('numbers', () => {
        // expect(j('[0,0.,0e0]')).toEqual([0, 0, 0]) // parses leading zeroes
        expect(j('[1,23,456,7890]')).toEqual([1, 23, 456, 7890]); // parses integers
        expect(j('[-1,+2,-.1,-0]')).toEqual([-1, +2, -0.1, -0]); // parses signed numbers
        expect(j('[.1,.23]')).toEqual([0.1, 0.23]); // parses leading decimal points
        expect(j('[1.0,1.23]')).toEqual([1, 1.23]); // parses fractional numbers
        expect(j('[1e0,1e1,1e01,1.e0,1.1e0,1e-1,1e+1]')).toEqual([1, 10, 10, 1, 1.1, 0.1, 10]); // parses exponents
        expect(j('[0x1,0x10,0xff,0xFF]')).toEqual([1, 16, 255, 255]); // parses hexadecimal numbers
        expect(j('[Infinity,-Infinity]')).toEqual([Infinity, -Infinity]); // parses signed and unsigned Infinity
        expect(isNaN(j('NaN'))).toBeTruthy(); // parses NaN
        expect(isNaN(j('-NaN'))).toBeTruthy(); // parses signed NaN
        expect(j('1')).toEqual(1); // parses 1
        expect(j('+1.23e100')).toEqual(1.23e100); // parses +1.23e100
        expect(j('0x1')).toEqual(0x1); // parses bare hexadecimal number
        expect(j('-0x0123456789abcdefABCDEF')).toEqual(-0x0123456789abcdefABCDEF); // parses bare long hexadecimal number'
    });
    test('strings', () => {
        expect(j('"abc"')).toEqual('abc'); // parses double quoted strings
        expect(j("'abc'")).toEqual('abc'); // parses single quoted strings
        expect(j(`['"',"'"]`)).toEqual(['"', "'"]); // parses quotes in strings')
        expect(j(`'\\b\\f\\n\\r\\t\\v'`)).toEqual(`\b\f\n\r\t\v`);
        expect(j(`'a\\\nb'`)).toEqual(`ab`);
        expect(j(`'\\x0f'`)).toEqual(`\x0f`);
        expect(j(`'\\u01fF'`)).toEqual(`\u01FF`);
        expect(j(`'\\\n\\\r\\\u2028\\\u2029\\a\\'\\"'`)).toEqual(`\a'"`); // parses escaped characters'
        expect(j(`'\\0'`)).toEqual(`\0`);
        expect(j(`'a\\\r\nb'`)).toEqual(`ab`);
        expect(j(`'\\b\\f\\n\\r\\t\\v\\0\\x0f\\u01fF\\\n\\\r\n\\\r\\\u2028\\\u2029\\a\\'\\"'`)).toEqual(`\b\f\n\r\t\v\0\x0f\u01FF\a'"`); // parses escaped characters'
    });
    test('comments', () => {
        expect(j('{//comment\n}')).toEqual({}); // parses single-line comments
        expect(j('{}//comment')).toEqual({}); // parses single-line comments at end of input
        expect(j('{/*comment\n** */}')).toEqual({}); // parses multi-line comments'
    });
    test('whitespace', () => {
        expect(j('{\t\v\f \u00A0\uFEFF\n\r\u2028\u2029\u2003}')).toEqual({}); // parses whitespace'
    });
});
//# sourceMappingURL=json5.test.js.map