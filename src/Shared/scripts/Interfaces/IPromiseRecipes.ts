import { IDataOneDoc } from "./IDataOneDoc";
import { RecipeBasics } from "../Classes/PromiseGeneric";

export interface IPromiseRecipes {
  FromDesktopOpenNewCEIframe(targetDoc: IDataOneDoc, recipeBasics: RecipeBasics);
}
