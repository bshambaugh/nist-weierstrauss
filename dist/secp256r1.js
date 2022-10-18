"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ECPointDecompress = void 0;
const u8a = require("uint8arrays");
const bigintModArith = require("bigint-mod-arith");
const nist_weierstrauss_common = require("./nist-weierstrauss-common.js");
function ECPointDecompress(comp) {
    if (!nist_weierstrauss_common.testUint8Array(comp)) {
        throw new TypeError("input must be a Uint8Array");
    }
    const two = BigInt(2);
    const prime = two ** 256n - two ** 224n + two ** 192n + two ** 96n - 1n;
    const b = 41058363725152142129326129780047268409114441015993725554835256314039467401291n;
    const pIdent = (prime + 1n) / 4n;
    const signY = BigInt(comp[0] - 2);
    const x = comp.subarray(1);
    const xBig = BigInt(u8a.toString(x, "base10"));
    const a = xBig ** 3n - xBig * 3n + b;
    let yBig = bigintModArith.modPow(a, pIdent, prime);
    if (yBig % 2n !== signY) {
        yBig = prime - yBig;
    }
    return {
        x: xBig,
        y: yBig,
    };
}
exports.ECPointDecompress = ECPointDecompress;
//# sourceMappingURL=secp256r1.js.map