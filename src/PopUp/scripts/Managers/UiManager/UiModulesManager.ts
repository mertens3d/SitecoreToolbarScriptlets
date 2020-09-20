import { LoggableBase } from '../../../../Content/scripts/Managers/LoggableBase';
import { IDataContentReplyReceivedEvent_Payload } from '../../../../Content/scripts/Proxies/Desktop/DesktopProxy/Events/ContentReplyReceivedEvent/IDataContentReplyReceivedEvent_Payload';
import { BuiltDateStamp } from '../../../../Shared/scripts/AutoBuild/BuildNum';
import { StaticHelpers } from '../../../../Shared/scripts/Classes/StaticHelpers';
import { MenuCommandKey } from '../../../../Shared/scripts/Enums/2xxx-MenuCommand';
import { SettingKey } from '../../../../Shared/scripts/Enums/3xxx-SettingKey';
import { ModuleKey } from "../../../../Shared/scripts/Enums/ModuleKey";
import { IHindSiteSetting } from '../../../../Shared/scripts/Interfaces/Agents/IGenericSetting';
import { ILoggerAgent } from '../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { ISettingsAgent } from '../../../../Shared/scripts/Interfaces/Agents/ISettingsAgent';
import { IUiModule, IUiModuleButton } from '../../../../Shared/scripts/Interfaces/Agents/IUiModule';
import { IUiVisibilityTestAgent } from "../../../../Shared/scripts/Interfaces/Agents/IUiVisibilityTestProctorAgent";
import { IDataStateOfSitecoreWindow } from "../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfSitecoreWindow";
import { IDataStateOfStorageSnapShots } from '../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfStorageSnapShots';
import { IMenuCommandDefinition } from "../../../../Shared/scripts/Interfaces/IMenuCommandDefinition";
import { UiHydrationData } from '../../../../Shared/scripts/Interfaces/MenuCommand';
import { CommandManager } from '../../Classes/AllCommands';
import { PopConst } from '../../Classes/PopConst';
import { ISelectSnapUiMutationEvent_Payload } from '../../Events/SelectSnapUiMutationEvent/ISelectSnapUiMutationEvent_Payload';
import { SelectSnapUiMutationEvent_Observer } from '../../Events/SelectSnapUiMutationEvent/SelectSnapUiMutationEvent_Subject';
import { ButtonBasedModules } from '../../UiModules/ButtonModules/ButtonBasedModules';
import { TypCommandButtonModule } from '../../UiModules/ButtonModules/TypCommandButtonModule';
import { _baseButtonModule } from '../../UiModules/ButtonModules/_baseButtonModule';
import { SelectSnapshotModule } from '../../UiModules/SelectSnapshotModule/SelectSnapshotModule';
import { SettingsBasedModules } from '../../UiModules/SettingsModule/SettingsBasedModules';
import { FeedbackModuleBrowserState } from '../../UiModules/UiFeedbackModules/FeedbackModuleBrowserState';
import { FeedbackModuleContentState } from '../../UiModules/UiFeedbackModules/FeedbackModuleContentState';
import { FeedbackModuleMessages_Observer } from '../../UiModules/UiFeedbackModules/FeedbackModuleMessages';
import { FeedbackModulePopUpState } from '../../UiModules/UiFeedbackModules/FeedbackModulePopUpState';
import { UiFeedbackModuleLog } from '../../UiModules/UiFeedbackModules/UiFeedbackModuleLog';
import { BrowserTabAgent } from '../BrowserTabAgent';
import { UiCommandsManager } from '../UiCommandsManager';
import { UiVisibilityTestAgent } from './UiVisibilityTestAgent';
import { _UiModuleBase } from '../../UiModules/UiFeedbackModules/_UiModuleBase';

export class UiModulesManager extends LoggableBase {
    
