import { MenuCommandKey } from "../../../../Shared/scripts/Enums/2xxx-MenuCommand";
import { ModuleKey } from "../../../../Shared/scripts/Enums/ModuleKey";
import { ILoggerAgent } from "../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IUiModule, IUiModuleButton } from "../../../../Shared/scripts/Interfaces/Agents/IUiModule";
import { VisiblityTestResultsBucket } from "../../../../Shared/scripts/Interfaces/Agents/IUiVisiblityTestResult";
import { IMenuCommandDefinition } from "../../../../Shared/scripts/Interfaces/IMenuCommandDefinition";
import { _baseButtonModule } from "./_baseButtonModule";

export class TypCommandButtonModule extends _baseButtonModule implements IUiModuleButton {
  ModuleKey = ModuleKey.ButtonTypical;
  private ElemButtonBackText: HTMLDivElement;
  private ElemDivBtnOverlay: HTMLDivElement;

  constructor(loggerAgent: ILoggerAgent, menuCommandParameters: IMenuCommandDefinition) {
    super(loggerAgent, menuCommandParameters);
  }

  Init(): void {
    this.Logger.FuncStart(this.Init.name, TypCommandButtonModule.name)
    this.Init_BaseButtonModule();
    this.BuildButton();
    this.Logger.FuncEnd(this.Init.name, TypCommandButtonModule.name)
  }

  WireEvents(): void {
    this.WireEvents_Base();
  }

  GetCommandKey() {
    return this.MenuCommandDefinition.MenuCommandKey;
  }

  TriggerSingleClick() {
    this.HTMLButtonElement.click();
  }

  private AddElemToBaseButton(): void {
    this.ContainerUiElem.appendChild(this.ElemDivBtnOverlay);
  }

  private BuildButtonOverlay(): void {
    this.ElemDivBtnOverlay = document.createElement("div");
    this.ElemDivBtnOverlay.classList.add("btn-overlay");

    let backFill = this.BuildButtonOverlayBackFill();
    this.BuildButtonTextContainer();
    this.ElemDivBtnOverlay.appendChild(backFill);
    this.ElemDivBtnOverlay.appendChild(this.ElemButtonBackText);
  }

  private BuildButtonOverlayBackFill() {
    let divElem = document.createElement("div");
    divElem.classList.add("back-fill");
    return divElem;
  }

  private BuildButtonTextContainer() {
    this.ElemButtonBackText = document.createElement("div");
    this.ElemButtonBackText.classList.add("back-text");
    this.ElemButtonBackText.innerText = 'here is why it is disabled';
    return this.ElemButtonBackText;
  }

  BuildButton(): void {
    this.Logger.FuncStart(this.BuildButton.name, this.MenuCommandDefinition.InnerText + ' ' + MenuCommandKey[this.MenuCommandDefinition.MenuCommandKey]);
    if (this.ContainerUiElem) {
      this.BuildButtonElem();

      this.BuildButtonOverlay();

      this.ContainerUiElem.classList.add('btn-container');

      this.ContainerUiElem.appendChild(this.ElemDivBtnOverlay);
      this.ContainerUiElem.appendChild(this.HTMLButtonElement);
    } else {
      this.Logger.ErrorAndContinue(TypCommandButtonModule.name, 'Could not find ' + this.MenuCommandDefinition.PlaceHolderSelector);
    }
    this.Logger.FuncEnd(this.BuildButton.name);
  }

  RefreshUi(): void {
    this.Logger.FuncStart(this.RefreshUi.name, this.Friendly);
    if (this.ContainerUiElem) {
      let allresults: VisiblityTestResultsBucket = this.RefreshData.UiVisibilityTestAgent.TestAgainstAllSetControllers(this.MenuCommandDefinition);

      this.Logger.LogVal('length', allresults.TestResults.length);
      this.SetCommandButtonVisibility(allresults);
    } else {
      this.Logger.Log('no placeholder ' + this.Friendly)
    }
    this.Logger.FuncEnd(this.RefreshUi.name, this.Friendly);
  }

  private SetCommandButtonVisibility(allresults: VisiblityTestResultsBucket) {
    this.Logger.FuncStart(this.SetCommandButtonVisibility.name, this.Friendly);

    this.Logger.LogAsJsonPretty(this.Friendly, allresults.TestResults);

    if (allresults && this.HTMLButtonElement) {
      if (!allresults.HasFailures()) {
        this.HTMLButtonElement.classList.remove('disabled');
        this.HTMLButtonElement.removeAttribute('disabled');

        if (this.ElemDivBtnOverlay) {
          this.ElemDivBtnOverlay.style.display = 'none';
        }
      } else {
        this.HTMLButtonElement.classList.add('disabled');
        this.HTMLButtonElement.setAttribute('disabled', 'disabled');

        if (this.ElemDivBtnOverlay) {
          this.ElemDivBtnOverlay.style.display = 'block';
        }

        if (this.ElemButtonBackText) {
          this.ElemButtonBackText.innerText = allresults.GetFriendlyFails();
        }
      }
    } else {
      this.Logger.ErrorAndContinue(this.SetCommandButtonVisibility.name, 'targetButton is NULL: ' + MenuCommandKey[this.MenuCommandDefinition.MenuCommandKey]);
    }

    this.Logger.FuncEnd(this.SetCommandButtonVisibility.name, this.Friendly);
  }
}