import { StaticHelpers } from "../../../../Shared/scripts/Classes/StaticHelpers";
import { PopConst } from "../../../../Shared/scripts/Const/PopConst";
import { ModuleKey } from "../../../../Shared/scripts/Enums/ModuleKey";
import { IUiModule } from "../../../../Shared/scripts/Interfaces/Agents/IUiModule";
import { IGenericUrlParts } from "../../../../Shared/scripts/Interfaces/Jackets/IUrlParts";
import { _UiFeedbackModuleBase } from "./_UiFeedbackModuleBase";

export class FeedbackModuleBrowserState extends _UiFeedbackModuleBase implements IUiModule {

  Friendly = FeedbackModuleBrowserState.name;
  ModuleKey = ModuleKey.BroswerState;

  WireEvents_Module(): void {
  }


  RefreshUi_Module(): void {
    var targetCurrStateDiv: HTMLDivElement = <HTMLDivElement>window.document.querySelector(PopConst.Const.Selector.HS.FeedbackBrowserState);

    var allStateText: string = 'Browser State' + this.lineBreak;
    allStateText += this.lineBreak + 'URL Parts';

    allStateText += this.indentedLineBreak + '<strong>Page Type:</strong> ' + StaticHelpers.ScWindowTypeFriendly(this.RefreshData.ScUrlAgent.GetScWindowType());

    let UrlParts: IGenericUrlParts = this.RefreshData.ScUrlAgent.UrlJacket.GetUrlParts();

    allStateText += this.indentedLineBreak + 'Url Full (raw  ): ' + UrlParts.OriginalRaw;

    allStateText += this.indentedLineBreak + 'Protocol: ' + UrlParts.Protocol;

    allStateText += this.indentedLineBreak + 'Host & Port: ' + UrlParts.HostAndPort;

    allStateText += this.indentedLineBreak + 'File Path: ' + UrlParts.FilePath;

    targetCurrStateDiv.innerHTML = allStateText;
  }

}