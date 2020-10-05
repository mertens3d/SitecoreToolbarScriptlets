import { ContentConst } from "../../../../../Shared/scripts/Interfaces/InjectConst";
import { _HindeCoreBase } from "../../../../../Shared/scripts/LoggableBase";
import { ScDocumentFacade } from "../../ScDocumentFacade";
//import { RecipeAddNewContentEditorToDesktop } from "../../../ContentApi/Recipes/RecipeAddContentEditorToDesktop";

export class DTPopUpMenuProxy extends _HindeCoreBase {

  RecipeAddNewContentEditorToDesktop(scDocumentProxy: ScDocumentFacade): Promise<void> {
    return new Promise(async (resolve, reject) => {

      this.ErrorHand.ThrowIfNullOrUndefined(this.RecipeAddNewContentEditorToDesktop.name, scDocumentProxy);

      await scDocumentProxy.DocumentJacket.WaitForThenClick([ContentConst.Const.Selector.SC.StartMenuLeftOption])
        .then(() => resolve())
        .catch((err) => reject(this.RecipeAddNewContentEditorToDesktop.name + ' ' + err));
    });
  }
}