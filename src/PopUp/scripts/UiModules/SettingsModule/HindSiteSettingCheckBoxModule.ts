import { StaticHelpers } from "../../../../Shared/scripts/Classes/StaticHelpers";
import { SettingKey } from "../../../../Shared/scripts/Enums/3xxx-SettingKey";
import { Guid } from "../../../../Shared/scripts/Helpers/Guid";
import { IHindSiteSetting } from "../../../../Shared/scripts/Interfaces/Agents/IGenericSetting";
import { ILoggerAgent } from "../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IUiModule } from "../../../../Shared/scripts/Interfaces/Agents/IUiModule";
import { SharedConst } from "../../../../Shared/scripts/SharedConst";
import { IUiModuleMutationEvent_Payload } from "../../Events/UiModuleMutationEvent/IUiModuleMutationEvent_Payload";
import { UiModuleMutationEvent_Subject } from "../../Events/UiModuleMutationEvent/UiModuleMutationEvent_Subject";
import { _UiModuleBase } from "../UiFeedbackModules/_UiModuleBase";

export class HindSiteSettingCheckBoxModule extends _UiModuleBase implements IUiModule {
  private HindSiteSetting: IHindSiteSetting;
  private UiInputElement: HTMLInputElement;
  private LabelElement: HTMLLabelElement;
  public UiElementChangeEvent_Subject: UiModuleMutationEvent_Subject;

  constructor(logger: ILoggerAgent, hindSiteSetting: IHindSiteSetting) {
    super(logger, hindSiteSetting.UiContainerSelector);

    this.Logger.InstantiateStart(HindSiteSettingCheckBoxModule.name);
    if (!StaticHelpers.IsNullOrUndefined(hindSiteSetting)) {
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

    this.UiElementChangeEvent_Subject = new UiModuleMutationEvent_Subject(this.Logger);

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
      }
    }
    this.UiElementChangeEvent_Subject.NotifyObservers(iUiElementChangeEvent_Payload);
    this.HindSiteSetting.SaveChange((<HTMLInputElement>evt.target).checked);
  }

  BuildHtml() {
    this.UiInputElement = <HTMLInputElement>document.createElement(SharedConst.Const.KeyWords.Html.Input);
    this.UiInputElement.type = SharedConst.Const.KeyWords.Html.Checkbox;
    this.UiInputElement.checked = this.HindSiteSetting.ValueAsBool();
    this.UiInputElement.id = "id-" + Guid.WithoutDashes(Guid.NewRandomGuid());

    this.LabelElement = <HTMLLabelElement>document.createElement(SharedConst.Const.KeyWords.Html.Label)
    this.LabelElement.innerHTML = this.HindSiteSetting.FriendlySetting;
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