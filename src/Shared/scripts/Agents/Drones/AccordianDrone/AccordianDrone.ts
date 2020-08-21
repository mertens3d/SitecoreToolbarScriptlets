import { ISettingsAgent } from "../../../Interfaces/Agents/ISettingsAgent";
import { ILoggerAgent } from "../../../Interfaces/Agents/ILoggerBase";
import { IOneGenericSetting } from "../../../Interfaces/Agents/IOneGenericSetting";
import { SettingKey } from "../../../Enums/3xxx-SettingKey";
import { PopConst } from "../../../../../PopUp/scripts/Classes/PopConst";

export class AccordianDrone {
  private SettingsAgent: ISettingsAgent;
  private Logger: ILoggerAgent;
   AssociatedSetting: IOneGenericSetting;
  private AssociatedElement: HTMLElement;
  private associatedContentElem: HTMLElement;

  constructor(loggerAgent: ILoggerAgent, settingsAgent: ISettingsAgent, uiElem: HTMLElement, oneSetting: IOneGenericSetting) {
    this.Logger = loggerAgent;
    this.SettingsAgent = settingsAgent;
    this.AssociatedSetting = oneSetting;
    this.AssociatedElement = uiElem;

    this.associatedContentElem = this.GetaccordionContentElem(this.AssociatedElement);

    if (!this.associatedContentElem) {
      this.Logger.ErrorAndThrow(this.RestoreAccordionState.name, 'Sibling not found');
    }

    this.AddListener();
  }

  private AddListener() {
    if (this.AssociatedElement) {
      let self = this;
      this.AssociatedElement.addEventListener('click', (evt) => {
        self.Toggleaccordion(evt);
      });
    }
  }

  RestoreAccordionState(oneSetting: IOneGenericSetting) {
    this.Logger.FuncStart(this.RestoreAccordionState.name, oneSetting.SettingKey);

    if (this.associatedContentElem) {
      this.Logger.LogAsJsonPretty("oneSetting", oneSetting);
      this.SetAccordionClass(this.associatedContentElem, oneSetting.ValueAsBool())
    }

    this.Logger.FuncEnd(this.RestoreAccordionState.name);
  }

  Toggleaccordion(evt: any) {
    this.Logger.FuncStart(this.Toggleaccordion.name);

    //var srcElem: HTMLElement = <HTMLElement>(evt.target || evt.srcElement);

    if (this.associatedContentElem && this.AssociatedSetting) {
      //var foundSetting: IOneGenericSetting = this.SettingsAgent.GetByKey(this.AssociatedSetting.SettingKey);
      if (this.AssociatedSetting) {
        var newVal: boolean = !(this.AssociatedSetting.ValueAsBool());
        this.SetAccordionClass(this.associatedContentElem, newVal);

      this.SettingsAgent.SetByKey(this.AssociatedSetting.SettingKey, newVal);
      }
    }
    else {
      this.Logger.ErrorAndThrow(this.Toggleaccordion.name, 'did not find sib');
    }
    this.Logger.FuncEnd(this.Toggleaccordion.name);
  }

  GetaccordionContentElem(sib: HTMLElement): HTMLElement {
    //this.debug().FuncStart(this.GetaccordionContentElem.name);
    var toReturn: HTMLElement;
    if (sib) {
      var siblings = sib.parentElement.getElementsByClassName('accordion-content');

      if (siblings) {
        var toReturn = <HTMLElement>siblings[0];
      }
    }

    //this.debug().FuncEnd(this.GetaccordionContentElem.name);
    return toReturn;
  }
  SetAccordionClass(targetElem: HTMLElement, isCollapsed: Boolean) {
    this.Logger.FuncStart(this.SetAccordionClass.name);
    this.Logger.LogAsJsonPretty("isCollapsed", isCollapsed);

    if (!isCollapsed) {
      targetElem.classList.remove(PopConst.Const.ClassNames.HS.Collapsed);
    } else {
      targetElem.classList.add(PopConst.Const.ClassNames.HS.Collapsed);
    }

    this.Logger.LogAsJsonPretty('classList', targetElem.classList);

    this.Logger.FuncEnd(this.SetAccordionClass.name);
  }
}