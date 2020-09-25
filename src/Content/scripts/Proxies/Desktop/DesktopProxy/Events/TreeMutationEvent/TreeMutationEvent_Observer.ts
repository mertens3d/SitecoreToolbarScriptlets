import { IContentEditorProxy } from '../../../../../../../Shared/scripts/Interfaces/Proxies/IDesktopProxy';
import { HindSiteEvent_Observer } from '../../../../../../../Shared/scripts/Events/_HindSiteEvent/HindSiteEvent_Observer';
import { IHindSiteEvent_Observer } from '../../../../../../../Shared/scripts/Events/_HindSiteEvent/IHindSiteEvent_Observer';
import { ILoggerAgent } from '../../../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { ITreeMutationEvent_Payload } from './ITreeMutationEvent_Payload';

export class TreeMutationEvent_Observer extends HindSiteEvent_Observer<ITreeMutationEvent_Payload> implements IHindSiteEvent_Observer<ITreeMutationEvent_Payload> {
  private OwnerContentEditorProxy: IContentEditorProxy;

  constructor(logger: ILoggerAgent, ownerContentEditorProxy) {
    super(logger, TreeMutationEvent_Observer.name);
    this.OwnerContentEditorProxy = ownerContentEditorProxy;
  }

  SetAssociatedContentEditorProxy(contentEditorProxy: IContentEditorProxy) {
    this.OwnerContentEditorProxy = contentEditorProxy;
  }

  UpdateAsync(payload: ITreeMutationEvent_Payload): void {
    this.OwnerContentEditorProxy.ContentEditorProxyOnTreeMutationEvent(payload);
    payload.OwnerContentEditorProxy = this.OwnerContentEditorProxy;
  }
}