  MenuCommandParameters: IMenuCommandDefinition[];
  UiCommandsManager: UiCommandsManager;
  CurrScWindowState: IDataStateOfSitecoreWindow;
  FeedbackModuleMessages: FeedbackModuleMessages_Observer;
  private CommandMan: CommandManager;
  private SettingsAgent: ISettingsAgent;
  private TabMan: BrowserTabAgent;
  TabId: string;
  private UiVisibilityTestAgent: IUiVisibilityTestAgent;
  SelectSnapshotModule_Observer: SelectSnapUiMutationEvent_Observer;
  private LastKnownstateOfSitecoreWindow: IDataStateOfSitecoreWindow;
  private LastKnownStateOfStorageSnapShots: IDataStateOfStorageSnapShots;
  LastKnownSelectSnapshotId: any;
  private UiModules: IUiModule[] = [];

  constructor(logger: ILoggerAgent, settingsAgent: ISettingsAgent, tabMan: BrowserTabAgent, commandMan: CommandManager, moduleSelectSnapShots: SelectSnapshotModule) {
    super(logger);
    this.Logger.InstantiateStart(UiModulesManager.name);

    this.SettingsAgent = settingsAgent;
    this.TabMan = tabMan;
    this.CommandMan = commandMan;
    this.UiModules.push(moduleSelectSnapShots);


    this.UiVisibilityTestAgent = new UiVisibilityTestAgent(this.Logger);
    this.UiCommandsManager = new UiCommandsManager(this.Logger, this.CommandMan.MenuCommandParamsBucket, this.UiVisibilityTestAgent);

    this.InstantiateModules();
    this.Logger.InstantiateEnd(UiModulesManager.name);
  }

  InitUiMan() {
    this.Logger.FuncStart(this.InitUiMan.name, UiModulesManager.name);

    this.WriteBuildNumToUi();

    if (this.UiModules) {
      this.UiModules.forEach((uiModule: IUiModule) => uiModule.Init());
    }

    this.UiCommandsManager.InitButtonStateManager();
    this.Logger.FuncEnd(this.InitUiMan.name, UiModulesManager.name);
  }

  WireEvents() {
    this.Logger.FuncStart(this.WireEvents.name);


    if (this.UiModules) {
      this.UiModules.forEach((uiModule: IUiModule) => uiModule.WireEvents());
    }


    this.FeedbackModuleMessages = new FeedbackModuleMessages_Observer(this.Logger, PopConst.Const.Selector.HS.DivOverlayModule);

    this.SelectSnapshotModule_Observer = new SelectSnapUiMutationEvent_Observer(this.Logger, this.RefreshUiUIManagerFromSnapShotSelect.bind(this));

    let moduleSelectSnapShots: IUiModule[] = this.GetModulesByKey(ModuleKey.SelectSnapShot);

    if (moduleSelectSnapShots && moduleSelectSnapShots.length > 0) {
      let moduleSelectSnapShot = moduleSelectSnapShots[0];
      if (moduleSelectSnapShot) {
        (<SelectSnapshotModule>moduleSelectSnapShot).SelectSnapshotModule_Subject.RegisterObserver(this.SelectSnapshotModule_Observer);
      }
    }

    let feedBackModuleLog: IUiModule = this.GetFirstModuleByKey(ModuleKey.FeedbackModuleLog);

    if (<UiFeedbackModuleLog>feedBackModuleLog) {
      //todo - put back   this.Logger.AddWriter(feedBackModuleLog);
    }
    this.Logger.FuncEnd(this.WireEvents.name);
  }

  InstantiateModules() {
    this.Logger.FuncStart(this.InstantiateModules.name);

    this.UiModules.push(new UiFeedbackModuleLog(this.Logger, PopConst.Const.Selector.HS.FeedbackLogElement));
    this.UiModules.push(new FeedbackModuleBrowserState(this.Logger, PopConst.Const.Selector.HS.FeedbackBrowserState));
    this.UiModules.push(new FeedbackModulePopUpState(this.Logger, PopConst.Const.Selector.HS.FeedbackPopUpState));
    this.UiModules.push(new FeedbackModuleContentState(this.Logger, PopConst.Const.Selector.HS.FeedbackContentState));

    let settingsBasedModules = new SettingsBasedModules(this.Logger, this.SettingsAgent);
    this.UiModules = this.UiModules.concat(settingsBasedModules.AccordianModules);
    this.UiModules = this.UiModules.concat(settingsBasedModules.NumberModules);
    this.UiModules = this.UiModules.concat(settingsBasedModules.CheckBoxModules);

    let buttonBasedModules = new ButtonBasedModules(this.Logger, this.CommandMan)
    this.Logger.LogVal('buttonBaseModules ', buttonBasedModules.AllButtonBasedModules.length);
    this.UiModules = this.UiModules.concat(<IUiModule[]>buttonBasedModules.AllButtonBasedModules);

    this.Logger.FuncEnd(this.InstantiateModules.name);
  }

