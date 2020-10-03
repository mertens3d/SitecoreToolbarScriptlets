import { ContentConst } from "../../../../../Shared/scripts/Interfaces/InjectConst";
import { _HindeCoreBase } from "../../../../../Shared/scripts/LoggableBase";
import { ScDocumentProxy } from "../../ScDocumentProxy";
//import { RecipeAddNewContentEditorToDesktop } from "../../../ContentApi/Recipes/RecipeAddContentEditorToDesktop";

export class DTPopUpMenuProxy extends _HindeCoreBase {

  RecipeAddNewContentEditorToDesktop(AssociatedDoc: ScDocumentProxy): Promise<void> {
    return new Promise(async (resolve, reject) => {

      this.ErrorHand.ThrowIfNullOrUndefined(this.RecipeAddNewContentEditorToDesktop.name, AssociatedDoc);

      await AssociatedDoc.WaitForThenClick([ContentConst.Const.Selector.SC.StartMenuLeftOption])
        .then(() => resolve())
        .catch((err) => reject(this.RecipeAddNewContentEditorToDesktop.name + ' ' + err));
    });
  }
}