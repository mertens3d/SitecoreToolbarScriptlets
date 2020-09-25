﻿import { ILoggerAgent } from '../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { IDataOneDoc } from '../../../../../Shared/scripts/Interfaces/Data/IDataOneDoc';
import { IDTFrameProxyMutationEvent_Payload } from '../../../../../Shared/scripts/Interfaces/Events/DTFrameProxyMutationEvent/IDTFrameProxyMutationEvent_Payload';
import { ContentConst } from '../../../../../Shared/scripts/Interfaces/InjectConst';
import { IDesktopProxy, IDesktopStartBarProxy, IDTFrameProxy } from "../../../../../Shared/scripts/Interfaces/Proxies/IDesktopProxy";
import { FrameHelper } from '../../../Helpers/FrameHelper';
import { LoggableBase } from '../../../../../Shared/scripts/LoggableBase';
import { ITreeMutationEvent_Payload } from '../DesktopProxy/Events/TreeMutationEvent/ITreeMutationEvent_Payload';
import { TreeMutationEvent_Observer } from '../DesktopProxy/Events/TreeMutationEvent/TreeMutationEvent_Observer';
import { DesktopStartBarButtonProxy } from './DesktopStartBarButtonProxy';
import { IContentBrowserProxy } from '../../../../../Shared/scripts/Interfaces/Agents/IContentBrowserProxy';

export class DesktopStartBarProxy extends LoggableBase implements IDesktopStartBarProxy {
  private __statBarElem: HTMLElement;
  private __iframeHelper: FrameHelper;
  private ContentBrowserProxy: IContentBrowserProxy;
    AssociatedDoc: IDataOneDoc;

  constructor(logger: ILoggerAgent, contentBrowserProxy: IContentBrowserProxy, associatedDoc: IDataOneDoc) {
    super(logger);
    this.Logger.InstantiateStart(DesktopStartBarProxy.name);

    this.ContentBrowserProxy = contentBrowserProxy;

    this.AssociatedDoc = associatedDoc;
    //this.EnrollListenerForActiveNodeChange();
    this.Logger.InstantiateEnd(DesktopStartBarProxy.name);
  }

  GetAssociatedDoc(): IDataOneDoc {
    return this.AssociatedDoc
  }

  GetStartBarButtonById(targetId: string) {
    return this.AssociatedDoc.ContentDoc.querySelector('[id=' + targetId + ']');
  }

  GetStartBarElement(): HTMLElement {
    if (!this.__statBarElem) {
      this.__statBarElem = this.AssociatedDoc.ContentDoc.querySelector(ContentConst.Const.Selector.SC.Desktop.DtStartBar);
    }

    return this.__statBarElem;
  }

  private GetIframeHelper() {
    if (this.__iframeHelper == null) {
      this.__iframeHelper = new FrameHelper(this.Logger, this.ContentBrowserProxy);
    }
    return this.__iframeHelper;
  }

  GetAssociatedStartBarButton(iframeElemId: string): DesktopStartBarButtonProxy {
    let foundStartBarProxy = new DesktopStartBarButtonProxy(this.Logger, iframeElemId, this);
    return foundStartBarProxy;
  }

  OnContentEditorProxyAdded(frameProxyMutated_Payload: IDTFrameProxyMutationEvent_Payload) {
    this.Logger.FuncStart(this.OnContentEditorProxyAdded.name);

    if (frameProxyMutated_Payload) {
      //todo put in new error checking for duplicates
      //if (this.CeProxies.indexOf(frameProxyMutated_Payload.ContentEditorProxyMutationPayload) < 0) {
      //  this.CeProxies.push(frameProxyMutated_Payload.ContentEditorProxyMutationPayload);

      let treeMutationEvent_Observer = new TreeMutationEvent_Observer(this.Logger, this);
      //todo -replace frameProxyMutated_Payload.ContentEditorProxyMutationPayload.RegisterObserverForTreeMutation(treeMutationEvent_Observer);
      //}
    } else {
      this.Logger.ErrorAndThrow(this.OnContentEditorProxyAdded.name, 'Null ceProxy');
    }

    this.Logger.FuncEnd(this.OnContentEditorProxyAdded.name);
  }

  OnTreeMutationEvent_DesktopStartBarProxy(dtframeProxyMutationEvent_Payload: IDTFrameProxyMutationEvent_Payload) {
    this.Logger.FuncStart(this.OnTreeMutationEvent_DesktopStartBarProxy.name);
    // at this point we have a new active node (or some other change event)

    if (dtframeProxyMutationEvent_Payload) {
      if (dtframeProxyMutationEvent_Payload.ContentEditorProxyMutationPayload && dtframeProxyMutationEvent_Payload.ContentEditorProxyMutationPayload.TreeMutation) {
        let treeMutationEvent_Payload: ITreeMutationEvent_Payload = dtframeProxyMutationEvent_Payload.ContentEditorProxyMutationPayload.TreeMutation;
        let dtframeProxy: IDTFrameProxy = dtframeProxyMutationEvent_Payload.DTFrameProxy;

        if (treeMutationEvent_Payload.ActiveNode) {
          let desktopStartBarButtonProxy: DesktopStartBarButtonProxy = this.GetAssociatedStartBarButton(dtframeProxy.HTMLIframeElement.id);

          desktopStartBarButtonProxy.Update(desktopStartBarButtonProxy, treeMutationEvent_Payload.ActiveNode);
        }
        //let iframeElement: HTMLIFrameElement = <HTMLIFrameElement>this.OwnerDesktopProxy.GetAssociatedDoc().ContentDoc.getElementById(treeMutationEvent_Payload.AssociatedIframeElemId);

        //if (iframeElement) {
        //  }

        //we need to know what the associated button is
        //we can get that by knowing the id of the CE
        //} else {
        //  this.Logger.ErrorAndContinue(this.OnTreeMutationEvent_DesktopStartBarProxy.name, 'Did not find Frame');
        //}
      }
    } else {
      this.Logger.ErrorAndThrow(this.OnTreeMutationEvent_DesktopStartBarProxy.name, 'Null payload');
    }

    this.Logger.FuncEnd(this.OnTreeMutationEvent_DesktopStartBarProxy.name);
  }
}