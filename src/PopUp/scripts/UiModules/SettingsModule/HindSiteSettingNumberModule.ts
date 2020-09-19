import { IUiModule } from "../../../../Shared/scripts/Interfaces/Agents/IUiModule";
import { _UiModuleBase } from "../UiFeedbackModules/_UiModuleBase";
import { ISettingsAgent } from "../../../../Shared/scripts/Interfaces/Agents/ISettingsAgent";
import { ILoggerAgent } from "../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IHindSiteSetting } from "../../../../Shared/scripts/Interfaces/Agents/IGenericSetting";
import { StaticHelpers } from "../../../../Shared/scripts/Classes/StaticHelpers";
import { SettingKey } from "../../../../Shared/scripts/Enums/3xxx-SettingKey";
import { HindSiteSettingCheckBoxModule } from "./HindSiteSettingCheckBoxModule";

export class HindSiteSettingNumberModule extends _UiModuleBase implements IUiModule {
  private SettingsAgent: ISettingsAgent;
  private HindSiteSetting: IHindSiteSetting;
  private UiInputElement: HTMLInputElement;

  constructor(logger: ILoggerAgent, settingsAgent: ISettingsAgent, hindSiteSetting: IHindSiteSetting) {
    super(logger, hindSiteSetting.UiSelector);

    this.Logger.InstantiateStart(HindSiteSettingCheckBoxModule.name);
    if (!StaticHelpers.IsNullOrUndefined(settingsAgent)
      &&
      !StaticHelpers.IsNullOrUndefined(hindSiteSetting)) {
      this.SettingsAgent = settingsAgent;
      this.HindSiteSetting = hindSiteSetting;
      this.Friendly = HindSiteSettingCheckBoxModule.name + '-' + SettingKey[hindSiteSetting.SettingKey];
    }
    else {
      this.Logger.ErrorAndThrow(HindSiteSettingCheckBoxModule.name, 'Null settingsAgent or null hindSiteSetting');
    }
    this.Logger.InstantiateEnd(HindSiteSettingCheckBoxModule.name);
  }

  Init() {
    let self = this;
    this.UiInputElement = <HTMLInputElement> this.GetUiElement();
    if (this.UiInputElement) {

    this.UiInputElement.addEventListener('change', (evt) => {
      self.SettingsAgent.NumberSettingChanged(self.HindSiteSetting.SettingKey, parseInt((<HTMLInputElement>evt.target).value));
    })
    }
  }

  RefreshUi() {
    if (!StaticHelpers.IsNullOrUndefined(this.UiInputElement)) {
      let valueToDisplay: number = this.HindSiteSetting.ValueAsInt();
      this.UiInputElement.value = valueToDisplay.toString();
    }
  }
}