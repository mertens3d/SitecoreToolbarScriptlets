import { _APICoreBase } from "../../../../../../Shared/scripts/_APICoreBase";
import { AllRibbonCommands } from "./AllRibbonCommands";
import { IRibbonClickSequence } from "../../../../InternalInterfaces/IRibbonClickSequence";
import { ScRibbonCommand } from "../../../../../../Shared/scripts/Enums/eScRibbonCommand";

export class RibbonMenuButtonResolver extends _APICoreBase {
    GetRibbonButtonSequence(scRibbonCommand: ScRibbonCommand): IRibbonClickSequence {
        let ribbonClickSequences: IRibbonClickSequence[] = AllRibbonCommands.Const;
        let toReturnRibbonClickSequence: IRibbonClickSequence = null;

        ribbonClickSequences.forEach((ribbonClickSequence: IRibbonClickSequence) => {
            if (ribbonClickSequence.ScRibbonCommand === scRibbonCommand) {
                toReturnRibbonClickSequence = ribbonClickSequence;
            }
        });

        if (!toReturnRibbonClickSequence) {
            toReturnRibbonClickSequence = {
                ScRibbonCommand: ScRibbonCommand.Unknown,
                Step1Selector: null,
                Step2Selector: null,
            };
        }

        return toReturnRibbonClickSequence;
    }
}
