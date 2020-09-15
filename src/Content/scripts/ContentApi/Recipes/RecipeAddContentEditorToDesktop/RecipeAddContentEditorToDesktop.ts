import { RecipeBasics } from '../../../../../Shared/scripts/Classes/RecipeBasics';
import { ILoggerAgent } from '../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { ISettingsAgent, InitResultsCEFrameProxy } from '../../../../../Shared/scripts/Interfaces/Agents/ISettingsAgent';
import { IDataOneDoc } from '../../../../../Shared/scripts/Interfaces/Data/IDataOneDoc';
import { _BaseFrameProxy } from '../../../Proxies/_BaseFrameProxy';
import { ICommandRecipes } from '../../../../../Shared/scripts/Interfaces/ICommandRecipes';
import { ContentConst } from '../../../../../Shared/scripts/Interfaces/InjectConst';
import { DesktopStartBarProxy } from '../../../Proxies/Desktop/DesktopStartBarProxy/DesktopStartBarProxy';
import { LoggableBase } from '../../../Managers/LoggableBase';
import { FrameHelper } from '../../../Helpers/IframeHelper';
import { CEFrameProxy } from '../../../Proxies/CEFrameProxy';

export class RecipeAddNewContentEditorToDesktop extends LoggableBase implements ICommandRecipes {
  private TargetDoc: IDataOneDoc;
  private SettingsAgent: ISettingsAgent;
  DesktopTabButtonAgent: DesktopStartBarProxy;

  constructor(logger: ILoggerAgent, targetDoc: IDataOneDoc, settingsAgent: ISettingsAgent, ceButtonTabAgent: DesktopStartBarProxy) {
    super(logger);

    this.Logger.InstantiateStart(RecipeAddNewContentEditorToDesktop.name);
    this.TargetDoc = targetDoc;
    this.SettingsAgent = settingsAgent;
    this.DesktopTabButtonAgent = ceButtonTabAgent;

    this.Logger.InstantiateEnd(RecipeAddNewContentEditorToDesktop.name);
  }

  Execute(): Promise<CEFrameProxy> {
    return new Promise(async (resolve, reject) => {
      let allIframeDataAtBeginning: HTMLIFrameElement[];
      let ceframeProxy: CEFrameProxy;
      let frameHelper = new FrameHelper(this.Logger);
      let recipeBasics = new RecipeBasics(this.Logger);

      allIframeDataAtBeginning = frameHelper.GetIFramesFromDataOneDoc(this.TargetDoc)

      await recipeBasics.RaceWaitAndClick(ContentConst.Const.Selector.SC.scStartButton, this.TargetDoc)
        .then(() => recipeBasics.WaitForThenClick([ContentConst.Const.Selector.SC.StartMenuLeftOption], this.TargetDoc))
        .then(() => recipeBasics.WaitForNewIframeContentEditor(allIframeDataAtBeginning, this.TargetDoc))
        .then((result: CEFrameProxy) => ceframeProxy = result)
        .then(() => ceframeProxy.OnReadyInitCEFrameProxy())
        .then((result: InitResultsCEFrameProxy) => this.Logger.LogAsJsonPretty('InitResultsFrameProxy', result))
        .then(() => resolve(ceframeProxy))
        .catch((err) => reject(this.Execute.name + ' ' + err));
    });
  }
}