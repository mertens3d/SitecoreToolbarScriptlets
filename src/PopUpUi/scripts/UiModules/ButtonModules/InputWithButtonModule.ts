import { IUiModule } from "../../../../Shared/scripts/Interfaces/Agents/IUiModule";
import { IUiModuleButton } from "../../../../Shared/scripts/Interfaces/Agents/IUiModuleButton";
import { _base_ButtonModule } from "./_baseButtonModule";
import { ModuleKey } from "../../../../Shared/scripts/Enums/ModuleKey";
import { IDataStateOfSitecoreWindow } from "../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfSitecoreWindow";
import { GuidData } from "../../../../Shared/scripts/Helpers/GuidData";
import { PopConst } from "../../Classes/PopConst";
import { SharedConst } from "../../../../Shared/scripts/SharedConst";

export class InputWithButtonModule extends _base_ButtonModule implements IUiModuleButton {
  ModuleKey = ModuleKey.ButtonWithInput;
  private InputElement: HTMLInputElement;

  WireEvents_Module(): void {
    this.WireEvents_Base();
  }

  Init(): void {
    this.Init_BaseButtonModule();
    this.BuildElements();
  }

  private BuildElements() {
    this.InputElement = <HTMLInputElement>document.createElement(SharedConst.Const.KeyWords.Html.Input);
    this.InputElement.type = SharedConst.Const.KeyWords.Html.Text;
    this.InputElement.placeholder = "Nick Name";
    this.InputElement.value = '';

    if (this.ContainerUiDivElem) {
      this.ContainerUiDivElem.insertBefore(this.InputElement, this.HTMLButtonElement);
    }
  }

  GetInputValue(): string {
    let toReturn: string = "";
    if (this.InputElement) {
      toReturn = this.InputElement.value;
    }

    return toReturn;
  }

  RefreshUi(): void {
    //if (this.InputElement) {
    //  this.InputElement.value = this.RefreshData.SelectSnapShotNickname;
    //}
    this.DrawCorrectNicknameInUI();
  }

  DrawCorrectNicknameInUI() {
    this.Logger.FuncStart(this.DrawCorrectNicknameInUI.name);

    let snapShots: IDataStateOfSitecoreWindow[] = this.RefreshData.StateOfStorageSnapShots.SnapShots;

    var targetId: GuidData = this.RefreshData.SelectSnapShotId;

    if (targetId) {
      this.Logger.Log('targetId : ' + targetId.Raw);

      var storageValues = snapShots;

      if (storageValues) {

        for (var idx = 0; idx < storageValues.length; idx++) {
          var candidate = storageValues[idx];
          //this.Logger.LogAsJsonPretty('candidate', candidate);
          if (candidate.Meta.SnapshotId.Raw === this.RefreshData.SelectSnapShotId.Raw) {
            this.Logger.Log('found one');
            if (this.InputElement) {
              this.InputElement.value = candidate.Friendly.NickName;

              break;
            }
          }
        }
      }
      else {
        this.Logger.WarningAndContinue(this.DrawCorrectNicknameInUI.name, 'null storage values');
      }
    } else {
      this.Logger.Log('No targetId');
    }
    this.Logger.FuncEnd(this.DrawCorrectNicknameInUI.name);
  }
}