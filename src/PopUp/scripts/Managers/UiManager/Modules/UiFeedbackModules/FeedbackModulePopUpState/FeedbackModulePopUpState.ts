import { ILoggerAgent } from "../../../../../../../Shared/scripts/Interfaces/Agents/ILoggerBase";
import { IUiModule } from "../../../../../../../Shared/scripts/Interfaces/Agents/IUiModule";
import { UiFeedbackModuleBase } from "../UiFeedbackModuleBase/UiFeedbackModuleBase";
import { GuidData } from "../../../../../../../Shared/scripts/Helpers/GuidData";
import { Guid } from "../../../../../../../Shared/scripts/Helpers/Guid";

export class FeedbackModulePopUpState extends UiFeedbackModuleBase implements IUiModule {
  
  constructor(selector: string, loggerAgent: ILoggerAgent) {
    super(selector, loggerAgent);
  }

  Init(): void {
  }
  RefreshUi(): void {
  }

  PopulatePopUpStateUI(selectSnapShot: GuidData) {
    var allStateText: string = 'Pop Up State:' + this.lineBreak;// + 'PopUp State as of: ' + this.AllAgents.HelperAgent.UtilityHelp.MakeFriendlyDate(new Date());
    allStateText += 'Select Snapshot: ' + Guid.AsShort( selectSnapShot);

    this.AddHtmlString(allStateText);
  }
}