  FilterUiModulesByMenuCommandKey(uiModules: TypCommandButtonModule[], menuCommandKey: MenuCommandKey): TypCommandButtonModule {
    let toReturn: TypCommandButtonModule = null;

    if (uiModules && uiModules.length > 0) {
      for (let uiModule of uiModules) {
        if (uiModule.GetCommandKey() === menuCommandKey) {
          toReturn = uiModule;
          break;
        }
      }
    }
    return toReturn;
  }

  //GetCommandModuleByKey(commandKey: MenuCommandKey): IUiModule {
  //  let allButtonBased: IUiModule[] = this.GetModulesByKey(ModuleKey.TypicalButton);
  //}

 private GetFirstModuleByKey(moduleKey: ModuleKey): IUiModule {
    let toReturn: IUiModule = null;

    let uiModules: IUiModule[] = this.GetModulesByKey(moduleKey);

    if (uiModules && uiModules.length > 0) {
      toReturn = uiModules[0];
    }

    return toReturn;
  }

  GetCommandButtonByKey(Ping: MenuCommandKey): TypCommandButtonModule {
    let uiModules: TypCommandButtonModule[] = <TypCommandButtonModule[]>this.GetModulesByKey(ModuleKey.ButtonTypical);
    let toReturn: TypCommandButtonModule = null;

    if (uiModules) {
      let typButton = this.FilterUiModulesByMenuCommandKey(uiModules, MenuCommandKey.Ping);
      if (typButton) {
        toReturn = typButton;
      }
    }
    return toReturn;
  }

  GetBaseButtonModules(): IUiModuleButton[] {
    let toReturn: IUiModuleButton[] = [];

    toReturn = toReturn.concat(<IUiModuleButton[]>this.GetModulesByKey(ModuleKey.ButtonTypical));
    toReturn = toReturn.concat(<IUiModuleButton[]>this.GetModulesByKey(ModuleKey.ButtonWithInput));
    toReturn = toReturn.concat(<IUiModuleButton[]>this.GetModulesByKey(ModuleKey.ButtonCancel));


    return toReturn;
  }

 private GetModulesByKey(moduleKey: ModuleKey): IUiModule[] {
    let toReturn: IUiModule[] = [];

    if (this.UiModules) {
      for (var idx = 0; idx < this.UiModules.length; idx++) {
        if (this.UiModules[idx].ModuleKey === moduleKey) {
          toReturn.push(this.UiModules[idx]);
          break;
        }
      }
    }
    return toReturn;
  }



  OnContentReplyReceivedEventCallBack(dataContentReplyReceivedEvent_Payload: IDataContentReplyReceivedEvent_Payload) {
    this.Logger.FuncStart(this.OnContentReplyReceivedEventCallBack.name);
    this.UpdateUiFromContentReply(dataContentReplyReceivedEvent_Payload.StateOfSitecoreWindow, dataContentReplyReceivedEvent_Payload.StateOfStorageSnapShots);
    this.Logger.FuncEnd(this.OnContentReplyReceivedEventCallBack.name);
  }

