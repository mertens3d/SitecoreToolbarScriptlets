import { PopUpManagerBase } from './PopUpManagerBase';
import { PopUpHub } from './PopUpHub';
import { HandlersExternal } from "../Classes/HandlersExternal";
import { HandlersInternal } from "../Classes/HandlersInternal";
import { IOneCommand } from '../../../Shared/scripts/Interfaces/IOneCommand';
import { MenuCommand } from '../../../Shared/scripts/Enums/MenuCommand';
import { SettingType } from '../../../Shared/scripts/Enums/SettingType';
import { AllCommands } from '../Classes/AllCommands';
import { CommandButtonEvents } from '../../../Shared/scripts/Interfaces/CommandButtonEvents';
import { Handlers } from './Handlers';
import { IEventHandlerData } from "../../../Shared/scripts/Interfaces/IEventHandlerData";
import { PopConst } from '../Classes/PopConst';
import { IAllAgents } from "../../../Shared/scripts/Interfaces/Agents/IAllAgents";
import { IOneGenericSetting } from '../../../Shared/scripts/Interfaces/Agents/IOneGenericSetting';

export class EventManager extends PopUpManagerBase {
  Handlers: Handlers

  AllMenuCommands: IOneCommand[];

  constructor(popHub: PopUpHub, allAgents: IAllAgents) {
    super(popHub, allAgents);
    this.Handlers = new Handlers();
    this.Handlers.External = new HandlersExternal(popHub, this.AllAgents);
    this.Handlers.Internal = new HandlersInternal(popHub, this.AllAgents);
  }

  Init() {
    this.AllAgents.Logger.FuncStart(EventManager.name + this.Init.name);
    this.AllMenuCommands = AllCommands.BuildAllCommands(this.PopHub, this.Handlers);
    this.__wireMenuButtons();
    this.WireAllGenericSettings();
    this.AllAgents.Logger.FuncEnd(EventManager.name + this.Init.name);
  }
  WireAllGenericSettings() {
    let genericSettings: IOneGenericSetting[] = this.AllAgents.SettingsAgent.SettingsAr;

    for (var idx = 0; idx < genericSettings.length; idx++) {
      let oneSetting = genericSettings[idx];
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
          let self = this;
          uiElem.addEventListener('click', (evt) => {
            self.Handlers.Internal.Toggleaccordion(evt, this.PopHub, oneSetting.SettingKey);
          }
          )
        }
      } else {
        this.AllAgents.Logger.Error(this.WireAllGenericSettings.name, 'ui generic element not found');
      }
    }
  }

  private __wireMenuButtons() {
    this.AllAgents.Logger.FuncStart(this.__wireMenuButtons.name);

    this.UiMan().AssignDblClickEvent(PopConst.Const.Selector.HS.SelStateSnapShot, (evt) => { this.Handlers.External.HndlrSnapShotRestore(evt, this.PopHub); });
    this.UiMan().AssignDblClickEvent(PopConst.Const.Selector.HS.TaDebug, (evt) => { this.Handlers.Internal.__cleardebugTextWithConfirm(evt, this.PopHub); });

    this.UiMan().AssignOnChangeEvent(PopConst.Const.Selector.HS.SelStateSnapShot, (evt) => { this.Handlers.Internal.HndlrSelectChange(evt, this.PopHub) });

    //this.UiMan().AssignMenuWindowChanged((evt) => { this.__hndlrMenuWindowChanged(); });

    // --------------- hindsite
    for (var idx = 0; idx < this.AllMenuCommands.length; idx++) {
      let oneCommand: IOneCommand = this.AllMenuCommands[idx];
      for (var jdx = 0; jdx < oneCommand.Events.length; jdx++) {
        let oneEvent: IEventHandlerData = oneCommand.Events[jdx];
        if (oneEvent.Event === CommandButtonEvents.OnClick) {
          var targetElem = this.UiMan().GetButtonByIdOrSelector(oneCommand.ButtonSelector);

          if (targetElem) {
            var popHub: PopUpHub = this.PopHub;
            targetElem.addEventListener('click', (evt) => { oneEvent.Handler(evt, this.PopHub, oneEvent.ParameterData) });
          } else {
            this.AllAgents.Logger.Error(this.__wireMenuButtons.name, 'No Id: ' + oneCommand.ButtonSelector);
          }
        }
      }
    }

    this.AllAgents.Logger.FuncEnd(this.__wireMenuButtons.name);
  }
  GetCommandByKey(menuCommand: MenuCommand): IOneCommand {
    var toReturn: IOneCommand;

    for (var idx = 0; idx < this.AllMenuCommands.length; idx++) {
      var candidate = this.AllMenuCommands[idx];
      if (candidate.Command === menuCommand) {
        toReturn = candidate;
        this.AllAgents.Logger.LogVal('Command', MenuCommand[toReturn.Command]);
        break;
      }
    }
    if (!toReturn) {
      this.AllAgents.Logger.Error(this.GetCommandByKey.name, 'matching command not found ' + MenuCommand[menuCommand]);
    }
    return toReturn;
  }
}