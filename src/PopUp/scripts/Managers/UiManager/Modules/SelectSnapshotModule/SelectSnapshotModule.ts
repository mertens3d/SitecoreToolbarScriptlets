import { StaticHelpers } from "../../../../../../Shared/scripts/Classes/StaticHelpers";
import { BufferChar } from "../../../../../../Shared/scripts/Enums/BufferChar";
import { BufferDirection } from "../../../../../../Shared/scripts/Enums/BufferDirection";
import { scWindowType } from "../../../../../../Shared/scripts/Enums/scWindowType";
import { SnapShotFlavor } from "../../../../../../Shared/scripts/Enums/SnapShotFlavor";
import { ILoggerAgent } from "../../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IUiModule } from "../../../../../../Shared/scripts/Interfaces/Agents/IUiModule";
import { IContentState } from "../../../../../../Shared/scripts/Interfaces/IContentState/IContentState";
import { IDataOneWindowStorage } from "../../../../../../Shared/scripts/Interfaces/IDataOneWindowStorage";
import { ISelectionHeaders } from "../../../../../../Shared/scripts/Interfaces/ISelectionHeaders";
import { PopConst } from "../../../../Classes/PopConst";
import { GuidData } from "../../../../../../Shared/scripts/Helpers/GuidData";
import { Guid } from "../../../../../../Shared/scripts/Helpers/Guid";

export class SelectSnapshotModule implements IUiModule {
  ContentState: IContentState;

  private Logger: ILoggerAgent;
  private __selector: string;
  private AllCallbacks: Function[] = [];

  constructor(selector: string, logger: ILoggerAgent) {
    this.__selector = selector;
    this.Logger = logger;
  }

  Init(): void {
    this.AssignOnChangeEvent(PopConst.Const.Selector.HS.SelStateSnapShot);
  }

  private AssignOnChangeEvent(selector: string): void {
    this.Logger.FuncStart(this.AssignOnChangeEvent.name, selector);

    var targetElem: HTMLElement = document.querySelector(selector);
    if (!targetElem) {
      this.Logger.ErrorAndThrow(this.AssignOnChangeEvent.name, 'No Id: ' + selector);
    } else {
      targetElem.onchange = (() => {
        let self = this;
        this.OnChangeEventHandler(self);
      });
    }
    this.Logger.FuncEnd(this.AssignOnChangeEvent.name, selector);
  }

  AddCallbackForSelChanged(callbackFunc: Function) {
    this.AllCallbacks.push(callbackFunc);
  }

  private OnChangeEventHandler(self: SelectSnapshotModule) {
    for (var idx = 0; idx < self.AllCallbacks.length; idx++) {
      let oneCallback: Function = self.AllCallbacks[idx];
      oneCallback();
    }
  }

  SetContentState(contentState: IContentState) {
    this.ContentState = contentState;
  }

  RefreshUi(): void {
    this.PopulateStateOfSnapShotSelect();
  }

  private __getSelectElem(): HTMLSelectElement {
    return <HTMLSelectElement>window.document.querySelector(this.__selector);
  }

  SelectHeaderStr(prefix: string): string {
    // '    Time Stamp          - Page Type - Nickname       - Favorite?';
    let toReturn: string =
      StaticHelpers.BufferString('', 4, BufferChar.Period, BufferDirection.right)
      + StaticHelpers.BufferString('Time Stamp', PopConst.Const.SnapShotFormat.lenTimestamp, BufferChar.Period, BufferDirection.right)
      + PopConst.Const.SnapShotFormat.colSep + StaticHelpers.BufferString('Type', PopConst.Const.SnapShotFormat.lenPageType, BufferChar.Period, BufferDirection.right)
      + PopConst.Const.SnapShotFormat.colSep + StaticHelpers.BufferString('Nickname', PopConst.Const.SnapShotFormat.lenNickname, BufferChar.Period, BufferDirection.right)
      + PopConst.Const.SnapShotFormat.colSep + StaticHelpers.BufferString('Active Node.', PopConst.Const.SnapShotFormat.lenActiveNode, BufferChar.Period, BufferDirection.right)
      + PopConst.Const.SnapShotFormat.colSep + StaticHelpers.BufferString('Fav.', PopConst.Const.SnapShotFormat.lenFavorite, BufferChar.Period, BufferDirection.right)
      + PopConst.Const.SnapShotFormat.colSep + StaticHelpers.BufferString('Id', PopConst.Const.SnapShotFormat.lenShortId, BufferChar.Period, BufferDirection.right)
      + PopConst.Const.SnapShotFormat.colSep + StaticHelpers.BufferString('#CE', PopConst.Const.SnapShotFormat.lenCeCount, BufferChar.Period, BufferDirection.right);
    return toReturn;
  }

