import { IFactoryHelper } from "../IFactoryHelper";
import { IGuidHelper } from "../IGuidHelper";
import { IPromisesBasic } from "../IPromiseHelper";
import { IUrlAgent } from "../IUrlAgent";
import { IPromiseRecipes } from "../IPromiseRecipes";
import { UtilityHelper } from "../../Helpers/UtilityHelper";

export interface IHelperAgent {
  UtilityHelp: UtilityHelper;
  PromisesBasic: IPromisesBasic;
  PromisesRecipes: IPromiseRecipes;
  FactoryHelp: IFactoryHelper;
  GuidHelper: IGuidHelper;
}
