import { ILoggerAgent } from '../../../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { ContentEditorProxy } from '../../../../ContentEditor/ContentEditorProxy/ContentEditorProxy';
import { HindSiteEvent_Observer } from '../_HindSiteEvent/HindSiteEvent_Observer';
import { IHindSiteEvent_Observer } from '../_HindSiteEvent/IHindSiteEvent_Observer';
import { ITreeMutationEvent_Payload } from './ITreeMutationEvent_Payload';

export class TreeMutationEvent_Observer extends HindSiteEvent_Observer<ITreeMutationEvent_Payload> implements IHindSiteEvent_Observer<ITreeMutationEvent_Payload> {
  private OwnerContentEditorProxy: ContentEditorProxy;

  constructor(logger: ILoggerAgent, ownerContentEditorProxy) {
    super(logger, TreeMutationEvent_Observer.name);
    this.OwnerContentEditorProxy = ownerContentEditorProxy;
  }

  SetAssociatedContentEditorProxy(contentEditorProxy: ContentEditorProxy) {
    this.OwnerContentEditorProxy = contentEditorProxy;
  }

  UpdateAsync(payload: ITreeMutationEvent_Payload): void {
    this.OwnerContentEditorProxy.ContentEditorProxyOnTreeMutationEvent(payload);
    payload.OwnerContentEditorProxy = this.OwnerContentEditorProxy;
  }
}