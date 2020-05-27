import { PopUpManagerBase } from './PopUpManagerBase';
import { PopUpHub } from './PopUpHub';
import { HandlersExternal } from "../Classes/HandlersExternal";
import { HandlersInternal } from "../Classes/HandlersInternal";
import { IOneCommand } from '../../../Shared/scripts/Interfaces/IOneCommand';
import { MenuCommand } from '../../../Shared/scripts/Enums/MenuCommand';
import { OneGenericSetting } from "../../../Shared/scripts/Classes/OneGenericSetting";
import { SettingType } from '../../../Shared/scripts/Enums/SettingType';
import { ContentConst } from '../../../Shared/scripts/Interfaces/InjectConst';
import { AllCommands } from '../Classes/AllCommands';
import { CommandButtonEvents } from '../../../Shared/scripts/Interfaces/CommandButtonEvents';
import { Handlers } from './Handlers';
import { IEventHandlerData } from "../../../Shared/scripts/Interfaces/IEventHandlerData";
import { PopConst } from '../Classes/PopConst';
import { IAllPopUpAgents } from "../../../Shared/scripts/Interfaces/Agents/IAllPopUpAgents";

export class EventManager extends PopUpManagerBase {
  Handlers: Handlers

  AllMenuCommands: IOneCommand[];

  constructor(popHub: PopUpHub, allPopUpAgents: IAllPopUpAgents) {
    
    super(popHub, allPopUpAgents);
    this.Handlers = new Handlers();
    this.Handlers.External = new HandlersExternal(popHub, this.AllPopUpAgents);
    this.Handlers.Internal = new HandlersInternal(popHub, this.AllPopUpAgents);
  }

  Init() {
    this.AllPopUpAgents.Logger.FuncStart(EventManager.name + this.Init.name);
    this.AllMenuCommands = AllCommands.BuildAllCommands(this.PopHub, this.Handlers);
    this.__wireMenuButtons();
    this.WireAllGenericSettings();
    this.AllPopUpAgents.Logger.FuncEnd(EventManager.name + this.Init.name);
  }
  WireAllGenericSettings() {
    let genericSettings: OneGenericSetting[] = this.SettingsMan().AllSettings.SettingsAr;

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
            self.SettingsMan().SettingChanged(oneSetting.SettingKey, (<HTMLInputElement>evt.target).checked);
          }
          )
        }
        else if (oneSetting.DataType === SettingType.Accordian) {
          let self = this;
          uiElem.addEventListener('click', (evt) => {
            self.Handlers.Internal.ToggleAccordian(evt, this.PopHub, oneSetting.SettingKey);
            //self.SettingsMan().SettingChanged(oneSetting.SettingKey, (<HTMLInputElement>evt.target).checked);
          }
          )
        }
      } else {
        this.AllPopUpAgents.Logger.Error(this.WireAllGenericSettings.name, 'ui generic element not found');
      }
    }
  }

  private __wireMenuButtons() {
    this.AllPopUpAgents.Logger.FuncStart(this.__wireMenuButtons.name);

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
            this.AllPopUpAgents.Logger.Error(this.__wireMenuButtons.name, 'No Id: ' + oneCommand.ButtonSelector);
          }
        }
      }
    }

    this.AllPopUpAgents.Logger.FuncEnd(this.__wireMenuButtons.name);
  }
  GetCommandByKey(menuCommand: MenuCommand): IOneCommand {
    var toReturn: IOneCommand;

    for (var idx = 0; idx < this.AllMenuCommands.length; idx++) {
      var candidate = this.AllMenuCommands[idx];
      if (candidate.Command === menuCommand) {
        toReturn = candidate;
        this.AllPopUpAgents.Logger.LogVal('Command', MenuCommand[toReturn.Command]);
        break;
      }
    }
    if (!toReturn) {
      this.AllPopUpAgents.Logger.Error(this.GetCommandByKey.name, 'matching command not found ' + MenuCommand[menuCommand]);
    }
    return toReturn;
  }
}