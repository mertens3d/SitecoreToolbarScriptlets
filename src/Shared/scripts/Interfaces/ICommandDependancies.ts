﻿import { AutoSnapShotAgent } from "../../../Content/scripts/Agents/AutoSnapShotAgent";
import { DocumentJacket } from "../../../DOMJacket/DocumentJacket";
import { IHindSiteScUiAPI } from "./Agents/IContentApi/IContentApi";
import { IContentAtticAgent } from "./Agents/IContentAtticAgent/IContentAtticAgent";
import { IHindeCore } from "./Agents/IHindeCore";

export interface ICommandDependancies {
  AtticAgent: IContentAtticAgent;
  AutoSnapShotAgent: AutoSnapShotAgent;
  HindeCore: IHindeCore;
  ScUiProxy: IHindSiteScUiAPI;
  DocumentJacket: DocumentJacket
}