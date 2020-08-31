import { UtilityHelper } from "../../Helpers/UtilityHelper";
import { IFactoryHelper } from "../IFactoryHelper";
import { IPromisesBasic } from "../IPromiseHelper";
import { IPromiseRecipes } from "../IPromiseRecipes";

export interface IHelperAgent {
  UtilityHelp: UtilityHelper;
  PromisesBasic: IPromisesBasic;
  PromisesRecipes: IPromiseRecipes;
  FactoryHelp: IFactoryHelper;
}
