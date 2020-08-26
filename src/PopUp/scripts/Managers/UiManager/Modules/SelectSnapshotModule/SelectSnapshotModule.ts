import { StaticHelpers } from "../../../../../../Shared/scripts/Classes/StaticHelpers";
import { BufferChar } from "../../../../../../Shared/scripts/Enums/BufferChar";
import { BufferDirection } from "../../../../../../Shared/scripts/Enums/BufferDirection";
import { SnapShotFlavor } from "../../../../../../Shared/scripts/Enums/SnapShotFlavor";
import { ILoggerAgent } from "../../../../../../Shared/scripts/Interfaces/Agents/ILoggerBase";
import { IDataOneWindowStorage } from "../../../../../../Shared/scripts/Interfaces/IDataOneWindowStorage";
import { IGuid } from "../../../../../../Shared/scripts/Interfaces/IGuid";
import { IGuidHelper } from "../../../../../../Shared/scripts/Interfaces/IGuidHelper";
import { ISelectionHeaders } from "../../../../../../Shared/scripts/Interfaces/ISelectionHeaders";
import { PopConst } from "../../../../Classes/PopConst";
import { IUiModule } from "../../../../../../Shared/scripts/Interfaces/Agents/IUiModule";
import { IContentState } from "../../../../../../Shared/scripts/Interfaces/IContentState/IContentState";

export class SelectSnapshotModule implements IUiModule {
  ContentState: IContentState;

  private __logger: ILoggerAgent;
  private __selector: string;
  SelectSnapshotId: IGuid;
  private __guidHelper: IGuidHelper;

  constructor(selector: string, logger: ILoggerAgent, guidHelper: IGuidHelper) {
    this.__selector = selector;
    this.__logger = logger;
    this.__guidHelper = guidHelper;
  }

  Init(): void {
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
    let toReturn: string = StaticHelpers.BufferString('Time Stamp', PopConst.Const.SnapShotFormat.lenTimestamp, BufferChar.Period, BufferDirection.right)
      + PopConst.Const.SnapShotFormat.colSep + StaticHelpers.BufferString('Type', PopConst.Const.SnapShotFormat.lenPageType, BufferChar.Period, BufferDirection.right)
      + PopConst.Const.SnapShotFormat.colSep + StaticHelpers.BufferString('Nickname', PopConst.Const.SnapShotFormat.lenNickname, BufferChar.Period, BufferDirection.right)
      + PopConst.Const.SnapShotFormat.colSep + StaticHelpers.BufferString('Active Node.', PopConst.Const.SnapShotFormat.lenActiveNode, BufferChar.Period, BufferDirection.right)
      + PopConst.Const.SnapShotFormat.colSep + StaticHelpers.BufferString('Fav.', PopConst.Const.SnapShotFormat.lenFavorite, BufferChar.Period, BufferDirection.right)
      + PopConst.Const.SnapShotFormat.colSep + StaticHelpers.BufferString('Id', PopConst.Const.SnapShotFormat.lenShortId, BufferChar.Period, BufferDirection.right)
      + PopConst.Const.SnapShotFormat.colSep + StaticHelpers.BufferString('#CE', PopConst.Const.SnapShotFormat.lenCeCount, BufferChar.Period, BufferDirection.right);
    return toReturn;
  }

  WriteHeaders(targetSel: HTMLSelectElement) {
    var toReturn: ISelectionHeaders = {
      Auto: null,
      Favorite: null,
      AutoTitle: null,
      FavoriteTitle: null,
    }

    toReturn.Auto = <HTMLOptGroupElement>window.document.createElement('optgroup');
    toReturn.Auto.label = this.SelectHeaderStr('');
    toReturn.Auto.id = PopConst.Const.ElemId.HS.SelectHeaderAuto;

    toReturn.AutoTitle = <HTMLOptGroupElement>window.document.createElement('optgroup');
    toReturn.AutoTitle.label = 'Auto Snap Shots';
    toReturn.AutoTitle.id = PopConst.Const.ElemId.HS.SelectHeaderAutoTitle;
    toReturn.AutoTitle.classList.add('title');

    toReturn.Favorite = <HTMLOptGroupElement>window.document.createElement('optgroup');
    toReturn.Favorite.label = this.SelectHeaderStr('');
    toReturn.Favorite.id = PopConst.Const.ElemId.HS.SelectHeaderFavorite;

    toReturn.FavoriteTitle = <HTMLOptGroupElement>window.document.createElement('optgroup');
    toReturn.FavoriteTitle.label = 'Typical Snap Shots';
    toReturn.FavoriteTitle.id = PopConst.Const.ElemId.HS.SelectHeaderFavoriteTitle;
    toReturn.FavoriteTitle.classList.add('title');

    return toReturn;
  }

