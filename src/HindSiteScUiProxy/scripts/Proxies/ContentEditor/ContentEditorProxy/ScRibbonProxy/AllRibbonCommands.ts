import { ContentConst } from '../../../../../../Shared/scripts/Interfaces/InjectConst';
import { APICommandFlag } from "../../../../../../Shared/scripts/Enums/APICommand";
import { IRibbonClickSequence } from '../../../../InternalInterfaces/IRibbonClickSequence';

export class AllRibbonCommands {
  public static Const: IRibbonClickSequence[] = [
    {
      ScRibbonCommand: APICommandFlag.PresentationDetails,
      Step1Selector: ContentConst.Const.Selector.SC.ScRibbon.Presentation.Id,
      Step2Selector: ContentConst.Const.Selector.SC.ScRibbon.Presentation.Details
    },
    {
      ScRibbonCommand: APICommandFlag.NavigateLinks,
      Step1Selector: ContentConst.Const.Selector.SC.ScRibbon.Navigate.Id,
      Step2Selector: ContentConst.Const.Selector.SC.ScRibbon.Navigate.Links
    },
    {
      ScRibbonCommand: APICommandFlag.ToggleRawValues,
      Step1Selector: ContentConst.Const.Selector.SC.ScRibbon.View.Id,
      Step2Selector: ContentConst.Const.Selector.SC.ScRibbon.View.RawValues
    },
    {
      ScRibbonCommand: APICommandFlag.NavigateBack,
      Step1Selector: ContentConst.Const.Selector.SC.ScRibbon.Navigate.Id,
      Step2Selector: ContentConst.Const.Selector.SC.ScRibbon.View.NavigateBack
    },
    {
      ScRibbonCommand: APICommandFlag.NavigateForward,
      Step1Selector: ContentConst.Const.Selector.SC.ScRibbon.Navigate.Id,
      Step2Selector: ContentConst.Const.Selector.SC.ScRibbon.View.NavigateForward
    },
    {
      ScRibbonCommand: APICommandFlag.NavigateUp,
      Step1Selector: ContentConst.Const.Selector.SC.ScRibbon.Navigate.Id,
      Step2Selector: ContentConst.Const.Selector.SC.ScRibbon.View.NavigateUp
    },

  ];
}