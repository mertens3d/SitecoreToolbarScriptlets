import { MenuCommand } from '../../../Shared/scripts/Enums/2xxx-MenuCommand';
import { SettingType } from '../../../Shared/scripts/Enums/SettingType';
import { IAllAgents } from "../../../Shared/scripts/Interfaces/Agents/IAllAgents";
import { IGenericSetting } from '../../../Shared/scripts/Interfaces/Agents/IGenericSetting';
import { ILoggerAgent } from '../../../Shared/scripts/Interfaces/Agents/ILoggerBase';
import { ISettingsAgent } from '../../../Shared/scripts/Interfaces/Agents/ISettingsAgent';
import { CommandButtonEvents } from '../../../Shared/scripts/Interfaces/CommandButtonEvents';
import { ICommandHndlrDataForPopUp } from "../../../Shared/scripts/Interfaces/ICommandHndlrDataForPopUp";
import { IOneCommand } from '../../../Shared/scripts/Interfaces/IOneCommand';
import { AllCommands } from '../Classes/AllCommands';
import { HandlersInternal } from "../Classes/HandlersInternal";
import { Handlers } from './Handlers';
import { MessageManager } from './MessageManager';
import { PopUpHub } from './PopUpHub';
import { TabManager } from './TabManager';
import { UiManager } from './UiManager/UiManager';

export class EventManager { //extends PopUpManagerBase
  Handlers: Handlers

  AllMenuCommands: IOneCommand[];
  private Logger: ILoggerAgent;
  private SettingsAgent: ISettingsAgent;
  private UiMan: UiManager;

  constructor( allAgents: IAllAgents, logger: ILoggerAgent, settingsAgent: ISettingsAgent, uiMan: UiManager, handlers: Handlers) {
    //super(popHub, allAgents);
    this.Logger = logger;
    this.SettingsAgent = settingsAgent;
    this.UiMan = uiMan;
    this.Handlers = handlers;
   

    this.Handlers.Internal = new HandlersInternal( allAgents);
  }

  InitEventManager() {
    this.Logger.FuncStart(this.InitEventManager.name);

    this.AllMenuCommands = AllCommands.BuildAllCommands(this.Handlers);

    this.__wireAllMenuButtons();
    this.WireAllGenericSettings();
    this.Logger.FuncEnd(this.InitEventManager.name);
  }

  private WireAllGenericSettings() {
    this.Logger.FuncStart(this.WireAllGenericSettings.name);
    let genericSettings: IGenericSetting[] = this.SettingsAgent.GetAllSettings();

    for (var idx = 0; idx < genericSettings.length; idx++) {
      let oneSetting = genericSettings[idx];
      this.Logger.Log(oneSetting.Friendly + ' : ' + oneSetting.ValueAsObj);
      if (oneSetting.HasUi) {
        let uiElem: HTMLElement = window.document.querySelector(oneSetting.UiSelector);

        if (uiElem) {
          //if has label
          let uiLabel: HTMLElement = window.document.querySelector(oneSetting.UiSelector.replace('id', 'for'));
          if (uiLabel) {
            uiLabel.innerHTML = oneSetting.Friendly;
          } else {
            uiElem.innerHTML = oneSetting.Friendly;
          }

          if (oneSetting.DataType === SettingType.BoolCheckBox) {
            let self = this;
            this.Logger.Log('Assigning change event');
            uiElem.addEventListener('change', (evt) => {
              self.SettingsAgent.SettingChanged(oneSetting.SettingKey, (<HTMLInputElement>evt.target).checked);
            }
            )
          }
          else if (oneSetting.DataType === SettingType.Accordion) {
            this.UiMan.AccordianManager.AddAccordianDrone(oneSetting, uiElem);
          }
        } else {
          this.Logger.ErrorAndThrow(this.WireAllGenericSettings.name, 'ui generic element not found');
        }
      }
    }
    this.Logger.FuncEnd(this.WireAllGenericSettings.name);
  }

  private __wireAllMenuButtons() {
    this.Logger.FuncStart(this.__wireAllMenuButtons.name);

    // --------------- hindsite
    for (var idx = 0; idx < this.AllMenuCommands.length; idx++) {
      let oneCommand: IOneCommand = this.AllMenuCommands[idx];
      this.__wireOneMenuButtonListener(oneCommand);
    }

    this.Logger.FuncEnd(this.__wireAllMenuButtons.name);
  }

  private __wireOneMenuButtonListener(oneCommand: IOneCommand): void {
    this.Logger.FuncStart(this.__wireOneMenuButtonListener.name, oneCommand.ButtonSelector)
    var targetElem: HTMLElement = this.UiMan.GetButtonByIdOrSelector(oneCommand.ButtonSelector);

    if (oneCommand.EventData.Event === CommandButtonEvents.OnSingleClick) {
      this.__wireSingleClickEvent(oneCommand, targetElem);
    } else if (oneCommand.EventData.Event === CommandButtonEvents.OnDoubleClick) {
      this.__wireDoubleClickEvent(oneCommand, targetElem)
    }

    this.Logger.FuncEnd(this.__wireOneMenuButtonListener.name)
  }
  private __wireDoubleClickEvent(oneCommand: IOneCommand, targetElem: HTMLElement): void {
    //this.UiMan().AssignDblClickEvent(PopConst.Const.Selector.HS.SelStateSnapShot, (evt) => { this.Handlers.External.HndlrSnapShotRestoreNewTab(evt, this.PopHub); });
    //this.UiMan().AssignDblClickEvent(PopConst.Const.Selector.HS.FeedbackLogElement, (evt) => { this.Handlers.Internal.__cleardebugTextWithConfirm(evt, this.PopHub); });

    if (targetElem) {
      let data: ICommandHndlrDataForPopUp = this.__buildCommandData(oneCommand);
      targetElem.ondblclick = (evt) => {
        data.Evt = evt,
          data.Self.RouteAllCommandEvents(data)
      };
    }
  }

  private __wireSingleClickEvent(oneCommand: IOneCommand, targetElem: HTMLElement): void {
    if (targetElem) {
      let data: ICommandHndlrDataForPopUp = this.__buildCommandData(oneCommand);

      targetElem.addEventListener('click', (evt) => {
        data.Evt = evt;
        data.Self.RouteAllCommandEvents(data);
      });
    } else {
      this.Logger.ErrorAndThrow(this.__wireAllMenuButtons.name, 'No Id: ' + oneCommand.ButtonSelector);
    }
  }

  private __buildCommandData(oneCommand: IOneCommand): ICommandHndlrDataForPopUp {
    var self: EventManager = this;

    let data: ICommandHndlrDataForPopUp = {
      Self: self,
      Command: oneCommand,
      Event: oneCommand.EventData,
      Evt: null
    }

    return data;
  }

  TriggerPingEvent(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.TriggerPingEvent.name);

      for (var idx = 0; idx < this.AllMenuCommands.length; idx++) {
        let candidate = this.AllMenuCommands[idx];
        if (candidate.Command === MenuCommand.Ping) {
          let data = this.__buildCommandData(candidate);
          this.Logger.LogAsJsonPretty(this.TriggerPingEvent.name, data.Command);

          await data.Self.RouteAllCommandEvents(data)
            .then(() => resolve())
            .catch((err) => reject(err));
          break;
          //await this.Handlers.External.Ping(null, this.PopHub);
        }
      }

      this.Logger.FuncEnd(this.TriggerPingEvent.name);
    })
  }

  async RouteAllCommandEvents(data: ICommandHndlrDataForPopUp) {
    return new Promise(async (resolve, reject) => {
      await data.Event.Handler(data)
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }
}