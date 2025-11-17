import { FhevmMockProvider } from "@fhevm/mock-utils";
import { FhevmEnvironmentPaths } from "../FhevmEnvironmentPaths";
import { PrecompiledHostContractsAddresses } from "../types";
export declare function getPrecompiledFhevmHostContractsAddresses(mockProvider: FhevmMockProvider, fhevmPaths: FhevmEnvironmentPaths): Promise<PrecompiledHostContractsAddresses>;
export declare function retrievePreCompiledFHEVMExecutorAddressFromACLArtifact(mockProvider: FhevmMockProvider, fhevmPaths: FhevmEnvironmentPaths): Promise<`0x${string}`>;
export declare function loadPrecompiledFhevmHostContractsAddresses(mockProvider: FhevmMockProvider, fhevmPaths: FhevmEnvironmentPaths, ignoreCache: boolean, isRunningInHHFHEVMInstallSolidity: boolean): Promise<PrecompiledHostContractsAddresses>;
//# sourceMappingURL=PrecompiledFhevmHostContracts.d.ts.map