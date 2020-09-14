import { ILoggerAgent } from '../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { ISettingsAgent } from '../../../../../Shared/scripts/Interfaces/Agents/ISettingsAgent';
import { IDataOneDoc } from '../../../../../Shared/scripts/Interfaces/Data/IDataOneDoc';
import { ContentConst } from '../../../../../Shared/scripts/Interfaces/InjectConst';
import { FrameHelper } from '../../../Helpers/IframeHelper';
import { LoggableBase } from '../../../Managers/LoggableBase';
import { ContentEditorProxy } from '../../ContentEditor/ContentEditorProxy/ContentEditorProxy';
import { DesktopProxy } from '../DesktopProxy/DesktopProxy';
import { ITreeMutationEvent_Payload } from '../DesktopProxy/Events/TreeMutationEvent/ITreeMutationEvent_Payload';
import { DesktopStartBarButtonProxy } from './DesktopStartBarButtonProxy';
import { TreeMutationEvent_Observer } from '../DesktopProxy/Events/TreeMutationEvent/TreeMutationEvent_Observer';
import { IFrameProxyMutationEvent_Payload } from '../DesktopProxy/Events/FrameProxyMutationEvent/IFrameProxyMutationEvent_Payload';

export class DesktopStartBarProxy extends LoggableBase {
  private CeProxies: ContentEditorProxy[] = [];
  private OwnerDesktopProxy: DesktopProxy;
  private SettingsAgent: ISettingsAgent;
  private __statBarElem: HTMLElement;
  private __iframeHelper: FrameHelper;

  constructor(logger: ILoggerAgent, ownerDesktopProxy: DesktopProxy, settingsAgent: ISettingsAgent) {
    super(logger);
    this.SettingsAgent = settingsAgent;
    this.Logger.InstantiateStart(DesktopStartBarProxy.name);
    this.OwnerDesktopProxy = ownerDesktopProxy;

    //this.EnrollListenerForActiveNodeChange();
    this.Logger.InstantiateEnd(DesktopStartBarProxy.name);
  }

  GetAssociatedDoc(): IDataOneDoc {
    return this.OwnerDesktopProxy.GetAssociatedDoc();
  }

  GetStartBarButtonById(targetId: string) {
    return this.OwnerDesktopProxy.GetAssociatedDoc().ContentDoc.querySelector('[id=' + targetId + ']');
  }

  GetStartBarElement(): HTMLElement {
    if (!this.__statBarElem) {
      this.__statBarElem = this.OwnerDesktopProxy.GetAssociatedDoc().ContentDoc.querySelector(ContentConst.Const.Selector.SC.Desktop.DtStartBar);
    }

    return this.__statBarElem;
  }

  private GetIframeHelper() {
    if (this.__iframeHelper == null) {
      this.__iframeHelper = new FrameHelper(this.Logger, this.SettingsAgent);
    }
    return this.__iframeHelper;
  }

  GetAssociatedStartBarButton(iframeElemId: string): DesktopStartBarButtonProxy {
    let foundStartBarProxy = new DesktopStartBarButtonProxy(this.Logger, iframeElemId, this);
    return foundStartBarProxy;
  }

  OnContentEditorProxyAdded(frameProxyMutated_Payload: IFrameProxyMutationEvent_Payload) {
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

  OnTreeMutationEvent_DesktopStartBarProxy(treeMutationEvent_Payload: ITreeMutationEvent_Payload) {
    this.Logger.FuncStart(this.OnTreeMutationEvent_DesktopStartBarProxy.name);
    // at this point we have a new active node (or some other change event)

    if (treeMutationEvent_Payload) {
      this.Logger.Log('todo')
      //let iframeElement: HTMLIFrameElement = <HTMLIFrameElement>this.OwnerDesktopProxy.GetAssociatedDoc().ContentDoc.getElementById(treeMutationEvent_Payload.AssociatedIframeElemId);

      //if (iframeElement) {
      //  if (treeMutationEvent_Payload.ActiveNode) {
      //    let desktopStartBarButtonProxy: DesktopStartBarButtonProxy = this.GetAssociatedStartBarButton(treeMutationEvent_Payload.AssociatedIframeElemId);

      //    desktopStartBarButtonProxy.Update(desktopStartBarButtonProxy, treeMutationEvent_Payload.ActiveNode);
      //  }

      //we need to know what the associated button is
      //we can get that by knowing the id of the CE
      //} else {
      //  this.Logger.ErrorAndContinue(this.OnTreeMutationEvent_DesktopStartBarProxy.name, 'Did not find Frame');
      //}
    } else {
      this.Logger.ErrorAndThrow(this.OnTreeMutationEvent_DesktopStartBarProxy.name, 'Null payload');
    }

    this.Logger.FuncEnd(this.OnTreeMutationEvent_DesktopStartBarProxy.name);
  }
}