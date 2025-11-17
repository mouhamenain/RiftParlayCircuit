import type { SolidityTypeName } from "./SolidityType.js";
export interface FheTypeInfo {
    type: FheTypeName;
    supportedOperators: FheTypeOperatorName[];
    bitLength: number;
    clearMatchingType: SolidityTypeName | "bytes memory" | "string memory";
    value: number;
}
export type FheTypeOperatorName = "add" | "sub" | "mul" | "div" | "rem" | "and" | "or" | "xor" | "shl" | "shr" | "rotl" | "rotr" | "eq" | "ne" | "ge" | "gt" | "le" | "lt" | "min" | "max" | "neg" | "not" | "select" | "rand" | "randBounded";
export declare enum FheType {
    Bool = 0,
    Uint4 = 1,
    Uint8 = 2,
    Uint16 = 3,
    Uint32 = 4,
    Uint64 = 5,
    Uint128 = 6,
    Uint160 = 7,
    Uint256 = 8,
    Uint512 = 9,
    Uint1024 = 10,
    Uint2048 = 11,
    Uint2 = 12,
    Uint6 = 13,
    Uint10 = 14,
    Uint12 = 15,
    Uint14 = 16,
    Int2 = 17,
    Int4 = 18,
    Int6 = 19,
    Int8 = 20,
    Int10 = 21,
    Int12 = 22,
    Int14 = 23,
    Int16 = 24,
    Int32 = 25,
    Int64 = 26,
    Int128 = 27,
    Int160 = 28,
    Int256 = 29,
    AsciiString = 30,
    Int512 = 31,
    Int1024 = 32,
    Int2048 = 33,
    Uint24 = 34,
    Uint40 = 35,
    Uint48 = 36,
    Uint56 = 37,
    Uint72 = 38,
    Uint80 = 39,
    Uint88 = 40,
    Uint96 = 41,
    Uint104 = 42,
    Uint112 = 43,
    Uint120 = 44,
    Uint136 = 45,
    Uint144 = 46,
    Uint152 = 47,
    Uint168 = 48,
    Uint176 = 49,
    Uint184 = 50,
    Uint192 = 51,
    Uint200 = 52,
    Uint208 = 53,
    Uint216 = 54,
    Uint224 = 55,
    Uint232 = 56,
    Uint240 = 57,
    Uint248 = 58,
    Int24 = 59,
    Int40 = 60,
    Int48 = 61,
    Int56 = 62,
    Int72 = 63,
    Int80 = 64,
    Int88 = 65,
    Int96 = 66,
    Int104 = 67,
    Int112 = 68,
    Int120 = 69,
    Int136 = 70,
    Int144 = 71,
    Int152 = 72,
    Int168 = 73,
    Int176 = 74,
    Int184 = 75,
    Int192 = 76,
    Int200 = 77,
    Int208 = 78,
    Int216 = 79,
    Int224 = 80,
    Int232 = 81,
    Int240 = 82,
    Int248 = 83
}
export type FheTypeName = "Bool" | "Uint4" | "Uint8" | "Uint16" | "Uint32" | "Uint64" | "Uint128" | "Uint160" | "Uint256" | "Uint512" | "Uint1024" | "Uint2048" | "Uint2" | "Uint6" | "Uint10" | "Uint12" | "Uint14" | "Int2" | "Int4" | "Int6" | "Int8" | "Int10" | "Int12" | "Int14" | "Int16" | "Int32" | "Int64" | "Int128" | "Int160" | "Int256" | "AsciiString" | "Int512" | "Int1024" | "Int2048" | "Uint24" | "Uint40" | "Uint48" | "Uint56" | "Uint72" | "Uint80" | "Uint88" | "Uint96" | "Uint104" | "Uint112" | "Uint120" | "Uint136" | "Uint144" | "Uint152" | "Uint168" | "Uint176" | "Uint184" | "Uint192" | "Uint200" | "Uint208" | "Uint216" | "Uint224" | "Uint232" | "Uint240" | "Uint248" | "Int24" | "Int40" | "Int48" | "Int56" | "Int72" | "Int80" | "Int88" | "Int96" | "Int104" | "Int112" | "Int120" | "Int136" | "Int144" | "Int152" | "Int168" | "Int176" | "Int184" | "Int192" | "Int200" | "Int208" | "Int216" | "Int224" | "Int232" | "Int240" | "Int248";
/**
 * A constant array containing all Fully Homomorphic Encryption (FHE) types.
 * Each type is represented as an object with the following properties:
 *
 * - `type`: The name of the FHE type.
 * - `value`: A unique numeric identifier for the FHE type.
 * - `supportedOperators`: An array of strings representing the operators supported by the FHE type.
 * - `bitLength`: The bit length of the FHE type.
 * - `clearMatchingType`: The corresponding clear (non-encrypted) type in Solidity.
 *
 * The FHE types included that are currently implemented in the Solidity code generator are:
 *
 * - `Bool`: Boolean type with a bit length of 1.
 * - `Uint8`: Unsigned integer type with a bit length of 8.
 * - `Uint16`: Unsigned integer type with a bit length of 16.
 * - `Uint32`: Unsigned integer type with a bit length of 32.
 * - `Uint64`: Unsigned integer type with a bit length of 64.
 * - `Uint128`: Unsigned integer type with a bit length of 128.
 * - `Uint160`: Unsigned integer type with a bit length of 160.
 * - `Uint256`: Unsigned integer type with a bit length of 256.
 * - `Uint512`: Unsigned integer type with a bit length of 512.
 * - `Uint1024`: Unsigned integer type with a bit length of 1024.
 * - `Uint2048`: Unsigned integer type with a bit length of 2048.
 */
export declare const ALL_FHE_TYPES: FheTypeInfo[];
export declare function checkFheType(fheType: unknown): asserts fheType is FheType;
export declare function getFheTypeByteLength(fheType: FheType): number;
export declare function getFheTypeBitLength(fheType: FheType): number;
export declare function getFheTypeInfo(type: FheType): FheTypeInfo;
export declare function getFheTypeName(fheType: unknown): FheTypeName;
//# sourceMappingURL=FheType.d.ts.map