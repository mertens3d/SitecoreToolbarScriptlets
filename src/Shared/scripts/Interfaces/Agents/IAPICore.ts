import { ICommonCore } from "./ICommonCore";
import { IHindSiteScUiProxyRunTimeOptions } from "./IContentApi/IHindSiteScUiProxyRunTimeOptions";

export interface IAPICore extends ICommonCore {
  RunTimeOptions: IHindSiteScUiProxyRunTimeOptions,
}