import { StaticHelpers } from "../../../../../../../Shared/scripts/Classes/StaticHelpers";
import { ILoggerAgent } from "../../../../../../../Shared/scripts/Interfaces/Agents/ILoggerBase";
import { IUiModule } from "../../../../../../../Shared/scripts/Interfaces/Agents/IUiModule";
import { GenericUrlParts } from "../../../../../../../Shared/scripts/Interfaces/UrlParts";
import { UiFeedbackModuleBase } from "../UiFeedbackModuleBase/UiFeedbackModuleBase";
import { PopConst } from "../../../../../Classes/PopConst";

export class FeedbackModuleBrowserState extends UiFeedbackModuleBase implements IUiModule {
  constructor(selector: string, loggerAgent: ILoggerAgent) {
    super(selector, loggerAgent)
  }
  Init(): void {
  }
  RefreshUi(): void {
   
  }
  PopulateFeedackBrowserState(urlParts: GenericUrlParts) {
    var targetCurrStateDiv: HTMLDivElement = <HTMLDivElement>window.document.querySelector(PopConst.Const.Selector.HS.FeedbackBrowserState);

    var allStateText: string = 'Browser State' + this.lineBreak;// + 'PopUp State as of: ' + this.AllAgents.HelperAgent.UtilityHelp.MakeFriendlyDate(new Date());
    allStateText += this.lineBreak + 'URL Parts';

    allStateText += this.indentedLineBreak + 'Page Type: ' + StaticHelpers.WindowTypeAsString(urlParts.ScWindowType);

    allStateText += this.indentedLineBreak + 'Url Full (raw  ): ' + urlParts.OriginalRaw;

    //allStateText += this.indentedLineBreak + 'Url Full (parts): ' + this.AllAgents.HelperAgent.UrlHelp.BuildFullUrlFromParts(urlParts).AbsUrl;

    allStateText += this.indentedLineBreak + 'Protocol: ' + urlParts.Protocol;

    allStateText += this.indentedLineBreak + 'Host & Port: ' + urlParts.HostAndPort;

    allStateText += this.indentedLineBreak + 'File Path: ' + urlParts.FilePath;
    //if (urlParts.FilePaths) {
    //  for (var idx = 0; idx < urlParts.FilePaths.length; idx++) {
    //    allTaText += this.lineBreak + '&nbsp;&nbsp;&nbsp;';
    //    allTaText += urlParts.FilePaths[idx];
    //  }
    //}
    targetCurrStateDiv.innerHTML = allStateText;
  }
}