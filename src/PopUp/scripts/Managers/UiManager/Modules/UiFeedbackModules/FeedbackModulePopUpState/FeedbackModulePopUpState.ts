import { UiFeedbackModuleBase } from "../UiFeedbackModuleBase/UiFeedbackModuleBase";
import { ILoggerAgent } from "../../../../../../../Shared/scripts/Interfaces/Agents/ILoggerBase";
import { IUiModule } from "../../../../../../../Shared/scripts/Interfaces/Agents/IUiModule";
import { IContentState } from "../../../../../../../Shared/scripts/Interfaces/IContentState/IContentState";
import { IMenuState } from "../../../../../../../Shared/scripts/Interfaces/IMenuState";
import { UrlParts } from "../../../../../../../Shared/scripts/Interfaces/UrlParts";

export class FeedbackModulePopUpState extends UiFeedbackModuleBase implements IUiModule {
  lineBreak: string;
  constructor(selector: string, loggerAgent: ILoggerAgent) {
    super(selector, loggerAgent);
  }
  Init(): void {
  }
  RefreshUi(): void {
  }

  PopulatePopUpStateUI(contentState: IContentState, currentMenuState: IMenuState, urlParts: UrlParts) {

    var allStateText: string = this.lineBreak;// + 'PopUp State as of: ' + this.AllAgents.HelperAgent.UtilityHelp.MakeFriendlyDate(new Date());



    this.AddHtmlString(allStateText);
  }
}