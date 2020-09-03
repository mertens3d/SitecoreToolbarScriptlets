import { PopConst } from "../../../../../PopUp/scripts/Classes/PopConst";
import { ILoggerAgent } from "../../../Interfaces/Agents/ILoggerBase";
import { IGenericSetting } from "../../../Interfaces/Agents/IGenericSetting";
import { ISettingsAgent } from "../../../Interfaces/Agents/ISettingsAgent";

export class AccordianDrone {
  private SettingsAgent: ISettingsAgent;
  private Logger: ILoggerAgent;
   AssociatedSetting: IGenericSetting;
  private AssociatedElement: HTMLElement;
  private AssociatedBodyElem: HTMLElement;

  constructor(loggerAgent: ILoggerAgent, settingsAgent: ISettingsAgent, uiElem: HTMLElement, oneSetting: IGenericSetting) {
    this.Logger = loggerAgent;
    this.SettingsAgent = settingsAgent;
    this.AssociatedSetting = oneSetting;
    this.AssociatedElement = uiElem;

    this.Init();
  }

  private Init() {
    this.AssociatedBodyElem = this.GetaccordionBodyElem(this.AssociatedElement);

    if (this.AssociatedBodyElem) {
      this.AddListener();
    } else {
      this.Logger.LogAsJsonPretty('this.AssociatedElement', this.AssociatedElement);
      this.Logger.ErrorAndThrow(this.RestoreAccordionState.name, 'Sibling not found ' + this.AssociatedSetting.Friendly);
    }
  }

  private AddListener() {
    if (this.AssociatedElement) {
      let self = this;
      this.AssociatedElement.addEventListener('click', (evt) => {
        self.ToggleAccordion(evt);
      });
    }
  }

  RestoreAccordionState(oneSetting: IGenericSetting) {
    this.Logger.FuncStart(this.RestoreAccordionState.name, oneSetting.SettingKey);

    if (this.AssociatedBodyElem) {
      this.SetAccordionClass(this.AssociatedBodyElem, oneSetting.ValueAsBool())
    }

    this.Logger.FuncEnd(this.RestoreAccordionState.name);
  }

  private ToggleAccordion(evt: any) {
    this.Logger.FuncStart(this.ToggleAccordion.name);

    if (this.AssociatedBodyElem && this.AssociatedSetting) {
      if (this.AssociatedSetting) {
        var newVal: boolean = !(this.AssociatedSetting.ValueAsBool());
        this.SetAccordionClass(this.AssociatedBodyElem, newVal);

        this.SettingsAgent.SetByKey(this.AssociatedSetting.SettingKey, newVal);
      }
    }
    else {
      this.Logger.ErrorAndThrow(this.ToggleAccordion.name, 'did not find sib');
    }
    this.Logger.FuncEnd(this.ToggleAccordion.name);
  }

  private GetaccordionBodyElem(sib: HTMLElement): HTMLElement {
    //this.debug().FuncStart(this.GetaccordionContentElem.name);
    var toReturn: HTMLElement;
    if (sib) {
      var siblings = sib.parentElement.getElementsByClassName('accordion-content');

      if (siblings) {
        var toReturn = <HTMLElement>siblings[0];
      } else {
        this.Logger.ErrorAndContinue(this.GetaccordionBodyElem.name, 'Sibling not found')
      }
    }

    return toReturn;
  }

  private SetAccordionClass(targetElem: HTMLElement, isCollapsed: Boolean) {
    if (!isCollapsed) {
      targetElem.classList.remove(PopConst.Const.ClassNames.HS.Collapsed);
    } else {
      targetElem.classList.add(PopConst.Const.ClassNames.HS.Collapsed);
    }
  }
}