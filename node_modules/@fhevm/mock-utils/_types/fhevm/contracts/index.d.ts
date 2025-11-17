import { ACL } from "./ACL.js";
import { FHEVMExecutor } from "./FHEVMExecutor.js";
import { FhevmContractWrapper, FhevmHostContractWrapper } from "./FhevmContractWrapper.js";
import { FhevmContractsRepository } from "./FhevmContractsRepository.js";
import { HCULimit } from "./HCULimit.js";
import { InputVerifier } from "./InputVerifier.js";
import { KMSVerifier } from "./KMSVerifier.js";
export type FhevmHostContractName = "ACL" | "FHEVMExecutor" | "InputVerifier" | "KMSVerifier" | "HCULimit";
export type FhevmContractName = FhevmHostContractName;
export declare function getContractsABIVersions(): Record<FhevmContractName, string>;
export { ACL, HCULimit, FHEVMExecutor, InputVerifier, KMSVerifier, FhevmContractsRepository, FhevmContractWrapper, FhevmHostContractWrapper, };
//# sourceMappingURL=index.d.ts.map