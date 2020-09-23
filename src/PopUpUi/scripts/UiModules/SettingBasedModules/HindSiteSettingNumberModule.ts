import { HindSiteSettingForNumbers } from "../../../../Shared/scripts/Agents/Agents/SettingsAgent/HindSiteSettingForNumbers";
import { StaticHelpers } from "../../../../Shared/scripts/Classes/StaticHelpers";
import { Guid } from "../../../../Shared/scripts/Helpers/Guid";
import { IUiModule } from "../../../../Shared/scripts/Interfaces/Agents/IUiModule";
import { SharedConst } from "../../../../Shared/scripts/SharedConst";
import { _SettingsBasedModulesBase } from "./_SettingsBasedModulesBase";
import { IUiSettingBasedModuleMutationEven_Payload } from "../../Events/UiSettingBasedModuleMutationEvent/IUiSettingBasedModuleMutationEvent_Payload";

export class HindSiteSettingNumberModule extends _SettingsBasedModulesBase implements IUiModule {
  private UiInputElement: HTMLInputElement;
  private LabelElement: HTMLLabelElement;

  Init() {
    this.Init_BaseSettingsBasedModule();
    this.BuildHtml();
  }

  private BuildHtml() {
    this.UiInputElement = <HTMLInputElement>document.createElement(SharedConst.Const.KeyWords.Html.Input);
    this.UiInputElement.id = 'nm-' + Guid.WithoutDashes(Guid.NewRandomGuid());
    this.UiInputElement.type = SharedConst.Const.KeyWords.Html.Number;

    let hindsiteSettingForNumbers: HindSiteSettingForNumbers = <HindSiteSettingForNumbers>this.SettingJacket.HindSiteSetting;
    if (hindsiteSettingForNumbers) {

      this.UiInputElement.min = hindsiteSettingForNumbers.Min.toString();
      this.UiInputElement.max = hindsiteSettingForNumbers.Max.toString();
    }
    this.UiInputElement.value = this.SettingJacket.HindSiteSetting.ValueAsInt().toString();

    this.LabelElement = <HTMLLabelElement>document.createElement(SharedConst.Const.KeyWords.Html.Label);
    this.LabelElement.setAttribute(SharedConst.Const.KeyWords.Html.For, this.UiInputElement.id);
    this.LabelElement.innerHTML = this.SettingJacket.HindSiteSetting.FriendlySetting;

    if (this.ContainerUiDivElem) {
      this.ContainerUiDivElem.appendChild(this.UiInputElement);
      this.ContainerUiDivElem.appendChild(this.LabelElement);
    }
  }

  WireEvents_Module(): void {
    if (this.UiInputElement) {
      this.UiInputElement.addEventListener('change', (evt) => this.OnSettingChanged(evt));
    }
  }

  private OnSettingChanged(evt: Event) {

    let numberValue: number = parseInt((<HTMLInputElement>evt.target).value);

    let iUiElementChangeEvent_Payload: IUiSettingBasedModuleMutationEven_Payload = {
      ModuleKey: this.ModuleKey,
      CheckBoxModule: null,
      HindSiteSetting: this.SettingJacket.HindSiteSetting,
      NumberModule: {
        NumberValue: numberValue
      },
      AccordianModule: null,
    }
    this.SettingJacket.HindSiteSetting.ValueAsObj = numberValue;

    this.UiSettingBasedModuleMutationEvent_Subject.NotifyObservers(iUiElementChangeEvent_Payload);
  }

  RefreshUi() {
    if (!StaticHelpers.IsNullOrUndefined(this.UiInputElement)) {
      let valueToDisplay: number = this.SettingJacket.HindSiteSetting.ValueAsInt();
      this.UiInputElement.value = valueToDisplay.toString();
    }
  }
}