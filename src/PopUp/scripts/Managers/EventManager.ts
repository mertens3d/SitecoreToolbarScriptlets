import { SettingType } from '../../../Shared/scripts/Enums/SettingType';
import { IGenericSetting } from '../../../Shared/scripts/Interfaces/Agents/IGenericSetting';
import { ILoggerAgent } from '../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { ISettingsAgent } from '../../../Shared/scripts/Interfaces/Agents/ISettingsAgent';
import { CommandButtonEvents } from '../../../Shared/scripts/Enums/CommandButtonEvents';
import { ICommandHndlrDataForPopUp } from "../../../Shared/scripts/Interfaces/ICommandHndlrDataForPopUp";
import { IOneCommand } from '../../../Shared/scripts/Interfaces/IOneCommand';
import { Handlers } from './Handlers';
import { UiManager } from './UiManager/UiManager';
import { LoggableBase } from '../../../Content/scripts/Managers/LoggableBase';

export class EventManager extends LoggableBase {
  Handlers: Handlers

  private SettingsAgent: ISettingsAgent;
  private UiMan: UiManager;

  constructor(logger: ILoggerAgent, settingsAgent: ISettingsAgent, uiMan: UiManager, handlers: Handlers) {
    super(logger);
    this.SettingsAgent = settingsAgent;
    this.UiMan = uiMan;
    this.Handlers = handlers;
  }

  InitEventManager(allCommands: IOneCommand[]): void {
    this.Logger.FuncStart(this.InitEventManager.name);

    try {
      this.__wireAllMenuButtons(allCommands);
      this.WireUiToSettings();
    } catch (err) {
      this.Logger.ErrorAndThrow(this.InitEventManager.name, err);
    }
    this.Logger.FuncEnd(this.InitEventManager.name);
  }

  async TriggerPingEventAsync(pingCommand: IOneCommand): Promise<void> {
    this.Logger.FuncStart(this.TriggerPingEventAsync.name);

    let data = this.BuildCommandData(pingCommand);
    this.RouteAllCommandEvents(data);

    this.Logger.FuncEnd(this.TriggerPingEventAsync.name);
  }

  private SetLabel(uiElem: HTMLElement, oneSetting: IGenericSetting) {
    //if has label
    let uiLabel: HTMLElement = window.document.querySelector(oneSetting.UiSelector.replace('id', 'for'));
    if (uiLabel) {
      uiLabel.innerHTML = oneSetting.FriendlySetting;
    } else {
      uiElem.innerHTML = oneSetting.FriendlySetting;
    }
  }

  private WireUiToSettings() {
    this.Logger.FuncStart(this.WireUiToSettings.name);
    let genericSettings: IGenericSetting[] = this.SettingsAgent.GetAllSettings();

    for (var idx = 0; idx < genericSettings.length; idx++) {
      let oneSetting: IGenericSetting = genericSettings[idx];
      if (oneSetting.HasUi) {
        let uiElem: HTMLElement = window.document.querySelector(oneSetting.UiSelector);

        if (uiElem) {
          this.SetLabel(uiElem, oneSetting)

          if (oneSetting.DataType === SettingType.BoolCheckBox) {
            let self = this;
            uiElem.addEventListener('change', (evt) => {
              self.SettingsAgent.CheckBoxSettingChanged(oneSetting.SettingKey, (<HTMLInputElement>evt.target).checked);
            })
          }
          else if (oneSetting.DataType === SettingType.Accordion) {
            this.UiMan.AccordianManager.AddAccordianDrone(oneSetting, uiElem);
          }
          else if (oneSetting.DataType == SettingType.Number) {
            let self = this;
            uiElem.addEventListener('change', (evt) => {
              self.SettingsAgent.NumberSettingChanged(oneSetting.SettingKey, parseInt((<HTMLInputElement>evt.target).value));
            })
          }
        } else {
          this.Logger.ErrorAndThrow(this.WireUiToSettings.name, 'ui generic element not found');
        }
      }
    }
    this.Logger.FuncEnd(this.WireUiToSettings.name);
  }

  private __wireAllMenuButtons(allCommands: IOneCommand[]) {
    this.Logger.FuncStart(this.__wireAllMenuButtons.name);

    // --------------- hindsite
    for (var idx = 0; idx < allCommands.length; idx++) {
      let oneCommand: IOneCommand = allCommands[idx];
      this.__wireOneMenuButtonListener(oneCommand);
    }

    this.Logger.FuncEnd(this.__wireAllMenuButtons.name);
  }

  private __wireOneMenuButtonListener(oneCommand: IOneCommand): void {
    //this.Logger.FuncStart(this.__wireOneMenuButtonListener.name, oneCommand.ButtonSelector)
    var targetElem: HTMLElement = this.UiMan.GetButtonByIdOrSelector(oneCommand.PlaceHolderSelector);

    if (oneCommand.EventData.Event === CommandButtonEvents.OnSingleClick) {
      this.WireSingleClickEvent(oneCommand, targetElem);
    } else if (oneCommand.EventData.Event === CommandButtonEvents.OnDoubleClick) {
      this.__wireDoubleClickEvent(oneCommand, targetElem)
    }

    //this.Logger.FuncEnd(this.__wireOneMenuButtonListener.name)
  }
  private __wireDoubleClickEvent(oneCommand: IOneCommand, targetElem: HTMLElement): void {
    //this.UiMan().AssignDblClickEvent(PopConst.Const.Selector.HS.SelStateSnapShot, (evt) => { this.Handlers.External.HndlrSnapShotRestoreNewTab(evt, this.PopHub); });
    //this.UiMan().AssignDblClickEvent(PopConst.Const.Selector.HS.FeedbackLogElement, (evt) => { this.Handlers.Internal.__cleardebugTextWithConfirm(evt, this.PopHub); });

    if (targetElem) {
      targetElem.ondblclick = (evt) => {
        let data: ICommandHndlrDataForPopUp = this.BuildCommandData(oneCommand);
        data.Evt = evt,
          data.EventMan.RouteAllCommandEvents(data)
      };
    }
  }

  private WireSingleClickEvent(oneCommand: IOneCommand, targetElem: HTMLElement): void {
    if (targetElem) {
      let self = this;
      targetElem.addEventListener('click', (evt) => {
        let data: ICommandHndlrDataForPopUp = this.BuildCommandData(oneCommand);
        data.Evt = evt;
        data.EventMan = self;
        data.EventMan.RouteAllCommandEvents(data);
      });
    } else {
      this.Logger.ErrorAndThrow(this.WireSingleClickEvent.name, 'No Id: ' + oneCommand.PlaceHolderSelector);
    }
  }

  private BuildCommandData(oneCommand: IOneCommand): ICommandHndlrDataForPopUp {
    var self: EventManager = this;

    let data: ICommandHndlrDataForPopUp = {
      EventMan: self,
      Command: oneCommand,
      Event: oneCommand.EventData,
      Evt: null,
      MenuState: {
        SelectSnapshotId: this.UiMan.ModuleSnapShots.GetSelectSnapshotId(),
        CurrentNicknameValue: this.UiMan.GetValueInNickname()
      }
    }

    return data;
  }

  async RouteAllCommandEvents(data: ICommandHndlrDataForPopUp): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.RouteAllCommandEvents.name);
      await data.Event.Handler(data)
        .then(() => resolve())
        .catch((err) => reject(this.RouteAllCommandEvents.name + ' | ' + err));
      this.Logger.FuncEnd(this.RouteAllCommandEvents.name);
    });
  }
}