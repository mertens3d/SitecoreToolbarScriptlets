import { ModuleKey } from "../../../../Shared/scripts/Enums/ModuleKey";
import { IUiModule } from "../../../../Shared/scripts/Interfaces/Agents/IUiModule";
import { PopConst } from "../../../../Shared/scripts/Const/PopConst";
import { _SettingsBasedModulesBase } from "./_SettingsBasedModulesBase";
import { StaticHelpers } from "../../../../Shared/scripts/Classes/StaticHelpers";
import { IUiSettingBasedModuleMutationEven_Payload } from "../../Events/UiSettingBasedModuleMutationEvent/IUiSettingBasedModuleMutationEvent_Payload";

export class AccordianModule extends _SettingsBasedModulesBase implements IUiModule {

  private AccordionContentElem: HTMLElement;
  ModuleKey = ModuleKey.AccordionTypical;
  private AccordionTriggerElem: HTMLElement;
  Friendly = AccordianModule.name;
  private IsEnabled: boolean = true;

  Init_Module() {
    this.Logger.FuncStart(this.Init_Module.name, AccordianModule.name);
    this.Init_BaseSettingsBasedModule();
    
    this.Logger.FuncEnd(this.Init_Module.name, AccordianModule.name);
  }

  WireEvents_Module(): void {
    if (!StaticHelpers.IsNullOrUndefined(this.AccordionTriggerElem)) {
      this.AccordionTriggerElem.addEventListener('click', (evt) => this.OnToggleAccordion(evt));
    } else {
      this.Logger.ErrorAndThrow(this.DroneRestoreAccordionState.name, 'trigger not found ' + this.SettingJacket.HindSiteSetting.FriendlySetting);
    }
  }
  DisableSelf() {
    console.log(this.ContainerSelector);
    this.IsEnabled = false;
    
  }
  BuildHtmlForModule(): void {
    this.Logger.FuncStart(this.BuildHtmlForModule.name);
    if (!StaticHelpers.IsNullOrUndefined(this.ContainerUiDivElem)) {
      // let uiLabel: HTMLElement = window.document.querySelector(this.HindSiteSetting.UiSelector.replace('id', 'for'));

      this.ContainerUiDivElem.style.display = 'block';

      this.AccordionTriggerElem = this.ContainerUiDivElem.querySelector('.accordion-trigger');
      this.AccordionContentElem = this.ContainerUiDivElem.querySelector('.accordion-content');

      if (!StaticHelpers.IsNullOrUndefined([this.AccordionTriggerElem, this.AccordionContentElem])) {
        this.AccordionTriggerElem.innerHTML = this.SettingJacket.HindSiteSetting.FriendlySetting;
      } else {
        this.Logger.ErrorAndThrow(this.BuildHtmlForModule.name, 'null trigger: ' + this.ContainerSelector);
      }
    }

    if (StaticHelpers.IsNullOrUndefined([this.AccordionTriggerElem, this.AccordionContentElem])) {
      this.Logger.ErrorAndThrow(this.BuildHtmlForModule.name, AccordianModule.name + '  missing elem')
    }


    this.SetAccordionClass();

    if (!this.IsEnabled) {
      console.log(this.ContainerSelector);
      this.ContainerUiDivElem.style.display = 'none';
    }


    this.Logger.FuncEnd(this.BuildHtmlForModule.name);

  }

  RefreshUi_Module(): void {
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
        let iUiElementChangeEvent_Payload: IUiSettingBasedModuleMutationEven_Payload = {
          ModuleKey: this.ModuleKey,
          HindSiteSetting: this.SettingJacket.HindSiteSetting,
          CheckBoxModule: null,
          NumberModule: null,
          AccordianModule: {
            NewVal: newVal
          }
        }
        this.SettingJacket.HindSiteSetting.ValueAsObj = newVal;
        this.SetAccordionClass();
        this.UiSettingBasedModuleMutationEvent_Subject.NotifyObserversAsync(iUiElementChangeEvent_Payload);
      }
    }
    else {
      this.Logger.ErrorAndThrow(this.OnToggleAccordion.name, 'did not find sib');
    }
    this.Logger.FuncEnd(this.OnToggleAccordion.name);
  }

  private SetAccordionClass() {
    if (this.AccordionContentElem && this.AccordionTriggerElem) {
      if (this.SettingJacket.HindSiteSetting.ValueAsBool() !== true) {
        this.AccordionContentElem.classList.remove(PopConst.Const.ClassNames.HS.Collapsed);
        this.AccordionTriggerElem.classList.remove(PopConst.Const.ClassNames.HS.Down);
      } else {
        this.AccordionContentElem.classList.add(PopConst.Const.ClassNames.HS.Collapsed);
        this.AccordionTriggerElem.classList.add(PopConst.Const.ClassNames.HS.Down);
      }
    } else {
      this.Logger.ErrorAndContinue(this.SetAccordionClass.name, 'null elems');
    }
  }
}