  GetSelectSnapshotId(): GuidData {
    let currentVal = this.__getSelectElem().value;
    let toReturn: GuidData;
    if (currentVal) {
      toReturn = Guid.ParseGuid(currentVal, true);
    } else {
      toReturn = GuidData.GetEmptyGuid();
    }
    return toReturn;
  }

  WriteHeaders() {
    var toReturn: ISelectionHeaders = {
      Auto: null,
      Favorite: null,
      AutoTitle: null,
      FavoriteTitle: null,
      Manual: null,
      ManualTitle: null
    }

    toReturn.Auto = <HTMLOptGroupElement>window.document.createElement('optgroup');
    toReturn.Auto.label = this.SelectHeaderStr('');
    toReturn.Auto.id = PopConst.Const.ElemId.HS.SelectHeaderAuto;

    toReturn.AutoTitle = <HTMLOptGroupElement>window.document.createElement('optgroup');
    toReturn.AutoTitle.label = 'Auto Snap Shots';
    toReturn.AutoTitle.id = PopConst.Const.ElemId.HS.SelectHeaderAutoTitle;
    toReturn.AutoTitle.classList.add('title');
    //------
    toReturn.Manual = <HTMLOptGroupElement>window.document.createElement('optgroup');
    toReturn.Manual.label = this.SelectHeaderStr('');
    toReturn.Manual.id = PopConst.Const.ElemId.HS.SelectHeaderManual;

    toReturn.ManualTitle = <HTMLOptGroupElement>window.document.createElement('optgroup');
    toReturn.ManualTitle.label = 'Manual Snap Shots';
    toReturn.ManualTitle.id = PopConst.Const.ElemId.HS.SelectHeaderManualTitle;
    toReturn.ManualTitle.classList.add('title');
    //------
    toReturn.Favorite = <HTMLOptGroupElement>window.document.createElement('optgroup');
    toReturn.Favorite.label = this.SelectHeaderStr('');
    toReturn.Favorite.id = PopConst.Const.ElemId.HS.SelectHeaderFavorite;

    toReturn.FavoriteTitle = <HTMLOptGroupElement>window.document.createElement('optgroup');
    toReturn.FavoriteTitle.label = 'Favorite Snap Shots';
    toReturn.FavoriteTitle.id = PopConst.Const.ElemId.HS.SelectHeaderFavoriteTitle;
    toReturn.FavoriteTitle.classList.add('title');

    return toReturn;
  }

  SelectChanged(): void {
    this.Logger.FuncStart(this.SelectChanged.name);
    //this.debug().Log('new index :' + this.__selectSnapshotId);

    //if (e.ctrlKey) {
    //  alert
    //}

    this.Logger.FuncEnd(this.SelectChanged.name);
  }

  private PopulateStateOfSnapShotSelect() {
    this.Logger.FuncStart(this.PopulateStateOfSnapShotSelect.name);

    let priorValue: GuidData = this.GetSelectSnapshotId();

    if (this.ContentState.SnapShotsMany.CurrentSnapShots) {
      let snapShots: IDataOneWindowStorage[] = this.ContentState.SnapShotsMany.CurrentSnapShots;

      if (snapShots) {
        var targetSel: HTMLSelectElement = this.__getSelectElem();

        if (targetSel) {
          this.CleanExistingSelection(targetSel);
          var headers: ISelectionHeaders = this.WriteHeaders();

          if (snapShots && snapShots.length > 0) {
            this.Logger.Log('targetSel.options.length : ' + targetSel.options.length);

            for (var idx: number = 0; idx < snapShots.length; idx++) {
              this.Logger.Log('snapShots:' + idx + ":" + snapShots.length);

              var data = snapShots[idx];
              let el = this.BuildOne(data, priorValue, idx);
              this.AppendToCorrectSnapshotGroup(data, el, headers);
            }
          }

          targetSel.appendChild(headers.FavoriteTitle);
          targetSel.appendChild(headers.Favorite);

          targetSel.appendChild(headers.ManualTitle);
          targetSel.appendChild(headers.Manual);

          targetSel.appendChild(headers.AutoTitle);
          targetSel.appendChild(headers.Auto);
        }
      }
    }
    this.Logger.FuncEnd(this.PopulateStateOfSnapShotSelect.name);
  }

