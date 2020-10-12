import { ContentConst } from '../../../../../../Shared/scripts/Interfaces/InjectConst';
import { ScRibbonCommand } from '../../../../../../Shared/scripts/Enums/eScRibbonCommand';
import { IRibbonClickSequence } from '../../../../InternalInterfaces/IRibbonClickSequence';

export class AllRibbonCommands {
    public static Const: IRibbonClickSequence[] = [
        {
            ScRibbonCommand: ScRibbonCommand.PresentationDetails,
            Step1Selector: ContentConst.Const.Selector.SC.ScRibbon.Presentation.Id,
            Step2Selector: ContentConst.Const.Selector.SC.ScRibbon.Presentation.Details
        }
    ];
}
