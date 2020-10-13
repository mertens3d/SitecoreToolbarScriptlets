import { DocumentJacket } from "../../../../../DOMJacket/Document/DocumentJacket";
import { RecipeBasics } from "../../../RecipeBasics";
import { SnapShotFlavor } from "../../../../../Shared/scripts/Enums/SnapShotFlavor";
import { IAPICore } from "../../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { IRecipeBasics } from "../../../../../Shared/scripts/Interfaces/IPromiseHelper";
import { _APICoreBase } from "../../../../../Shared/scripts/_APICoreBase";

export abstract class _ApiRecipeBase extends _APICoreBase{
  protected RecipeBasics: IRecipeBasics;
  protected TargetSnapShotFlavor: SnapShotFlavor;
  protected TargetDocJacket: DocumentJacket;

  constructor(apiCore: IAPICore) {
    super(apiCore);
    this.RecipeBasics = new RecipeBasics(this.ApiCore);
    this.TargetDocJacket = null; //todo
  }
}