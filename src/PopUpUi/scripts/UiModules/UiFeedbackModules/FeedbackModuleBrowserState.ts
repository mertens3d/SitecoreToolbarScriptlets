import { StaticHelpers } from "../../../../Shared/scripts/Classes/StaticHelpers";
import { ModuleKey } from "../../../../Shared/scripts/Enums/ModuleKey";
import { IUiModule } from "../../../../Shared/scripts/Interfaces/Agents/IUiModule";
import { IGenericUrlParts } from "../../../../Shared/scripts/Interfaces/IUrlParts";
import { UiHydrationData } from "../../../../Shared/scripts/Interfaces/UiHydrationData";
import { PopConst } from "../../../../Shared/scripts/Const/PopConst";
import { _UiFeedbackModuleBase } from "./_UiFeedbackModuleBase";

export class FeedbackModuleBrowserState extends _UiFeedbackModuleBase implements IUiModule {

  Friendly = FeedbackModuleBrowserState.name;

  WireEvents_Module(): void {
  }

  ModuleKey = ModuleKey.BroswerState;

  Init(): void {
  }

  RefreshUi(): void {
  }

  Hydrate(refreshData: UiHydrationData) {
    var targetCurrStateDiv: HTMLDivElement = <HTMLDivElement>window.document.querySelector(PopConst.Const.Selector.HS.FeedbackBrowserState);

    var allStateText: string = 'Browser State' + this.lineBreak;
    allStateText += this.lineBreak + 'URL Parts';

    allStateText += this.indentedLineBreak + '<strong>Page Type:</strong> ' + StaticHelpers.ScWindowTypeFriendly(refreshData.ScUrlAgent.GetScWindowType());

    let UrlParts: IGenericUrlParts = refreshData.ScUrlAgent.GetUrlParts();

    allStateText += this.indentedLineBreak + 'Url Full (raw  ): ' + UrlParts.OriginalRaw;

    allStateText += this.indentedLineBreak + 'Protocol: ' + UrlParts.Protocol;

    allStateText += this.indentedLineBreak + 'Host & Port: ' + UrlParts.HostAndPort;

    allStateText += this.indentedLineBreak + 'File Path: ' + UrlParts.FilePath;

    targetCurrStateDiv.innerHTML = allStateText;
  }
}