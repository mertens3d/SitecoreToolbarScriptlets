import { StaticHelpers } from "../../../../Shared/scripts/Classes/StaticHelpers";
import { BufferChar } from "../../../../Shared/scripts/Enums/BufferChar";
import { BufferDirection } from "../../../../Shared/scripts/Enums/BufferDirection";
import { ScWindowType } from "../../../../Shared/scripts/Enums/scWindowType";
import { SnapShotFlavor } from "../../../../Shared/scripts/Enums/SnapShotFlavor";
import { Guid } from "../../../../Shared/scripts/Helpers/Guid";
import { GuidData } from "../../../../Shared/scripts/Helpers/GuidData";
import { IFirstActive } from "../../../../Shared/scripts/Interfaces/Agents/IFirstActive";
import { ILoggerAgent } from "../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IUiModule } from "../../../../Shared/scripts/Interfaces/Agents/IUiModule";
import { IDataStateOfDTFrame } from "../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfDTFrame";
import { IDataStateOfSitecoreWindow } from "../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfSitecoreWindow";
import { ISelectionHeaders } from "../../../../Shared/scripts/Interfaces/ISelectionHeaders";
import { SharedConst } from "../../../../Shared/scripts/SharedConst";
import { PopConst } from "../../Classes/PopConst";
import { StateHelpers } from "../../Classes/StateHelpers";
import { ISelectSnapUiMutationEvent_Payload } from "../../Events/SelectSnapUiMutationEvent/ISelectSnapUiMutationEvent_Payload";
import { SelectSnapUiMutationEvent_Subject } from "../../Events/SelectSnapUiMutationEvent/SelectSnapUiMutationEvent_Subject.1";
import { _UiFeedbackModuleBase } from "../UiFeedbackModules/_UiFeedbackModuleBase.1";

export class SelectSnapshotModule extends _UiFeedbackModuleBase implements IUiModule {
  private Selector: string;
  private StateHelpers: StateHelpers;
  public SelectSnapshotModule_Subject: SelectSnapUiMutationEvent_Subject;

