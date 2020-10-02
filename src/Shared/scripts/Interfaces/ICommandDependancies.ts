import { AutoSnapShotAgent } from "../../../Content/scripts/Agents/AutoSnapShotAgent";
import { IHindSiteScUiProxy } from "./Agents/IContentApi/IContentApi";
import { IContentAtticAgent } from "./Agents/IContentAtticAgent/IContentAtticAgent";
import { IHindeCore } from "./Agents/ILoggerAgent";
import { ScUrlAgent } from "../Agents/Agents/UrlAgent/ScUrlAgent";

export interface ICommandDependancies {
  AtticAgent: IContentAtticAgent;
  AutoSnapShotAgent: AutoSnapShotAgent;
  HindeCore: IHindeCore;
  ScUiProxy: IHindSiteScUiProxy;
  ScUrlAgent: ScUrlAgent
}