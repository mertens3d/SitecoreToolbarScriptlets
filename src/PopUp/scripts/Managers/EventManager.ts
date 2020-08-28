import { MenuCommand } from '../../../Shared/scripts/Enums/2xxx-MenuCommand';
import { SettingType } from '../../../Shared/scripts/Enums/SettingType';
import { IAllAgents } from "../../../Shared/scripts/Interfaces/Agents/IAllAgents";
import { IOneGenericSetting } from '../../../Shared/scripts/Interfaces/Agents/IOneGenericSetting';
import { CommandButtonEvents } from '../../../Shared/scripts/Interfaces/CommandButtonEvents';
import { IEventHandlerData } from "../../../Shared/scripts/Interfaces/IEventHandlerData";
import { IOneCommand } from '../../../Shared/scripts/Interfaces/IOneCommand';
import { AllCommands } from '../Classes/AllCommands';
import { HandlersExternal } from "../Classes/HandlersExternal";
import { HandlersInternal } from "../Classes/HandlersInternal";
import { PopConst } from '../Classes/PopConst';
import { Handlers } from './Handlers';
import { PopUpHub } from './PopUpHub';
import { PopUpManagerBase } from './PopUpManagerBase';
import { ICommandHndlrDataForPopUp } from "../../../Shared/scripts/Interfaces/ICommandHndlrDataForPopUp";

export class EventManager extends PopUpManagerBase {
  Handlers: Handlers

  AllMenuCommands: IOneCommand[];

  constructor(popHub: PopUpHub, allAgents: IAllAgents) {
    super(popHub, allAgents);
    this.Handlers = new Handlers();
    this.Handlers.External = new HandlersExternal(popHub, this.AllAgents);
    this.Handlers.Internal = new HandlersInternal(popHub, this.AllAgents);
  }

  InitEventManager() {
    this.AllAgents.Logger.FuncStart(this.InitEventManager.name);

    this.AllMenuCommands = AllCommands.BuildAllCommands(this.PopHub, this.Handlers);

    this.__wireAllMenuButtons();
    this.WireAllGenericSettings();
    this.AllAgents.Logger.FuncEnd(this.InitEventManager.name);
  }
  WireAllGenericSettings() {
    let genericSettings: IOneGenericSetting[] = this.AllAgents.SettingsAgent.SettingsAr;

    for (var idx = 0; idx < genericSettings.length; idx++) {
      let oneSetting = genericSettings[idx];
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
            uiElem.addEventListener('change', (evt) => {
              self.AllAgents.SettingsAgent.SettingChanged(oneSetting.SettingKey, (<HTMLInputElement>evt.target).checked);
            }
            )
          }
          else if (oneSetting.DataType === SettingType.Accordion) {
            this.UiMan().AccordianManager.AddAccordianDrone(oneSetting, uiElem);
          }
        } else {
          this.AllAgents.Logger.ErrorAndThrow(this.WireAllGenericSettings.name, 'ui generic element not found');
        }
      }
    }
  }

  private __wireAllMenuButtons() {
    this.AllAgents.Logger.FuncStart(this.__wireAllMenuButtons.name);

    // --------------- hindsite
    for (var idx = 0; idx < this.AllMenuCommands.length; idx++) {
      let oneCommand: IOneCommand = this.AllMenuCommands[idx];
      this.__wireOneMenuButtonListener(oneCommand);
    }

    this.AllAgents.Logger.FuncEnd(this.__wireAllMenuButtons.name);
  }

  private __wireOneMenuButtonListener(oneCommand: IOneCommand): void {
    var targetElem: HTMLElement = this.UiMan().GetButtonByIdOrSelector(oneCommand.ButtonSelector);

    if (oneCommand.EventData.Event === CommandButtonEvents.OnSingleClick) {
      this.__wireSingleClickEvent(oneCommand, targetElem);
    } else if (oneCommand.EventData.Event === CommandButtonEvents.OnDoubleClick) {
      this.__wireDoubleClickEvent(oneCommand, targetElem)
    }
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
      this.AllAgents.Logger.ErrorAndThrow(this.__wireAllMenuButtons.name, 'No Id: ' + oneCommand.ButtonSelector);
    }
  }

  private __buildCommandData(oneCommand: IOneCommand): ICommandHndlrDataForPopUp {
    var self: EventManager = this;

    let data: ICommandHndlrDataForPopUp = {
      Self: self,
      Command: oneCommand,
      Event: oneCommand.EventData,
      Evt: null,
      PopUpHub: self.PopHub
    }

    return data;
  }

  TriggerPingEvent(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.AllAgents.Logger.FuncStart(this.TriggerPingEvent.name);

      for (var idx = 0; idx < this.AllMenuCommands.length; idx++) {
        let candidate = this.AllMenuCommands[idx];
        if (candidate.Command === MenuCommand.Ping) {
          let data = this.__buildCommandData(candidate);
          this.AllAgents.Logger.LogAsJsonPretty(this.TriggerPingEvent.name, data.Command);


          await data.Self.RouteAllCommandEvents(data)
            .then(() => resolve())
            .catch((err) => reject(err));
          break;
          //await this.Handlers.External.Ping(null, this.PopHub);
        }
      }

      this.AllAgents.Logger.FuncEnd(this.TriggerPingEvent.name);
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