  ClosePopUp(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.Logger.FuncStart(this.ClosePopUp.name);
      try {
        this.FeedbackModuleMessages.UpdateMsgStatusStack('Command Completed Successfully');

        let setting: IHindSiteSetting = this.SettingsAgent.GetByKey(SettingKey.DebugKeepDialogOpen);
        if (!setting.ValueAsBool()) {
          window.close();
        } else {
          this.Logger.Log('Window not closed because of setting: ' + setting.FriendlySetting)
        }
        resolve();
      } catch (err) {
        reject(this.ClosePopUp.name + ' ' + err);
      }
      this.Logger.FuncEnd(this.ClosePopUp.name);
    });
  }

  WriteBuildNumToUi() {
    this.Logger.LogVal('BuiltDateStamp', BuiltDateStamp);

    var targetTag: HTMLElement = document.querySelector(PopConst.Const.Selector.HS.BuildStamp);
    if (targetTag) {
      targetTag.innerText = 'build stamp: ' + StaticHelpers.MakeFriendlyDate(new Date(BuiltDateStamp));
    } else {
      this.Logger.ErrorAndThrow(this.WriteBuildNumToUi.name, 'No Build Stamp Element Found');
    }
  }

  HydrateModules(uiHydrationData: UiHydrationData) {
    this.Logger.FuncStart(this.HydrateModules.name);
    if (uiHydrationData) {
      if (uiHydrationData.StateOfSitecoreWindow) {
        if (this.UiModules) {
          this.UiModules.forEach((uiModule: IUiModule) => uiModule.Hydrate(uiHydrationData));
        }

        this.UiCommandsManager.HydrateUiModules(uiHydrationData);
      } else {
        this.Logger.ErrorAndThrow(this.HydrateModules.name, 'null state');
      }
    }

    this.Logger.FuncEnd(this.HydrateModules.name);
  }

  RefreshModuleUis() {
    this.UiCommandsManager.RefreshUiModuleVisibilityStatus();

    if (this.UiModules) {
      this.UiModules.forEach((uiModule: IUiModule) => uiModule.RefreshUi());
    }
  }

  async RefreshUiUIManagerFromSnapShotSelect(uiData: ISelectSnapUiMutationEvent_Payload) {
    this.Logger.FuncStart(this.RefreshUiUIManagerFromSnapShotSelect.name);

    if (this.LastKnownSelectSnapshotId !== uiData.SelectSnapshotId) {
      this.LastKnownSelectSnapshotId = uiData.SelectSnapshotId;
      this.UpdateUiCommon();
    }

    this.Logger.FuncEnd(this.RefreshUiUIManagerFromSnapShotSelect.name);
  }

  async UpdateUiFromContentReply(stateOfSitecoreWindow: IDataStateOfSitecoreWindow, stateOfStorageSnapShots: IDataStateOfStorageSnapShots) {
    this.Logger.FuncStart(this.UpdateUiFromContentReply.name);

    if (StaticHelpers.IsNullOrUndefined(this.LastKnownSelectSnapshotId)) {
      //this.LastKnownSelectSnapshotId = this.ModuleSelectSnapShots.GetSelectSnapshotId();
    }

    this.LastKnownstateOfSitecoreWindow = stateOfSitecoreWindow;
    this.LastKnownStateOfStorageSnapShots = stateOfStorageSnapShots;

    this.UpdateUiCommon();

    this.Logger.FuncEnd(this.UpdateUiFromContentReply.name);
  }

  private async UpdateUiCommon(): Promise<void> {
    if (this.LastKnownstateOfSitecoreWindow && this.LastKnownstateOfSitecoreWindow.Meta) {
      this.UiVisibilityTestAgent.Hydrate(this.LastKnownstateOfSitecoreWindow, this.LastKnownStateOfStorageSnapShots, this.LastKnownstateOfSitecoreWindow.Meta.WindowType, this.LastKnownSelectSnapshotId);

      let refreshData: UiHydrationData = new UiHydrationData(this.LastKnownstateOfSitecoreWindow, this.TabMan.GetScUrlAgent(), this.LastKnownStateOfStorageSnapShots, this.LastKnownSelectSnapshotId, this.UiVisibilityTestAgent);

      this.HydrateModules(refreshData);
      this.RefreshModuleUis()
    } else {
      this.Logger.ErrorAndThrow(this.UpdateUiFromContentReply.name, 'null state or meta');
    }
  }
}