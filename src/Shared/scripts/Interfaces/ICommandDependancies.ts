import { SolicitorForScheduledAutoSnapShot } from "../../../ContentTop/scripts/CommandSolicitors/CommandSolicitorForAutoSnapShot";
import { DocumentJacket } from "../../../DOMJacket/scripts/Document/DocumentJacket";
import { ICommonCore } from "./Agents/ICommonCore";
import { IContentAtticAgent } from "./Agents/IContentAtticAgent/IContentAtticAgent";

export interface ICommandDependancies {
  AtticAgent: IContentAtticAgent;
  SolicitorForAutoSnapShot: SolicitorForScheduledAutoSnapShot;
  HindeCore: ICommonCore;
  DocumentJacket: DocumentJacket
}