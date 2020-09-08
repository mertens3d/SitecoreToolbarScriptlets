import { RecipeBasics } from '../../../../../Shared/scripts/Classes/RecipeBasics';
import { ILoggerAgent } from '../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { IDataOneDoc } from '../../../../../Shared/scripts/Interfaces/Data/IDataOneDoc';
import { IframeProxy } from '../../../../../Shared/scripts/Interfaces/Data/IDataOneIframe';
import { ICommandRecipes } from '../../../../../Shared/scripts/Interfaces/ICommandRecipes';
import { ContentConst } from '../../../../../Shared/scripts/Interfaces/InjectConst';
import { IframeHelper } from '../../../Helpers/IframeHelper';
import { LoggableBase } from '../../../Managers/LoggableBase';
import { ContentEditorProxy } from '../../../Proxies/ContentEditor/ContentEditorProxy/ContentEditorProxy';
import { ISettingsAgent } from '../../../../../Shared/scripts/Interfaces/Agents/ISettingsAgent';
import { CeTabButtonAgent } from '../../../Agents/CeTabButtonAgent/CeTabButtonAgent';

export class RecipeAddNewContentEditorToDesktop extends LoggableBase implements ICommandRecipes {
  private TargetDoc: IDataOneDoc;
  private SettingsAgent: ISettingsAgent;
    CeTabButtonAgent: CeTabButtonAgent;

  constructor(logger: ILoggerAgent, targetDoc: IDataOneDoc, settingsAgent: ISettingsAgent, ceButtonTabAgent: CeTabButtonAgent) {
    super(logger);
    this.TargetDoc = targetDoc;
    this.SettingsAgent = settingsAgent;
    this.CeTabButtonAgent = ceButtonTabAgent;
  }

  Execute(): Promise<ContentEditorProxy> {
    return new Promise((resolve, reject) => {
      let allIframeDataAtBeginning: IframeProxy[];
      let newIframeProxy: IframeProxy;
      let iframeHelper = new IframeHelper(this.Logger);
      let recipeBasics = new RecipeBasics(this.Logger);

      iframeHelper.GetHostedIframes(this.TargetDoc)
        .then((result) => allIframeDataAtBeginning = result)
        .then(() => recipeBasics.RaceWaitAndClick(ContentConst.Const.Selector.SC.scStartButton, this.TargetDoc))
        .then(() => recipeBasics.WaitForThenClick([ContentConst.Const.Selector.SC.StartMenuLeftOption], this.TargetDoc))
        .then(() => recipeBasics.WaitForNewIframe(allIframeDataAtBeginning, this.TargetDoc))
        .then((result: IframeProxy) => newIframeProxy = result)
        .then(() => recipeBasics.WaitForReadyIframe(newIframeProxy))
        //.then(() => this.TargetCeAgent = new ContentEditorProxy(newIframe.ContentDoc, this.Logger, this.SettingsAgent)) //todo - I don't think this is needed. Although we probably should trigger a rebuild of the ScWinMan/DesktopProxy...or notify it...or ask it to create it to begin with.
        //.then(() => this.TargetCeAgent.WaitForReadyAssociatedDocandInit())
        .then((result) => {
          let toReturn = new ContentEditorProxy(result.GetContentDoc(), this.Logger, this.SettingsAgent)
          resolve(toReturn);
        })
        .catch((err) => reject(this.Execute.name + ' ' + err));
    });
  }
}