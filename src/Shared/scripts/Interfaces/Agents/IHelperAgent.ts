import { IFactoryHelper } from "../IFactoryHelper";
import { IGuidHelper } from "../IGuidHelper";
import { IPromiseHelper } from "../IPromiseHelper";
import { IUrlHelper } from "../IUrlHelp";

export interface IHelperAgent {
  UtilityHelp: any;
  UrlHelp: IUrlHelper;
  PromiseHelper: IPromiseHelper;
  FactoryHelp: IFactoryHelper;
  GuidHelp: IGuidHelper;
}
