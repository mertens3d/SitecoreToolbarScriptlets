import { AutoSnapShotAgent } from "../../../Content/scripts/Agents/AutoSnapShotAgent";
import { IHindSiteScUiProxy } from "./Agents/IContentApi/IContentApi";
import { IContentAtticAgent } from "./Agents/IContentAtticAgent/IContentAtticAgent";
import { IHindeCore } from "./Agents/IHindeCore";
import { ScUrlAgent } from "../Agents/Agents/UrlAgent/ScUrlAgent";
import { ScDocumentProxy } from "../../../HindSiteScUiProxy/scripts/Proxies/ScDocumentProxy";

export interface ICommandDependancies {
  AtticAgent: IContentAtticAgent;
  AutoSnapShotAgent: AutoSnapShotAgent;
  HindeCore: IHindeCore;
  ScUiProxy: IHindSiteScUiProxy;
  ScDocProxy: ScDocumentProxy
}