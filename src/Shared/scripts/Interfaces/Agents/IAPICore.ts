import { ICommonCore } from "./ICommonCore";
import { IHindSiteScUiAPIRunTimeOptions } from "./IContentApi/IContentApi";

export interface IAPICore extends ICommonCore {
  RunTimeOptions: IHindSiteScUiAPIRunTimeOptions,
}