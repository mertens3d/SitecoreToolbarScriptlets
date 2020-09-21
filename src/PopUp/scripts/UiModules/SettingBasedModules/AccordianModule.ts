import { ModuleKey } from "../../../../Shared/scripts/Enums/ModuleKey";
import { IUiModule } from "../../../../Shared/scripts/Interfaces/Agents/IUiModule";
import { PopConst } from "../../Classes/PopConst";
import { _SettingsBasedModulesBase } from "./_SettingsBasedModulesBase";
import { StaticHelpers } from "../../../../Shared/scripts/Classes/StaticHelpers";
import { IUiSettingBasedModuleMutationEven_Payload } from "../../Events/UiSettingBasedModuleMutationEvent/IUiSettingBasedModuleMutationEvent_Payload";

export class AccordianModule extends _SettingsBasedModulesBase implements IUiModule {
  private AccordionContentElem: HTMLElement;
  ModuleKey = ModuleKey.Accordion;
  private AccordionTriggerElem: HTMLElement;

  Init() {
    this.Logger.FuncStart(this.Init.name, AccordianModule.name);
    this.Init_BaseSettingsBasedModule();
    this.BuildHtml();
    this.SetAccordionClass();
    this.Logger.FuncEnd(this.Init.name, AccordianModule.name);
  }

  WireEvents(): void {
    if (!StaticHelpers.IsNullOrUndefined(this.AccordionTriggerElem)) {
      this.AccordionTriggerElem.addEventListener('click', (evt) => this.OnToggleAccordion(evt));
    } else {
      this.Logger.ErrorAndThrow(this.DroneRestoreAccordionState.name, 'trigger not found ' + this.SettingJacket.HindSiteSetting.FriendlySetting);
    }
  }

  BuildHtml() {
    if (!StaticHelpers.IsNullOrUndefined(this.ContainerUiDivElem)) {
      // let uiLabel: HTMLElement = window.document.querySelector(this.HindSiteSetting.UiSelector.replace('id', 'for'));

      this.AccordionTriggerElem = this.ContainerUiDivElem.querySelector('.accordion-trigger');
      this.AccordionContentElem = this.ContainerUiDivElem.querySelector('.accordion-content');

      if (!StaticHelpers.IsNullOrUndefined([this.AccordionTriggerElem, this.AccordionContentElem])) {
        this.AccordionTriggerElem.innerHTML = this.SettingJacket.HindSiteSetting.FriendlySetting;
      } else {
        this.Logger.ErrorAndThrow(this.BuildHtml.name, 'null trigger: ' + this.ContainerSelector);
      }
    }

    if (StaticHelpers.IsNullOrUndefined([this.AccordionTriggerElem, this.AccordionContentElem])) {
      this.Logger.ErrorAndThrow(this.BuildHtml.name, AccordianModule.name + '  missing elem')
    }
  }

  RefreshUi(): void {
    this.DroneRestoreAccordionState();
  }

  DroneRestoreAccordionState() {
    if (this.AccordionContentElem) {
      this.SetAccordionClass()
    }
  }

  private OnToggleAccordion(evt: any) {
    this.Logger.FuncStart(this.OnToggleAccordion.name);

    if (this.AccordionContentElem && this.SettingJacket) {
      var newVal: boolean = !(this.SettingJacket.HindSiteSetting.ValueAsBool());

      if (this.SettingJacket) {
        this.SettingJacket.SaveChangeBoolean(newVal);

        let iUiElementChangeEvent_Payload: IUiSettingBasedModuleMutationEven_Payload = {
          ModuleKey: this.ModuleKey,
          HindSiteSetting: this.SettingJacket.HindSiteSetting,
          CheckBoxModule: null,
          NumberModule: null,
          AccordianModule: {
            NewVal: newVal
          }
        }

        this.UiSettingBasedModuleMutationEvent_Subject.NotifyObservers(iUiElementChangeEvent_Payload);
        this.SetAccordionClass();
      }
    }
    else {
      this.Logger.ErrorAndThrow(this.OnToggleAccordion.name, 'did not find sib');
    }
    this.Logger.FuncEnd(this.OnToggleAccordion.name);
  }

  private SetAccordionClass() {
    if (this.SettingJacket.HindSiteSetting.ValueAsBool() === true) {
      this.AccordionContentElem.classList.remove(PopConst.Const.ClassNames.HS.Collapsed);
    } else {
      this.AccordionContentElem.classList.add(PopConst.Const.ClassNames.HS.Collapsed);
    }
  }
}