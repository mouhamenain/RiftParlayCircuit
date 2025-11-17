"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FhevmHostContractWrapper = exports.FhevmContractWrapper = exports.FhevmContractsRepository = exports.KMSVerifier = exports.InputVerifier = exports.FHEVMExecutor = exports.HCULimit = exports.ACL = void 0;
exports.getContractsABIVersions = getContractsABIVersions;
const ACL_js_1 = require("./ACL.js");
Object.defineProperty(exports, "ACL", { enumerable: true, get: function () { return ACL_js_1.ACL; } });
const FHEVMExecutor_js_1 = require("./FHEVMExecutor.js");
Object.defineProperty(exports, "FHEVMExecutor", { enumerable: true, get: function () { return FHEVMExecutor_js_1.FHEVMExecutor; } });
const FhevmContractWrapper_js_1 = require("./FhevmContractWrapper.js");
Object.defineProperty(exports, "FhevmContractWrapper", { enumerable: true, get: function () { return FhevmContractWrapper_js_1.FhevmContractWrapper; } });
Object.defineProperty(exports, "FhevmHostContractWrapper", { enumerable: true, get: function () { return FhevmContractWrapper_js_1.FhevmHostContractWrapper; } });
const FhevmContractsRepository_js_1 = require("./FhevmContractsRepository.js");
Object.defineProperty(exports, "FhevmContractsRepository", { enumerable: true, get: function () { return FhevmContractsRepository_js_1.FhevmContractsRepository; } });
const HCULimit_js_1 = require("./HCULimit.js");
Object.defineProperty(exports, "HCULimit", { enumerable: true, get: function () { return HCULimit_js_1.HCULimit; } });
const InputVerifier_js_1 = require("./InputVerifier.js");
Object.defineProperty(exports, "InputVerifier", { enumerable: true, get: function () { return InputVerifier_js_1.InputVerifier; } });
const KMSVerifier_js_1 = require("./KMSVerifier.js");
Object.defineProperty(exports, "KMSVerifier", { enumerable: true, get: function () { return KMSVerifier_js_1.KMSVerifier; } });
const ACL_itf_js_1 = require("./interfaces/ACL.itf.js");
const FHEVMExecutor_itf_js_1 = require("./interfaces/FHEVMExecutor.itf.js");
const HCULimit_itf_js_1 = require("./interfaces/HCULimit.itf.js");
const InputVerifier_itf_js_1 = require("./interfaces/InputVerifier.itf.js");
const KMSVerifier_itf_js_1 = require("./interfaces/KMSVerifier.itf.js");
function getContractsABIVersions() {
    return {
        ACL: ACL_itf_js_1.ACLInterfaceVersion,
        FHEVMExecutor: FHEVMExecutor_itf_js_1.FHEVMExecutorInterfaceVersion,
        InputVerifier: InputVerifier_itf_js_1.InputVerifierInterfaceVersion,
        KMSVerifier: KMSVerifier_itf_js_1.KMSVerifierInterfaceVersion,
        HCULimit: HCULimit_itf_js_1.HCULimitInterfaceVersion,
    };
}
//# sourceMappingURL=index.js.map