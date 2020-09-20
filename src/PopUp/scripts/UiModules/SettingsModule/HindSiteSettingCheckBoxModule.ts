import { IUiModule } from "../../../../Shared/scripts/Interfaces/Agents/IUiModule";
import { _UiModuleBase } from "../UiFeedbackModules/_UiModuleBase";
import { ISettingsAgent } from "../../../../Shared/scripts/Interfaces/Agents/ISettingsAgent";
import { ILoggerAgent } from "../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IHindSiteSetting } from "../../../../Shared/scripts/Interfaces/Agents/IGenericSetting";
import { StaticHelpers } from "../../../../Shared/scripts/Classes/StaticHelpers";
import { SettingKey } from "../../../../Shared/scripts/Enums/3xxx-SettingKey";

export class HindSiteSettingCheckBoxModule extends _UiModuleBase implements IUiModule {
  private SettingsAgent: ISettingsAgent
  private HindSiteSetting: IHindSiteSetting;
  private UiInputElement: HTMLInputElement;

  constructor(logger: ILoggerAgent, settingsAgent: ISettingsAgent, hindSiteSetting: IHindSiteSetting) {
    super(logger, hindSiteSetting.UiContainerSelector);

    this.Logger.InstantiateStart(HindSiteSettingCheckBoxModule.name);
    if (!StaticHelpers.IsNullOrUndefined(settingsAgent)
      &&
      !StaticHelpers.IsNullOrUndefined(hindSiteSetting)) {
      this.SettingsAgent = settingsAgent;
      this.HindSiteSetting = hindSiteSetting;
      this.Friendly = HindSiteSettingCheckBoxModule.name + '-' + SettingKey[hindSiteSetting.SettingKey];
    } else {
      this.Logger.ErrorAndThrow(HindSiteSettingCheckBoxModule.name, 'Null settingsAgent or null hindSiteSetting');
    }
    this.Logger.InstantiateEnd(HindSiteSettingCheckBoxModule.name);
  }

  Init() {
    this.Logger.FuncStart(this.Init.name, this.Friendly);
    this.UiInputElement = <HTMLInputElement>this.GetUiElement(this.HindSiteSetting.UiContainerSelector);
    this.SetLabel();
    this.Logger.FuncEnd(this.Init.name, this.Friendly);
  }

  WireEvents(): void {
    this.WireEvent();

    var targetElem: HTMLElement = document.getElementById(this.HindSiteSetting.UiContainerSelector);
    if (!targetElem) {
      this.Logger.ErrorAndThrow(this.AssignOnCheckedEvent.name, 'No Id: ' + this.HindSiteSetting.UiContainerSelector);
    } else {
      // todo - put back targetElem.addEventListener('checked', (evt) => { this.HindSiteSetting. handler(evt) });
    }
  }

  AssignOnCheckedEvent(targetId: string, handler: Function): void {
    
  }

  private WireEvent() {
    this.Logger.FuncStart(this.WireEvent.name, this.Friendly);
    if (!StaticHelpers.IsNullOrUndefined(this.UiInputElement)) {
      this.UiInputElement.addEventListener('change', (evt) => {
        let self = this;
        self.SettingsAgent.CheckBoxSettingChanged(this.HindSiteSetting.SettingKey, (<HTMLInputElement>evt.target).checked);
      })
    } else {
      this.Logger.WarningAndContinue(this.WireEvent.name, 'null input element');
    }
    this.Logger.FuncEnd(this.WireEvent.name, this.Friendly);
  }

  RefreshUi() {
    if (!StaticHelpers.IsNullOrUndefined(this.UiInputElement)) {
      let valueToDisplay: boolean = this.HindSiteSetting.ValueAsBool();
      this.UiInputElement.checked = valueToDisplay;
    }
  }

  private SetLabel() {
    let uiLabel: HTMLElement = window.document.querySelector(this.HindSiteSetting.UiContainerSelector.replace('id', 'for'));
    if (uiLabel) {
      uiLabel.innerHTML = this.HindSiteSetting.FriendlySetting;
    }
  }
}