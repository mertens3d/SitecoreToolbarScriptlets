import { UtilityHelper } from "../../Helpers/UtilityHelper";
import { IFactoryHelper } from "../IFactoryHelper";
import { IPromiseRecipes } from "../IPromiseRecipes";

export interface IHelperAgent {
  UtilityHelp: UtilityHelper;
  PromisesRecipes: IPromiseRecipes;
}
