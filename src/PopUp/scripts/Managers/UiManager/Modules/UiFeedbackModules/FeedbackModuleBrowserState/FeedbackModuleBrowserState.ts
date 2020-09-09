import { StaticHelpers } from "../../../../../../../Shared/scripts/Classes/StaticHelpers";
import { ILoggerAgent } from "../../../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IUiModule } from "../../../../../../../Shared/scripts/Interfaces/Agents/IUiModule";
import { GenericUrlParts } from "../../../../../../../Shared/scripts/Interfaces/UrlParts";
import { UiFeedbackModuleBase } from "../UiFeedbackModuleBase/UiFeedbackModuleBase";
import { PopConst } from "../../../../../Classes/PopConst";
import { ScUrlAgent } from "../../../../../../../Shared/scripts/Agents/Agents/UrlAgent/ScUrlAgent";

export class FeedbackModuleBrowserState extends UiFeedbackModuleBase implements IUiModule {
  constructor(selector: string, loggerAgent: ILoggerAgent) {
    super(selector, loggerAgent)
  }
  Init(): void {
  }
  RefreshUi(): void {
  }
  PopulateFeedackBrowserState(scUrlAgent: ScUrlAgent) {
    var targetCurrStateDiv: HTMLDivElement = <HTMLDivElement>window.document.querySelector(PopConst.Const.Selector.HS.FeedbackBrowserState);

    var allStateText: string = 'Browser State' + this.lineBreak;
    allStateText += this.lineBreak + 'URL Parts';

    allStateText += this.indentedLineBreak + '<strong>Page Type:</strong> ' + StaticHelpers.ScWindowTypeFriendly(scUrlAgent.GetScWindowType());

    let UrlParts: GenericUrlParts = scUrlAgent.GetUrlParts();

    allStateText += this.indentedLineBreak + 'Url Full (raw  ): ' + UrlParts. OriginalRaw;

    allStateText += this.indentedLineBreak + 'Protocol: ' + UrlParts.Protocol;

    allStateText += this.indentedLineBreak + 'Host & Port: ' + UrlParts.HostAndPort;

    allStateText += this.indentedLineBreak + 'File Path: ' + UrlParts.FilePath;

    targetCurrStateDiv.innerHTML = allStateText;
  }
}