import { _BaseStateLessScDocProxy } from "../../../../../HindSiteScUiProxy/scripts/Proxies/StateLessDocProxies/StateLessDocProxies/_BaseStateLessScDocProxy";
import { IBaseScFrameProxy } from "../../Agents/IBaseScFrameProxy";

export interface IStateLessScFrameProxy extends IBaseScFrameProxy {
  HostedDocProxy: _BaseStateLessScDocProxy;
}
