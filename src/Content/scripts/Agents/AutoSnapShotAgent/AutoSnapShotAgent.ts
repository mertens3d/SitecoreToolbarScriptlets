import { RecipeBasics } from "../../../../Shared/scripts/Classes/RecipeBasics";
import { StaticHelpers } from "../../../../Shared/scripts/Classes/StaticHelpers";
import { SettingKey } from "../../../../Shared/scripts/Enums/3xxx-SettingKey";
import { SnapShotFlavor } from "../../../../Shared/scripts/Enums/SnapShotFlavor";
import { IContentAtticAgent } from "../../../../Shared/scripts/Interfaces/Agents/IContentAtticAgent/IContentAtticAgent";
import { IGenericSetting } from "../../../../Shared/scripts/Interfaces/Agents/IGenericSetting";
import { ILoggerAgent } from "../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IScWindowManager } from "../../../../Shared/scripts/Interfaces/Agents/IScWindowManager/IScWindowManager";
import { ISettingsAgent } from "../../../../Shared/scripts/Interfaces/Agents/ISettingsAgent";
import { IToastAgent } from "../../../../Shared/scripts/Interfaces/Agents/IToastAgent";
import { ICommandHndlrDataForContent } from "../../../../Shared/scripts/Interfaces/ICommandHndlrDataForContent";
import { RecipeSaveState } from "../../Managers/ContentAPIManager/Recipes/RecipeSaveState/RecipeSaveState";
import { SitecoreUiManager } from "../../Managers/SitecoreUiManager/SitecoreUiManager";

export class AutoSnapShotAgent {
  private SettingsAgent: ISettingsAgent;
  private Logger: ILoggerAgent;
  private AutoSaveHasBeenScheduled: boolean = false;
  private ScWinMan: IScWindowManager;
  private AtticAgent: IContentAtticAgent;
  private ScUiMan: SitecoreUiManager;
  private  RecipeBasics: RecipeBasics;
   private ToastAgent: IToastAgent;

  constructor(logger: ILoggerAgent, settingsAgent: ISettingsAgent, scWinMan: IScWindowManager,
    atticAgent: IContentAtticAgent, scUiMan: SitecoreUiManager, recipeBasics: RecipeBasics, toastAgent: IToastAgent
  ) {
    this.Logger = logger;
    this.SettingsAgent = settingsAgent;
    this.ScWinMan = scWinMan;
    this.AtticAgent = atticAgent;
    this.ScUiMan = scUiMan;
    this.RecipeBasics = recipeBasics;
    this.ToastAgent = toastAgent;
  }

  async AutoSaveSnapShot() {
    this.Logger.FuncStart(this.AutoSaveSnapShot.name);

    let commandData: ICommandHndlrDataForContent = {
      AtticAgent: this.AtticAgent,
      TargetNickName: '',
      TargetSnapShotId: null,
      ContentMessageBroker: null,
      TopLevelDoc: this.ScWinMan.TopLevelDoc(),
      Logger: this.Logger,
      RecipeBasics: this.RecipeBasics,
      ToastAgent: this.ToastAgent,
      ScUiMan: this.ScUiMan,
      ScWinMan: this.ScWinMan,
      TargetSnapShotFlavor: SnapShotFlavor.Autosave
    }
    let recipeSaveState: RecipeSaveState = new RecipeSaveState(commandData);

    await recipeSaveState.Execute();

    this.Logger.FuncEnd(this.AutoSaveSnapShot.name);
  }

  ScheduleIntervalTasks() {
    this.Logger.FuncStart(this.ScheduleIntervalTasks.name);
    this.Logger.LogVal('Has been scheduled: ', this.AutoSaveHasBeenScheduled)

    let autoSaveSetting: IGenericSetting = this.SettingsAgent.GetByKey(SettingKey.AutoSaveIntervalMin)
    this.Logger.LogVal('autoSaveSetting: ', autoSaveSetting.ValueAsInt());

    if (autoSaveSetting.ValueAsInt() > 0) {
      if (!this.AutoSaveHasBeenScheduled) {
        var self = this;

        var intervalMs = StaticHelpers.MinToMs(autoSaveSetting.ValueAsInt());

        window.setInterval(() => {
          self.AutoSaveSnapShot();
        }, intervalMs)

        this.AutoSaveHasBeenScheduled = true;
      }
    }
    this.Logger.FuncEnd(this.ScheduleIntervalTasks.name);
  }
}