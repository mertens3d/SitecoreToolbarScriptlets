﻿import { IAPICore } from "../../../../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { _HindeSiteEvent_Subject } from "../../../../../../../Shared/scripts/Events/_HindSiteEvent/HindeSiteEvent_Subject";
import { IDTAreaProxyMutationEvent_Payload } from "./IDTAreaProxyMutationEvent_Payload";
import { TypeDiscriminator } from "../../../../../../../Shared/scripts/Enums/70 - TypeDiscriminator";

export class DTAreaProxyMutationEvent_Subject extends _HindeSiteEvent_Subject<IDTAreaProxyMutationEvent_Payload> {
  readonly TypeDiscriminator = TypeDiscriminator.DTAreaProxyMutationEvent_Subject;
  readonly Friendly_Subject = DTAreaProxyMutationEvent_Subject.name;
 protected ShowLogActions: boolean = true;
}