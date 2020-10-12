import { ICommonCore } from "./ICommonCore";
import { IHindSiteScUiAPIRunTimeOptions } from "./IContentApi/IHindSiteScUiAPIRunTimeOptions";

export interface IAPICore extends ICommonCore {
  RunTimeOptions: IHindSiteScUiAPIRunTimeOptions,
}