import { PopUpManagerBase } from './PopUpManagerBase';
import { PopUpHub } from './PopUpHub';
import { HandlersExternal } from "../Classes/HandlersExternal";
import { HandlersInternal } from "../Classes/HandlersInternal";
import { IOneCommand } from '../../../Shared/scripts/Interfaces/IOneCommand';
import { MenuCommand } from '../../../Shared/scripts/Enums/MenuCommand';
import { IOneGenericSetting } from '../../../Shared/scripts/Classes/OneSetting';
import { SettingType } from '../../../Shared/scripts/Enums/SettingType';
import { ContentConst } from '../../../Shared/scripts/Interfaces/InjectConst';
import { AllCommands } from '../Classes/AllCommands';
import { CommandButtonEvents } from '../../../Shared/scripts/Interfaces/CommandButtonEvents';
import { Handlers } from './Handlers';
import { IEventHandlerData } from "../../../Shared/scripts/Interfaces/IEventHandlerData";
import { PopConst } from '../Classes/PopConst';

export class EventManager extends PopUpManagerBase {
  Handlers: Handlers

  AllMenuCommands: IOneCommand[];

  constructor(popHub: PopUpHub) {
    super(popHub);
    this.Handlers = new Handlers();
    this.Handlers.External = new HandlersExternal(popHub);
    this.Handlers.Internal = new HandlersInternal(popHub);
  }

  Init() {
    this.Log().FuncStart(EventManager.name + this.Init.name);
    this.AllMenuCommands = AllCommands.BuildAllCommands(this.PopHub, this.Handlers);
    this.__wireMenuButtons();
    this.WireAllGenericSettings();
    this.Log().FuncEnd(EventManager.name + this.Init.name);
  }
  WireAllGenericSettings() {
    let genericSettings: IOneGenericSetting[] = this.SettingsMan().AllSettings.SettingsAr;

    for (var idx = 0; idx < genericSettings.length; idx++) {
      let oneSetting = genericSettings[idx];
      let uiElem: HTMLElement = window.document.querySelector(oneSetting.UiSelector);
      if (uiElem) {
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
            self.Handlers.Internal.__toggleAccordian(evt, oneSetting.SettingKey);
            //self.SettingsMan().SettingChanged(oneSetting.SettingKey, (<HTMLInputElement>evt.target).checked);
          }
          )
        }
      } else {
        this.Log().Error(this.WireAllGenericSettings.name, 'ui generic element not found');
      }
    }
  }

  private __wireMenuButtons() {
    this.Log().FuncStart(this.__wireMenuButtons.name);

    this.UiMan().AssignDblClickEvent(PopConst.Const.Selector.HS.SelStateSnapShot, (evt) => { this.Handlers.External.HndlrSnapShotRestore(evt); });
    this.UiMan().AssignDblClickEvent(PopConst.Const.Selector.HS.TaDebug, () => { this.Handlers.Internal.__cleardebugTextWithConfirm(); });

    this.UiMan().AssignOnChangeEvent(PopConst.Const.Selector.HS.SelStateSnapShot, (evt) => { this.Handlers.Internal.HndlrSelectChange(evt) });

    //this.UiMan().AssignMenuWindowChanged((evt) => { this.__hndlrMenuWindowChanged(); });

    // ------------- Header

    this.UiMan().AssignOnClickEventFromCmd(this.GetCommandByKey(MenuCommand.CloseWindow), (evt) => this.Handlers.Internal.CloseWindow(evt));

    // ------------- Foresite

    this.UiMan().AssignOnClickEvent(PopConst.Const.ElemId.HS.Btn.AdminB, () => { this.Handlers.External.HndlrAdminB() });
    this.UiMan().AssignOnClickEvent(PopConst.Const.ElemId.HS.Btn.CE, () => { this.Handlers.External.__hndlrOpenCE(); });
    this.UiMan().AssignOnClickEvent(PopConst.Const.ElemId.HS.Btn.Desktop, (evt) => { this.Handlers.External.__hndlrDesktop(evt); });
    

    this.UiMan().AssignOnClickEvent(PopConst.Const.ElemId.HS.Btn.QuickPublish, (evt) => { this.Handlers.External.__hndlrQuickPublish(evt) });
    this.UiMan().AssignOnClickEvent(PopConst.Const.ElemId.HS.Btn.UpdateNicknameB, () => this.Handlers.External.HndlrSnapShotUpdateNickName());

    

    // --------------- hindsite

    this.UiMan().AssignOnClickEvent(PopConst.Const.ElemId.HS.Btn.HsCancel, (evt) => { this.Handlers.External.__hndlrCancelOperation(evt); });
    this.UiMan().AssignOnClickEvent(PopConst.Const.ElemId.HS.Btn.HsDrawStorage, (evt) => this.Handlers.External.__DrawStorage(evt));
    this.UiMan().AssignOnClickEvent(PopConst.Const.ElemId.HS.Btn.HsRemoveFromStorage, (evt) => this.Handlers.External.HndlrSnapShotRemove(evt));
    this.UiMan().AssignOnClickEvent(PopConst.Const.ElemId.HS.Btn.HsRestoreWindowState, (evt) => { this.Handlers.External.HndlrSnapShotRestore(evt); });

    this.UiMan().AssignOnClickEventFromCmd(this.GetCommandByKey(MenuCommand.MarkFavorite), (evt) => this.Handlers.External.MarkFavorite(evt));
    this.UiMan().AssignOnClickEventFromCmd(this.GetCommandByKey(MenuCommand.TakeSnapShot), (evt) => { this.Handlers.External.__hndlrSnapShotCreate(evt) });

    //this.UiMan().AssignOnClickEvent(PopConst.Const.ElemId.HS.Btn.BigRed, () => this.Handlers.External.__hndlrAddCETab);

    // --------------- fieldsets

    //this.UiMan().AssignOnClickEvent(PopConst.Const.Selector.HS.iCBoxdSettingsShowLogData, (evt) => { this.Handlers.Internal.__showDebugButtonClicked(evt) });

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
            this.Log().Error(this.__wireMenuButtons.name, 'No Id: ' + oneCommand.ButtonSelector);
          }
        }
      }
    }

    this.Log().FuncEnd(this.__wireMenuButtons.name);
  }
  GetCommandByKey(menuCommand: MenuCommand): IOneCommand {
    var toReturn: IOneCommand;

    for (var idx = 0; idx < this.AllMenuCommands.length; idx++) {
      var candidate = this.AllMenuCommands[idx];
      if (candidate.Command === menuCommand) {
        toReturn = candidate;
        this.Log().LogVal('Command', MenuCommand[toReturn.Command]);
        break;
      }
    }
    if (!toReturn) {
      this.Log().Error(this.GetCommandByKey.name, 'matching command not found ' + MenuCommand[menuCommand]);
    }
    return toReturn;
  }
}