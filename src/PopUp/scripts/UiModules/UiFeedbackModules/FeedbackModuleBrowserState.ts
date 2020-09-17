import { StaticHelpers } from "../../../../Shared/scripts/Classes/StaticHelpers";
import { ScWindowType } from "../../../../Shared/scripts/Enums/scWindowType";
import { GuidData } from "../../../../Shared/scripts/Helpers/GuidData";
import { IUiModule } from "../../../../Shared/scripts/Interfaces/Agents/IUiModule";
import { IDataStateOfSitecoreWindow } from "../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfSitecoreWindow";
import { IGenericUrlParts } from "../../../../Shared/scripts/Interfaces/IUrlParts";
import { UiRefreshData } from "../../../../Shared/scripts/Interfaces/MenuCommand";
import { PopConst } from "../../Classes/PopConst";
import { _UiFeedbackModuleBase } from "./_UiFeedbackModuleBase.1";

export class FeedbackModuleBrowserState extends _UiFeedbackModuleBase implements IUiModule {


  Init(): void {
  }

  RefreshUi(): void {
  }

  HydrateFeedackBrowserState(refreshData: UiRefreshData) {
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