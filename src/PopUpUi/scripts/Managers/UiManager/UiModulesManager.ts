import { LoggableBase } from '../../../../Shared/scripts/LoggableBase';
import { HindSiteSettingWrapper } from '../../../../Shared/scripts/Agents/Agents/SettingsAgent/HindSiteSettingWrapper';
import { BuiltDateStamp } from '../../../../Shared/scripts/AutoBuild/BuildNum';
import { StaticHelpers } from '../../../../Shared/scripts/Classes/StaticHelpers';
import { MenuCommandKey } from '../../../../Shared/scripts/Enums/2xxx-MenuCommand';
import { SettingKey } from '../../../../Shared/scripts/Enums/3xxx-SettingKey';
import { ModuleKey } from "../../../../Shared/scripts/Enums/ModuleKey";
import { SettingFlavor } from '../../../../Shared/scripts/Enums/SettingFlavor';
import { IHindSiteSetting } from '../../../../Shared/scripts/Interfaces/Agents/IGenericSetting';
import { ILoggerAgent } from '../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { IScUrlAgent } from '../../../../Shared/scripts/Interfaces/Agents/IScUrlAgent/IScUrlAgent';
import { ISettingsAgent } from '../../../../Shared/scripts/Interfaces/Agents/ISettingsAgent';
import { IUiModule } from '../../../../Shared/scripts/Interfaces/Agents/IUiModule';
import { IUiModuleButton } from "../../../../Shared/scripts/Interfaces/Agents/IUiModuleButton";
import { IUiVisibilityTestAgent } from "../../../../Shared/scripts/Interfaces/Agents/IUiVisibilityTestProctorAgent";
import { IDataStateOfSitecoreWindow } from "../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfSitecoreWindow";
import { IDataStateOfStorageSnapShots } from '../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfStorageSnapShots';
import { IMenuCommandDefinition } from "../../../../Shared/scripts/Interfaces/IMenuCommandDefinition";
import { ICommandDefinitionBucket } from '../../../../Shared/scripts/Interfaces/IMenuCommandDefinitionBucket';
import { IStateOfUiModules } from "../../../../Shared/scripts/Interfaces/IStateOfUiModules";
import { UiHydrationData } from '../../../../Shared/scripts/Interfaces/UiHydrationData';
import { PopConst } from '../../Classes/PopConst';
import { ISelectSnapUiMutationEvent_Payload } from '../../Events/SelectSnapUiMutationEvent/ISelectSnapUiMutationEvent_Payload';
import { SelectSnapUiMutationEvent_ObserverWithCallback } from '../../Events/SelectSnapUiMutationEvent/SelectSnapUiMutationEvent_ObserverWithCallback';
import { UiModuleManagerPassThroughEvent_Subject } from '../../Events/UiModuleManagerPassThroughEvent/UiModuleManagerPassThroughEvent_Subject';
import { IUiSettingBasedModuleMutationEven_Payload } from '../../Events/UiSettingBasedModuleMutationEvent/IUiSettingBasedModuleMutationEvent_Payload';
import { UiSettingBasedModuleMutationEvent_Observer } from '../../Events/UiSettingBasedModuleMutationEvent/UiSettingBasedModuleMutationEvent_Observer';
import { ButtonBasedModules } from '../../UiModules/ButtonModules/ButtonBasedModules';
import { TypCommandButtonModule } from '../../UiModules/ButtonModules/TypCommandButtonModule';
import { SelectSnapshotModule } from '../../UiModules/SelectSnapshotModule/SelectSnapshotModule';
import { SettingsBasedModules } from '../../UiModules/SettingBasedModules/SettingsBasedModules';
import { _SettingsBasedModulesBase } from '../../UiModules/SettingBasedModules/_SettingsBasedModulesBase';
import { FeedbackModuleBrowserState } from '../../UiModules/UiFeedbackModules/FeedbackModuleBrowserState';
import { FeedbackModuleContentState } from '../../UiModules/UiFeedbackModules/FeedbackModuleContentState';
import { FeedbackModuleMessages_Observer } from '../../UiModules/UiFeedbackModules/FeedbackModuleMessages';
import { FeedbackModulePopUpState } from '../../UiModules/UiFeedbackModules/FeedbackModulePopUpState';
import { UiFeedbackModuleLog } from '../../UiModules/UiFeedbackModules/UiFeedbackModuleLog';
import { UiCommandsManager } from '../UiCommandsManager';
import { InputWithButtonModule } from '../../UiModules/ButtonModules/InputWithButtonModule';

