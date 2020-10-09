﻿import { DocumentJacket } from "../../../../../DOMJacket/DocumentJacket";
import { RecipeBasics } from "../../../../../Shared/scripts/Classes/RecipeBasics";
import { IHindeCore } from "../../../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { ContentConst } from "../../../../../Shared/scripts/Interfaces/InjectConst";
import { _HindeCoreBase } from "../../../../../Shared/scripts/_HindeCoreBase";
import { ElementJacket } from "../../../../../DOMJacket/ElementJacket";

export class DTPopUp1Proxy extends _HindeCoreBase {
  RecipeBasics: RecipeBasics;

  constructor(hindeCore: IHindeCore) {
    super(hindeCore);

    this.RecipeBasics = new RecipeBasics(this.HindeCore);
  }

  //RecipeAddNewPackageDesignerToDesktop(documentJacket: DocumentJacket): Promise<void> {
  //  return new Promise(async (resolve, reject) => {
  //    this.Logger.FuncStart(this.RecipeAddNewPackageDesignerToDesktop.name);
  //    this.ErrorHand.ThrowIfNullOrUndefined(this.RecipeAddNewPackageDesignerToDesktop.name, documentJacket);

  //    let popUpElementJacket: ElementJacket;

  //    await
  //      //this.RecipeBasics.WaitForTimePeriod(1, this.RecipeAddNewPackageDesignerToDesktop.name) // it seems to need this wait when mixed in with content editor frames
  //      //.then(() => documentJacket.WaitForThenClick([ContentConst.Const.Selector.SC.PopUp1.DevelopmentTools]))
  //      //.then(() => this.RecipeBasics.WaitForTimePeriod(1, 'waiting for sitecore to catch up'))
  //      //.then(() => documentJacket.WaitForAndReturnFoundElemJacket('.scPopup'))
  //      //.then((elementJacket: ElementJacket) => popUpElementJacket = elementJacket)
  //      //.then(() => this.RecipeBasics.WaitForTimePeriod(1, this.RecipeAddNewPackageDesignerToDesktop.name))
  //      //.then(() => popUpElementJacket.WaitAndReturnFoundElemJacketFromElemJacket(ContentConst.Const.Selector.SC.PopUp1.PackageDesignerButton, DTPopUp1Proxy.name)) /// can't use TR....it's not 
  //      .then((elementJacket: ElementJacket) => elementJacket.Click())
  //      .then(() => resolve())
  //      .catch((err) => reject(this.RecipeAddNewPackageDesignerToDesktop.name + ' ' + err));

  //    this.Logger.FuncEnd(this.RecipeAddNewPackageDesignerToDesktop.name);
  //  });
  //}

  RecipeAddNewMediaLibraryToDesktop(documentJacket: DocumentJacket): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.ErrorHand.ThrowIfNullOrUndefined(this.RecipeAddNewMediaLibraryToDesktop.name, documentJacket);

      await documentJacket.WaitForThenClick([ContentConst.Const.Selector.SC.MediaLibrary])
        .then(() => resolve())
        .catch((err) => reject(this.RecipeAddNewMediaLibraryToDesktop.name + ' ' + err));
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

  //RecipeAddNewContentEditorToDesktop(documentJacket: DocumentJacket): Promise<void> {
  //  return new Promise(async (resolve, reject) => {
  //    this.ErrorHand.ThrowIfNullOrUndefined(this.RecipeAddNewContentEditorToDesktop.name, documentJacket);

  //    await documentJacket.WaitForThenClick([ContentConst.Const.Selector.SC.StartMenuLeftOption])
  //      .then(() => resolve())
  //      .catch((err) => reject(this.RecipeAddNewContentEditorToDesktop.name + ' ' + err));
  //  });
  //}
}