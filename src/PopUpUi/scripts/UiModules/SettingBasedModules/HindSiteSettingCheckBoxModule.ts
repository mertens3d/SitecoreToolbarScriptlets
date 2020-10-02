import { StaticHelpers } from "../../../../Shared/scripts/Classes/StaticHelpers";
import { Guid } from "../../../../Shared/scripts/Helpers/Guid";
import { IUiModule } from "../../../../Shared/scripts/Interfaces/Agents/IUiModule";
import { SharedConst } from "../../../../Shared/scripts/SharedConst";
import { UiEnableState } from "../../../../Shared/scripts/Enums/Enabled";
import { IUiSettingBasedModuleMutationEven_Payload } from "../../Events/UiSettingBasedModuleMutationEvent/IUiSettingBasedModuleMutationEvent_Payload";
import { IHindeCore } from "../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { HindSiteSettingWrapper } from "../../../../Shared/scripts/Agents/Agents/SettingsAgent/HindSiteSettingWrapper";
import { _SettingsBasedModulesBase } from "./_SettingsBasedModulesBase";

//export namespace HindSiteUiLayer {
  export class HindSiteSettingCheckBoxModule extends _SettingsBasedModulesBase implements IUiModule {
    private UiInputElement: HTMLInputElement;
    private LabelElement: HTMLLabelElement;
    Friendly = HindSiteSettingCheckBoxModule.name;

    constructor(hindeCore: IHindeCore, hindSiteSetting: HindSiteSettingWrapper) {
      super(hindeCore, hindSiteSetting);
    }


    Init_Module() {
      this.Logger.FuncStart(this.Init_Module.name, this.Friendly);
      this.Init_BaseSettingsBasedModule();
      this.Logger.FuncEnd(this.Init_Module.name, this.Friendly);
    }

    WireEvents_Module(): void {
      this.Logger.FuncStart(this.WireEvents_Module.name, this.Friendly);

      if (!StaticHelpers.IsNullOrUndefined(this.UiInputElement)) {
        this.UiInputElement.addEventListener('change', (evt: Event) => this.OnCheckboxChanged(evt))
      } else {
        this.Logger.WarningAndContinue(this.WireEvents_Module.name, 'null input element');
      }
      this.Logger.FuncEnd(this.WireEvents_Module.name, this.Friendly);
    }

    private OnCheckboxChanged(evt: Event) {

      let newValue: boolean = (<HTMLInputElement>evt.target).checked;

      let iUiElementChangeEvent_Payload: IUiSettingBasedModuleMutationEven_Payload = {
        ModuleKey: this.ModuleKey,
        HindSiteSetting: this.SettingJacket.HindSiteSetting,
        CheckBoxModule: {
          Checked: newValue,
          SettingKey: this.SettingJacket.HindSiteSetting.SettingKey
        },
        NumberModule: null,
        AccordianModule: null,
      }
      this.SettingJacket.HindSiteSetting.ValueAsObj = newValue;
      this.UiSettingBasedModuleMutationEvent_Subject.NotifyObserversAsync(iUiElementChangeEvent_Payload);
    }

    BuildHtmlForModule() {
      this.UiInputElement = <HTMLInputElement>document.createElement(SharedConst.Const.KeyWords.Html.Input);
      this.UiInputElement.type = SharedConst.Const.KeyWords.Html.Checkbox;
      this.UiInputElement.checked = this.SettingJacket.HindSiteSetting.ValueAsBool();
      this.UiInputElement.id = "id-" + Guid.WithoutDashes(Guid.NewRandomGuid());

      this.LabelElement = <HTMLLabelElement>document.createElement(SharedConst.Const.KeyWords.Html.Label)
      this.LabelElement.innerHTML = this.SettingJacket.HindSiteSetting.FriendlySetting;
      this.LabelElement.setAttribute(SharedConst.Const.KeyWords.Html.For, this.UiInputElement.id);

      if (this.SettingJacket.HindSiteSetting.EnabledState !== UiEnableState.Enabled) {
        this.UiInputElement.setAttribute('disabled', 'disabled');
        this.LabelElement.innerHTML = this.LabelElement.innerHTML + ' {disabled}';
      }

      if (this.ContainerUiDivElem) {
        this.ContainerUiDivElem.appendChild(this.UiInputElement);
        this.ContainerUiDivElem.appendChild(this.LabelElement);
      }
    }

    RefreshUi_Module() {
      if (!StaticHelpers.IsNullOrUndefined(this.UiInputElement)) {
        let valueToDisplay: boolean = this.SettingJacket.HindSiteSetting.ValueAsBool();
        this.UiInputElement.checked = valueToDisplay;
      }
    }
  }
//}