import { ContentConst } from '../../../../../../Shared/scripts/Interfaces/InjectConst';
import { ScRibbonCommand } from '../../../../../../Shared/scripts/Enums/eScRibbonCommand';
import { IRibbonClickSequence } from '../../../../InternalInterfaces/IRibbonClickSequence';

export class AllRibbonCommands {
  public static Const: IRibbonClickSequence[] = [
    {
      ScRibbonCommand: ScRibbonCommand.PresentationDetails,
      Step1Selector: ContentConst.Const.Selector.SC.ScRibbon.Presentation.Id,
      Step2Selector: ContentConst.Const.Selector.SC.ScRibbon.Presentation.Details
    },
    {
      ScRibbonCommand: ScRibbonCommand.NavigateLinks,
      Step1Selector: ContentConst.Const.Selector.SC.ScRibbon.Navigate.Id,
      Step2Selector: ContentConst.Const.Selector.SC.ScRibbon.Navigate.Links
    },
    {
      ScRibbonCommand: ScRibbonCommand.ToggleRawValues,
      Step1Selector: ContentConst.Const.Selector.SC.ScRibbon.View.Id,
      Step2Selector: ContentConst.Const.Selector.SC.ScRibbon.View.RawValues
    },
    {
      ScRibbonCommand: ScRibbonCommand.NavigateBack,
      Step1Selector: ContentConst.Const.Selector.SC.ScRibbon.Navigate.Id,
      Step2Selector: ContentConst.Const.Selector.SC.ScRibbon.View.NavigateBack
    },
    {
      ScRibbonCommand: ScRibbonCommand.NavigateForward,
      Step1Selector: ContentConst.Const.Selector.SC.ScRibbon.Navigate.Id,
      Step2Selector: ContentConst.Const.Selector.SC.ScRibbon.View.NavigateForward
    },
    {
      ScRibbonCommand: ScRibbonCommand.NavigateUp,
      Step1Selector: ContentConst.Const.Selector.SC.ScRibbon.Navigate.Id,
      Step2Selector: ContentConst.Const.Selector.SC.ScRibbon.View.NavigateUp
    },

  ];
}