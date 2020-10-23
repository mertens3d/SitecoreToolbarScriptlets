import { _APICoreBase } from "../../../../../../Shared/scripts/_APICoreBase";
import { AllRibbonCommands } from "./AllRibbonCommands";
import { IRibbonClickSequence } from "../../../../InternalInterfaces/IRibbonClickSequence";
import { APICommandFlag } from "../../../../../../Shared/scripts/Enums/APICommand";

export class RibbonMenuButtonResolver extends _APICoreBase {
    GetRibbonButtonSequence(scRibbonCommand: APICommandFlag): IRibbonClickSequence {
        let ribbonClickSequences: IRibbonClickSequence[] = AllRibbonCommands.Const;
        let toReturnRibbonClickSequence: IRibbonClickSequence = null;

        ribbonClickSequences.forEach((ribbonClickSequence: IRibbonClickSequence) => {
            if (ribbonClickSequence.ScRibbonCommand === scRibbonCommand) {
                toReturnRibbonClickSequence = ribbonClickSequence;
            }
        });

        if (!toReturnRibbonClickSequence) {
            toReturnRibbonClickSequence = {
                ScRibbonCommand: APICommandFlag.Unknown,
                Step1Selector: null,
                Step2Selector: null,
            };
        }

        return toReturnRibbonClickSequence;
    }
}
