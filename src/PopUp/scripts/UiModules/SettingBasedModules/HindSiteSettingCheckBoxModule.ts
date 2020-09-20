import { StaticHelpers } from "../../../../Shared/scripts/Classes/StaticHelpers";
import { Guid } from "../../../../Shared/scripts/Helpers/Guid";
import { IUiModule } from "../../../../Shared/scripts/Interfaces/Agents/IUiModule";
import { SharedConst } from "../../../../Shared/scripts/SharedConst";
import { IUiModuleMutationEvent_Payload } from "../../Events/UiModuleMutationEvent/IUiModuleMutationEvent_Payload";
import { _SettingsBasedModulesBase } from "./_SettingsBasedModulesBase";

export class HindSiteSettingCheckBoxModule extends _SettingsBasedModulesBase implements IUiModule {
  private UiInputElement: HTMLInputElement;
  private LabelElement: HTMLLabelElement;

  Init() {
    this.Logger.FuncStart(this.Init.name, this.Friendly);

    //this.UiInputElement = <HTMLInputElement>this.GetUiElement(this.HindSiteSetting.UiContainerSelector);

    this.Init_BaseSettingsBasedModule();

    this.BuildHtml();

    this.Logger.FuncEnd(this.Init.name, this.Friendly);
  }

  WireEvents(): void {
    this.Logger.FuncStart(this.WireEvents.name, this.Friendly);

    if (!StaticHelpers.IsNullOrUndefined(this.UiInputElement)) {
      this.UiInputElement.addEventListener('change', (evt: Event) => this.OnCheckboxChanged(evt))
    } else {
      this.Logger.WarningAndContinue(this.WireEvents.name, 'null input element');
    }
    this.Logger.FuncEnd(this.WireEvents.name, this.Friendly);
  }

  private OnCheckboxChanged(evt: Event) {
    let iUiElementChangeEvent_Payload: IUiModuleMutationEvent_Payload = {
      ModuleKey: this.ModuleKey,
      CheckBoxModule: {
        Checked: (<HTMLInputElement>evt.target).checked,
        SettingKey: this.HindSiteSetting.SettingKey
      },
      NumberModule: null,
      AccordianModule: null,
    }
    this.HindSiteSetting.SaveChange((<HTMLInputElement>evt.target).checked);
    this.UiElementChangeEvent_Subject.NotifyObservers(iUiElementChangeEvent_Payload);
  }

  BuildHtml() {
    this.UiInputElement = <HTMLInputElement>document.createElement(SharedConst.Const.KeyWords.Html.Input);
    this.UiInputElement.type = SharedConst.Const.KeyWords.Html.Checkbox;
    this.UiInputElement.checked = this.HindSiteSetting.ValueAsBool();
    this.UiInputElement.id = "id-" + Guid.WithoutDashes(Guid.NewRandomGuid());

    this.LabelElement = <HTMLLabelElement>document.createElement(SharedConst.Const.KeyWords.Html.Label)
    this.LabelElement.innerHTML = this.HindSiteSetting.FriendlySetting;
    this.LabelElement.setAttribute(SharedConst.Const.KeyWords.Html.For, this.UiInputElement.id);

    if (this.ContainerUiDivElem) {
      this.ContainerUiDivElem.appendChild(this.UiInputElement);
      this.ContainerUiDivElem.appendChild(this.LabelElement);
    }
  }

  RefreshUi() {
    if (!StaticHelpers.IsNullOrUndefined(this.UiInputElement)) {
      let valueToDisplay: boolean = this.HindSiteSetting.ValueAsBool();
      this.UiInputElement.checked = valueToDisplay;
    }
  }
}