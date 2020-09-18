import { IUiModule } from "../../../../Shared/scripts/Interfaces/Agents/IUiModule";
import { _baseButtonModule } from "./_baseButtonModule";
import { ModuleKey } from "../../../../Shared/scripts/Enums/ModuleKey";
import { IDataStateOfSitecoreWindow } from "../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfSitecoreWindow";
import { GuidData } from "../../../../Shared/scripts/Helpers/GuidData";
import { PopConst } from "../../Classes/PopConst";

export class InputButtonModule extends _baseButtonModule implements IUiModule {
  ModuleKey = ModuleKey.InputButton;

  DrawCorrectNicknameInUI() {
    this.Logger.FuncStart(this.DrawCorrectNicknameInUI.name);

    let snapShots: IDataStateOfSitecoreWindow[] = this.RefreshData.StateOfStorageSnapShots.SnapShots;

    var targetId: GuidData = this.RefreshData.SelectSnapShotId;

    if (targetId) {
      this.Logger.Log('targetId : ' + targetId.Raw);

      var storageValues = snapShots;

      if (storageValues) {
        var storageMatch;

        for (var idx = 0; idx < storageValues.length; idx++) {
          var candidate = storageValues[idx];
          if (candidate.Meta.SnapshotId.Raw === this.RefreshData.SelectSnapShotId.Raw) {
            storageMatch = candidate;
            break;
          }
        }

        if (storageMatch) {
          var inputElem = <HTMLInputElement>window.document.getElementById(PopConst.Const.ElemId.InputNickname);
          if (inputElem) {
            inputElem.value = storageMatch.NickName;
          }
        }
      } else {
        this.Logger.WarningAndContinue(this.DrawCorrectNicknameInUI.name, 'null storage values');
      }
    }
    this.Logger.FuncEnd(this.DrawCorrectNicknameInUI.name);
  }

}
