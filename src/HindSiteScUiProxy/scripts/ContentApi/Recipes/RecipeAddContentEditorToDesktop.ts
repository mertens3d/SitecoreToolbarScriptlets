import { RecipeBasics } from '../../../../Shared/scripts/Classes/RecipeBasics';
import { ILoggerAgent } from '../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { InitResultsDTFrameProxy } from '../../../../Shared/scripts/Interfaces/Agents/InitResultsDTFrameProxy';
import { IScWindowProxy } from '../../../../Shared/scripts/Interfaces/Agents/IScWindowManager/IScWindowManager';
import { ICommandRecipes } from '../../../../Shared/scripts/Interfaces/ICommandRecipes';
import { ContentConst } from '../../../../Shared/scripts/Interfaces/InjectConst';
import { FrameHelper } from '../../Helpers/FrameHelper';
import { DTFrameProxy } from '../../Proxies/Desktop/DesktopProxy/FrameProxies/DTFrameProxy';
import { _ApiRecipeBase } from './__RecipeBase/_ApiRecipeBase';
import { IDataOneDoc } from '../../../../Shared/scripts/Interfaces/Data/IDataOneDoc';

export class RecipeAddNewContentEditorToDesktop extends _ApiRecipeBase implements ICommandRecipes {
  constructor(logger: ILoggerAgent, scWinProxy: IScWindowProxy, targetDoc: IDataOneDoc) {
    super(logger);

    this.Logger.InstantiateStart(RecipeAddNewContentEditorToDesktop.name);
    this.TargetDoc = targetDoc;

    this.Logger.InstantiateEnd(RecipeAddNewContentEditorToDesktop.name);
  }

  Execute(): Promise<DTFrameProxy> {
    return new Promise(async (resolve, reject) => {
      this.Logger.IfNullOrUndefinedThrow(RecipeAddNewContentEditorToDesktop.name, this.TargetDoc);

      let allIframeDataAtBeginning: HTMLIFrameElement[];
      let dtframeProxy: DTFrameProxy;
      let frameHelper = new FrameHelper(this.Logger);
      let recipeBasics = new RecipeBasics(this.Logger);

      allIframeDataAtBeginning = frameHelper.GetIFramesFromDataOneDoc(this.TargetDoc)

      await recipeBasics.RaceWaitAndClick(ContentConst.Const.Selector.SC.scStartButton, this.TargetDoc)
        .then(() => recipeBasics.WaitForThenClick([ContentConst.Const.Selector.SC.StartMenuLeftOption], this.TargetDoc))
        .then(() => recipeBasics.WaitForNewIframeContentEditor(allIframeDataAtBeginning, this.TargetDoc))
        .then((result: DTFrameProxy) => dtframeProxy = result)
        .then(() => dtframeProxy.OnReadyInitDTFrameProxy())
        .then((result: InitResultsDTFrameProxy) => {
          return this.Logger.LogAsJsonPretty('InitResultsFrameProxy', result);
        })
        .then(() => resolve(dtframeProxy))
        .catch((err) => reject(this.Execute.name + ' ' + err));
    });
  }
}