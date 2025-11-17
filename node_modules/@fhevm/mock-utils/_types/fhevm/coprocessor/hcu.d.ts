import { ethers as EthersT } from "ethers";
export type FhevmTransactionHCUInfo = {
    transactionHash: `0x${string}`;
    globalHCU: number;
    maxHCUDepth: number;
    HCUDepthByHandle: Record<`0x${string}`, number>;
};
export declare function getTxHCUFromTxReceipt(coprocessorAddress: `0x${string}`, coprocessorContractInterface: EthersT.Interface, receipt: EthersT.TransactionReceipt): FhevmTransactionHCUInfo;
//# sourceMappingURL=hcu.d.ts.map