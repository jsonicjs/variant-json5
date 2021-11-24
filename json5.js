"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Json5 = void 0;
function Json5(jsonic, _options) {
    jsonic.options({
        text: {
            modify: (val) => {
                let out = 'string' === typeof val ?
                    val.replace(/\\u[0-9a-fA-F]{4}/g, (m) => String.fromCodePoint(parseInt(m.substring(2), 16))) :
                    val;
                return out;
            }
        },
        value: {
            map: {
                'Infinity': { val: Infinity },
                '+Infinity': { val: Infinity },
                '-Infinity': { val: -Infinity },
                '+NaN': { val: NaN },
                '-NaN': { val: -NaN },
            }
        },
        space: {
            chars: '\t\v\f \u00A0\uFEFF\n\r\u2028\u2029\u2003'
        },
        string: {
            escape: {
                '0': '\0',
                '\r': '',
                '\n': '',
                '\u2028': '',
                '\u2029': '',
            },
            // This is a hackish (ie. accepts a superset) way to support '"\\\r\n"' escapes.
            // A "proper" solution would use a custom StringMatcher.
            replace: {
                '\n': '',
            }
        },
    });
}
exports.Json5 = Json5;
//# sourceMappingURL=json5.js.map