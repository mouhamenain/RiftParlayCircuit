"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTxHCUFromTxReceipt = getTxHCUFromTxReceipt;
const event_js_1 = require("../../ethers/event.js");
const error_js_1 = require("../../utils/error.js");
const FheType_js_1 = require("../FheType.js");
const FhevmHandle_js_1 = require("../FhevmHandle.js");
const HCUByOperator_js_1 = require("./HCUByOperator.js");
function _getTypeOperatorHCU(op, typeName) {
    if (!(typeName in op.types && op.types[typeName])) {
        return 0;
    }
    return op.types[typeName];
}
function _getOperatorHCU(op, scalar, typeName) {
    (0, error_js_1.assertFhevm)(op.supportScalar);
    const prices = scalar ? op.scalar : op.nonScalar;
    if (!(typeName in prices && prices[typeName])) {
        return 0;
    }
    return prices[typeName];
}
function _getScalarOperatorHCU(op, typeName) {
    if (!(typeName in op.scalar && op.scalar[typeName])) {
        return 0;
    }
    return op.scalar[typeName];
}
function _filterOperatorsHCUsLogs(coprocessorAddress, coprocessorContractInterface, logs) {
    const res = [];
    for (let i = 0; i < logs.length; ++i) {
        const log = logs[i];
        if (log.address.toLowerCase() !== coprocessorAddress.toLowerCase()) {
            continue;
        }
        try {
            const parsedLog = coprocessorContractInterface.parseLog({
                topics: log.topics,
                data: log.data,
            });
            if (!parsedLog || !(parsedLog.name in HCUByOperator_js_1.HCUByOperator)) {
                continue;
            }
            const eventName = parsedLog.name;
            const opPrices = HCUByOperator_js_1.HCUByOperator[eventName];
            if (opPrices == null || typeof opPrices !== "object") {
                continue;
            }
            res.push({
                name: eventName,
                args: parsedLog.args,
            });
        }
        catch {
        }
    }
    return res;
}
function getTxHCUFromTxReceipt(coprocessorAddress, coprocessorContractInterface, receipt) {
    if (receipt.status === 0) {
        throw new error_js_1.FhevmError("Transaction reverted");
    }
    function readFromHCUMap(handle) {
        if (hcuMap[handle] === undefined) {
            return 0;
        }
        return hcuMap[handle];
    }
    let hcuMap = {};
    let handleSet = new Set();
    const FHELogs = _filterOperatorsHCUsLogs(coprocessorAddress, coprocessorContractInterface, receipt.logs);
    let totalHCUConsumed = 0;
    for (const event of FHELogs) {
        let hcuConsumed;
        switch (event.name) {
            case "TrivialEncrypt": {
                const toFheType = event.args[2];
                const resultBytes32 = event.args[3];
                (0, event_js_1.assertEventArgIsBigUint256)(toFheType, "TrivialEncrypt", 2);
                (0, event_js_1.assertEventArgIsBytes32String)(resultBytes32, "TrivialEncrypt", 3);
                const toFheTypeName = (0, FheType_js_1.getFheTypeName)(toFheType);
                hcuConsumed = _getTypeOperatorHCU(HCUByOperator_js_1.HCUByOperator[event.name], toFheTypeName);
                totalHCUConsumed += hcuConsumed;
                hcuMap[resultBytes32] = hcuConsumed;
                handleSet.add(resultBytes32);
                break;
            }
            case "Cast": {
                const ctBytes32 = event.args[1];
                const toTypeUint8 = event.args[2];
                const resultBytes32 = event.args[3];
                (0, event_js_1.assertEventArgIsBytes32String)(ctBytes32, event.name, 1);
                (0, event_js_1.assertEventArgIsBigUint8)(toTypeUint8, event.name, 2);
                (0, event_js_1.assertEventArgIsBytes32String)(resultBytes32, event.name, 3);
                const ctFhevmHandle = FhevmHandle_js_1.FhevmHandle.fromBytes32Hex(ctBytes32);
                const ctFheTypeName = ctFhevmHandle.fheTypeInfo.type;
                hcuConsumed = _getTypeOperatorHCU(HCUByOperator_js_1.HCUByOperator[event.name], ctFheTypeName);
                totalHCUConsumed += hcuConsumed;
                hcuMap[resultBytes32] = hcuConsumed + readFromHCUMap(ctBytes32);
                handleSet.add(resultBytes32);
                break;
            }
            case "FheAdd":
            case "FheSub":
            case "FheMul":
            case "FheBitAnd":
            case "FheBitOr":
            case "FheBitXor":
            case "FheShl":
            case "FheShr":
            case "FheRotl":
            case "FheRotr":
            case "FheMax":
            case "FheMin": {
                const lhsBytes32 = event.args[1];
                const rhsBytes32 = event.args[2];
                const scalarBytes1 = event.args[3];
                const resultBytes32 = event.args[4];
                (0, event_js_1.assertEventArgIsBytes32String)(lhsBytes32, event.name, 1);
                (0, event_js_1.assertEventArgIsBytes32String)(rhsBytes32, event.name, 2);
                (0, event_js_1.assertEventArgIsBytes1String)(scalarBytes1, event.name, 3);
                (0, event_js_1.assertEventArgIsBytes32String)(resultBytes32, event.name, 4);
                const scalar = scalarBytes1 === "0x01";
                const resultFhevmHandle = FhevmHandle_js_1.FhevmHandle.fromBytes32Hex(resultBytes32);
                const resultFheTypeName = resultFhevmHandle.fheTypeInfo.type;
                hcuConsumed = _getOperatorHCU(HCUByOperator_js_1.HCUByOperator[event.name], scalar, resultFheTypeName);
                totalHCUConsumed += hcuConsumed;
                hcuMap[resultBytes32] =
                    hcuConsumed + Math.max(readFromHCUMap(lhsBytes32), scalar ? 0 : readFromHCUMap(rhsBytes32));
                handleSet.add(resultBytes32);
                break;
            }
            case "FheEq":
            case "FheNe":
            case "FheGe":
            case "FheGt":
            case "FheLe":
            case "FheLt": {
                const lhsBytes32 = event.args[1];
                const rhsBytes32 = event.args[2];
                const scalarBytes1 = event.args[3];
                const resultBytes32 = event.args[4];
                (0, event_js_1.assertEventArgIsBytes32String)(lhsBytes32, event.name, 1);
                (0, event_js_1.assertEventArgIsBytes32String)(rhsBytes32, event.name, 2);
                (0, event_js_1.assertEventArgIsBytes1String)(scalarBytes1, event.name, 3);
                (0, event_js_1.assertEventArgIsBytes32String)(resultBytes32, event.name, 4);
                const scalar = scalarBytes1 === "0x01";
                const lhsFhevmHandle = FhevmHandle_js_1.FhevmHandle.fromBytes32Hex(lhsBytes32);
                const lhsFheTypeName = lhsFhevmHandle.fheTypeInfo.type;
                hcuConsumed = _getOperatorHCU(HCUByOperator_js_1.HCUByOperator[event.name], scalar, lhsFheTypeName);
                totalHCUConsumed += hcuConsumed;
                hcuMap[resultBytes32] =
                    hcuConsumed + Math.max(readFromHCUMap(lhsBytes32), scalar ? 0 : readFromHCUMap(rhsBytes32));
                handleSet.add(resultBytes32);
                break;
            }
            case "FheDiv":
            case "FheRem": {
                const lhsBytes32 = event.args[1];
                const rhsBytes32 = event.args[2];
                const scalarBytes1 = event.args[3];
                const resultBytes32 = event.args[4];
                (0, event_js_1.assertEventArgIsBytes32String)(lhsBytes32, event.name, 1);
                (0, event_js_1.assertEventArgIsBytes32String)(rhsBytes32, event.name, 2);
                (0, event_js_1.assertEventArgIsBytes1String)(scalarBytes1, event.name, 3);
                (0, event_js_1.assertEventArgIsBytes32String)(resultBytes32, event.name, 4);
                const scalar = scalarBytes1 === "0x01";
                if (!scalar) {
                    throw new error_js_1.FhevmError(`Non-scalar ${event.name} not implemented yet`);
                }
                const resultFhevmHandle = FhevmHandle_js_1.FhevmHandle.fromBytes32Hex(resultBytes32);
                const resultFheTypeName = resultFhevmHandle.fheTypeInfo.type;
                hcuConsumed = _getScalarOperatorHCU(HCUByOperator_js_1.HCUByOperator[event.name], resultFheTypeName);
                totalHCUConsumed += hcuConsumed;
                hcuMap[resultBytes32] = hcuConsumed + readFromHCUMap(lhsBytes32);
                handleSet.add(resultBytes32);
                break;
            }
            case "FheNot":
            case "FheNeg": {
                const ctBytes32 = event.args[1];
                const resultBytes32 = event.args[2];
                (0, event_js_1.assertEventArgIsBytes32String)(ctBytes32, event.name, 1);
                (0, event_js_1.assertEventArgIsBytes32String)(resultBytes32, event.name, 2);
                const ctFhevmHandle = FhevmHandle_js_1.FhevmHandle.fromBytes32Hex(ctBytes32);
                const ctFheTypeName = ctFhevmHandle.fheTypeInfo.type;
                hcuConsumed = _getTypeOperatorHCU(HCUByOperator_js_1.HCUByOperator[event.name], ctFheTypeName);
                totalHCUConsumed += hcuConsumed;
                hcuMap[resultBytes32] = hcuConsumed + readFromHCUMap(ctBytes32);
                handleSet.add(resultBytes32);
                break;
            }
            case "FheIfThenElse": {
                const controlBytes32 = event.args[1];
                const ifTrueBytes32 = event.args[2];
                const ifFalseBytes32 = event.args[3];
                const resultBytes32 = event.args[4];
                (0, event_js_1.assertEventArgIsBytes32String)(controlBytes32, event.name, 1);
                (0, event_js_1.assertEventArgIsBytes32String)(ifTrueBytes32, event.name, 2);
                (0, event_js_1.assertEventArgIsBytes32String)(ifFalseBytes32, event.name, 3);
                (0, event_js_1.assertEventArgIsBytes32String)(resultBytes32, event.name, 4);
                const resultFhevmHandle = FhevmHandle_js_1.FhevmHandle.fromBytes32Hex(resultBytes32);
                const resultFheTypeName = resultFhevmHandle.fheTypeInfo.type;
                hcuConsumed = _getTypeOperatorHCU(HCUByOperator_js_1.HCUByOperator[event.name], resultFheTypeName);
                totalHCUConsumed += hcuConsumed;
                hcuMap[resultBytes32] =
                    hcuConsumed +
                        Math.max(readFromHCUMap(controlBytes32), readFromHCUMap(ifTrueBytes32), readFromHCUMap(ifFalseBytes32));
                handleSet.add(resultBytes32);
                break;
            }
            case "FheRand": {
                const randTypeUint8 = event.args[1];
                const seedBytes16 = event.args[2];
                const resultBytes32 = event.args[3];
                (0, event_js_1.assertEventArgIsBigUint8)(randTypeUint8, event.name, 1);
                (0, event_js_1.assertEventArgIsBytes16String)(seedBytes16, event.name, 2);
                (0, event_js_1.assertEventArgIsBytes32String)(resultBytes32, event.name, 3);
                const randTypeFheTypeName = (0, FheType_js_1.getFheTypeName)(randTypeUint8);
                hcuConsumed = _getTypeOperatorHCU(HCUByOperator_js_1.HCUByOperator[event.name], randTypeFheTypeName);
                totalHCUConsumed += hcuConsumed;
                hcuMap[resultBytes32] = hcuConsumed;
                handleSet.add(resultBytes32);
                break;
            }
            case "FheRandBounded": {
                const upperBoundUint256 = event.args[1];
                const randTypeUint8 = event.args[2];
                const seedBytes16 = event.args[3];
                const resultBytes32 = event.args[4];
                (0, event_js_1.assertEventArgIsBigUint256)(upperBoundUint256, event.name, 1);
                (0, event_js_1.assertEventArgIsBigUint8)(randTypeUint8, event.name, 2);
                (0, event_js_1.assertEventArgIsBytes16String)(seedBytes16, event.name, 3);
                (0, event_js_1.assertEventArgIsBytes32String)(resultBytes32, event.name, 4);
                const resultFhevmHandle = FhevmHandle_js_1.FhevmHandle.fromBytes32Hex(resultBytes32);
                const resultFheTypeName = resultFhevmHandle.fheTypeInfo.type;
                hcuConsumed = _getTypeOperatorHCU(HCUByOperator_js_1.HCUByOperator[event.name], resultFheTypeName);
                totalHCUConsumed += hcuConsumed;
                hcuMap[resultBytes32] = hcuConsumed;
                handleSet.add(resultBytes32);
                break;
            }
        }
    }
    let maxDepthHCU = 0;
    handleSet.forEach((handle) => {
        const hcu = hcuMap[handle];
        if (hcu > maxDepthHCU) {
            maxDepthHCU = hcu;
        }
    });
    return {
        transactionHash: receipt.hash,
        globalHCU: totalHCUConsumed,
        maxHCUDepth: maxDepthHCU,
        HCUDepthByHandle: hcuMap,
    };
}
//# sourceMappingURL=hcu.js.map