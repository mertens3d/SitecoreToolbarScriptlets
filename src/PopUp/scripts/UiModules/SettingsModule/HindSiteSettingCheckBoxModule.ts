import { IUiModule } from "../../../../Shared/scripts/Interfaces/Agents/IUiModule";
import { _UiModuleBase } from "../UiFeedbackModules/_UiModuleBase";
import { ISettingsAgent } from "../../../../Shared/scripts/Interfaces/Agents/ISettingsAgent";
import { ILoggerAgent } from "../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IHindSiteSetting } from "../../../../Shared/scripts/Interfaces/Agents/IGenericSetting";
import { StaticHelpers } from "../../../../Shared/scripts/Classes/StaticHelpers";
import { SettingKey } from "../../../../Shared/scripts/Enums/3xxx-SettingKey";
import { SharedConst } from "../../../../Shared/scripts/SharedConst";
import { Guid } from "../../../../Shared/scripts/Helpers/Guid";

export class HindSiteSettingCheckBoxModule extends _UiModuleBase implements IUiModule {
  private SettingsAgent: ISettingsAgent
  private HindSiteSetting: IHindSiteSetting;
  private UiInputElement: HTMLInputElement;
  private LabelElement: HTMLLabelElement;

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
    //this.UiInputElement = <HTMLInputElement>this.GetUiElement(this.HindSiteSetting.UiContainerSelector);
    this.InitUiModuleBase();

    this.BuildHtml();

    this.Logger.FuncEnd(this.Init.name, this.Friendly);
  }

  WireEvents(): void {
    this.Logger.FuncStart(this.WireEvents.name, this.Friendly);
    if (!StaticHelpers.IsNullOrUndefined(this.UiInputElement)) {
      this.UiInputElement.addEventListener('change', (evt) => {
        let self = this;
        self.SettingsAgent.CheckBoxSettingChanged(this.HindSiteSetting.SettingKey, (<HTMLInputElement>evt.target).checked);
      })
    } else {
      this.Logger.WarningAndContinue(this.WireEvents.name, 'null input element');
    }
    this.Logger.FuncEnd(this.WireEvents.name, this.Friendly);
  }

  BuildHtml() {
    this.UiInputElement = <HTMLInputElement>document.createElement(SharedConst.Const.KeyWords.Html.Input);
    this.UiInputElement.type = SharedConst.Const.KeyWords.Html.Checkbox;
    this.UiInputElement.checked = true;
    this.UiInputElement.id = "id-" + Guid.WithoutDashes(Guid.NewRandomGuid());

    this.LabelElement = <HTMLLabelElement>document.createElement(SharedConst.Const.KeyWords.Html.Label)
    this.LabelElement.innerHTML = this.Friendly;
    this.LabelElement.setAttribute(SharedConst.Const.KeyWords.Html.For, this.UiInputElement.id);

    if (this.ContainerUiElem) {
      this.ContainerUiElem.appendChild(this.UiInputElement);
      this.ContainerUiElem.appendChild(this.LabelElement);
    }
  }

  RefreshUi() {
    if (!StaticHelpers.IsNullOrUndefined(this.UiInputElement)) {
      let valueToDisplay: boolean = this.HindSiteSetting.ValueAsBool();
      this.UiInputElement.checked = valueToDisplay;
    }
  }
}