export class UiModulesManager extends LoggableBase {
  MenuCommandParameters: IMenuCommandDefinition[];
  UiCommandsMan: UiCommandsManager;
  CurrScWindowState: IDataStateOfSitecoreWindow;
  FeedbackModuleMessages: FeedbackModuleMessages_Observer;
  private CommandDefinitionBucket: ICommandDefinitionBucket;
  private SettingsAgent: ISettingsAgent;
  TabId: string;
  private UiVisibilityTestAgent: IUiVisibilityTestAgent;
  UiSettingBasedModuleMutationEvent_Observer: UiSettingBasedModuleMutationEvent_Observer;
  SelectSnapshotModule_Observer: SelectSnapUiMutationEvent_ObserverWithCallback;
  private LastKnownstateOfSitecoreWindow: IDataStateOfSitecoreWindow;
  private LastKnownStateOfStorageSnapShots: IDataStateOfStorageSnapShots;
  LastKnownSelectSnapshotId: any;
  ModuleSelectSnapShots: SelectSnapshotModule;

  private UiModules: IUiModule[] = [];
  UiModuleManagerMutationEvent_Subject: UiModuleManagerPassThroughEvent_Subject;
  FacetSettingsBasedModules: _SettingsBasedModulesBase[] = [];
  private ScUrlAgent: IScUrlAgent;
  FacetRenameButton: InputWithButtonModule;
    LastKnownSelectSnapshotNickname: string;

  constructor(logger: ILoggerAgent, settingsAgent: ISettingsAgent, commandDefinitionBucket: ICommandDefinitionBucket, uiCommandsManager: UiCommandsManager, uiVisibilityTestAgent: IUiVisibilityTestAgent, scUrlagent: IScUrlAgent) {
    super(logger);
    this.Logger.InstantiateStart(UiModulesManager.name);

    this.SettingsAgent = settingsAgent;
    this.CommandDefinitionBucket = commandDefinitionBucket;
    this.UiVisibilityTestAgent = uiVisibilityTestAgent
    this.UiCommandsMan = uiCommandsManager;
    this.ScUrlAgent = scUrlagent;

    if (StaticHelpers.IsNullOrUndefined([this.SettingsAgent,  this.CommandDefinitionBucket, this.UiCommandsMan, this.UiVisibilityTestAgent, this.ScUrlAgent])) {
      throw (UiModulesManager.name + ' null at constructor');
    }

    this.InstantiateModules();
    this.Logger.InstantiateEnd(UiModulesManager.name);
  }

