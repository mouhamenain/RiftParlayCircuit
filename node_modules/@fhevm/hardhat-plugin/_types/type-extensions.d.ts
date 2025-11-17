import { HardhatFhevmRuntimeEnvironment } from "./types";
declare module "hardhat/types/runtime" {
    interface HardhatRuntimeEnvironment {
        fhevm: HardhatFhevmRuntimeEnvironment;
    }
}
//# sourceMappingURL=type-extensions.d.ts.map