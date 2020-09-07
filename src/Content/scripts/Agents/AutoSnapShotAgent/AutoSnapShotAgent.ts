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
import { RecipeSaveState } from "../../ContentApi/Recipes/RecipeSaveState/RecipeSaveState";
import { ScUiManager } from "../../Managers/SitecoreUiManager/SitecoreUiManager";
import { CommandHndlrDataForContent } from "../../../../Shared/scripts/Classes/CommandHndlrDataForContent/CommandHndlrDataForContent";

export class AutoSnapShotAgent {
  private SettingsAgent: ISettingsAgent;
  private Logger: ILoggerAgent;
  private AutoSaveHasBeenScheduled: boolean = false;
  private ScWinMan: IScWindowManager;
  private AtticAgent: IContentAtticAgent;
  private ScUiMan: ScUiManager;
  private ToastAgent: IToastAgent;

  constructor(logger: ILoggerAgent, settingsAgent: ISettingsAgent, scWinMan: IScWindowManager,
    atticAgent: IContentAtticAgent, scUiMan: ScUiManager,  toastAgent: IToastAgent
  ) {
    this.Logger = logger;
    this.SettingsAgent = settingsAgent;
    this.ScWinMan = scWinMan;
    this.AtticAgent = atticAgent;
    this.ScUiMan = scUiMan;
    this.ToastAgent = toastAgent;
  }

  async AutoSaveSnapShot() {
    this.Logger.FuncStart(this.AutoSaveSnapShot.name);

    let commandData: ICommandHndlrDataForContent = new CommandHndlrDataForContent(this.Logger, this.AtticAgent, this.ScWinMan, this.ToastAgent, this.ScUiMan, this.SettingsAgent);

    commandData.TargetSnapShotFlavor= SnapShotFlavor.Autosave;

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