  InstantiateModules() {
    this.Logger.FuncStart(this.InstantiateModules.name);

    this.ModuleSelectSnapShots = new SelectSnapshotModule(this.Logger, PopConst.Const.Selector.HS.ModuleContainers.SelStateSnapShot);
    this.UiModules.push(this.ModuleSelectSnapShots);

    this.UiModules.push(new UiFeedbackModuleLog(this.Logger, PopConst.Const.Selector.HS.FeedbackLogElement));
    this.UiModules.push(new FeedbackModuleBrowserState(this.Logger, PopConst.Const.Selector.HS.FeedbackBrowserState));
    this.UiModules.push(new FeedbackModulePopUpState(this.Logger, PopConst.Const.Selector.HS.FeedbackPopUpState));
    this.UiModules.push(new FeedbackModuleContentState(this.Logger, PopConst.Const.Selector.HS.FeedbackContentState));

    let settingsBaseModules = new SettingsBasedModules(this.Logger, this.SettingsAgent);

    this.FacetSettingsBasedModules = this.FacetSettingsBasedModules.concat(settingsBaseModules.AccordianModules);
    this.FacetSettingsBasedModules = this.FacetSettingsBasedModules.concat(settingsBaseModules.NumberModules);
    this.FacetSettingsBasedModules = this.FacetSettingsBasedModules.concat(settingsBaseModules.CheckBoxModules);

    this.UiModules = this.UiModules.concat(this.FacetSettingsBasedModules)

    let buttonBasedModules = new ButtonBasedModules(this.Logger, this.CommandDefinitionBucket)
    this.Logger.LogVal('buttonBaseModules ', buttonBasedModules.AllButtonBasedModules.length);
    this.UiModules = this.UiModules.concat(<IUiModule[]>buttonBasedModules.AllButtonBasedModules);

    this.Logger.FuncEnd(this.InstantiateModules.name);
  }

  Init_UiMan() {
    this.Logger.FuncStart(this.Init_UiMan.name, UiModulesManager.name);

    this.WriteBuildNumToUi();

    if (this.UiModules) {
      this.UiModules.forEach((uiModule: IUiModule) => {
        if (uiModule) {
          uiModule.Init()
        } else {
          this.Logger.ErrorAndThrow(this.Init_UiMan.name, 'null module');
        }
      }

      );
    }

    this.UiCommandsMan.Init_ButtonStateManager();
    this.Logger.FuncEnd(this.Init_UiMan.name, UiModulesManager.name);
  }

  public GetStateOfModules(): IStateOfUiModules {
    this.Logger.FuncStart(this.GetStateOfModules.name);

    let wrappedSettings: HindSiteSettingWrapper[] = this.SettingsAgent.GetSettingsByFlavor([SettingFlavor.ContentAndPopUpStoredInPopUp, SettingFlavor.ContentOnly]);

    let settingsToSend: IHindSiteSetting[] = [];
    wrappedSettings.forEach((wrappedSetting: HindSiteSettingWrapper) => settingsToSend.push(wrappedSetting.HindSiteSetting));

    let newNickname: string = "";
    if (this.FacetRenameButton) {
      newNickname = this.FacetRenameButton.GetInputValue();
    }

    var stateOfUiModules: IStateOfUiModules = {
      SelectSnapshotId: this.ModuleSelectSnapShots.GetSelectSnapshotId(),
      CurrentNicknameValue: '',
      SnapShotNewNickname: newNickname,
    }

    return stateOfUiModules;
  }

  WireEvents_ModulesManager() {
    this.Logger.FuncStart(this.WireEvents_ModulesManager.name);

    try {
      this.UiModuleManagerMutationEvent_Subject = new UiModuleManagerPassThroughEvent_Subject(this.Logger);

      if (this.UiModules) {
        this.UiModules.forEach((uiModule: IUiModule) => uiModule.WireEvents_Module());
      }

      this.FeedbackModuleMessages = new FeedbackModuleMessages_Observer(this.Logger, PopConst.Const.Selector.HS.DivOverlayModule);

      this.SelectSnapshotModule_Observer = new SelectSnapUiMutationEvent_ObserverWithCallback(this.Logger, this.OnRefreshUiUIManagerFromSnapShotSelect.bind(this));
      this.UiSettingBasedModuleMutationEvent_Observer = new UiSettingBasedModuleMutationEvent_Observer(this.Logger, this.OnUiSettingBasedModuleMutationEvent.bind(this));

      let moduleSelectSnapShots: IUiModule[] = this.GetModulesByModuleKey(ModuleKey.SelectSnapShot);

      if (moduleSelectSnapShots && moduleSelectSnapShots.length > 0) {
        let moduleSelectSnapShot = moduleSelectSnapShots[0];
        if (moduleSelectSnapShot) {
          (<SelectSnapshotModule>moduleSelectSnapShot).SelectSnapshotModule_Subject.RegisterObserver(this.SelectSnapshotModule_Observer);
        }
      }

      if (this.FacetSettingsBasedModules) {
        this.FacetSettingsBasedModules.forEach((settingBased: _SettingsBasedModulesBase) => {
          settingBased.UiSettingBasedModuleMutationEvent_Subject.RegisterObserver(this.UiSettingBasedModuleMutationEvent_Observer);
        })
      }

      let feedBackModuleLog: IUiModule = this.GetFirstModuleByKey(ModuleKey.FeedbackModuleLog);

      if (<UiFeedbackModuleLog>feedBackModuleLog) {
        //todo - put back   this.Logger.AddWriter(feedBackModuleLog);
      }

      this.WireEventsOnCheckBoxes();
    } catch (err) {
      this.Logger.ErrorAndThrow(this.WireEvents_ModulesManager.name, err);
    }

    this.Logger.FuncEnd(this.WireEvents_ModulesManager.name);
  }

