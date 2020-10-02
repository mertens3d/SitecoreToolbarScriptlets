import { IDataOneDoc } from "../../../../../Shared/scripts/Interfaces/Data/IDataOneDoc";
import { _HindeCoreBase } from "../../../../../Shared/scripts/LoggableBase";
import { DTFrameProxy } from "./FrameProxies/DTFrameProxy";
import { FrameHelper } from "../../../Helpers/FrameHelper";
import { RecipeBasics } from "../../../../../Shared/scripts/Classes/RecipeBasics";
import { ContentConst } from "../../../../../Shared/scripts/Interfaces/InjectConst";
import { ReportResultsInitDTFrameProxy } from "../../../../../Shared/scripts/Interfaces/Agents/InitResultsDTFrameProxy";
//import { RecipeAddNewContentEditorToDesktop } from "../../../ContentApi/Recipes/RecipeAddContentEditorToDesktop";

export class DTPopUpMenuProxy extends _HindeCoreBase {

  RecipeAddNewContentEditorToDesktop(AssociatedDoc: IDataOneDoc): Promise<void> {
    return new Promise(async (resolve, reject) => {
    //let recipe = new RecipeAddNewContentEditorToDesktop(this.HindeCore, this.OwnerScWinProxy, this.AssociatedDoc);

    //await recipe.Execute()
    //  .catch((err) =>
    //}

      //Execute(): Promise<DTFrameProxy> {
      this.Logger.ThrowIfNullOrUndefined(this.RecipeAddNewContentEditorToDesktop.name, AssociatedDoc);

      let allIframeDataAtBeginning: HTMLIFrameElement[];
      let dtframeProxy: DTFrameProxy;
      let frameHelper = new FrameHelper(this.HindeCore);
      let recipeBasics = new RecipeBasics(this.HindeCore);

      allIframeDataAtBeginning = frameHelper.GetIFramesFromDataOneDoc(AssociatedDoc)

      await recipeBasics.WaitForThenClick([ContentConst.Const.Selector.SC.StartMenuLeftOption], AssociatedDoc)

        //.then(() => recipeBasics.WaitForNewIframeContentEditor(allIframeDataAtBeginning, AssociatedDoc))
        //.then((result: DTFrameProxy) => dtframeProxy = result)
        //.then(() => dtframeProxy.OnReadyInitDTFrameProxy())
        //.then((result: InitResultsDTFrameProxy) => {
        //  return this.Logger.LogAsJsonPretty('InitResultsFrameProxy', result);
        //})
        //.then(() => resolve(dtframeProxy))


        .catch((err) => reject(this.RecipeAddNewContentEditorToDesktop.name + ' ' + err));
    });
  }
}