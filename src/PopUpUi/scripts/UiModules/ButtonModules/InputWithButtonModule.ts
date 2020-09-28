import { ModuleKey } from "../../../../Shared/scripts/Enums/ModuleKey";
import { GuidData } from "../../../../Shared/scripts/Helpers/GuidData";
import { IUiModuleButton } from "../../../../Shared/scripts/Interfaces/Agents/IUiModuleButton";
import { IDataStateOfLiveHindSite } from "../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfSitecoreWindow";
import { SharedConst } from "../../../../Shared/scripts/SharedConst";
import { _base_ButtonModule } from "./_baseButtonModule";

export class InputWithButtonModule extends _base_ButtonModule implements IUiModuleButton {
  ModuleKey = ModuleKey.ButtonWithInput;
  private InputElement: HTMLInputElement;

  WireEvents_Module(): void {
    this.WireEvents_Base();
  }

  Init_Module(): void {
    this.Init_BaseButtonModule();
  }

  BuildHtmlForModule() {
    this.BuildHtmlForModule_base_ButtonModule();
    
    this.InputElement = <HTMLInputElement>document.createElement(SharedConst.Const.KeyWords.Html.Input);
    this.InputElement.type = SharedConst.Const.KeyWords.Html.Text;
    this.InputElement.placeholder = "Set Nick Name";
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

  RefreshUi_Module(): void {
    this.DrawCorrectNicknameInUI();
  }

  DrawCorrectNicknameInUI() {
    this.Logger.FuncStart(this.DrawCorrectNicknameInUI.name);

    let snapShots: IDataStateOfLiveHindSite[] = this.RefreshData.StateOfStorageSnapShots.SnapShots;

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