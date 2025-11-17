import { ethers as EthersT } from "ethers";
import { FhevmHostContractWrapper } from "./FhevmContractWrapper.js";
export type HCULimitProperties = {
    fhemExecutorAddress?: `0x${string}`;
    version?: string;
};
export declare class HCULimit extends FhevmHostContractWrapper {
    #private;
    constructor();
    static create(runner: EthersT.ContractRunner, hcuLimitContractAddress: `0x${string}`, abi?: EthersT.Interface | EthersT.InterfaceAbi, properties?: HCULimitProperties): Promise<HCULimit>;
    get readonlyContract(): EthersT.Contract;
    get interface(): EthersT.Interface;
    get address(): string;
    get version(): string;
    get fhemExecutorAddress(): string;
    private _initialize;
}
//# sourceMappingURL=HCULimit.d.ts.map