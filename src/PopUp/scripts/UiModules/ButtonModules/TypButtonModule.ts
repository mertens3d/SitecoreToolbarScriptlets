import { ILoggerAgent } from "../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IUiModule } from "../../../../Shared/scripts/Interfaces/Agents/IUiModule";
import { VisiblityTestResultsBucket } from "../../../../Shared/scripts/Interfaces/Agents/IUiVisiblityTestResult";
import { IMenuCommandDefinition } from "../../../../Shared/scripts/Interfaces/IMenuCommandDefinition";
import { MenuCommandKey } from "../../../../Shared/scripts/Enums/2xxx-MenuCommand";
import { _baseButtonModule } from "./_baseButtonModule";

export class TypButtonModule extends _baseButtonModule implements IUiModule {
  private ElemButton: HTMLButtonElement;
  private ElemButtonBackText: HTMLDivElement;

  ElemDivBtnOverlay: HTMLDivElement;

  constructor(loggerAgent: ILoggerAgent, oneCommand: IMenuCommandDefinition) {
    super(loggerAgent, oneCommand);
  }

  Init(): void {
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

  private BuildButtonOverlay(): void {
    this.ElemDivBtnOverlay = document.createElement("div");
    this.ElemDivBtnOverlay.classList.add("btn-overlay");

    let backFill = this.BuildButtonOverlayBackFill();
    this.BuildButtonTextContainer();
    this.ElemDivBtnOverlay.appendChild(backFill);
    this.ElemDivBtnOverlay.appendChild(this.ElemButtonBackText);
  }
  private BuildButtonElem(): void {
    //<div id='PresentationDetails' type = 'button' class="button-wrapper icon details" > Presentation Details < /div>
    this.ElemButton = document.createElement("button");
    this.ElemButton.classList.add("icon");
    this.ElemButton.classList.add(this.MenuCommandDefinition.IconClassName);
    this.ElemButton.innerText = this.MenuCommandDefinition.InnerText;
    this.ElemButton.type = "button";
  }

  BuildModuleButton(): void {
    this.Logger.FuncStart(this.BuildModuleButton.name, this.MenuCommandDefinition.InnerText + ' ' + MenuCommandKey[this.MenuCommandDefinition.MenuCommandKey]);
    if (this.PlaceHolderUiElem) {
      this.BuildButtonElem();

      this.BuildButtonOverlay();

      this.PlaceHolderUiElem.classList.add('btn-container');

      this.PlaceHolderUiElem.appendChild(this.ElemDivBtnOverlay);
      this.PlaceHolderUiElem.appendChild(this.ElemButton);
    } else {
      this.Logger.ErrorAndContinue(TypButtonModule.name, 'Could not find ' + this.MenuCommandDefinition.PlaceHolderSelector);
    }
    this.Logger.FuncEnd(this.BuildModuleButton.name);
  }

  RefreshUi(): void {
    this.Logger.FuncStart(this.RefreshUi.name, this.Friendly());
    if (this.PlaceHolderUiElem) {
      let allresults: VisiblityTestResultsBucket = this.RefreshData. UiVisibilityTestAgent.TestAgainstAllSetControllers(this.MenuCommandDefinition);
      this.SetCommandButtonVisibility(allresults);
    } else {
      this.Logger.Log('no placeholder ' + this.Friendly())
    }
    this.Logger.FuncEnd(this.RefreshUi.name, this.Friendly());
  }

  private SetCommandButtonVisibility(allresults: VisiblityTestResultsBucket) {
    this.Logger.FuncStart(this.SetCommandButtonVisibility.name, this.Friendly());

    this.Logger.LogAsJsonPretty(this.Friendly(),allresults);

    if (allresults && this.ElemButton) {
      if (!allresults.HasFailures()) {
        this.ElemButton.classList.remove('disabled');
        this.ElemButton.removeAttribute('disabled');

        if (this.ElemDivBtnOverlay) {
          this.ElemDivBtnOverlay.style.display = 'none';
        }
      } else {
        this.ElemButton.classList.add('disabled');
        this.ElemButton.setAttribute('disabled', 'disabled');

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

    this.Logger.FuncEnd(this.SetCommandButtonVisibility.name, this.Friendly());
  }
}