import { IDataContentReplyReceivedEvent_Payload } from '../../../../Content/scripts/Proxies/Desktop/DesktopProxy/Events/ContentReplyReceivedEvent/IDataContentReplyReceivedEvent_Payload';
import { BuiltDateStamp } from '../../../../Shared/scripts/AutoBuild/BuildNum';
import { StaticHelpers } from '../../../../Shared/scripts/Classes/StaticHelpers';
import { MenuCommandKey } from '../../../../Shared/scripts/Enums/2xxx-MenuCommand';
import { SettingKey } from '../../../../Shared/scripts/Enums/3xxx-SettingKey';
import { ModuleKey } from "../../../../Shared/scripts/Enums/ModuleKey";
import { IAccordianManager } from '../../../../Shared/scripts/Interfaces/Agents/IAccordianManager';
import { IHindSiteSetting } from '../../../../Shared/scripts/Interfaces/Agents/IGenericSetting';
import { ILoggerAgent } from '../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { ISettingsAgent } from '../../../../Shared/scripts/Interfaces/Agents/ISettingsAgent';
import { IUiModule } from '../../../../Shared/scripts/Interfaces/Agents/IUiModule';
import { IUiVisibilityTestAgent } from "../../../../Shared/scripts/Interfaces/Agents/IUiVisibilityTestProctorAgent";
import { IDataStateOfSitecoreWindow } from "../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfSitecoreWindow";
import { IDataStateOfStorageSnapShots } from '../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfStorageSnapShots';
import { IMenuCommandDefinition } from "../../../../Shared/scripts/Interfaces/IMenuCommandDefinition";
import { UiHydrationData } from '../../../../Shared/scripts/Interfaces/MenuCommand';
import { CommandManager } from '../../Classes/AllCommands';
import { PopConst } from '../../Classes/PopConst';
import { ISelectSnapUiMutationEvent_Payload } from '../../Events/SelectSnapUiMutationEvent/ISelectSnapUiMutationEvent_Payload';
import { SelectSnapUiMutationEvent_Observer } from '../../Events/SelectSnapUiMutationEvent/SelectSnapUiMutationEvent_Subject';
import { AccordianModulesManager } from '../../UiModules/AccordianModule/AccordianManager';
import { SelectSnapshotModule } from '../../UiModules/SelectSnapshotModule/SelectSnapshotModule';
import { SettingsBucketModule } from '../../UiModules/SettingsModule/SettingsModule';
import { FeedbackModuleBrowserState } from '../../UiModules/UiFeedbackModules/FeedbackModuleBrowserState';
import { FeedbackModuleContentState } from '../../UiModules/UiFeedbackModules/FeedbackModuleContentState';
import { FeedbackModuleMessages_Observer } from '../../UiModules/UiFeedbackModules/FeedbackModuleMessages';
import { FeedbackModulePopUpState } from '../../UiModules/UiFeedbackModules/FeedbackModulePopUpState';
import { UiFeedbackModuleLog } from '../../UiModules/UiFeedbackModules/UiFeedbackModuleLog';
import { BrowserTabAgent } from '../TabManager';
import { UiCommandsManager } from '../UiStateManager';
import { UiVisibilityTestAgent } from './UiVisibilityTestAgent';
import { CancelButtonModule } from '../../UiModules/ButtonModules/CancelButtonModule';
import { HindSiteSettingCheckBoxModule } from '../../UiModules/SettingsModule/HindSiteSettingCheckBoxModule';

export class UiManager {
  MenuCommandParameters: IMenuCommandDefinition[];
  AccordianModuleManager: IAccordianManager;
  UiCommandsManager: UiCommandsManager;
  CurrScWindowState: IDataStateOfSitecoreWindow;
  FeedbackModuleMessages: FeedbackModuleMessages_Observer;
  MenuEnabled: boolean = true;
  MenuFocused: boolean = true;
  OtherFocused: boolean = false;
  ParentFocused: boolean = false;
  private CommandMan: CommandManager;
  private Logger: ILoggerAgent;
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
    this.Logger = logger;
    this.SettingsAgent = settingsAgent;
    this.TabMan = tabMan;
    this.CommandMan = commandMan;

    this.UiModules.push(moduleSelectSnapShots);

    this.Logger.InstantiateStart(UiManager.name);

    this.UiVisibilityTestAgent = new UiVisibilityTestAgent(this.Logger);
    this.UiCommandsManager = new UiCommandsManager(this.Logger, this.CommandMan.MenuCommandParamsBucket, this.UiVisibilityTestAgent);
    this.AccordianModuleManager = new AccordianModulesManager(this.Logger, this.SettingsAgent);