  OnUiSettingBasedModuleMutationEvent(uiModuleMutationEvent_Payload: IUiSettingBasedModuleMutationEven_Payload) {
    this.Logger.FuncStart(this.OnUiSettingBasedModuleMutationEvent.name);

    if (this.SettingsAgent) {
      this.SettingsAgent.SetByKey(uiModuleMutationEvent_Payload.HindSiteSetting.SettingKey, uiModuleMutationEvent_Payload.HindSiteSetting.ValueAsObj)
    }

    //if (this.UiModuleManagerMutationEvent_Subject) {
    //  let uiModulePassThroughEvent_Payload: IUiModuleManagerPassThroughEvent_Payload = {
    //    ModuleMutationEvent_Payload: uiModuleMutationEvent_Payload
    //  }

    //  this.Logger.LogAsJsonPretty('uiModulePassThroughEvent_Payload', uiModulePassThroughEvent_Payload);
    //  this.UiModuleManagerMutationEvent_Subject.NotifyObservers(uiModulePassThroughEvent_Payload);
    //}
    this.Logger.FuncEnd(this.OnUiSettingBasedModuleMutationEvent.name);
  }

  private WireEventsOnCheckBoxes() {
    //this.UiModuleMutationEvent_Observer_CheckBox = new UiModuleMutationEvent_Observer(this.Logger, this.OnUiModuleMutationEvent);
    //let checkboxSettings: HindSiteSettingCheckBoxModule[] = <HindSiteSettingCheckBoxModule[]>this.GetModulesByKey(ModuleKey.CheckBox);

    //if (checkboxSettings) {
    //  checkboxSettings.forEach((checkBoxSetting: HindSiteSettingCheckBoxModule) => {
    //    if (checkBoxSetting.UiElementChangeEvent_Subject) {
    //      checkBoxSetting.UiElementChangeEvent_Subject.RegisterObserver(this.UiModuleMutationEvent_Observer_CheckBox);
    //    }
    //  });
    //}
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

    let uiModules: IUiModule[] = this.GetModulesByModuleKey(moduleKey);

    if (uiModules && uiModules.length > 0) {
      toReturn = uiModules[0];
    }

    return toReturn;
  }

  GetCommandButtonByKey(Ping: MenuCommandKey): TypCommandButtonModule {
    let uiModules: TypCommandButtonModule[] = <TypCommandButtonModule[]>this.GetModulesByModuleKey(ModuleKey.ButtonTypical);
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

    toReturn = toReturn.concat(<IUiModuleButton[]>this.GetModulesByModuleKey(ModuleKey.ButtonTypical));
    this.FacetRenameButton = <InputWithButtonModule>this.GetFirstModuleByKey(ModuleKey.ButtonWithInput)
    toReturn = toReturn.concat(this.FacetRenameButton);
    toReturn = toReturn.concat(<IUiModuleButton[]>this.GetModulesByModuleKey(ModuleKey.ButtonCancel));
    toReturn = toReturn.concat(<IUiModuleButton[]>this.GetModulesByModuleKey(ModuleKey.ButtonClose));

    return toReturn;
  }

