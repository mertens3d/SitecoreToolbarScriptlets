import { RecipeBasicsForContent } from '../../../../../Shared/scripts/Classes/RecipeBasics';
import { InitResultsDTFrameProxy } from '../../../../../Shared/scripts/Interfaces/Agents/InitResultsDTFrameProxy';
import { ICommandHandlerDataForContent } from '../../../../../Shared/scripts/Interfaces/ICommandHandlerDataForContent';
import { ICommandRecipes } from '../../../../../Shared/scripts/Interfaces/ICommandRecipes';
import { ContentConst } from '../../../../../Shared/scripts/Interfaces/InjectConst';
import { IDTFrameProxy } from '../../../../../Shared/scripts/Interfaces/Proxies/IDesktopProxy';
import { FrameHelper } from '../../../Helpers/FrameHelper';
import { __RecipeBase } from '../__RecipeBase/__RecipeBase';

export class RecipeAddNewContentEditorToDesktop extends __RecipeBase implements ICommandRecipes {
  constructor(commandData: ICommandHandlerDataForContent) {
    super(commandData);

    this.Logger.InstantiateStart(RecipeAddNewContentEditorToDesktop.name);
    this.Logger.InstantiateEnd(RecipeAddNewContentEditorToDesktop.name);
  }

  Execute(): Promise<IDTFrameProxy> {
    return new Promise(async (resolve, reject) => {
      let allIframeDataAtBeginning: HTMLIFrameElement[];
      let dtframeProxy: IDTFrameProxy;
      let frameHelper = new FrameHelper(this.Logger, this.ContentBrowserProxy);
      let recipeBasics = new RecipeBasicsForContent(this.Logger, this.ContentBrowserProxy);

      allIframeDataAtBeginning = frameHelper.GetIFramesFromDataOneDoc(this.TargetDoc)

      await recipeBasics.RaceWaitAndClick(ContentConst.Const.Selector.SC.scStartButton, this.TargetDoc)
        .then(() => recipeBasics.WaitForThenClick([ContentConst.Const.Selector.SC.StartMenuLeftOption], this.TargetDoc))
        .then(() => recipeBasics.WaitForNewIframeContentEditor(allIframeDataAtBeginning, this.TargetDoc))
        .then((result: IDTFrameProxy) => dtframeProxy = result)
        .then(() => dtframeProxy.OnReadyInitDTFrameProxy())
        .then((result: InitResultsDTFrameProxy) => {
          return this.Logger.LogAsJsonPretty('InitResultsFrameProxy', result);
        })
        .then(() => resolve(dtframeProxy))
        .catch((err) => reject(this.Execute.name + ' ' + err));
    });
  }
}