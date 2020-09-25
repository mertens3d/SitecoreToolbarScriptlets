import { ScWindowType } from '../../../../Shared/scripts/Enums/scWindowType';
import { IToastAgent } from '../../../../Shared/scripts/Interfaces/Agents/IToastAgent';
import { IDataStateOfSitecoreWindow } from "../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfSitecoreWindow";
import { ICommandHandlerDataForContent } from "../../../../Shared/scripts/Interfaces/ICommandHandlerDataForContent";
import { IContentEditorProxy } from "../../../../Shared/scripts/Interfaces/Proxies/IDesktopProxy";
import { __RecipeBase } from "../../ContentApi/Recipes/__RecipeBase/__RecipeBase";

export class ScWindowRecipePartials extends __RecipeBase  {
  ToastAgent: IToastAgent;

  constructor(commanddata: ICommandHandlerDataForContent) {
    super(commanddata);
  }

  async RestoreStateToTargetDoc(dataToRestore: IDataStateOfSitecoreWindow, OneCEAgent: IContentEditorProxy): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.RestoreStateToTargetDoc.name);

      if (dataToRestore) {
        if (dataToRestore.Meta.WindowType == ScWindowType.Desktop) {
          await this.DesktopProxy.SetStateOfDesktop(dataToRestore.ScWindowStates.StateOfDesktop, this.CommandData)
            .then(() => this.ToastAgent.RaiseToastNotification(this.TargetDoc, 'Restore Completed'))
            .then(() => resolve())
            .catch((err) => reject(this.RestoreStateToTargetDoc.name + ' | ' + err));
        }
        else if (dataToRestore.Meta.WindowType === ScWindowType.ContentEditor) {
          await OneCEAgent.SetStateOfContentEditor(dataToRestore.ScWindowStates.StateOfContentEditor)
            .then(() => this.ToastAgent.RaiseToastNotification(this.TargetDoc, 'Restore Completed'))
            .then(() => resolve())
            .catch((err) => reject(err));
        }
        else {
          reject(this.RestoreStateToTargetDoc.name + 'Data not restored. Not in Desktop or Content Editor');
        }
      }
      else {
        this.Logger.WarningAndContinue(this.RestoreStateToTargetDoc.name, " No data found to restore");
        resolve();
      }

      reject(this.RestoreStateToTargetDoc.name + ' : unknown reason');

      this.Logger.FuncEnd(this.RestoreStateToTargetDoc.name);
    });
  }
}