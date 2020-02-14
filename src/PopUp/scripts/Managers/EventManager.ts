import { PopUpManagerBase } from './PopUpManagerBase';
import { PopUpHub } from './PopUpHub';
import { HandlersExternal } from "../Classes/HandlersExternal";
import { HandlersInternal } from "../Classes/HandlersInternal";
import { IOneCommand } from '../../../Shared/scripts/Interfaces/IOneCommand';
import { MenuCommand } from '../../../Shared/scripts/Enums/MenuCommand';
import { scWindowType } from '../../../Shared/scripts/Enums/scWindowType';
import { IOneGenericSetting } from '../../../Shared/scripts/Classes/OneSetting';
import { SettingType } from '../../../Shared/scripts/Enums/SettingType';

export class EventManager extends PopUpManagerBase {
  HandlersExternal: HandlersExternal;
  HandlersInternal: HandlersInternal;
  AllMenuCommands: IOneCommand[];

  constructor(popHub: PopUpHub) {
    super(popHub);
    this.HandlersExternal = new HandlersExternal(popHub);
    this.HandlersInternal = new HandlersInternal(popHub);
  }

  Init() {
    this.Log().FuncStart(EventManager.name + this.Init.name);
    this.BuildAllCommands();
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
            self.HandlersInternal.__toggleAccordian(evt, oneSetting.SettingKey);
            //self.SettingsMan().SettingChanged(oneSetting.SettingKey, (<HTMLInputElement>evt.target).checked);
          }
          )
        }
      } else {
        this.Log().Error(this.WireAllGenericSettings.name, 'ui generic element not found');
      }
    }
  }
  BuildAllCommands() {
    this.Log().FuncStart(this.BuildAllCommands.name);
    this.AllMenuCommands = [
      {
        Command: MenuCommand.CloseWindow,
        ButtonSelector: this.Const().Selector.Btn.WindowClose,
        RequiredPageTypes: []
      },

      {
        Command: MenuCommand.Edit,
        ButtonSelector: this.Const().ElemId.HS.Btn.ModeEdit,
        RequiredPageTypes: [scWindowType.ContentEditor, scWindowType.Desktop, scWindowType.Normal, scWindowType.Preview]
      },
      {
        Command: MenuCommand.MarkFavorite,
        ButtonSelector: this.Const().ElemId.HS.Btn.MarkFavorite,
        RequiredPageTypes: []
      },
      {
        Command: MenuCommand.TakeSnapShot,
        ButtonSelector: this.Const().ElemId.HS.Btn.HsSaveWindowState,
        RequiredPageTypes: [scWindowType.ContentEditor, scWindowType.Desktop]
      },
    ]
    this.Log().FuncEnd(this.BuildAllCommands.name);
  }

  private __wireMenuButtons() {
    this.Log().FuncStart(this.__wireMenuButtons.name);

    this.UiMan().AssignDblClickEvent(this.Const().Selector.HS.SelStateSnapShot, (evt) => { this.HandlersExternal.HndlrSnapShotRestore(evt); });
    this.UiMan().AssignDblClickEvent(this.Const().Selector.HS.TaDebug, () => { this.HandlersInternal.__cleardebugTextWithConfirm(); });

    this.UiMan().AssignOnChangeEvent(this.Const().Selector.HS.SelStateSnapShot, (evt) => { this.HandlersInternal.HndlrSelectChange(evt) });

    //this.UiMan().AssignMenuWindowChanged((evt) => { this.__hndlrMenuWindowChanged(); });

    // ------------- Header

    this.UiMan().AssignOnClickEventFromCmd(this.GetCommandByKey(MenuCommand.CloseWindow), (evt) => this.HandlersInternal.CloseWindow(evt));

    // ------------- Foresite

    this.UiMan().AssignOnClickEvent(this.Const().ElemId.HS.Btn.AdminB, () => { this.HandlersExternal.HndlrAdminB() });
    this.UiMan().AssignOnClickEvent(this.Const().ElemId.HS.Btn.CE, () => { this.HandlersExternal.__hndlrOpenCE(); });
    this.UiMan().AssignOnClickEvent(this.Const().ElemId.HS.Btn.Desktop, (evt) => { this.HandlersExternal.__hndlrDesktop(evt); });
    this.UiMan().AssignOnClickEvent(this.Const().ElemId.HS.Btn.ModeNorm, (evt) => this.HandlersExternal.__hndlrSetScMode(this.Const().ScMode.normal, evt));
    this.UiMan().AssignOnClickEvent(this.Const().ElemId.HS.Btn.ModePrev, (evt) => this.HandlersExternal.__hndlrSetScMode(this.Const().ScMode.preview, evt));
    this.UiMan().AssignOnClickEvent(this.Const().ElemId.HS.Btn.QuickPublish, (evt) => { this.HandlersExternal.__hndlrQuickPublish(evt) });
    this.UiMan().AssignOnClickEvent(this.Const().ElemId.HS.Btn.UpdateNicknameB, () => this.HandlersExternal.HndlrSnapShotUpdateNickName());

    this.UiMan().AssignOnClickEventFromCmd(this.GetCommandByKey(MenuCommand.Edit), (evt) => this.HandlersExternal.__hndlrSetScMode(this.Const().ScMode.edit, evt));

    // --------------- hindsite

    this.UiMan().AssignOnClickEvent(this.Const().ElemId.HS.Btn.HsCancel, (evt) => { this.HandlersExternal.__hndlrCancelOperation(evt); });
    this.UiMan().AssignOnClickEvent(this.Const().ElemId.HS.Btn.HsDrawStorage, (evt) => this.HandlersExternal.__DrawStorage(evt));
    this.UiMan().AssignOnClickEvent(this.Const().ElemId.HS.Btn.HsRemoveFromStorage, (evt) => this.HandlersExternal.HndlrSnapShotRemove(evt));
    this.UiMan().AssignOnClickEvent(this.Const().ElemId.HS.Btn.HsRestoreWindowState, (evt) => { this.HandlersExternal.HndlrSnapShotRestore(evt); });

    this.UiMan().AssignOnClickEventFromCmd(this.GetCommandByKey(MenuCommand.MarkFavorite), (evt) => this.HandlersExternal.MarkFavorite(evt));
    this.UiMan().AssignOnClickEventFromCmd(this.GetCommandByKey(MenuCommand.TakeSnapShot), (evt) => { this.HandlersExternal.__hndlrSnapShotCreate(evt) });

    this.UiMan().AssignOnClickEvent(this.Const().ElemId.HS.Btn.BigRed, () => this.HandlersExternal.__hndlrAddCETab);

    // --------------- fieldsets



    //this.UiMan().AssignOnClickEvent(this.Const().Selector.HS.iCBoxdSettingsShowLogData, (evt) => { this.HandlersInternal.__showDebugButtonClicked(evt) });

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