    this.InstantiateModules();
    this.WireEvents();
    this.Logger.InstantiateEnd(UiManager.name);
  }

  InstantiateModules() {
    this.Logger.FuncStart(this.InstantiateModules.name);

    this.UiModules.push(new UiFeedbackModuleLog(this.Logger, PopConst.Const.Selector.HS.FeedbackLogElement));
    this.UiModules.push(new FeedbackModuleBrowserState(this.Logger, PopConst.Const.Selector.HS.FeedbackBrowserState));
    this.UiModules.push(new FeedbackModulePopUpState(this.Logger, PopConst.Const.Selector.HS.FeedbackPopUpState));
    this.UiModules.push(new FeedbackModuleContentState(this.Logger, PopConst.Const.Selector.HS.FeedbackContentState));

    let settingsBucketModule = new SettingsBucketModule(this.Logger, this.SettingsAgent, this.AccordianModuleManager, '');
    this.UiModules.push(settingsBucketModule);

    let checkBoxModules = settingsBucketModule.CheckBoxModulesBucket;
    if (checkBoxModules) {
      checkBoxModules.forEach((checkboxModule: HindSiteSettingCheckBoxModule) => this.UiModules.push(checkboxModule));
    }

    this.UiModules.push(new CancelButtonModule(this.Logger, PopConst.Const.Selector.HS.HsCancel, null));

    this.Logger.FuncEnd(this.InstantiateModules.name);
  }

  GetModuleByKey(moduleKey: ModuleKey): IUiModule {
    let toReturn: IUiModule = null;

    if (this.UiModules) {
      for (var idx = 0; idx < this.UiModules.length; idx++) {
        if (this.UiModules[idx].ModuleKey === moduleKey) {
          toReturn = this.UiModules[idx];
          break;
        }
      }
    }
    return toReturn;
  }

  WireEvents() {
    this.Logger.FuncStart(this.WireEvents.name);
    this.FeedbackModuleMessages = new FeedbackModuleMessages_Observer(this.Logger, PopConst.Const.Selector.HS.DivOverlayModule);

    this.SelectSnapshotModule_Observer = new SelectSnapUiMutationEvent_Observer(this.Logger, this.RefreshUiUIManagerFromSnapShotSelect.bind(this));

    let moduleSelectSnapShot = this.GetModuleByKey(ModuleKey.SelectSnapShot);
    if (moduleSelectSnapShot) {
      (<SelectSnapshotModule>  moduleSelectSnapShot).SelectSnapshotModule_Subject.RegisterObserver(this.SelectSnapshotModule_Observer);
    }

    let feedBackModuleLog: IUiModule = this.GetModuleByKey(ModuleKey.FeedbackModuleLog);
    if (<UiFeedbackModuleLog>feedBackModuleLog) {
      //todo - put back   this.Logger.AddWriter(feedBackModuleLog);
    }
    this.Logger.FuncEnd(this.WireEvents.name);
  }

  InitUiManager() {
    this.Logger.FuncStart(this.InitUiManager.name);
    this.WriteBuildNumToUi();

    if (this.UiModules) {
      this.UiModules.forEach((uiModule: IUiModule) => uiModule.Init());
    }

    this.UiCommandsManager.InitButtonStateManager();
    this.Logger.FuncEnd(this.InitUiManager.name);
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

  ShowDebugDataOneWindow() {
    this.Logger.FuncStart('ShowDebugDataOneWindow');
    var toReturn: string[] = [];

    for (var kdx = 0; kdx < toReturn.length; kdx++) {
      this.Logger.Log(toReturn[kdx]);
    }

    this.Logger.FuncEnd('ShowDebugDataOneWindow');
    return toReturn;
  }

  

  GetValueInNickname(): string {
    var toReturn: string = '';
    toReturn = (<HTMLInputElement>window.document.getElementById(PopConst.Const.ElemId.InputNickname)).value;
    return toReturn;
  }

  GetButtonByIdOrSelector(targetId: string): HTMLElement {
    var toReturn: HTMLElement = document.querySelector(targetId);
    if (!toReturn) {
      toReturn = document.querySelector('[id=' + targetId + ']');
    }
    return toReturn;
  }

  AssignOnCheckedEvent(targetId: string, handler: Function): void {
    var targetElem: HTMLElement = document.getElementById(targetId);
    if (!targetElem) {
      this.Logger.ErrorAndThrow(this.AssignOnClickEvent.name, 'No Id: ' + targetId);
    } else {
      targetElem.addEventListener('checked', (evt) => { handler(evt) });
    }
  }

  AssignOnClickEvent(targetId: string, handler: Function): void {
    var targetElem = this.GetButtonByIdOrSelector(targetId);

    if (!targetElem) {
      this.Logger.ErrorAndThrow(this.AssignOnClickEvent.name, 'No Id: ' + targetId);
    } else {
      targetElem.addEventListener('click', (evt) => { handler(evt) });
    }
  }

  AssignOnClickEventFromCmd(command: IMenuCommandDefinition, handler: Function): void {
    if (command && command.MenuCommandKey !== MenuCommandKey.Unknown) {
      this.AssignOnClickEvent(command.PlaceHolderSelector, handler);
    }
  }

  AssignDblClickEvent(selector: string, handler: Function): void {
    var targetElem: HTMLElement = document.querySelector(selector);
    if (!targetElem) {
      this.Logger.ErrorAndThrow(this.AssignOnClickEvent.name, 'No Id: ' + selector);
    } else {
      targetElem.ondblclick = (evt) => { handler(evt) };
    }
  }

  PopulateSnapShotsAuto() {
  }

  PopulateSnapShotsNotAuto() {
  }
}