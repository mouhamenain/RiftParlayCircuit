"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCoprocessorEventName = isCoprocessorEventName;
function isCoprocessorEventName(value) {
    return (value === "VerifyInput" ||
        value === "TrivialEncrypt" ||
        value === "FheAdd" ||
        value === "FheSub" ||
        value === "FheMul" ||
        value === "FheDiv" ||
        value === "FheRem" ||
        value === "FheBitAnd" ||
        value === "FheBitOr" ||
        value === "FheBitXor" ||
        value === "FheShl" ||
        value === "FheShr" ||
        value === "FheRotl" ||
        value === "FheRotr" ||
        value === "FheEq" ||
        value === "FheNe" ||
        value === "FheGe" ||
        value === "FheGt" ||
        value === "FheLe" ||
        value === "FheLt" ||
        value === "FheMin" ||
        value === "FheMax" ||
        value === "FheRand" ||
        value === "FheRandBounded" ||
        value === "FheNot" ||
        value === "FheNeg" ||
        value === "Cast" ||
        value === "FheIfThenElse");
}
//# sourceMappingURL=CoprocessorEvents.js.map