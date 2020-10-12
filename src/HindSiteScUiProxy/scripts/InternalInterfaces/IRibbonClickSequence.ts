import { ScRibbonCommand } from "../../../Shared/scripts/Enums/eScRibbonCommand";

export interface IRibbonClickSequence {
    ScRibbonCommand: ScRibbonCommand;
    Step1Selector: string;
    Step2Selector: string;
}
