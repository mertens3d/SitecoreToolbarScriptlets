import { ModuleKey } from "../../../../Shared/scripts/Enums/ModuleKey";
import { IUiModule } from "../../../../Shared/scripts/Interfaces/Agents/IUiModule";
import { PopConst } from "../../Classes/PopConst";
import { IUiModuleMutationEvent_Payload } from "../../Events/UiModuleMutationEvent/IUiModuleMutationEvent_Payload";
import { _SettingsBasedModulesBase } from "./_SettingsBasedModulesBase";
import { StaticHelpers } from "../../../../Shared/scripts/Classes/StaticHelpers";

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
      this.Logger.ErrorAndThrow(this.DroneRestoreAccordionState.name, 'trigger not found ' + this.SettingWrapper.HindSiteSetting.FriendlySetting);
    }
  }

  BuildHtml() {
    if (!StaticHelpers.IsNullOrUndefined(this.ContainerUiDivElem)) {
      // let uiLabel: HTMLElement = window.document.querySelector(this.HindSiteSetting.UiSelector.replace('id', 'for'));

      this.AccordionTriggerElem = this.ContainerUiDivElem.querySelector('.accordion-trigger');
      this.AccordionContentElem = this.ContainerUiDivElem.querySelector('.accordion-content');

      if (!StaticHelpers.IsNullOrUndefined([this.AccordionTriggerElem, this.AccordionContentElem])) {
        this.AccordionTriggerElem.innerHTML = this.SettingWrapper.HindSiteSetting.FriendlySetting;
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

    if (this.AccordionContentElem && this.SettingWrapper) {
      var newVal: boolean = !(this.SettingWrapper.HindSiteSetting.ValueAsBool());

      if (this.SettingWrapper) {
        let iUiElementChangeEvent_Payload: IUiModuleMutationEvent_Payload = {
          ModuleKey: this.ModuleKey,
          CheckBoxModule: null,
          NumberModule: null,
          AccordianModule: {
            NewVal: newVal
          }
        }

        this.SettingWrapper.SaveChange(newVal);
        this.UiElementChangeEvent_Subject.NotifyObservers(iUiElementChangeEvent_Payload);
        this.SetAccordionClass();
      }
    }
    else {
      this.Logger.ErrorAndThrow(this.OnToggleAccordion.name, 'did not find sib');
    }
    this.Logger.FuncEnd(this.OnToggleAccordion.name);
  }

  private SetAccordionClass() {
    if (this.SettingWrapper.HindSiteSetting.ValueAsBool() === true) {
      this.AccordionContentElem.classList.remove(PopConst.Const.ClassNames.HS.Collapsed);
    } else {
      this.AccordionContentElem.classList.add(PopConst.Const.ClassNames.HS.Collapsed);
    }
  }
}