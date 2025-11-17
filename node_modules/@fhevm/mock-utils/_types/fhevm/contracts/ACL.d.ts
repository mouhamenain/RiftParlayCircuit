import { ethers as EthersT } from "ethers";
import { FhevmHostContractWrapper } from "./FhevmContractWrapper.js";
export type ACLProperties = {
    fhevmExecutorAddress?: `0x${string}`;
    version?: string;
};
export declare class ACL extends FhevmHostContractWrapper {
    #private;
    constructor();
    static create(runner: EthersT.ContractRunner, aclContractAddress: string, abi?: EthersT.Interface | EthersT.InterfaceAbi, properties?: ACLProperties): Promise<ACL>;
    get readonlyContract(): EthersT.Contract;
    get interface(): EthersT.Interface;
    get address(): `0x${string}`;
    get version(): string;
    get fhevmExecutorAddress(): `0x${string}`;
    private _initialize;
    checkIsAllowedForDecryption(handlesBytes32Hex: string[], readonlyProvider: EthersT.Provider): Promise<void>;
}
//# sourceMappingURL=ACL.d.ts.map