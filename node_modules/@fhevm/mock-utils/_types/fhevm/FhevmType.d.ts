import { FheType } from "./FheType.js";
import type { SolidityTypeName } from "./SolidityType.js";
export type FhevmTypeName = "ebool" | "euint4" | "euint8" | "euint16" | "euint32" | "euint64" | "euint128" | "eaddress" | "euint256";
export declare enum FhevmType {
    ebool = 0,// == FheTypes.Bool
    euint4 = 1,
    euint8 = 2,
    euint16 = 3,
    euint32 = 4,
    euint64 = 5,
    euint128 = 6,
    eaddress = 7,
    euint256 = 8
}
export declare const FhevmTypeMap: Readonly<Record<FhevmTypeName, FhevmType>>;
export declare const FhevmTypeNameMap: Readonly<Record<FhevmType, FhevmTypeName>>;
export declare const allFhevmTypes: readonly Readonly<FhevmType>[];
export declare const allFhevmTypeNames: readonly Readonly<FhevmTypeName>[];
export type FhevmTypeEuint = FhevmType.euint4 | FhevmType.euint8 | FhevmType.euint16 | FhevmType.euint32 | FhevmType.euint64 | FhevmType.euint128 | FhevmType.euint256;
export interface FhevmTypeInfo {
    name: FhevmTypeName;
    type: FhevmType;
    fheType: FheType;
    solidityTypeName: SolidityTypeName;
    clearTextBitLength: number;
}
export declare const allFhevmTypeInfos: readonly Readonly<FhevmTypeInfo>[];
/**
 * Returns `true` if `fhevmType` is a valid `FhevmType`, `false` otherwise
 * @param fhevmType
 */
export declare function isFhevmType(fhevmType: unknown): boolean;
/**
 * Returns `true` if `fhevmType` is a Fhevm unsigned integer type, `false` otherwise
 * @param fhevmType
 */
export declare function isFhevmEuint(fhevmType: FhevmType): fhevmType is FhevmType.euint4 | FhevmType.euint8 | FhevmType.euint16 | FhevmType.euint32 | FhevmType.euint64 | FhevmType.euint128 | FhevmType.euint256;
/**
 * Returns `true` if `fhevmType` is a Fhevm bool type, `false` otherwise
 * @param fhevmType
 */
export declare function isFhevmEbool(fhevmType: FhevmType): fhevmType is FhevmType.ebool;
/**
 * Returns `true` if `fhevmType` is a Fhevm address type, `false` otherwise
 * @param fhevmType
 */
export declare function isFhevmEaddress(fhevmType: FhevmType): fhevmType is FhevmType.eaddress;
/**
 * Throws an internal error if `fhevmType` is not a valid `FhevmType`
 * @param fhevmType
 */
export declare function checkFhevmType(fhevmType: unknown): asserts fhevmType is FhevmType;
export declare function FheTypeToFhevmType(fheType: FheType): FhevmType;
export declare function FhevmTypeToFheType(fhevmType: FhevmType): FheType;
export declare function getFhevmTypeInfo(type: FhevmType | FhevmTypeName): FhevmTypeInfo;
/**
 * Each primitive FHEVM type is encoded into a primitive FHE type.
 * The bit length of a clear (unencrypted) primitive FHEVM type may differ
 * from the number of encrypted bits used by the corresponding FHE type.
 *
 * For example, a clear boolean is typically represented using 1 bit,
 * but its encrypted FHE equivalent may use 2 encrypted bits.
 * @param fhevmType
 * @returns Then number of encrypted bits
 */
export declare function getFhevmTypeFheBitLength(fhevmType: FhevmType): number;
export declare function getFhevmTypeMaxClearTextBigInt(fhevmType: FhevmType): bigint;
export declare function tryParseFhevmType(name: string): FhevmType | undefined;
//# sourceMappingURL=FhevmType.d.ts.map