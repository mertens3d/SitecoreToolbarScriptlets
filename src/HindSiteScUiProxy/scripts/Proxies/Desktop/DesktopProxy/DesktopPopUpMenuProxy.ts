import { RecipeBasics } from "../../../../../Shared/scripts/Classes/RecipeBasics";
import { IDataOneDoc } from "../../../../../Shared/scripts/Interfaces/Data/IDataOneDoc";
import { ContentConst } from "../../../../../Shared/scripts/Interfaces/InjectConst";
import { _HindeCoreBase } from "../../../../../Shared/scripts/LoggableBase";
//import { RecipeAddNewContentEditorToDesktop } from "../../../ContentApi/Recipes/RecipeAddContentEditorToDesktop";

export class DTPopUpMenuProxy extends _HindeCoreBase {

  RecipeAddNewContentEditorToDesktop(AssociatedDoc: IDataOneDoc): Promise<void> {
    return new Promise(async (resolve, reject) => {

      this.ErrorHand.ThrowIfNullOrUndefined(this.RecipeAddNewContentEditorToDesktop.name, AssociatedDoc);
      let recipeBasics = new RecipeBasics(this.HindeCore);


      await recipeBasics.WaitForThenClick([ContentConst.Const.Selector.SC.StartMenuLeftOption], AssociatedDoc)
        .then(() => resolve())
        .catch((err) => reject(this.RecipeAddNewContentEditorToDesktop.name + ' ' + err));
    });
  }
}