import { IFactoryHelper } from "../IFactoryHelper";
import { IGuidHelper } from "../IGuidHelper";
import { IPromisesBasic } from "../IPromiseHelper";
import { IUrlHelper } from "../IUrlHelp";
import { IPromiseRecipes } from "../IPromiseRecipes";

export interface IHelperAgent {
  UtilityHelp: any;
  UrlHelp: IUrlHelper;
  PromisesBasic: IPromisesBasic;
  PromisesRecipes: IPromiseRecipes;
  FactoryHelp: IFactoryHelper;
  GuidHelper: IGuidHelper;
}
