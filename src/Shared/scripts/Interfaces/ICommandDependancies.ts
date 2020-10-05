import { AutoSnapShotAgent } from "../../../Content/scripts/Agents/AutoSnapShotAgent";
import { IHindSiteScUiAPI } from "./Agents/IContentApi/IContentApi";
import { IContentAtticAgent } from "./Agents/IContentAtticAgent/IContentAtticAgent";
import { IHindeCore } from "./Agents/IHindeCore";
import { ScUrlAgent } from "../Agents/Agents/UrlAgent/ScUrlAgent";
import { ScDocumentFacade } from "../../../HindSiteScUiProxy/scripts/Proxies/ScDocumentFacade";

export interface ICommandDependancies {
  AtticAgent: IContentAtticAgent;
  AutoSnapShotAgent: AutoSnapShotAgent;
  HindeCore: IHindeCore;
  ScUiProxy: IHindSiteScUiAPI;
  ScDocProxy: ScDocumentFacade
}