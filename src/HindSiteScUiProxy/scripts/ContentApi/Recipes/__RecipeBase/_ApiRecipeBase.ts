import { DocumentJacket } from "../../../../../DOMJacket/DocumentJacket";
import { RecipeBasics } from "../../../../../Shared/scripts/Classes/RecipeBasics";
import { SnapShotFlavor } from "../../../../../Shared/scripts/Enums/SnapShotFlavor";
import { IHindeCore } from "../../../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { IRecipeBasics } from "../../../../../Shared/scripts/Interfaces/IPromiseHelper";
import { _HindeCoreBase } from "../../../../../Shared/scripts/_HindeCoreBase";

export abstract class _ApiRecipeBase extends _HindeCoreBase{
  protected RecipeBasics: IRecipeBasics;
  protected TargetSnapShotFlavor: SnapShotFlavor;
  protected TargetDocJacket: DocumentJacket;

  constructor(hindeCore: IHindeCore) {
    super(hindeCore);
    this.RecipeBasics = new RecipeBasics(this.HindeCore);
    this.TargetDocJacket = null; //todo
  }
}