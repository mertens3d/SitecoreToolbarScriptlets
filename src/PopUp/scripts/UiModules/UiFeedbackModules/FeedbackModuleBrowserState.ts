import { ILoggerAgent } from "../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { ScUrlAgent } from "../../../../Shared/scripts/Agents/Agents/UrlAgent/ScUrlAgent";
import { PopConst } from "../../Classes/PopConst";
import { IGenericUrlParts } from "../../../../Shared/scripts/Interfaces/IUrlParts";
import { StaticHelpers } from "../../../../Shared/scripts/Classes/StaticHelpers";
import { IUiModule } from "../../../../Shared/scripts/Interfaces/Agents/IUiModule";
import { IDataStateOfSitecoreWindow } from "../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfSitecoreWindow";
import { ScWindowType } from "../../../../Shared/scripts/Enums/scWindowType";
import { GuidData } from "../../../../Shared/scripts/Helpers/GuidData";
import { _UiFeedbackModuleBase } from "./_UiFeedbackModuleBase";

export class FeedbackModuleBrowserState extends _UiFeedbackModuleBase implements IUiModule {

  Hydrate(stateOfSitecoreWindow: IDataStateOfSitecoreWindow, currentWindowType: ScWindowType, selectSnapShotId: GuidData): void {
  }

  Init(): void {
  }

  RefreshUi(): void {
  }

  HydrateFeedackBrowserState(scUrlAgent: ScUrlAgent) {
    var targetCurrStateDiv: HTMLDivElement = <HTMLDivElement>window.document.querySelector(PopConst.Const.Selector.HS.FeedbackBrowserState);

    var allStateText: string = 'Browser State' + this.lineBreak;
    allStateText += this.lineBreak + 'URL Parts';

    allStateText += this.indentedLineBreak + '<strong>Page Type:</strong> ' + StaticHelpers.ScWindowTypeFriendly(scUrlAgent.GetScWindowType());

    let UrlParts: IGenericUrlParts = scUrlAgent.GetUrlParts();

    allStateText += this.indentedLineBreak + 'Url Full (raw  ): ' + UrlParts.OriginalRaw;

    allStateText += this.indentedLineBreak + 'Protocol: ' + UrlParts.Protocol;

    allStateText += this.indentedLineBreak + 'Host & Port: ' + UrlParts.HostAndPort;

    allStateText += this.indentedLineBreak + 'File Path: ' + UrlParts.FilePath;

    targetCurrStateDiv.innerHTML = allStateText;
  }
}