  TimeNicknameFavStr(data: IDataOneWindowStorage): string {
    var typeStr: string = '';
    if (data.WindowType === scWindowType.ContentEditor) {
      typeStr = 'Cont Ed';
    }
    else if (data.WindowType === scWindowType.Desktop) {
      typeStr = 'Desktop';
    }
    //= (data.WindowType === scWindowType.Unknown) ? '?' : scWindowType[data.WindowType];
    var activeCeNode: string = '';
    for (var idx = 0; idx < data.AllCEAr.length; idx++) {
      var candidateCe = data.AllCEAr[idx];
      for (var jdx = 0; jdx < candidateCe.AllTreeNodeAr.length; jdx++) {
        var candidateNode = candidateCe.AllTreeNodeAr[jdx];
        if (candidateNode.IsActive) {
          var lvl2Node: string = '';
          if (jdx >= 2) {
            lvl2Node = candidateCe.AllTreeNodeAr[1].NodeFriendly + '/';
          }
          activeCeNode = lvl2Node + candidateNode.NodeFriendly;
          break;
        }
      }
    }
    let toReturn = StaticHelpers.BufferString(data.TimeStampFriendly, PopConst.Const.SnapShotFormat.lenTimestamp, BufferChar.space, BufferDirection.right)
      + PopConst.Const.SnapShotFormat.colSep + StaticHelpers.BufferString(typeStr, PopConst.Const.SnapShotFormat.lenPageType, BufferChar.Nbsp, BufferDirection.right)
      + PopConst.Const.SnapShotFormat.colSep + StaticHelpers.BufferString(data.NickName, PopConst.Const.SnapShotFormat.lenNickname, BufferChar.Nbsp, BufferDirection.right)
      + PopConst.Const.SnapShotFormat.colSep + StaticHelpers.BufferString(activeCeNode, PopConst.Const.SnapShotFormat.lenActiveNode, BufferChar.Nbsp, BufferDirection.right)
      + PopConst.Const.SnapShotFormat.colSep + StaticHelpers.BufferString((data.Flavor === SnapShotFlavor.Favorite ? '*' : ''), PopConst.Const.SnapShotFormat.lenFavorite, BufferChar.Nbsp, BufferDirection.right)
      //+ PopConst.Const.SnapShotFormat.colSep + StaticHelpers.BufferString((data.Flavor === SnapShotFlavor.Autosave ? 'A' : ' '), 1, BufferChar.Nbsp, BufferDirection.right)
      + PopConst.Const.SnapShotFormat.colSep + StaticHelpers.BufferString(Guid.AsShort(data.GuidId), PopConst.Const.SnapShotFormat.lenShortId, BufferChar.Nbsp, BufferDirection.right)
      + PopConst.Const.SnapShotFormat.colSep + StaticHelpers.BufferString(data.AllCEAr.length.toString(), PopConst.Const.SnapShotFormat.lenCeCount, BufferChar.Nbsp, BufferDirection.right);
    return toReturn;
  }

  private BuildOne(data: IDataOneWindowStorage, prior: GuidData, idx: number): HTMLOptionElement {
    let el: HTMLOptionElement = <HTMLOptionElement>window.document.createElement('option');

    let timeNicknameFavStr = this.TimeNicknameFavStr(data);

    el.innerHTML = timeNicknameFavStr;

    if (data.Flavor === SnapShotFlavor.Favorite) {
      el.classList.add('favorite');
    }

    el.value = data.GuidId.Raw;

    if ((data.GuidId && prior && data.GuidId.Raw === prior.Raw) ||
      (idx === 0 && !prior)
      ||
      (idx === 0 && prior.Raw === GuidData.GetEmptyGuid().Raw)

    ) {
      this.Logger.Log('Setting to selected')
      el.selected = true;
    }

    return el;
  }

  private AppendToCorrectSnapshotGroup(data: IDataOneWindowStorage, el: HTMLOptionElement, headers: ISelectionHeaders) {
    if (data.Flavor === SnapShotFlavor.Autosave) {
      headers.Auto.appendChild(el);
    } else if (data.Flavor === SnapShotFlavor.Favorite) {
      headers.Favorite.appendChild(el);
    } else {
      headers.Manual.appendChild(el);
    }
  }

  private cleanOneGroup(targetSel: HTMLSelectElement, targetId: string) {
    var optGroup = targetSel.querySelector('[id=' + targetId + ']')
    if (optGroup) {
      optGroup.remove();
    }
  }

  CleanExistingSelection(targetSel: HTMLSelectElement) {
    this.cleanOneGroup(targetSel, PopConst.Const.ElemId.HS.SelectHeaderAuto);
    this.cleanOneGroup(targetSel, PopConst.Const.ElemId.HS.SelectHeaderAutoTitle);
    this.cleanOneGroup(targetSel, PopConst.Const.ElemId.HS.SelectHeaderFavorite);
    this.cleanOneGroup(targetSel, PopConst.Const.ElemId.HS.SelectHeaderFavoriteTitle);
    this.cleanOneGroup(targetSel, PopConst.Const.ElemId.HS.SelectHeaderManual);
    this.cleanOneGroup(targetSel, PopConst.Const.ElemId.HS.SelectHeaderManualTitle);

    targetSel.options.length = 0;
  }
}