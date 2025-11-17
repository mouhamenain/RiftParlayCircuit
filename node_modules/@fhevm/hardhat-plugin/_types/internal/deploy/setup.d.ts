import { FhevmMockProvider, contracts } from "@fhevm/mock-utils";
import type { FhevmEnvironmentAddresses, FhevmSigners } from "../FhevmEnvironment";
import { FhevmEnvironmentPaths } from "../FhevmEnvironmentPaths";
export declare function setupMockUsingHostContractsArtifacts(mockProvider: FhevmMockProvider, fhevmAddresses: FhevmEnvironmentAddresses, fhevmSigners: FhevmSigners, fhevmPaths: FhevmEnvironmentPaths): Promise<{
    contracts: contracts.FhevmContractsRepository;
    gatewayChainId: number;
    gatewayInputVerificationAddress: string;
    gatewayDecryptionAddress: string;
}>;
//# sourceMappingURL=setup.d.ts.map