import { DocumentJacket } from "../../../DOMJacket/scripts/Document/DocumentJacket";
import { IContentAtticAgent } from "./Agents/IContentAtticAgent/IContentAtticAgent";
import { ICommonCore } from "./Agents/ICommonCore";
import { AutoSnapShotAgent } from "../../../ContentTop/scripts/Agents/AutoSnapShotAgent";
import { IHindSiteScUiProxy } from "./Agents/IContentApi/IHindSiteScUiProxy";

export interface ICommandDependancies {
  AtticAgent: IContentAtticAgent;
  AutoSnapShotAgent: AutoSnapShotAgent;
  HindeCore: ICommonCore;
  ScUiProxy: IHindSiteScUiProxy;
  DocumentJacket: DocumentJacket
}