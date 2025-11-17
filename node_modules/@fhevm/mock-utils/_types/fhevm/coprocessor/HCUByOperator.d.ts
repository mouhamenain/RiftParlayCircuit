import type { FheTypeName } from "../FheType.js";
import type { CoprocessorOperatorEventName } from "./CoprocessorEvents.js";
export type HCUOperatorName = CoprocessorOperatorEventName;
export declare const HCUByOperator: {
    readonly FheAdd: {
        readonly supportScalar: true;
        readonly numberInputs: 2;
        readonly scalar: {
            readonly Uint8: 84000;
            readonly Uint16: 93000;
            readonly Uint32: 95000;
            readonly Uint64: 133000;
            readonly Uint128: 172000;
        };
        readonly nonScalar: {
            readonly Uint8: 88000;
            readonly Uint16: 93000;
            readonly Uint32: 125000;
            readonly Uint64: 162000;
            readonly Uint128: 259000;
        };
    };
    readonly FheSub: {
        readonly supportScalar: true;
        readonly numberInputs: 2;
        readonly scalar: {
            readonly Uint8: 84000;
            readonly Uint16: 93000;
            readonly Uint32: 95000;
            readonly Uint64: 133000;
            readonly Uint128: 172000;
        };
        readonly nonScalar: {
            readonly Uint8: 91000;
            readonly Uint16: 93000;
            readonly Uint32: 125000;
            readonly Uint64: 162000;
            readonly Uint128: 260000;
        };
    };
    readonly FheMul: {
        readonly supportScalar: true;
        readonly numberInputs: 2;
        readonly scalar: {
            readonly Uint8: 122000;
            readonly Uint16: 193000;
            readonly Uint32: 265000;
            readonly Uint64: 365000;
            readonly Uint128: 696000;
        };
        readonly nonScalar: {
            readonly Uint8: 150000;
            readonly Uint16: 222000;
            readonly Uint32: 328000;
            readonly Uint64: 596000;
            readonly Uint128: 1686000;
        };
    };
    readonly FheDiv: {
        readonly supportScalar: true;
        readonly numberInputs: 2;
        readonly scalar: {
            readonly Uint8: 210000;
            readonly Uint16: 302000;
            readonly Uint32: 438000;
            readonly Uint64: 715000;
            readonly Uint128: 1225000;
        };
    };
    readonly FheRem: {
        readonly supportScalar: true;
        readonly numberInputs: 2;
        readonly scalar: {
            readonly Uint8: 440000;
            readonly Uint16: 580000;
            readonly Uint32: 792000;
            readonly Uint64: 1153000;
            readonly Uint128: 1943000;
        };
    };
    readonly FheBitAnd: {
        readonly supportScalar: true;
        readonly numberInputs: 2;
        readonly scalar: {
            readonly Bool: 22000;
            readonly Uint8: 31000;
            readonly Uint16: 31000;
            readonly Uint32: 32000;
            readonly Uint64: 34000;
            readonly Uint128: 37000;
            readonly Uint256: 38000;
        };
        readonly nonScalar: {
            readonly Bool: 25000;
            readonly Uint8: 31000;
            readonly Uint16: 31000;
            readonly Uint32: 32000;
            readonly Uint64: 34000;
            readonly Uint128: 37000;
            readonly Uint256: 38000;
        };
    };
    readonly FheBitOr: {
        readonly supportScalar: true;
        readonly numberInputs: 2;
        readonly scalar: {
            readonly Bool: 22000;
            readonly Uint8: 30000;
            readonly Uint16: 30000;
            readonly Uint32: 32000;
            readonly Uint64: 34000;
            readonly Uint128: 37000;
            readonly Uint256: 38000;
        };
        readonly nonScalar: {
            readonly Bool: 24000;
            readonly Uint8: 30000;
            readonly Uint16: 31000;
            readonly Uint32: 32000;
            readonly Uint64: 34000;
            readonly Uint128: 37000;
            readonly Uint256: 38000;
        };
    };
    readonly FheBitXor: {
        readonly supportScalar: true;
        readonly numberInputs: 2;
        readonly scalar: {
            readonly Bool: 22000;
            readonly Uint8: 31000;
            readonly Uint16: 31000;
            readonly Uint32: 32000;
            readonly Uint64: 34000;
            readonly Uint128: 37000;
            readonly Uint256: 39000;
        };
        readonly nonScalar: {
            readonly Bool: 22000;
            readonly Uint8: 31000;
            readonly Uint16: 31000;
            readonly Uint32: 32000;
            readonly Uint64: 34000;
            readonly Uint128: 37000;
            readonly Uint256: 39000;
        };
    };
    readonly FheShl: {
        readonly supportScalar: true;
        readonly numberInputs: 2;
        readonly scalar: {
            readonly Uint8: 32000;
            readonly Uint16: 32000;
            readonly Uint32: 32000;
            readonly Uint64: 34000;
            readonly Uint128: 37000;
            readonly Uint256: 39000;
        };
        readonly nonScalar: {
            readonly Uint8: 92000;
            readonly Uint16: 125000;
            readonly Uint32: 162000;
            readonly Uint64: 208000;
            readonly Uint128: 272000;
            readonly Uint256: 378000;
        };
    };
    readonly FheShr: {
        readonly supportScalar: true;
        readonly numberInputs: 2;
        readonly scalar: {
            readonly Uint8: 32000;
            readonly Uint16: 32000;
            readonly Uint32: 32000;
            readonly Uint64: 34000;
            readonly Uint128: 37000;
            readonly Uint256: 38000;
        };
        readonly nonScalar: {
            readonly Uint8: 91000;
            readonly Uint16: 123000;
            readonly Uint32: 163000;
            readonly Uint64: 209000;
            readonly Uint128: 272000;
            readonly Uint256: 369000;
        };
    };
    readonly FheRotl: {
        readonly supportScalar: true;
        readonly numberInputs: 2;
        readonly scalar: {
            readonly Uint8: 31000;
            readonly Uint16: 31000;
            readonly Uint32: 32000;
            readonly Uint64: 34000;
            readonly Uint128: 37000;
            readonly Uint256: 38000;
        };
        readonly nonScalar: {
            readonly Uint8: 91000;
            readonly Uint16: 125000;
            readonly Uint32: 163000;
            readonly Uint64: 209000;
            readonly Uint128: 278000;
            readonly Uint256: 378000;
        };
    };
    readonly FheRotr: {
        readonly supportScalar: true;
        readonly numberInputs: 2;
        readonly scalar: {
            readonly Uint8: 31000;
            readonly Uint16: 31000;
            readonly Uint32: 32000;
            readonly Uint64: 34000;
            readonly Uint128: 37000;
            readonly Uint256: 40000;
        };
        readonly nonScalar: {
            readonly Uint8: 93000;
            readonly Uint16: 125000;
            readonly Uint32: 160000;
            readonly Uint64: 209000;
            readonly Uint128: 283000;
            readonly Uint256: 375000;
        };
    };
    readonly FheEq: {
        readonly supportScalar: true;
        readonly numberInputs: 2;
        readonly scalar: {
            readonly Bool: 25000;
            readonly Uint8: 55000;
            readonly Uint16: 55000;
            readonly Uint32: 82000;
            readonly Uint64: 83000;
            readonly Uint128: 117000;
            readonly Uint160: 117000;
            readonly Uint256: 118000;
        };
        readonly nonScalar: {
            readonly Bool: 26000;
            readonly Uint8: 55000;
            readonly Uint16: 83000;
            readonly Uint32: 86000;
            readonly Uint64: 120000;
            readonly Uint128: 122000;
            readonly Uint160: 137000;
            readonly Uint256: 152000;
        };
    };
    readonly FheNe: {
        readonly supportScalar: true;
        readonly numberInputs: 2;
        readonly scalar: {
            readonly Bool: 23000;
            readonly Uint8: 55000;
            readonly Uint16: 55000;
            readonly Uint32: 83000;
            readonly Uint64: 84000;
            readonly Uint128: 117000;
            readonly Uint160: 117000;
            readonly Uint256: 117000;
        };
        readonly nonScalar: {
            readonly Bool: 23000;
            readonly Uint8: 55000;
            readonly Uint16: 83000;
            readonly Uint32: 85000;
            readonly Uint64: 118000;
            readonly Uint128: 122000;
            readonly Uint160: 136000;
            readonly Uint256: 150000;
        };
    };
    readonly FheGe: {
        readonly supportScalar: true;
        readonly numberInputs: 2;
        readonly scalar: {
            readonly Uint8: 52000;
            readonly Uint16: 55000;
            readonly Uint32: 84000;
            readonly Uint64: 116000;
            readonly Uint128: 149000;
        };
        readonly nonScalar: {
            readonly Uint8: 63000;
            readonly Uint16: 84000;
            readonly Uint32: 118000;
            readonly Uint64: 152000;
            readonly Uint128: 210000;
        };
    };
    readonly FheGt: {
        readonly supportScalar: true;
        readonly numberInputs: 2;
        readonly scalar: {
            readonly Uint8: 52000;
            readonly Uint16: 55000;
            readonly Uint32: 84000;
            readonly Uint64: 117000;
            readonly Uint128: 150000;
        };
        readonly nonScalar: {
            readonly Uint8: 59000;
            readonly Uint16: 84000;
            readonly Uint32: 118000;
            readonly Uint64: 152000;
            readonly Uint128: 218000;
        };
    };
    readonly FheLe: {
        readonly supportScalar: true;
        readonly numberInputs: 2;
        readonly scalar: {
            readonly Uint8: 58000;
            readonly Uint16: 58000;
            readonly Uint32: 84000;
            readonly Uint64: 119000;
            readonly Uint128: 150000;
        };
        readonly nonScalar: {
            readonly Uint8: 58000;
            readonly Uint16: 83000;
            readonly Uint32: 117000;
            readonly Uint64: 149000;
            readonly Uint128: 218000;
        };
    };
    readonly FheLt: {
        readonly supportScalar: true;
        readonly numberInputs: 2;
        readonly scalar: {
            readonly Uint8: 52000;
            readonly Uint16: 58000;
            readonly Uint32: 83000;
            readonly Uint64: 118000;
            readonly Uint128: 149000;
        };
        readonly nonScalar: {
            readonly Uint8: 59000;
            readonly Uint16: 84000;
            readonly Uint32: 117000;
            readonly Uint64: 146000;
            readonly Uint128: 215000;
        };
    };
    readonly FheMin: {
        readonly supportScalar: true;
        readonly numberInputs: 2;
        readonly scalar: {
            readonly Uint8: 84000;
            readonly Uint16: 88000;
            readonly Uint32: 117000;
            readonly Uint64: 150000;
            readonly Uint128: 186000;
        };
        readonly nonScalar: {
            readonly Uint8: 119000;
            readonly Uint16: 146000;
            readonly Uint32: 182000;
            readonly Uint64: 219000;
            readonly Uint128: 289000;
        };
    };
    readonly FheMax: {
        readonly supportScalar: true;
        readonly numberInputs: 2;
        readonly scalar: {
            readonly Uint8: 89000;
            readonly Uint16: 89000;
            readonly Uint32: 117000;
            readonly Uint64: 149000;
            readonly Uint128: 180000;
        };
        readonly nonScalar: {
            readonly Uint8: 121000;
            readonly Uint16: 145000;
            readonly Uint32: 180000;
            readonly Uint64: 218000;
            readonly Uint128: 290000;
        };
    };
    readonly FheNeg: {
        readonly supportScalar: false;
        readonly numberInputs: 1;
        readonly types: {
            readonly Uint8: 79000;
            readonly Uint16: 93000;
            readonly Uint32: 95000;
            readonly Uint64: 131000;
            readonly Uint128: 168000;
            readonly Uint256: 269000;
        };
    };
    readonly FheNot: {
        readonly supportScalar: false;
        readonly numberInputs: 1;
        readonly types: {
            readonly Bool: 2;
            readonly Uint8: 9;
            readonly Uint16: 16;
            readonly Uint32: 32;
            readonly Uint64: 63;
            readonly Uint128: 130;
            readonly Uint256: 130;
        };
    };
    readonly Cast: {
        readonly supportScalar: false;
        readonly numberInputs: 1;
        readonly types: {
            readonly Bool: 32;
            readonly Uint8: 32;
            readonly Uint16: 32;
            readonly Uint32: 32;
            readonly Uint64: 32;
            readonly Uint128: 32;
            readonly Uint256: 32;
        };
    };
    readonly TrivialEncrypt: {
        readonly supportScalar: false;
        readonly numberInputs: 0;
        readonly types: {
            readonly Bool: 32;
            readonly Uint8: 32;
            readonly Uint16: 32;
            readonly Uint32: 32;
            readonly Uint64: 32;
            readonly Uint128: 32;
            readonly Uint160: 32;
            readonly Uint256: 32;
        };
    };
    readonly FheIfThenElse: {
        readonly supportScalar: false;
        readonly numberInputs: 3;
        readonly types: {
            readonly Bool: 55000;
            readonly Uint8: 55000;
            readonly Uint16: 55000;
            readonly Uint32: 55000;
            readonly Uint64: 55000;
            readonly Uint128: 57000;
            readonly Uint160: 83000;
            readonly Uint256: 108000;
        };
    };
    readonly FheRand: {
        readonly supportScalar: false;
        readonly numberInputs: 0;
        readonly types: {
            readonly Bool: 19000;
            readonly Uint8: 23000;
            readonly Uint16: 23000;
            readonly Uint32: 24000;
            readonly Uint64: 24000;
            readonly Uint128: 25000;
            readonly Uint256: 30000;
        };
    };
    readonly FheRandBounded: {
        readonly supportScalar: false;
        readonly numberInputs: 0;
        readonly types: Readonly<{
            Uint8: 23000;
            Uint16: 23000;
            Uint32: 24000;
            Uint64: 24000;
            Uint128: 25000;
            Uint256: 30000;
        }>;
    };
};
export declare function getHCU(opName: HCUOperatorName, type: FheTypeName, opts?: {
    scalar: boolean;
}): number;
//# sourceMappingURL=HCUByOperator.d.ts.map