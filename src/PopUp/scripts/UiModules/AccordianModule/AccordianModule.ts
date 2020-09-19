import { PopConst } from "../../Classes/PopConst";
import { ILoggerAgent } from "../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IHindSiteSetting } from "../../../../Shared/scripts/Interfaces/Agents/IGenericSetting";
import { ISettingsAgent } from "../../../../Shared/scripts/Interfaces/Agents/ISettingsAgent";
import { IUiModule } from "../../../../Shared/scripts/Interfaces/Agents/IUiModule";
import { _UiModuleBase } from "../UiFeedbackModules/_UiModuleBase";

export class AccordianModule extends _UiModuleBase implements IUiModule {
  
  private SettingsAgent: ISettingsAgent;
  public AssociatedSetting: IHindSiteSetting;
  private AssociatedElement: HTMLElement;
  private AssociatedBodyElem: HTMLElement;

  constructor(logger: ILoggerAgent, settingsAgent: ISettingsAgent, oneSetting: IHindSiteSetting) {
    super(logger, oneSetting.UiSelector)
    this.Logger.InstantiateStart(AccordianModule.name);
    this.SettingsAgent = settingsAgent;
    this.AssociatedSetting = oneSetting;
    this.Logger.InstantiateEnd(AccordianModule.name);
  }

  Init() {
    this.Logger.FuncStart(this.Init.name, AccordianModule.name);
    this.AssociatedElement = window.document.querySelector(this.ElementSelector);

    if (this.AssociatedElement) {
      // let uiLabel: HTMLElement = window.document.querySelector(this.HindSiteSetting.UiSelector.replace('id', 'for'));

      this.AssociatedElement.innerHTML = this.AssociatedSetting.FriendlySetting;
    }

    this.AssociatedBodyElem = this.GetaccordionBodyElem(this.AssociatedElement);

    if (this.AssociatedBodyElem) {
      this.AddListener();
    } else {
      this.Logger.LogAsJsonPretty('this.AssociatedElement', this.AssociatedElement);
      this.Logger.ErrorAndThrow(this.DroneRestoreAccordionState.name, 'Sibling not found ' + this.AssociatedSetting.FriendlySetting);
    }
    this.Logger.FuncEnd(this.Init.name, AccordianModule.name);
  }

  RefreshUi(): void {
    this.DroneRestoreAccordionState();
  }

  private AddListener() {
    if (this.AssociatedElement) {
      let self = this;
      this.AssociatedElement.addEventListener('click', (evt) => {
        self.ToggleAccordion(evt);
      });
    }
  }

  DroneRestoreAccordionState() {
    if (this.AssociatedBodyElem) {
      this.SetAccordionClass(this.AssociatedBodyElem, this.AssociatedSetting.ValueAsBool())
    }
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