﻿import { HindeSiteEvent_Subject } from "../../../../../../../Shared/scripts/Events/_HindSiteEvent/HindeSiteEvent_Subject";
import { IAPICore } from "../../../../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { IContentTreeProxyMutationEvent_Payload } from "./IContentTreeProxyMutationEvent_Payload";
import { TypeDiscriminator } from "../../../../../../../Shared/scripts/Enums/70 - TypeDiscriminator";

export class ContentTreeMutationEvent_Subject extends HindeSiteEvent_Subject<IContentTreeProxyMutationEvent_Payload> {
  readonly Friendly_Subject = ContentTreeMutationEvent_Subject.name;
  readonly TypeDiscriminator = TypeDiscriminator.ContentTreeMutationEvent_Subject;

    ShowLogActions: boolean = true;
    constructor(apiCore: IAPICore) {
        super(apiCore);
    }
}
