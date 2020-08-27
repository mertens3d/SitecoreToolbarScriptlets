import { IFactoryHelper } from "../IFactoryHelper";
import { IGuidHelper } from "../IGuidHelper";
import { IPromisesBasic } from "../IPromiseHelper";
import { IUrlHelper } from "../IUrlHelp";
import { IPromiseRecipes } from "../IPromiseRecipes";
import { UtilityHelper } from "../../Helpers/UtilityHelper";

export interface IHelperAgent {
  UtilityHelp: UtilityHelper;
  UrlHelp: IUrlHelper;
  PromisesBasic: IPromisesBasic;
  PromisesRecipes: IPromiseRecipes;
  FactoryHelp: IFactoryHelper;
  GuidHelper: IGuidHelper;
}
