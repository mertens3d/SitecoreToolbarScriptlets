import { RecipeBasics } from "../../../../../Shared/scripts/Classes/RecipeBasics";
import { SnapShotFlavor } from "../../../../../Shared/scripts/Enums/SnapShotFlavor";
import { IHindeCore } from "../../../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { ScDocumentFacade } from "../../../../Facades/ScDocumentFacade";
import { IRecipeBasics } from "../../../../../Shared/scripts/Interfaces/IPromiseHelper";
import { _HindeCoreBase } from "../../../../../Shared/scripts/LoggableBase";

export abstract class _ApiRecipeBase extends _HindeCoreBase{
  protected RecipeBasics: IRecipeBasics;
  protected TargetSnapShotFlavor: SnapShotFlavor;
  protected TargetDoc: ScDocumentFacade;

  constructor(hindeCore: IHindeCore) {
    super(hindeCore);
    this.RecipeBasics = new RecipeBasics(this.HindeCore);
    this.TargetDoc = null; //todo
  }
}