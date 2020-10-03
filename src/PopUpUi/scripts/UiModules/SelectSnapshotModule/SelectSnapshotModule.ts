import { StaticHelpers } from "../../../../Shared/scripts/Classes/StaticHelpers";
import { BufferChar } from "../../../../Shared/scripts/Enums/BufferChar";
import { ModuleKey } from "../../../../Shared/scripts/Enums/ModuleKey";
import { BufferDirection } from "../../../../Shared/scripts/Enums/BufferDirection";
import { ScWindowType } from "../../../../Shared/scripts/Enums/scWindowType";
import { SnapShotFlavor } from "../../../../Shared/scripts/Enums/SnapShotFlavor";
import { Guid } from "../../../../Shared/scripts/Helpers/Guid";
import { GuidData } from "../../../../Shared/scripts/Helpers/GuidData";
import { IFirstActive } from "../../../../Shared/scripts/Interfaces/Agents/IFirstActive";
import { IHindeCore } from "../../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { IUiModule } from "../../../../Shared/scripts/Interfaces/Agents/IUiModule";
import { IStateOfDTFrame } from "../../../../Shared/scripts/Interfaces/Data/States/IStateOfDTFrame";
import { IStateOfScUiProxy } from "../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfSitecoreWindow";
import { ISelectionHeaders } from "../../../../Shared/scripts/Interfaces/ISelectionHeaders";
import { SharedConst } from "../../../../Shared/scripts/SharedConst";
import { PopConst } from "../../../../Shared/scripts/Const/PopConst";
import { StateHelpers } from "../../Classes/StateHelpers";
import { ISelectSnapUiMutationEvent_Payload } from "../../Events/SelectSnapUiMutationEvent/ISelectSnapUiMutationEvent_Payload";
import { SelectSnapUiMutationEvent_Subject } from "../../Events/SelectSnapUiMutationEvent/SelectSnapUiMutationEvent_Subject";
import { _UiFeedbackModuleBase } from "../UiFeedbackModules/_UiFeedbackModuleBase";
import { _UiModuleBase } from "../_UiModuleBase";

export class SelectSnapshotModule extends _UiModuleBase implements IUiModule {
  private StateHelpers: StateHelpers;
  public SelectSnapshotModule_Subject: SelectSnapUiMutationEvent_Subject;
  ModuleKey = ModuleKey.SelectSnapShot;
  private SelectElement: HTMLSelectElement;
  Friendly = SelectSnapshotModule.name;

  constructor(hindeCore: IHindeCore, containerSelector: string) {
    super(hindeCore, containerSelector);
    this.SelectSnapshotModule_Subject = new SelectSnapUiMutationEvent_Subject(this.HindeCore);

    this.StateHelpers = new StateHelpers(this.HindeCore);
  }

  Init_Module(): void {
    this.Init_UiModuleBase();
    this.SelectElement = <HTMLSelectElement>this.ContainerUiDivElem.querySelector('select');
  }

  BuildHtmlForModule(): void {
    //intentionally empty
  }

  WireEvents_Module(): void {
    this.Logger.FuncStart(this.WireEvents_Module.name, this.ContainerSelector);

    if (!this.SelectElement) {
      this.ErrorHand.ErrorAndThrow(this.WireEvents_Module.name, 'No Id: ' + this.ContainerSelector);
    } else {
      this.SelectElement.onchange = (() => {
        let self = this;
        let payload: ISelectSnapUiMutationEvent_Payload = {
          SelectSnapshotId: this.GetSelectSnapshotId()
        }
        this.SelectSnapshotModule_Subject.NotifyObserversAsync(payload);
      });
    }
    this.Logger.FuncEnd(this.WireEvents_Module.name, this.ContainerSelector);
  }

  RefreshUi_Module(): void {
    this.PopulateStateOfSnapShotSelectElement();
    //this.SelectSnapshotModule_Subject.NotifyObservers();
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
    this.Logger.FuncStart(this.GetSelectSnapshotId.name);
    let currentVal = this.SelectElement.value;
    this.Logger.LogVal('currentVal', currentVal);
    let toReturn: GuidData;
    if (currentVal) {
      toReturn = Guid.ParseGuid(currentVal, true);
    } else {
      toReturn = Guid.GetEmptyGuid();
    }
    this.Logger.FuncEnd(this.GetSelectSnapshotId.name);
    return toReturn;
  }

