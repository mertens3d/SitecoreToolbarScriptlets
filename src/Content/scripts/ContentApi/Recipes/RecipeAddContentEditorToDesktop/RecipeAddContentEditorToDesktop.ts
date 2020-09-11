import { RecipeBasics } from '../../../../../Shared/scripts/Classes/RecipeBasics';
import { ILoggerAgent } from '../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { ISettingsAgent } from '../../../../../Shared/scripts/Interfaces/Agents/ISettingsAgent';
import { IDataOneDoc } from '../../../../../Shared/scripts/Interfaces/Data/IDataOneDoc';
import { FrameProxy } from '../../../../../Shared/scripts/Interfaces/Data/IDataOneIframe';
import { ICommandRecipes } from '../../../../../Shared/scripts/Interfaces/ICommandRecipes';
import { ContentConst } from '../../../../../Shared/scripts/Interfaces/InjectConst';
import { DesktopStartBarProxy } from '../../../Proxies/Desktop/DesktopStartBarProxy/DesktopStartBarProxy';
import { IframeHelper } from '../../../Helpers/IframeHelper';
import { LoggableBase } from '../../../Managers/LoggableBase';

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

  Execute(): Promise<FrameProxy> {
    return new Promise(async (resolve, reject) => {
      let allIframeDataAtBeginning: FrameProxy[];
      let newIframeProxy: FrameProxy;
      let iframeHelper = new IframeHelper(this.Logger, this.SettingsAgent);
      let recipeBasics = new RecipeBasics(this.Logger, this.SettingsAgent);


      await iframeHelper.GetHostedIframes(this.TargetDoc)
        .then((result) => allIframeDataAtBeginning = result)
        .catch((err) => reject(this.Execute.name + ' ' + err));


      await recipeBasics.RaceWaitAndClick(ContentConst.Const.Selector.SC.scStartButton, this.TargetDoc)
        .then(() => recipeBasics.WaitForThenClick([ContentConst.Const.Selector.SC.StartMenuLeftOption], this.TargetDoc))
        .then(() => recipeBasics.WaitForNewIframe(allIframeDataAtBeginning, this.TargetDoc))
        .then((result: FrameProxy) => newIframeProxy = result)
        .then(() => newIframeProxy.WaitForReady())
        .then(() => resolve(newIframeProxy))
        .catch((err) => reject(this.Execute.name + ' ' + err));
    });
  }
}