  SelectChanged(): void {
    this.__logger.FuncStart(this.SelectChanged.name);
    this.SelectSnapshotId = this.__guidHelper.ParseGuid(this.__getSelectElem().value, true);
    //this.debug().Log('new index :' + this.__selectSnapshotId);

    //if (e.ctrlKey) {
    //  alert
    //}

    this.__logger.FuncEnd(this.SelectChanged.name);
  }

  private PopulateStateOfSnapShotSelect() {
    this.__logger.FuncStart(this.PopulateStateOfSnapShotSelect.name);

    //contentState.SnapShotsMany.CurrentSnapShots

    if (this.ContentState.SnapShotsMany.CurrentSnapShots) {
      let snapShots: IDataOneWindowStorage[] = this.ContentState.SnapShotsMany.CurrentSnapShots;

      if (snapShots) {
        var targetSel: HTMLSelectElement = this.__getSelectElem();

        if (targetSel) {
          this.CleanExistingSelection(targetSel);
          var headers: ISelectionHeaders = this.WriteHeaders(targetSel);

          if (snapShots && snapShots.length > 0) {
            this.__logger.Log('targetSel.options.length : ' + targetSel.options.length);

            for (var idx: number = 0; idx < snapShots.length; idx++) {
              this.__logger.Log('snapShots:' + idx + ":" + snapShots.length);

              var data = snapShots[idx];

              var el = <HTMLOptionElement>window.document.createElement('option');
              el.innerHTML = data.TimeNicknameFavStr;

              if (data.Flavor === SnapShotFlavor.Favorite) {
                el.classList.add('favorite');
              }

              el.value = data.Id.AsString;
              this.__logger.LogVal('data.Id:', data.Id);
              this.__logger.LogVal('this.CurrentMenuState.SelectSnapshotId:', this.SelectSnapshotId);

              if (data.Id && this.SelectSnapshotId) {
                if (data.Id.AsString === this.SelectSnapshotId.AsString) {
                  this.__logger.LogVal("selected", data.Id.AsString);
                  el.selected = true;
                }
              }
              if (data.Flavor === SnapShotFlavor.Autosave) {
                headers.Auto.appendChild(el);
              } else {
                headers.Favorite.appendChild(el);
              }
            }
          }

          targetSel.appendChild(headers.FavoriteTitle);
          targetSel.appendChild(headers.Favorite);
          targetSel.appendChild(headers.AutoTitle);
          targetSel.appendChild(headers.Auto);

          if (!this.SelectSnapshotId || this.SelectSnapshotId === this.__guidHelper.EmptyGuid()) {
            targetSel.selectedIndex = 0;
          }
        }
      }
    }
    this.__logger.FuncEnd(this.PopulateStateOfSnapShotSelect.name);
  }

  CleanExistingSelection(targetSel: HTMLSelectElement) {
    var optGroup = targetSel.querySelector('[id=' + PopConst.Const.ElemId.HS.SelectHeaderAutoTitle + ']')
    if (optGroup) {
      optGroup.remove();
    }

    optGroup = targetSel.querySelector('[id=' + PopConst.Const.ElemId.HS.SelectHeaderAuto + ']')
    if (optGroup) {
      optGroup.remove();
    }
    optGroup = targetSel.querySelector('[id=' + PopConst.Const.ElemId.HS.SelectHeaderFavorite + ']')
    if (optGroup) {
      optGroup.remove();
    }

    optGroup = targetSel.querySelector('[id=' + PopConst.Const.ElemId.HS.SelectHeaderFavoriteTitle + ']')
    if (optGroup) {
      optGroup.remove();
    }

    targetSel.options.length = 0;
  }
}