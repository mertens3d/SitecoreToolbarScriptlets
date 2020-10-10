import { IHindeCore } from "./IHindeCore";
import { IHindSiteScUiAPIOptions } from "./IContentApi/IContentApi";

export interface IAPICore extends IHindeCore {
  Options: IHindSiteScUiAPIOptions,
}