  private GetModulesByModuleKey(moduleKey: ModuleKey): IUiModule[] {
    let toReturn: IUiModule[] = [];

    if (this.UiModules) {
      for (var idx = 0; idx < this.UiModules.length; idx++) {
        if (this.UiModules[idx].ModuleKey === moduleKey) {
          toReturn.push(this.UiModules[idx]);
        }
      }
    }
    return toReturn;
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

  HydrateUiModules(uiHydrationData: UiHydrationData) {
    this.Logger.FuncStart(this.HydrateUiModules.name);


    this.Logger.LogAsJsonPretty('uiHydrationData.SelectSnapShot', uiHydrationData.SelectSnapShot);

    if (uiHydrationData) {
      if (uiHydrationData.StateOfSitecoreWindow) {
        if (this.UiModules) {
          this.UiModules.forEach((uiModule: IUiModule) => uiModule.Hydrate(uiHydrationData));
        }

        this.UiCommandsMan.HydrateUiModules(uiHydrationData);
      } else {
        this.Logger.ErrorAndThrow(this.HydrateUiModules.name, 'null state');
      }
    }

    this.Logger.FuncEnd(this.HydrateUiModules.name);
  }

  RefreshModuleUis() {
    this.UiCommandsMan.RefreshUiModuleVisibilityStatus();

    if (this.UiModules) {
      this.UiModules.forEach((uiModule: IUiModule) => uiModule.RefreshUi());
    }
  }

  async OnRefreshUiUIManagerFromSnapShotSelect(uiData: ISelectSnapUiMutationEvent_Payload) {
    this.Logger.FuncStart(this.OnRefreshUiUIManagerFromSnapShotSelect.name);

    if (this.LastKnownSelectSnapshotId !== uiData.SelectSnapshotId) {
      this.LastKnownSelectSnapshotId = uiData.SelectSnapshotId;
      this.UpdateUiCommon();
    }

    this.Logger.FuncEnd(this.OnRefreshUiUIManagerFromSnapShotSelect.name);
  }

  async UpdateUiFromContentReply(stateOfSitecoreWindow: IDataStateOfSitecoreWindow, stateOfStorageSnapShots: IDataStateOfStorageSnapShots) {
    this.Logger.FuncStart(this.UpdateUiFromContentReply.name);

    //if (StaticHelpers.IsNullOrUndefined(this.LastKnownSelectSnapshotId)) {
      this.LastKnownSelectSnapshotId = this.ModuleSelectSnapShots.GetSelectSnapshotId();
      this.LastKnownSelectSnapshotNickname = this.ModuleSelectSnapShots.GetSelectSnapshotNickname();
    //}

    this.LastKnownstateOfSitecoreWindow = stateOfSitecoreWindow;
    this.LastKnownStateOfStorageSnapShots = stateOfStorageSnapShots;

    this.UpdateUiCommon();

    this.Logger.FuncEnd(this.UpdateUiFromContentReply.name);
  }

  private UpdateUiCommon(): void {
    if (this.LastKnownstateOfSitecoreWindow && this.LastKnownstateOfSitecoreWindow.Meta) {
      this.UiVisibilityTestAgent.Hydrate(this.LastKnownstateOfSitecoreWindow, this.LastKnownStateOfStorageSnapShots, this.LastKnownstateOfSitecoreWindow.Meta.WindowType, this.LastKnownSelectSnapshotId);

      let refreshData: UiHydrationData = new UiHydrationData(this.LastKnownstateOfSitecoreWindow, this.ScUrlAgent, this.LastKnownStateOfStorageSnapShots, this.LastKnownSelectSnapshotId, this.UiVisibilityTestAgent, this.LastKnownSelectSnapshotNickname);

      this.HydrateUiModules(refreshData);
      this.RefreshModuleUis()
    } else {
      this.Logger.ErrorAndThrow(this.UpdateUiFromContentReply.name, 'null state or meta');
    }
  }
}