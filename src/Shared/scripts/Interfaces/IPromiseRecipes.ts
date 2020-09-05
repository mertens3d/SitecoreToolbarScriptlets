import { IDataOneDoc } from "./IDataOneDoc";
import { RecipeBasics } from "../Classes/RecipeBasics";

export interface IPromiseRecipes {
  FromDesktopOpenNewCEIframe(targetDoc: IDataOneDoc, recipeBasics: RecipeBasics);
}
