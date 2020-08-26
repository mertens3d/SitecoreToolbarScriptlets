import { UiFeedbackModuleBase } from "../UiFeedbackModuleBase/UiFeedbackModuleBase";
import { ILoggerAgent } from "../../../../../../../Shared/scripts/Interfaces/Agents/ILoggerBase";
import { IContentState } from "../../../../../../../Shared/scripts/Interfaces/IContentState/IContentState";
import { PopConst } from "../../../../../Classes/PopConst";
import { MsgFlag } from "../../../../../../../Shared/scripts/Enums/1xxx-MessageFlag";
import { IMenuState } from "../../../../../../../Shared/scripts/Interfaces/IMenuState";
import { UrlParts } from "../../../../../../../Shared/scripts/Interfaces/UrlParts";
import { StaticHelpers } from "../../../../../../../Shared/scripts/Classes/StaticHelpers";
import { IUiModule } from "../../../../../../../Shared/scripts/Interfaces/Agents/IUiModule";

export class FeedbackModuleContentState extends UiFeedbackModuleBase implements IUiModule {


  constructor(selector: string, loggerAgent: ILoggerAgent) {
    super(selector, loggerAgent)
  }

  Init(): void {
  }

  RefreshUi(): void {
  }

  PopulateContentStateDivContent(contentState: IContentState) {
    var targetCurrStateDiv: HTMLDivElement = <HTMLDivElement>window.document.querySelector(PopConst.Const.Selector.HS.DivStateContent);
    var allStateText: string = this.lineBreak;// + 'Content State as of: ' + this.AllAgents.HelperAgent.UtilityHelp.MakeFriendlyDate(new Date());

    if (targetCurrStateDiv) {
      allStateText += this.lineBreak + 'Editor:';
      allStateText += this.indentedLineBreak + 'Active Ce: '
      if (contentState.ActiveCe) {
        allStateText += contentState.ActiveCe.Id.AsShort;

        allStateText += this.indentedLineBreak + 'Active Node: '
        if (contentState.ActiveCe.ActiveNode) {
          allStateText += contentState.ActiveCe.ActiveNode.NodeFriendly + ' ' + contentState.ActiveCe.ActiveNode.NodeId.AsBracedGuid;
        } else {
          allStateText += '{no active node in CE}';
        }
      } else {
        allStateText += '{no active CE}';
      }
      allStateText += this.lineBreak;
      allStateText += this.lineBreak + 'Snap Shots: ';
      allStateText += this.indentedLineBreak + 'Birthday: ' + contentState.SnapShotsMany.Birthday.toString();
      allStateText += this.indentedLineBreak + 'Total Snapshots: ' + contentState.SnapShotsMany.CurrentSnapShots.length;
      allStateText += this.indentedLineBreak + 'Favorite Snapshots: ' + contentState.SnapShotsMany.FavoriteCount;
      allStateText += this.indentedLineBreak + 'Plain Snapshots: ' + contentState.SnapShotsMany.PlainCount;
      allStateText += this.indentedLineBreak + 'Auto Snapshots: ' + contentState.SnapShotsMany.SnapShotsAutoCount;

      allStateText += this.lineBreak;
      allStateText += 'Last Request: ' + MsgFlag[contentState.LastReq];

      allStateText += this.lineBreak;
      allStateText += 'Error Stack (' + contentState.ErrorStack.length + '):';
      for (var idx = 0; idx < contentState.ErrorStack.length; idx++) {
        allStateText += this.indentedLineBreak + idx + ' : ' + contentState.ErrorStack[idx].ContainerFunc + ' ' + contentState.ErrorStack[idx].ErrorString;
      }

      targetCurrStateDiv.innerHTML = allStateText;
    }
  }



  PopulateContentStateFeedack(contentState: IContentState, currentMenuState: IMenuState, urlParts: UrlParts) {
    var allStateText: string = this.lineBreak;// + 'PopUp State as of: ' + this.AllAgents.HelperAgent.UtilityHelp.MakeFriendlyDate(new Date());

    allStateText += this.lineBreak + 'UI';

    allStateText += this.indentedLineBreak + 'Select Snapshot: ';
    if (currentMenuState.SelectSnapshotId) {
      allStateText += currentMenuState.SelectSnapshotId.AsShort;
    } else {
      allStateText += 'none selected';
    }

   

    allStateText += this.lineBreak + 'Parameters: ';
    if (urlParts.Parameters) {
      for (var idx = 0; idx < urlParts.Parameters.length; idx++) {
        allStateText += this.indentedLineBreak + this.indentedLineBreak + urlParts.Parameters[idx].Key;
        allStateText += '&nbsp; : &nbsp;';
        allStateText += urlParts.Parameters[idx].value || '';
      }

      this.AddHtmlString(allStateText);
    }
  }
}