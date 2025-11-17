import { ethers as EthersT } from "ethers";
import { type FhevmTransactionHCUInfo } from "../coprocessor/hcu.js";
import { FhevmHostContractWrapper } from "./FhevmContractWrapper.js";
export type FHEVMExecutorProperties = {
    aclAddress?: `0x${string}`;
    hcuLimitAddress?: `0x${string}`;
    inputVerifierAddress?: `0x${string}`;
    version?: string;
};
export declare class FHEVMExecutor extends FhevmHostContractWrapper {
    #private;
    constructor();
    static create(runner: EthersT.ContractRunner, fhevmExecutorContractAddress: `0x${string}`, abi?: EthersT.Interface | EthersT.InterfaceAbi, properties?: FHEVMExecutorProperties): Promise<FHEVMExecutor>;
    get readonlyContract(): EthersT.Contract;
    get interface(): EthersT.Interface;
    get address(): `0x${string}`;
    get version(): string;
    get aclAddress(): `0x${string}`;
    get hcuLimitAddress(): `0x${string}`;
    get inputVerifierAddress(): `0x${string}`;
    private _initialize;
    computeTransactionHCU(transactionReceipt: EthersT.TransactionReceipt): FhevmTransactionHCUInfo;
}
//# sourceMappingURL=FHEVMExecutor.d.ts.map