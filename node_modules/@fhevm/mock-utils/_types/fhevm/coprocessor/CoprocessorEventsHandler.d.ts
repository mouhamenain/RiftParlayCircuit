import type { FhevmDB } from "../db/FhevmDB.js";
import type { CoprocessorEvent } from "./CoprocessorEvents.js";
export declare class CoprocessorEventsHandler {
    #private;
    constructor(db: FhevmDB);
    get counterRand(): number;
    handleEvent(coprocessorEvent: CoprocessorEvent): Promise<void>;
    private executeCoprocessorEvent;
    private verifyInput;
    private parseUnaryOpEvent;
    private parseBinaryOpEvent;
}
//# sourceMappingURL=CoprocessorEventsHandler.d.ts.map