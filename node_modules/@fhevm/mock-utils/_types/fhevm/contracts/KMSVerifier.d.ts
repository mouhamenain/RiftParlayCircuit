import { ethers as EthersT } from "ethers";
import type { EIP712Domain, EthersEIP712 } from "../../ethers/eip712.js";
import type { ClearValues } from "../../relayer-sdk/types.js";
import { FhevmHostContractWrapper } from "./FhevmContractWrapper.js";
export type KMSVerifierProperties = {
    signersAddresses?: `0x${string}`[];
    signers?: EthersT.Signer[];
    threshold?: number;
    eip712Domain?: EIP712Domain;
};
export declare class KMSVerifier extends FhevmHostContractWrapper {
    #private;
    constructor();
    static create(runner: EthersT.ContractRunner, kmsVerifierContractAddress: `0x${string}`, abi?: EthersT.Interface | EthersT.InterfaceAbi, properties?: KMSVerifierProperties): Promise<KMSVerifier>;
    get kmsVerifierProperties(): KMSVerifierProperties;
    get readonlyContract(): EthersT.Contract;
    get interface(): EthersT.Interface;
    private _initialize;
    private _reorderKmsSigners;
    get address(): `0x${string}`;
    get gatewayChainId(): bigint;
    get gatewayDecryptionAddress(): `0x${string}`;
    get eip712Domain(): EIP712Domain;
    getKmsSignersAddresses(): `0x${string}`[];
    getKmsSigners(): EthersT.Signer[] | undefined;
    assertMatchKmsSigners(signers: EthersT.Signer[]): Promise<void>;
    getThreshold(): number;
    createPublicDecryptVerificationEIP712(handlesBytes32List: EthersT.BigNumberish[], decryptedResult: string, extraData: string): EthersEIP712;
    static abiEncodeClearValues(clearValues: ClearValues): {
        abiTypes: string[];
        abiValues: (string | bigint)[];
        abiEncodedClearValues: `0x${string}`;
    };
    static buildDecryptionProof(kmsSignatures: `0x${string}`[], extraData: `0x${string}`): `0x${string}`;
    computeDecryptionSignatures(handlesBytes32Hex: string[], clearTextValues: (string | bigint | boolean)[], extraData: string): Promise<{
        signatures: string[];
        types: ReadonlyArray<string | EthersT.ParamType>;
        values: ReadonlyArray<any>;
        decryptionProof: `0x${string}`;
        abiEncodedClearResult: `0x${string}`;
    }>;
}
//# sourceMappingURL=KMSVerifier.d.ts.map