  constructor(logger: ILoggerAgent, selector: string) {
    super(logger, selector);
    this.Selector = selector;
    this.SelectSnapshotModule_Subject = new SelectSnapUiMutationEvent_Subject(this.Logger);

    this.StateHelpers = new StateHelpers(this.Logger);
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
        let payload: ISelectSnapUiMutationEvent_Payload = {
          SelectSnapshotId: this.GetSelectSnapshotId()
        }
        this.SelectSnapshotModule_Subject.NotifyObservers(payload);
      });
    }
    this.Logger.FuncEnd(this.AssignOnChangeEvent.name, selector);
  }

  RefreshUi(): void {
    this.PopulateStateOfSnapShotSelectElement();
    //this.SelectSnapshotModule_Subject.NotifyObservers();
  }

  private __getSelectElem(): HTMLSelectElement {
    return <HTMLSelectElement>window.document.querySelector(this.Selector);
  }

  SelectHeaderStr(prefix: string): string {
    // '    Time Stamp          - Page Type - Nickname       - Favorite?';
    let toReturn: string =
      StaticHelpers.BufferString('', 4, BufferChar.Period, BufferDirection.right)
      + StaticHelpers.BufferString('Time Stamp', PopConst.Const.SnapShotFormat.lenTimestamp, BufferChar.Period, BufferDirection.right)
      + PopConst.Const.SnapShotFormat.colSep + StaticHelpers.BufferString('Type', PopConst.Const.SnapShotFormat.lenPageType, BufferChar.Period, BufferDirection.right)
      + PopConst.Const.SnapShotFormat.colSep + StaticHelpers.BufferString('Nickname', PopConst.Const.SnapShotFormat.lenNickname, BufferChar.Period, BufferDirection.right)
      + PopConst.Const.SnapShotFormat.colSep + StaticHelpers.BufferString('Main Sec', PopConst.Const.SnapShotFormat.MainSectionNode, BufferChar.Period, BufferDirection.right)
      + PopConst.Const.SnapShotFormat.colSep + StaticHelpers.BufferString('Active', PopConst.Const.SnapShotFormat.lenActiveNode, BufferChar.Period, BufferDirection.right)
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

    toReturn.Auto = <HTMLOptGroupElement>window.document.createElement(SharedConst.Const.KeyWords.Html.optgroup);
    toReturn.Auto.label = this.SelectHeaderStr('');
    toReturn.Auto.id = PopConst.Const.ElemId.HS.SelectHeaderAuto;

    toReturn.AutoTitle = <HTMLOptGroupElement>window.document.createElement(SharedConst.Const.KeyWords.Html.optgroup);
    toReturn.AutoTitle.label = 'Auto Snap Shots';
    toReturn.AutoTitle.id = PopConst.Const.ElemId.HS.SelectHeaderAutoTitle;
    toReturn.AutoTitle.classList.add('title');
    //------
    toReturn.Manual = <HTMLOptGroupElement>window.document.createElement(SharedConst.Const.KeyWords.Html.optgroup);
    toReturn.Manual.label = this.SelectHeaderStr('');
    toReturn.Manual.id = PopConst.Const.ElemId.HS.SelectHeaderManual;

    toReturn.ManualTitle = <HTMLOptGroupElement>window.document.createElement(SharedConst.Const.KeyWords.Html.optgroup);
    toReturn.ManualTitle.label = 'Manual Snap Shots';
    toReturn.ManualTitle.id = PopConst.Const.ElemId.HS.SelectHeaderManualTitle;
    toReturn.ManualTitle.classList.add('title');
    //------
    toReturn.Favorite = <HTMLOptGroupElement>window.document.createElement(SharedConst.Const.KeyWords.Html.optgroup);
    toReturn.Favorite.label = this.SelectHeaderStr('');
    toReturn.Favorite.id = PopConst.Const.ElemId.HS.SelectHeaderFavorite;

    toReturn.FavoriteTitle = <HTMLOptGroupElement>window.document.createElement(SharedConst.Const.KeyWords.Html.optgroup);
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

  private PopulateStateOfSnapShotSelectElement() {
    this.Logger.FuncStart(this.PopulateStateOfSnapShotSelectElement.name);

    let priorValue: GuidData = this.GetSelectSnapshotId();

    if (this.RefreshData.StateOfStorageSnapShots && this.RefreshData.StateOfStorageSnapShots.SnapShots) {
      let snapShots: IDataStateOfSitecoreWindow[] = this.RefreshData.StateOfStorageSnapShots.SnapShots;

      var targetSel: HTMLSelectElement = this.__getSelectElem();

      if (targetSel) {
        this.CleanExistingSelection(targetSel);
        var headers: ISelectionHeaders = this.WriteHeaders();

        if (snapShots && snapShots.length > 0) {
          for (var idx: number = 0; idx < snapShots.length; idx++) {
            var data = snapShots[idx];
            let el = this.BuildOneSnapshot(data, priorValue, idx);
            this.AppendSnapShotToCorrectGroup(data, el, headers);
          }
        }

        targetSel.appendChild(headers.FavoriteTitle);
        targetSel.appendChild(headers.Favorite);

        targetSel.appendChild(headers.ManualTitle);
        targetSel.appendChild(headers.Manual);

        targetSel.appendChild(headers.AutoTitle);
        targetSel.appendChild(headers.Auto);
      }
    } else {
      this.Logger.Log('no snap shots');
    }

    this.Logger.FuncEnd(this.PopulateStateOfSnapShotSelectElement.name);
  }

  GetFirstDataWithActiveNode(data: IDataStateOfSitecoreWindow): IFirstActive {
    let toReturn: IFirstActive = {
      StateOfContentEditor: null,
      activeTreeNode: null
    }

    if (data.Meta.WindowType === ScWindowType.Desktop) {
      if (data.ScWindowStates && data.ScWindowStates.StateOfDesktop && (data.ScWindowStates.StateOfDesktop.IndexOfActiveFrame > -1) && data.ScWindowStates.StateOfDesktop.StateOfDTFrames) {
        let activeFrame: IDataStateOfDTFrame = this.StateHelpers.GetActiveFrameFromStateOfDesktop(data.ScWindowStates.StateOfDesktop);
        toReturn.StateOfContentEditor = activeFrame.StateOfContentEditor;
        toReturn.activeTreeNode = this.StateHelpers.GetActiveTreeNodeFromStateOfContentEditor(activeFrame.StateOfContentEditor);
      } else {
        //this.Logger.LogAsJsonPretty('something is wrong with the data (maybe)', data);
      }
    }
    else if ((data.Meta.WindowType === ScWindowType.ContentEditor) && data.ScWindowStates.StateOfContentEditor && data.ScWindowStates.StateOfContentEditor.StateOfTree) {
      toReturn.activeTreeNode = this.StateHelpers.GetActiveTreeNodeFromStateOfContentEditor(toReturn.StateOfContentEditor);
    } else {
      this.Logger.WarningAndContinue(this.GetFirstDataWithActiveNode.name, 'Not implemented ' + StaticHelpers.ScWindowTypeFriendly(data.Meta.WindowType));
    }

    return toReturn
  }

  TimeNicknameFavStr(data: IDataStateOfSitecoreWindow): string {
    var typeStr: string = '';
    if (data.Meta.WindowType === ScWindowType.ContentEditor) {
      typeStr = 'Cont Ed';
    }
    else if (data.Meta.WindowType === ScWindowType.Desktop) {
      typeStr = 'Desktop';
    }
    //= (data.Meta.WindowType === scWindowType.Unknown) ? '?' : scWindowType[data.Meta.WindowType];
    var activeCeNode: string = '';
    let MainSectionNode: string = '';

    let candidateCe: IFirstActive = this.GetFirstDataWithActiveNode(data);

    if (candidateCe && candidateCe.activeTreeNode && candidateCe.activeTreeNode.FriendlyTreeNode) {
      activeCeNode = candidateCe.activeTreeNode.FriendlyTreeNode.trim();
      if (candidateCe.StateOfContentEditor.StateOfTree.StateOfTreeNodes.length >= 2) {
        MainSectionNode = candidateCe.StateOfContentEditor.StateOfTree.StateOfTreeNodes[1].FriendlyTreeNode.trim();
      }
    } else {
      MainSectionNode = 'todo ' + this.TimeNicknameFavStr.name;
    }

    let toReturn = StaticHelpers.BufferString(data.Friendly.TimeStamp, PopConst.Const.SnapShotFormat.lenTimestamp, BufferChar.space, BufferDirection.right)
      + PopConst.Const.SnapShotFormat.colSep + StaticHelpers.BufferString(typeStr, PopConst.Const.SnapShotFormat.lenPageType, BufferChar.Nbsp, BufferDirection.right)
      + PopConst.Const.SnapShotFormat.colSep + StaticHelpers.BufferString(data.Friendly.NickName, PopConst.Const.SnapShotFormat.lenNickname, BufferChar.Nbsp, BufferDirection.right)
      + PopConst.Const.SnapShotFormat.colSep + StaticHelpers.BufferString(MainSectionNode, PopConst.Const.SnapShotFormat.MainSectionNode, BufferChar.Nbsp, BufferDirection.right)
      + PopConst.Const.SnapShotFormat.colSep + StaticHelpers.BufferString(activeCeNode, PopConst.Const.SnapShotFormat.lenActiveNode, BufferChar.Nbsp, BufferDirection.right)

      + PopConst.Const.SnapShotFormat.colSep + StaticHelpers.BufferString((data.Meta.Flavor === SnapShotFlavor.Favorite ? '*' : ''), PopConst.Const.SnapShotFormat.lenFavorite, BufferChar.Nbsp, BufferDirection.right)
      //+ PopConst.Const.SnapShotFormat.colSep + StaticHelpers.BufferString((data.Flavor === SnapShotFlavor.Autosave ? 'A' : ' '), 1, BufferChar.Nbsp, BufferDirection.right)
      + PopConst.Const.SnapShotFormat.colSep + StaticHelpers.BufferString(Guid.AsShort(data.Meta.SnapshotId), PopConst.Const.SnapShotFormat.lenShortId, BufferChar.Nbsp, BufferDirection.right)
    //todo - put back    + PopConst.Const.SnapShotFormat.colSep + StaticHelpers.BufferString(data. AllCEAr.length.toString(), PopConst.Const.SnapShotFormat.lenCeCount, BufferChar.Nbsp, BufferDirection.right);
    return toReturn;
  }

  private BuildOneSnapshot(data: IDataStateOfSitecoreWindow, prior: GuidData, idx: number): HTMLOptionElement {
    let el: HTMLOptionElement = <HTMLOptionElement>window.document.createElement('option');

    let timeNicknameFavStr = this.TimeNicknameFavStr(data);

    el.innerHTML = timeNicknameFavStr;

    if (data.Meta.Flavor === SnapShotFlavor.Favorite) {
      el.classList.add('favorite');
    }

    el.value = data.Meta.SnapshotId.Raw;

    if ((data.Meta.SessionId && prior && data.Meta.SnapshotId.Raw === prior.Raw) ||
      (idx === 0 && !prior)
      ||
      (idx === 0 && prior.Raw === GuidData.GetEmptyGuid().Raw)

    ) {
      el.selected = true;
    }

    return el;
  }

  private AppendSnapShotToCorrectGroup(data: IDataStateOfSitecoreWindow, el: HTMLOptionElement, headers: ISelectionHeaders) {
    if (data.Meta.Flavor === SnapShotFlavor.Autosave) {
      headers.Auto.appendChild(el);
    } else if (data.Meta.Flavor === SnapShotFlavor.Favorite) {
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
    this.Logger.FuncStart(this.CleanExistingSelection.name);
    this.cleanOneGroup(targetSel, PopConst.Const.ElemId.HS.SelectHeaderAuto);
    this.cleanOneGroup(targetSel, PopConst.Const.ElemId.HS.SelectHeaderAutoTitle);
    this.cleanOneGroup(targetSel, PopConst.Const.ElemId.HS.SelectHeaderFavorite);
    this.cleanOneGroup(targetSel, PopConst.Const.ElemId.HS.SelectHeaderFavoriteTitle);
    this.cleanOneGroup(targetSel, PopConst.Const.ElemId.HS.SelectHeaderManual);
    this.cleanOneGroup(targetSel, PopConst.Const.ElemId.HS.SelectHeaderManualTitle);

    targetSel.options.length = 0;
    this.Logger.FuncEnd(this.CleanExistingSelection.name);
  }
}