  GetSelectSnapshotNickname(): string {
    this.Logger.FuncStart(this.GetSelectSnapshotId.name);
    let selectedIndex = this.SelectElement.selectedIndex;
    this.Logger.LogVal('selectedIndex', selectedIndex);
    let toReturn: string;

    if (selectedIndex && this.RefreshData && this.RefreshData.StateOfStorageSnapShots) {
      let snapShots: IStateOfScUiProxy[] = this.RefreshData.StateOfStorageSnapShots.SnapShots;
      if (snapShots) {
        let selected: IStateOfScUiProxy = snapShots[selectedIndex];
        if (selected) {
          toReturn = selected.Friendly.NickName;
        }
      }
    } else {
      this.ErrorHand.WarningAndContinue(this.GetSelectSnapshotNickname.name, 'no match');
    }

    this.Logger.FuncEnd(this.GetSelectSnapshotId.name);
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
      let stateOfScUiProxies: IStateOfScUiProxy[] = this.RefreshData.StateOfStorageSnapShots.SnapShots;

      if (this.SelectElement) {
        this.CleanExistingSelection(this.SelectElement);
        var headers: ISelectionHeaders = this.WriteHeaders();

        if (stateOfScUiProxies && stateOfScUiProxies.length > 0) {
          for (var idx: number = 0; idx < stateOfScUiProxies.length; idx++) {
            var stateOfScUiProxy = stateOfScUiProxies[idx];

            this.ErrorHand.ThrowIfNullOrUndefined(this.PopulateStateOfSnapShotSelectElement.name, stateOfScUiProxy);

            let el = this.BuildOneSnapshot(stateOfScUiProxy, priorValue, idx);
            this.AppendSnapShotToCorrectGroup(stateOfScUiProxy, el, headers);
          }
        }

        this.SelectElement.appendChild(headers.FavoriteTitle);
        this.SelectElement.appendChild(headers.Favorite);

        this.SelectElement.appendChild(headers.ManualTitle);
        this.SelectElement.appendChild(headers.Manual);

        this.SelectElement.appendChild(headers.AutoTitle);
        this.SelectElement.appendChild(headers.Auto);
      }
    } else {
      this.Logger.Log('no snap shots');
    }

