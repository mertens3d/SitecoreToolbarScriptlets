import { RecipeBasics } from '../../../../../Shared/scripts/Classes/RecipeBasics';
import { ILoggerAgent } from '../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { IDataOneDoc } from '../../../../../Shared/scripts/Interfaces/Data/IDataOneDoc';
import { _BaseFrameProxy } from '../../../Proxies/_BaseFrameProxy';
import { ICommandRecipes } from '../../../../../Shared/scripts/Interfaces/ICommandRecipes';
import { ContentConst } from '../../../../../Shared/scripts/Interfaces/InjectConst';
import { DesktopStartBarProxy } from '../../../Proxies/Desktop/DesktopStartBarProxy/DesktopStartBarProxy';
import { LoggableBase } from '../../../Managers/LoggableBase';
import { FrameHelper } from '../../../Helpers/FrameHelper';
import { DTFrameProxy } from '../../../Proxies/DTFrameProxy';
import { InitResultsDTFrameProxy } from '../../../../../Shared/scripts/Interfaces/Agents/InitResultsDTFrameProxy';

export class RecipeAddNewContentEditorToDesktop extends LoggableBase implements ICommandRecipes {
  private TargetDoc: IDataOneDoc;
  DesktopTabButtonAgent: DesktopStartBarProxy;

  constructor(logger: ILoggerAgent, targetDoc: IDataOneDoc, ceButtonTabAgent: DesktopStartBarProxy) {
    super(logger);

    this.Logger.InstantiateStart(RecipeAddNewContentEditorToDesktop.name);
    this.TargetDoc = targetDoc;
    this.DesktopTabButtonAgent = ceButtonTabAgent;

    this.Logger.InstantiateEnd(RecipeAddNewContentEditorToDesktop.name);
  }

  Execute(): Promise<DTFrameProxy> {
    return new Promise(async (resolve, reject) => {
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