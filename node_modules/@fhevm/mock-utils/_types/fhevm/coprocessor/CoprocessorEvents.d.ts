export type CoprocessorOperatorEventName = "TrivialEncrypt" | "FheAdd" | "FheSub" | "FheMul" | "FheDiv" | "FheRem" | "FheBitAnd" | "FheBitOr" | "FheBitXor" | "FheShl" | "FheShr" | "FheRotl" | "FheRotr" | "FheEq" | "FheNe" | "FheGe" | "FheGt" | "FheLe" | "FheLt" | "FheMin" | "FheMax" | "FheRand" | "FheRandBounded" | "FheNot" | "FheNeg" | "Cast" | "FheIfThenElse";
export type CoprocessorEventName = CoprocessorOperatorEventName | "VerifyInput";
/**
 * Coprocessor Solidity event emitted by a
 * [`FHEVMExecutor.sol`](https://github.com/zama-ai/fhevm-backend/blob/main/contracts/contracts/FHEVMExecutor.sol)
 * contract from `@fhevm/host-contracts`.
 */
export type CoprocessorEvent = {
    eventName: CoprocessorEventName;
    args: object;
    index: number;
    blockNumber: number;
    transactionHash: string;
    transactionIndex: number;
};
export declare function isCoprocessorEventName(value: unknown): value is CoprocessorEventName;
//# sourceMappingURL=CoprocessorEvents.d.ts.map