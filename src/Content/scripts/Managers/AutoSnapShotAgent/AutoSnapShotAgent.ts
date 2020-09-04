import { StaticHelpers } from "../../../../Shared/scripts/Classes/StaticHelpers";
import { SettingKey } from "../../../../Shared/scripts/Enums/3xxx-SettingKey";
import { scWindowType } from "../../../../Shared/scripts/Enums/scWindowType";
import { SnapShotFlavor } from "../../../../Shared/scripts/Enums/SnapShotFlavor";
import { IGenericSetting } from "../../../../Shared/scripts/Interfaces/Agents/IGenericSetting";
import { ILoggerAgent } from "../../../../Shared/scripts/Interfaces/Agents/ILoggerBase";
import { ISettingsAgent } from "../../../../Shared/scripts/Interfaces/Agents/ISettingsAgent";
import { IDataPayloadSnapShot } from "../../../../Shared/scripts/Interfaces/IDataPayloadSnapShot";
import { ContentConst } from "../../../../Shared/scripts/Interfaces/InjectConst";
import { OneScWindowManager } from "../OneScWindowManager";

export class AutoSnapShotAgent {
  private SettingsAgent: ISettingsAgent;
  private Logger: ILoggerAgent;
  private AutoSaveHasBeenScheduled: boolean = false;
  private windowMan: OneScWindowManager;
  PageType: scWindowType;

  constructor(logger: ILoggerAgent, settingsAgent: ISettingsAgent, windowMan: OneScWindowManager, pageType: scWindowType) {
    this.Logger = logger;
    this.SettingsAgent = settingsAgent;
    this.windowMan = windowMan;
    this.PageType = pageType
  }

  AutoSaveSnapShot() {
    this.Logger.FuncStart(this.AutoSaveSnapShot.name);
    var SnapShotSettings: IDataPayloadSnapShot = {
      SnapShotNewNickname: '',
      Flavor: SnapShotFlavor.Autosave,
      CurrentPageType: this.PageType
    }

    this.windowMan.SaveWindowState(SnapShotSettings);

    this.Logger.FuncEnd(this.AutoSaveSnapShot.name);
  }

  ScheduleIntervalTasks() {
    this.Logger.FuncStart(this.ScheduleIntervalTasks.name);
    this.Logger.LogVal('Has been scheduled: ', this.AutoSaveHasBeenScheduled)

    let autoSaveSetting: IGenericSetting = this.SettingsAgent.GetByKey(SettingKey.AutoSaveIntervalMin)
    this.Logger.LogVal('autoSaveSetting: ', autoSaveSetting.ValueAsInt());

    if (autoSaveSetting.ValueAsInt() > 0) {
      if (!this.AutoSaveHasBeenScheduled) {
        this.Logger.MarkerA();
        var self = this;
        this.Logger.MarkerB();
        var intervalMs = StaticHelpers.MinToMs(ContentConst.Const.Timeouts.AutoSaveIntervalMin);

        this.Logger.MarkerC();
        window.setInterval(() => {
          self.AutoSaveSnapShot();
        }, intervalMs)

        this.Logger.MarkerD();
        this.AutoSaveHasBeenScheduled = true;
      }
    }
    this.Logger.FuncEnd(this.ScheduleIntervalTasks.name);
  }
}