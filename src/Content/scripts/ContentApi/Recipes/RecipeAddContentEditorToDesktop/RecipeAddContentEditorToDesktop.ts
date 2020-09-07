import { IDataOneIframe } from '../../../../../Shared/scripts/Interfaces/Data/IDataOneIframe';
import { ICommandRecipes } from '../../../../../Shared/scripts/Interfaces/ICommandRecipes';
import { ContentConst } from '../../../../../Shared/scripts/Interfaces/InjectConst';
import { ContentEditorAgent } from '../../../Agents/ContentEditorAgent/ContentEditorAgent';
import { __RecipeBase } from '../__RecipeBase/__RecipeBase';
import { IframeHelper } from '../../../Helpers/IframeHelper';
import { LoggableBase } from '../../../Managers/LoggableBase';
import { ILoggerAgent } from '../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { ISettingsAgent } from '../../../../../Shared/scripts/Interfaces/Agents/ISettingsAgent';
import { IDataOneDoc } from '../../../../../Shared/scripts/Interfaces/Data/IDataOneDoc';
import { RecipeBasics } from '../../../../../Shared/scripts/Classes/RecipeBasics';

export class RecipeAddNewContentEditorToDesktop extends LoggableBase implements ICommandRecipes {
  private SettingsAgent: ISettingsAgent;
  private TargetDoc: IDataOneDoc;
  private TargetCeAgent: ContentEditorAgent;

  constructor(logger: ILoggerAgent, settingsAgent: ISettingsAgent, targetDoc: IDataOneDoc, targetCeAgent: ContentEditorAgent) {
    super(logger);
    this.SettingsAgent = settingsAgent;
    this.TargetDoc = targetDoc;
    this.TargetCeAgent = targetCeAgent;
  }

  Execute(): Promise<void> {
    return new Promise((resolve, reject) => {
      let allIframeDataAtBeginning: IDataOneIframe[];
      let newIframe: IDataOneIframe;
      let iframeHelper = new IframeHelper(this.Logger);

      let recipeBasics = new RecipeBasics(this.Logger);

      iframeHelper.GetHostedIframes(this.TargetDoc)
        .then((result) => allIframeDataAtBeginning = result)
        .then(() => recipeBasics.RaceWaitAndClick(ContentConst.Const.Selector.SC.scStartButton, this.TargetDoc))
        .then(() => recipeBasics.WaitForThenClick([ContentConst.Const.Selector.SC.StartMenuLeftOption], this.TargetDoc))
        .then(() => recipeBasics.WaitForNewIframe(allIframeDataAtBeginning, this.TargetDoc))
        .then((result) => newIframe = result)
        .then(() => recipeBasics.WaitForReadyIframe(newIframe))
        .then(() => this.TargetCeAgent = new ContentEditorAgent(newIframe.ContentDoc, this.Logger, this.SettingsAgent)) //todo - I don't think this is needed. Although we probably should trigger a rebuild of the ScWinMan/DesktopProxy...or notify it...or ask it to create it to begin with.
        .then(() => resolve())
        .catch((err) => reject(this.Execute.name + ' ' + err));
    });
  }
}