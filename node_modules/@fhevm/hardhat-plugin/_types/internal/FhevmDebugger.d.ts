import { FhevmHandleCoder, type FhevmTypeEuint } from "@fhevm/mock-utils";
import { ethers as EthersT } from "ethers";
import type { HardhatFhevmRuntimeDebugger } from "../types";
import type { FhevmEnvironment } from "./FhevmEnvironment";
export declare class FhevmDebugger implements HardhatFhevmRuntimeDebugger {
    #private;
    constructor(fhevmEnv: FhevmEnvironment);
    /**
     * TODO: Should be modified. We want a function that returns the list of callback arguments
     */
    createDecryptionSignatures(handlesBytes32Hex: string[], clearTextValues: (bigint | string | boolean)[]): Promise<string[]>;
    createHandleCoder(): FhevmHandleCoder;
    decryptEbool(handleBytes32: EthersT.BigNumberish): Promise<boolean>;
    decryptEuint(fhevmType: FhevmTypeEuint, handleBytes32: EthersT.BigNumberish): Promise<bigint>;
    decryptEaddress(handleBytes32: EthersT.BigNumberish): Promise<`0x${string}`>;
}
//# sourceMappingURL=FhevmDebugger.d.ts.map