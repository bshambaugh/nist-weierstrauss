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
    const prime = two ** 521n - 1n;
    const b = 1093849038073734274511112390766805569936207598951683748994586394495953116150735016013708737573759623248592132296706313309438452531591012912142327488478985984n;
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
//# sourceMappingURL=secp521r1.js.map