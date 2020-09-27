import { AutoSnapShotAgent } from "../../../Content/scripts/Agents/AutoSnapShotAgent";
import { IHindSiteScUiProxy } from "./Agents/IContentApi/IContentApi";
import { IContentAtticAgent } from "./Agents/IContentAtticAgent/IContentAtticAgent";
import { ILoggerAgent } from "./Agents/ILoggerAgent";
import { ScUrlAgent } from "../Agents/Agents/UrlAgent/ScUrlAgent";

export interface ICommandDependancies {
  AtticAgent: IContentAtticAgent;
  AutoSnapShotAgent: AutoSnapShotAgent;
  Logger: ILoggerAgent;
  ScUiProxy: IHindSiteScUiProxy;
  ScUrlAgent: ScUrlAgent
}