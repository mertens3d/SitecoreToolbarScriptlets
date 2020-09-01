import { ILoggerAgent } from "../../../../../../../Shared/scripts/Interfaces/Agents/ILoggerBase";
import { IUiModule } from "../../../../../../../Shared/scripts/Interfaces/Agents/IUiModule";
import { UiFeedbackModuleBase } from "../UiFeedbackModuleBase/UiFeedbackModuleBase";
import { Guid } from "../../../../../../../Shared/scripts/Helpers/Guid";

export class FeedbackModulePopUpState extends UiFeedbackModuleBase implements IUiModule {
  
  constructor(selector: string, loggerAgent: ILoggerAgent) {
    super(selector, loggerAgent);
  }

  Init(): void {
  }
  RefreshUi(): void {
  }

  PopulatePopUpStateUI(selectSnapShot: Guid) {
    var allStateText: string = 'Pop Up State:' + this.lineBreak;// + 'PopUp State as of: ' + this.AllAgents.HelperAgent.UtilityHelp.MakeFriendlyDate(new Date());
    allStateText += 'Select Snapshot: ' + selectSnapShot.AsShort();

    this.AddHtmlString(allStateText);
  }
}