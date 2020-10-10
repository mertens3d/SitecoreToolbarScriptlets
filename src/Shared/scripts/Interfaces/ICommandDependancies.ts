import { AutoSnapShotAgent } from "../../../Content/scripts/Agents/AutoSnapShotAgent";
import { DocumentJacket } from "../../../DOMJacket/DocumentJacket";
import { IHindSiteScUiAPI } from "./Agents/IContentApi/IContentApi";
import { IContentAtticAgent } from "./Agents/IContentAtticAgent/IContentAtticAgent";
import { ICommonCore } from "./Agents/ICommonCore";

export interface ICommandDependancies {
  AtticAgent: IContentAtticAgent;
  AutoSnapShotAgent: AutoSnapShotAgent;
  HindeCore: ICommonCore;
  ScUiProxy: IHindSiteScUiAPI;
  DocumentJacket: DocumentJacket
}