    this.Logger.FuncEnd(this.PopulateStateOfSnapShotSelectElement.name);
  }

  GetFirstDataWithActiveNode(stateOfScUiProxy: IStateOfScUiProxy): IFirstActive {
    let toReturn: IFirstActive = {
      StateOfContentEditorProxy: null,
      activeTreeNodeFlat: null
    }

    if (stateOfScUiProxy.Meta.WindowType === ScWindowType.Desktop) {
      if (stateOfScUiProxy.StateOfScWindow && stateOfScUiProxy.StateOfScWindow.StateOfDesktop && (stateOfScUiProxy.StateOfScWindow.StateOfDesktop.StateOfDTArea.ActiveDTFrameIndex > -1) && stateOfScUiProxy.StateOfScWindow.StateOfDesktop.StateOfDTArea.StateOfDTFrames) {
        let activeFrame: IStateOfDTFrame = this.StateHelpers.GetActiveFrameFromStateOfDesktop(stateOfScUiProxy.StateOfScWindow.StateOfDesktop);
        toReturn.StateOfContentEditorProxy = activeFrame.StateOfContentEditor;
        toReturn.activeTreeNodeFlat = this.StateHelpers.GetActiveTreeNodeFromStateOfContentEditor(activeFrame.StateOfContentEditor);
      } else {
        //this.Logger.LogAsJsonPretty('something is wrong with the data (maybe)', data);
      }
    }
    else if ((stateOfScUiProxy.Meta.WindowType === ScWindowType.ContentEditor) && stateOfScUiProxy.StateOfScWindow.StateOfContentEditor && stateOfScUiProxy.StateOfScWindow.StateOfContentEditor.StateOfContentTree) {
      toReturn.activeTreeNodeFlat = this.StateHelpers.GetActiveTreeNodeFromStateOfContentEditor(toReturn.StateOfContentEditorProxy);
    } else {
      this.ErrorHand.WarningAndContinue(this.GetFirstDataWithActiveNode.name, 'Not implemented ' + StaticHelpers.ScWindowTypeFriendly(stateOfScUiProxy.Meta.WindowType));
    }

    return toReturn
  }

  TimeNicknameFavStr(stateOfScUiProxy: IStateOfScUiProxy): string {
    var typeStr: string = '';
    if (stateOfScUiProxy.Meta.WindowType === ScWindowType.ContentEditor) {
      typeStr = 'Cont Ed';
    }
    else if (stateOfScUiProxy.Meta.WindowType === ScWindowType.Desktop) {
      typeStr = 'Desktop';
    }
    //= (data.Meta.WindowType === scWindowType.Unknown) ? '?' : scWindowType[data.Meta.WindowType];
    var activeCeNode: string = '';
    let MainSectionNode: string = '';

    let candidateCe: IFirstActive = this.GetFirstDataWithActiveNode(stateOfScUiProxy);

    if (candidateCe && candidateCe.activeTreeNodeFlat && candidateCe.activeTreeNodeFlat.Friendly) {
      activeCeNode = candidateCe.activeTreeNodeFlat.Friendly.trim();
      //todo - put back if (candidateCe.StateOfContentEditorProxy.StateOfContentEditorTreeProxy.StateOfTreeNodes.length >= 2) {
      //  MainSectionNode = candidateCe.StateOfContentEditorProxy.StateOfContentEditorTreeProxy.StateOfTreeNodes[1].FriendlyTreeNode.trim();
      //}
    } else {
      MainSectionNode = 'todo ' + this.TimeNicknameFavStr.name;
    }

    let toReturn = StaticHelpers.BufferString(stateOfScUiProxy.Friendly.TimeStamp, PopConst.Const.SnapShotFormat.lenTimestamp, BufferChar.space, BufferDirection.right)
      + PopConst.Const.SnapShotFormat.colSep + StaticHelpers.BufferString(typeStr, PopConst.Const.SnapShotFormat.lenPageType, BufferChar.Nbsp, BufferDirection.right)
      + PopConst.Const.SnapShotFormat.colSep + StaticHelpers.BufferString(stateOfScUiProxy.Friendly.NickName, PopConst.Const.SnapShotFormat.lenNickname, BufferChar.Nbsp, BufferDirection.right)
      + PopConst.Const.SnapShotFormat.colSep + StaticHelpers.BufferString(MainSectionNode, PopConst.Const.SnapShotFormat.MainSectionNode, BufferChar.Nbsp, BufferDirection.right)
      + PopConst.Const.SnapShotFormat.colSep + StaticHelpers.BufferString(activeCeNode, PopConst.Const.SnapShotFormat.lenActiveNode, BufferChar.Nbsp, BufferDirection.right)

      + PopConst.Const.SnapShotFormat.colSep + StaticHelpers.BufferString((stateOfScUiProxy.Meta.Flavor === SnapShotFlavor.Favorite ? '*' : ''), PopConst.Const.SnapShotFormat.lenFavorite, BufferChar.Nbsp, BufferDirection.right)
      //+ PopConst.Const.SnapShotFormat.colSep + StaticHelpers.BufferString((data.Flavor === SnapShotFlavor.Autosave ? 'A' : ' '), 1, BufferChar.Nbsp, BufferDirection.right)
      + PopConst.Const.SnapShotFormat.colSep + StaticHelpers.BufferString(Guid.AsShort(stateOfScUiProxy.Meta.SnapshotId), PopConst.Const.SnapShotFormat.lenShortId, BufferChar.Nbsp, BufferDirection.right);

    let count: string = "";

    if (
      stateOfScUiProxy
      &&
      stateOfScUiProxy.StateOfScWindow
      &&
      stateOfScUiProxy.StateOfScWindow.StateOfDesktop
      &&
      stateOfScUiProxy.StateOfScWindow.StateOfDesktop.StateOfDTArea
      &&
      stateOfScUiProxy.StateOfScWindow.StateOfDesktop.StateOfDTArea.StateOfDTFrames) {
      count = PopConst.Const.SnapShotFormat.colSep + StaticHelpers.BufferString(stateOfScUiProxy.StateOfScWindow.StateOfDesktop.StateOfDTArea.StateOfDTFrames.length.toString(), PopConst.Const.SnapShotFormat.lenCeCount, BufferChar.Nbsp, BufferDirection.right);
    } 
    toReturn = toReturn + count;

    return toReturn;
  }

  private BuildOneSnapshot(stateOfScUiProxy: IStateOfScUiProxy, prior: GuidData, idx: number): HTMLOptionElement {
    let el: HTMLOptionElement = <HTMLOptionElement>window.document.createElement('option');

    let timeNicknameFavStr = this.TimeNicknameFavStr(stateOfScUiProxy);

    el.innerHTML = timeNicknameFavStr;

    if (stateOfScUiProxy.Meta.Flavor === SnapShotFlavor.Favorite) {
      el.classList.add('favorite');
    }

    el.value = stateOfScUiProxy.Meta.SnapshotId.Raw;

    //data.Meta.SessionId &&
    if (( prior && stateOfScUiProxy.Meta.SnapshotId.Raw === prior.Raw) ||
      (idx === 0 && !prior)
      ||
      (idx === 0 && prior.Raw === Guid.GetEmptyGuid().Raw)

    ) {
      el.selected = true;
    }

    return el;
  }

  private AppendSnapShotToCorrectGroup(data: IStateOfScUiProxy, el: HTMLOptionElement, headers: ISelectionHeaders) {
    if (!StaticHelpers.IsNullOrUndefined([data, el, headers])) {
      if (data.Meta.Flavor === SnapShotFlavor.Autosave) {
        headers.Auto.appendChild(el);
      } else if (data.Meta.Flavor === SnapShotFlavor.Favorite) {
        headers.Favorite.appendChild(el);
      } else {
        headers.Manual.appendChild(el);
      }
    } else {
      this.ErrorHand.WarningAndContinue(this.AppendSnapShotToCorrectGroup.name, 'null in parameters');
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