import { ContentConst } from "../../../../../Shared/scripts/Interfaces/InjectConst";
import { _HindeCoreBase } from "../../../../../Shared/scripts/LoggableBase";
import { ScDocumentFacade } from "../../../../Facades/ScDocumentFacade";
import { IHindeCore } from "../../../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { RecipeBasics } from "../../../../../Shared/scripts/Classes/RecipeBasics";
//import { RecipeAddNewContentEditorToDesktop } from "../../../ContentApi/Recipes/RecipeAddContentEditorToDesktop";

export class DTPopUpMenuProxy extends _HindeCoreBase {
  RecipeBasics: RecipeBasics;

  constructor(hindeCore: IHindeCore) {
    super(hindeCore);

    this.RecipeBasics = new RecipeBasics(this.HindeCore);
  }
  RecipeAddNewPackageDesignerToDesktop(scDocumentProxy: ScDocumentFacade): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.RecipeAddNewPackageDesignerToDesktop.name);
      this.ErrorHand.ThrowIfNullOrUndefined(this.RecipeAddNewPackageDesignerToDesktop.name, scDocumentProxy);

      let popUp: HTMLElement;

      await scDocumentProxy.DocumentJacket.WaitForThenClick([ContentConst.Const.Selector.SC.StartMenu.DevelopmentTools])
        .then(() => this.RecipeBasics.WaitForTimePeriod(1000, 'waiting 1 sec'))
        .then(() => scDocumentProxy.DocumentJacket.WaitForAndReturnFoundElem('.scPopup'))
        .then((htmlElement: HTMLElement) => {
          popUp = htmlElement
        }        )
        .then(() => this.RecipeBasics.WaitForTimePeriod(2000, 'waiting 2 sec'))
        //.then((htmlElement: HTMLElement) => this.RecipeBasics.WaitAndReturnFoundFromContainer(htmlElement, ':scope > tr', DTPopUpMenuProxy.name))
        .then(() => this.RecipeBasics.WaitAndReturnFoundFromContainer(popUp, 'tr', DTPopUpMenuProxy.name))
        .then((htmlElement: HTMLElement) => {
          this.Logger.LogImportant('found the TR');
          htmlElement.click();
        })
        //.then((htmlElement: HTMLElement) => scDocumentProxy.DocumentJacket.WaitForThenClick([ContentConst.Const.Selector.SC.StartMenu.PackageDesigner]))
        .then(() => resolve())
        .catch((err) => reject(this.RecipeAddNewPackageDesignerToDesktop.name + ' ' + err));

      this.Logger.FuncEnd(this.RecipeAddNewPackageDesignerToDesktop.name);
    });
  }

  RecipeAddNewContentEditorToDesktop(scDocumentProxy: ScDocumentFacade): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.ErrorHand.ThrowIfNullOrUndefined(this.RecipeAddNewContentEditorToDesktop.name, scDocumentProxy);

      await scDocumentProxy.DocumentJacket.WaitForThenClick([ContentConst.Const.Selector.SC.StartMenuLeftOption])
        .then(() => resolve())
        .catch((err) => reject(this.RecipeAddNewContentEditorToDesktop.name + ' ' + err));
    });
  }
}