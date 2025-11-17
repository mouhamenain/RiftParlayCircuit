import { ethers as EthersT } from "ethers";
import type { FhevmContractName, FhevmHostContractName } from "./index.js";
export declare abstract class FhevmContractWrapper {
    #private;
    constructor(name: FhevmContractName);
    get name(): FhevmContractName;
    abstract get package(): string;
    abstract get address(): string;
    abstract get interface(): EthersT.Interface;
    abstract get readonlyContract(): EthersT.Contract;
    get properties(): {
        contractName: FhevmContractName;
        address: string;
        contract: EthersT.Contract;
        package: string;
    };
    protected _callOrThrow(p: Promise<any>, funcName: string): Promise<any>;
}
export declare abstract class FhevmHostContractWrapper extends FhevmContractWrapper {
    constructor(name: FhevmHostContractName);
    get package(): string;
}
//# sourceMappingURL=FhevmContractWrapper.d.ts.map