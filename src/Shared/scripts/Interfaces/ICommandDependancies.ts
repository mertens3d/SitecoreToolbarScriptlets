import { AutoSnapShotAgent } from "../../../Content/scripts/Agents/AutoSnapShotAgent";
import { IHindSiteScUiProxy } from "./Agents/IContentApi/IContentApi";
import { IContentAtticAgent } from "./Agents/IContentAtticAgent/IContentAtticAgent";
import { IApiCallPayload } from "./ICommandHandlerDataForContent";

export interface ICommandDependancies {
    AutoSnapShotAgent: AutoSnapShotAgent;
    AtticAgent: IContentAtticAgent;
    ScUiProxy: IHindSiteScUiProxy;
}
