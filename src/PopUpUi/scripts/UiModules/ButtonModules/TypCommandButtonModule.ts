﻿import { StaticHelpers } from "../../../../Shared/scripts/Classes/StaticHelpers";
import { MenuCommandKey } from "../../../../Shared/scripts/Enums/20 - MenuCommand";
import { ModuleKey } from "../../../../Shared/scripts/Enums/ModuleKey";
import { IHindeCore } from "../../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { IUiModuleButton } from "../../../../Shared/scripts/Interfaces/Agents/IUiModuleButton";
import { VisiblityTestResultsBucket } from "../../../../Shared/scripts/Interfaces/Agents/IUiVisiblityTestResult";
import { IMenuCommandDefinition } from "../../../../Shared/scripts/Interfaces/IMenuCommandDefinition";
import { _base_ButtonModule } from "./_baseButtonModule";
import { VisibilityType } from "../../../../Shared/scripts/Enums/VisibilityType";

export class TypCommandButtonModule extends _base_ButtonModule implements IUiModuleButton {
  ModuleKey = ModuleKey.ButtonTypical;
  private ElemButtonBackText: HTMLDivElement;
  private ElemDivBtnOverlay: HTMLDivElement;

  constructor(hindeCore: IHindeCore, menuCommandParameters: IMenuCommandDefinition) {
    super(hindeCore, menuCommandParameters);
  }

  Init_Module(): void {
    this.Logger.FuncStart(this.Init_Module.name, TypCommandButtonModule.name)
    this.Init_BaseButtonModule();

    this.Logger.FuncEnd(this.Init_Module.name, TypCommandButtonModule.name)
  }

  WireEvents_Module(): void {
    this.WireEvents_Base();
  }

  GetCommandKey() {
    return this.MenuCommandDefinition.MenuCommandKey;
  }

  BuildHtmlForModule() {
    this.BuildHtmlForModule_base_ButtonModule();
    this.BuildElements();
  }

  private BuildButtonOverlay(): void {
    this.ElemDivBtnOverlay = document.createElement("div");
    this.ElemDivBtnOverlay.classList.add("btn-overlay");

    //todo - this needs a more elagent solution
    if (this.MenuCommandDefinition.VisibilityControllers.indexOf(VisibilityType.Always) < 0) {
      let backFill = this.BuildButtonOverlayBackFill();
      this.BuildButtonTextContainer();
      this.ElemDivBtnOverlay.appendChild(backFill);
      this.ElemDivBtnOverlay.appendChild(this.ElemButtonBackText);
    }
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

  BuildElements(): void {
    this.Logger.FuncStart(this.BuildElements.name, this.MenuCommandDefinition.InnerText + ' ' + MenuCommandKey[this.MenuCommandDefinition.MenuCommandKey]);
    if (!StaticHelpers.IsNullOrUndefined(this.ContainerUiDivElem)) {

      
        this.BuildButtonOverlay();


      this.ContainerUiDivElem.classList.add('btn-container');

      this.ContainerUiDivElem.appendChild(this.ElemDivBtnOverlay);
      this.ContainerUiDivElem.appendChild(this.HTMLButtonElement);
    } else {
      this.ErrorHand.ErrorAndContinue(TypCommandButtonModule.name, 'Could not find ' + this.MenuCommandDefinition.PlaceHolderSelector);
    }
    this.Logger.FuncEnd(this.BuildElements.name);
  }

  RefreshUi_Module(): void {
    this.Logger.FuncStart(this.RefreshUi_Module.name, this.Friendly);
    if (this.DoesContainerExist()) {
      let allresults: VisiblityTestResultsBucket = this.RefreshData.UiVisibilityTestAgent.TestAgainstAllSetControllers(this.MenuCommandDefinition);

      this.Logger.LogVal('test count', allresults.TestResults.length);
      this.SetCommandButtonVisibilityBasedOnResults(allresults);
    } else {
      this.Logger.Log('no placeholder ' + this.Friendly)
    }

    this.Logger.FuncEnd(this.RefreshUi_Module.name, this.Friendly);
  }

  private SetCommandButtonVisibilityBasedOnResults(allresults: VisiblityTestResultsBucket) {
    this.Logger.FuncStart(this.SetCommandButtonVisibilityBasedOnResults.name, this.Friendly);

    this.Logger.LogAsJsonPretty(this.Friendly, allresults.TestResults);

    this.ErrorHand.ThrowIfNullOrUndefined(this.SetCommandButtonVisibilityBasedOnResults.name, [allresults, this.HTMLButtonElement]);

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

    this.Logger.FuncEnd(this.SetCommandButtonVisibilityBasedOnResults.name, this.Friendly);
  }
}