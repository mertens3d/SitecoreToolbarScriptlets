import { DocumentJacket } from "../../../../../DOMJacket/DocumentJacket";
import { RecipeBasics } from "../../../../../Shared/scripts/Classes/RecipeBasics";
import { IHindeCore } from "../../../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { ContentConst } from "../../../../../Shared/scripts/Interfaces/InjectConst";
import { _HindeCoreBase } from "../../../../../Shared/scripts/LoggableBase";
import { ElementJacket } from "../../../../../DOMJacket/ElementJacket";

export class DTPopUpMenuProxy extends _HindeCoreBase {
  RecipeBasics: RecipeBasics;

  constructor(hindeCore: IHindeCore) {
    super(hindeCore);

    this.RecipeBasics = new RecipeBasics(this.HindeCore);
  }

  RecipeAddNewPackageDesignerToDesktop(documentJacket: DocumentJacket): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.RecipeAddNewPackageDesignerToDesktop.name);
      this.ErrorHand.ThrowIfNullOrUndefined(this.RecipeAddNewPackageDesignerToDesktop.name, documentJacket);

      let popUpElementJacket: ElementJacket;

      await
        this.RecipeBasics.WaitForTimePeriod(1, 'waiting ') // it seems to need this wait when mixed in with content editor frames
          .then(() => documentJacket.WaitForThenClick([ContentConst.Const.Selector.SC.StartMenu.DevelopmentTools]))
          .then(() => this.RecipeBasics.WaitForTimePeriod(1, 'waiting for sitecore to catch up'))
          .then(() => documentJacket.WaitForAndReturnFoundElemJacketFromDoc('.scPopup'))
          .then((elementJacket: ElementJacket) => popUpElementJacket = elementJacket)
          .then(() => this.RecipeBasics.WaitForTimePeriod(1, 'waiting'))
          .then(() => popUpElementJacket.WaitAndReturnFoundElemJacketFromElemJacket('img[src$="packager.png"]', DTPopUpMenuProxy.name))  /// can't use TR....it's not guaranteed to be the first one. If powershell tools are installed it won't be
          .then((elementJacket: ElementJacket) => elementJacket.Click())
          .then(() => resolve())
          .catch((err) => reject(this.RecipeAddNewPackageDesignerToDesktop.name + ' ' + err));

      this.Logger.FuncEnd(this.RecipeAddNewPackageDesignerToDesktop.name);
    });
  }

  RecipeAddNewTemplateManagerToDesktop(documentJacket: DocumentJacket): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.ErrorHand.ThrowIfNullOrUndefined(this.RecipeAddNewTemplateManagerToDesktop.name, documentJacket);

      await documentJacket.WaitForThenClick([ContentConst.Const.Selector.SC.TemplateManager])
        .then(() => resolve())
        .catch((err) => reject(this.RecipeAddNewTemplateManagerToDesktop.name + ' ' + err));
    });
  }

  RecipeAddNewContentEditorToDesktop(documentJacket: DocumentJacket): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.ErrorHand.ThrowIfNullOrUndefined(this.RecipeAddNewContentEditorToDesktop.name, documentJacket);

      await documentJacket.WaitForThenClick([ContentConst.Const.Selector.SC.StartMenuLeftOption])
        .then(() => resolve())
        .catch((err) => reject(this.RecipeAddNewContentEditorToDesktop.name + ' ' + err));
    });
  }
}