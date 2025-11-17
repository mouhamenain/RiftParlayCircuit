import { ethers as EthersT } from "ethers";
import type { EIP712Domain, EthersEIP712 } from "../../ethers/eip712.js";
import { FhevmHostContractWrapper } from "./FhevmContractWrapper.js";
export type InputVerifierProperties = {
    signersAddresses?: `0x${string}`[];
    signers?: EthersT.Signer[];
    threshold?: number;
    eip712Domain?: EIP712Domain;
};
export declare class InputVerifier extends FhevmHostContractWrapper {
    #private;
    constructor();
    static create(runner: EthersT.ContractRunner, inputVerifierContractAddress: `0x${string}`, abi?: EthersT.Interface | EthersT.InterfaceAbi, properties?: InputVerifierProperties): Promise<InputVerifier>;
    get inputVerifierProperties(): InputVerifierProperties;
    get readonlyContract(): EthersT.Contract;
    get interface(): EthersT.Interface;
    private _initialize;
    private _reorderCoprocessorSigners;
    get address(): `0x${string}`;
    get gatewayChainId(): bigint;
    get gatewayInputVerificationAddress(): `0x${string}`;
    get eip712Domain(): EIP712Domain;
    getCoprocessorSignersAddresses(): `0x${string}`[];
    getCoprocessorSigners(): EthersT.Signer[] | undefined;
    getThreshold(): number;
    assertMatchCoprocessorSigners(signers: EthersT.Signer[]): Promise<void>;
    verifySignatures(handlesBytes32List: EthersT.BytesLike[], userAddress: string, contractAddress: string, contractChainId: number, extraData: string, signatures: string[]): void;
    createCiphertextVerificationEIP712(handlesBytes32List: EthersT.BigNumberish[], contractChainId: number, contractAddress: string, userAddress: string, extraData: string): EthersEIP712;
}
export declare function computeInputProofHex(handlesBytes32Hex: string[], coprocessorsSignaturesHex: string[], extraData: string): string;
//# sourceMappingURL=InputVerifier.d.ts.map