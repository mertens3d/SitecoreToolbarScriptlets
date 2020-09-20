import { StaticHelpers } from "../../../../Shared/scripts/Classes/StaticHelpers";
import { SharedConst } from "../../../../Shared/scripts/SharedConst";
import { IUiModule } from "../../../../Shared/scripts/Interfaces/Agents/IUiModule";
import { Guid } from "../../../../Shared/scripts/Helpers/Guid";
import { IUiModuleMutationEvent_Payload } from "../../Events/UiModuleMutationEvent/IUiModuleMutationEvent_Payload";
import { _SettingsBasedModulesBase } from "./_SettingsBasedModulesBase";

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
    this.UiInputElement.min = "0";
    this.UiInputElement.max = "100";
    this.UiInputElement.value = "15";

    this.LabelElement = <HTMLLabelElement>document.createElement(SharedConst.Const.KeyWords.Html.Label);
    this.LabelElement.setAttribute(SharedConst.Const.KeyWords.Html.For, this.UiInputElement.id);
    this.LabelElement.innerHTML = this.SettingWrapper.HindSiteSetting.FriendlySetting;

    if (this.ContainerUiDivElem) {
      this.ContainerUiDivElem.appendChild(this.UiInputElement);
      this.ContainerUiDivElem.appendChild(this.LabelElement);
    }
  }

  WireEvents(): void {
    if (this.UiInputElement) {
      this.UiInputElement.addEventListener('change', (evt) => this.OnSettingChanged(evt));
    }
  }

  private OnSettingChanged(evt: Event) {
    let iUiElementChangeEvent_Payload: IUiModuleMutationEvent_Payload = {
      ModuleKey: this.ModuleKey,
      CheckBoxModule: null,
      NumberModule: {
        NumberValue: parseInt((<HTMLInputElement>evt.target).value)
      },
      AccordianModule: null,
    }
    this.SettingWrapper.SaveChange((<HTMLInputElement>evt.target).checked);
    this.UiElementChangeEvent_Subject.NotifyObservers(iUiElementChangeEvent_Payload);
  }

  RefreshUi() {
    if (!StaticHelpers.IsNullOrUndefined(this.UiInputElement)) {
      let valueToDisplay: number = this.SettingWrapper.HindSiteSetting.ValueAsInt();
      this.UiInputElement.value = valueToDisplay.toString();
    }
  }
}