import { LoggableBase } from "../../../../Content/scripts/Managers/LoggableBase";
import { ModuleType } from "../../../../Shared/scripts/Enums/ModuleType";
import { ScWindowType } from "../../../../Shared/scripts/Enums/scWindowType";
import { GuidData } from "../../../../Shared/scripts/Helpers/GuidData";
import { ILoggerAgent } from "../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IUiModule } from "../../../../Shared/scripts/Interfaces/Agents/IUiModule";
import { VisiblityTestResults } from "../../../../Shared/scripts/Interfaces/Agents/IUiVisiblityTestResult";
import { IDataStateOfSitecoreWindow } from "../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfSitecoreWindow";
import { IMenuCommandParams } from "../../../../Shared/scripts/Interfaces/MenuCommand";
import { UiVisibilityTestAgent } from "../../Managers/UiManager/ButtonVisibilityTests";
import { MenuCommandKey } from "../../../../Shared/scripts/Enums/2xxx-MenuCommand";

export class _baseButtonModule extends LoggableBase implements IUiModule {
  protected Command: IMenuCommandParams;
  protected Tester: UiVisibilityTestAgent;
  protected PlaceHolderUiElem: HTMLElement;
  protected CurrentWindowType: ScWindowType;
  protected SelectedSnapshot: GuidData;
  protected StateOfSitecoreWindow: IDataStateOfSitecoreWindow;

  constructor(loggerAgent: ILoggerAgent, oneCommand: IMenuCommandParams) {
    super(loggerAgent);
    this.Command = oneCommand;

    if (this.Command && this.Command.PlaceHolderSelector && this.Command.PlaceHolderSelector.length > 0) {
      this.PlaceHolderUiElem = document.querySelector(oneCommand.PlaceHolderSelector);
      if (this.Command.ModuleType === ModuleType.ButtonTyp) {
        this.BuildModuleButton();
      }
    }
  }

  Hydrate(stateOfSitecoreWindow: IDataStateOfSitecoreWindow, currentWindowType: ScWindowType, selectedSnapshot: GuidData): void {
    this.StateOfSitecoreWindow = stateOfSitecoreWindow;
    this.CurrentWindowType = currentWindowType;
    this.SelectedSnapshot = selectedSnapshot;
  }

  Init(): void { }
  RefreshUi(): void { }
  BuildModuleButton(): void { }
}

export class CloseButtonModule extends _baseButtonModule implements IUiModule {
}

export class TypButtonModule extends _baseButtonModule implements IUiModule {
  private ElemButton: HTMLButtonElement;
  private ElemButtonBackText: HTMLDivElement;

  ElemDivBtnOverlay: HTMLDivElement;

  constructor(loggerAgent: ILoggerAgent, oneCommand: IMenuCommandParams) {
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
    this.ElemButton.classList.add(this.Command.IconClassName);
    this.ElemButton.innerText = this.Command.InnerText;
    this.ElemButton.type = "button";
  }

  BuildModuleButton(): void {
    this.Logger.FuncStart(this.BuildModuleButton.name, this.Command.InnerText + ' ' + MenuCommandKey[this.Command.MenuCommandKey]);
    if (this.PlaceHolderUiElem) {
      this.BuildButtonElem();

      this.BuildButtonOverlay();

      this.PlaceHolderUiElem.classList.add('btn-container');

      this.PlaceHolderUiElem.appendChild(this.ElemDivBtnOverlay);
      this.PlaceHolderUiElem.appendChild(this.ElemButton);
    } else {
      this.Logger.ErrorAndContinue(TypButtonModule.name, 'Could not find ' + this.Command.PlaceHolderSelector);
    }
    this.Logger.FuncEnd(this.BuildModuleButton.name);
  }

  RefreshUi(): void {
    if (this.PlaceHolderUiElem) {
      let allresults: VisiblityTestResults = this.Tester.TestAgainstAllSetControllers(null);
      this.SetCommandButtonVisibility(allresults);
    }
  }

  private SetCommandButtonVisibility(allresults: VisiblityTestResults) {
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
      this.Logger.ErrorAndContinue(this.SetCommandButtonVisibility.name, 'targetButton is NULL: ' + MenuCommandKey[this.Command.MenuCommandKey]);
    }
  }
}