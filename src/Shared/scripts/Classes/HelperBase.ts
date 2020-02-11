import { BaseDebug } from "./debug";
export class HelperBase {
    protected Debug: BaseDebug;
    constructor(debug: BaseDebug) {
        this.Debug = debug;
    }
}
