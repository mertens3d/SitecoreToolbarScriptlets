import { APICommandFlag } from "../../../Shared/scripts/Enums/APICommand";

export interface IRibbonClickSequence {
    ScRibbonCommand: APICommandFlag;
    Step1Selector: string;
    Step2Selector: string;
}
